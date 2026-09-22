import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Pebble Payment Gateway Webhook Endpoint
 * Listens for payment and subscription events to synchronize is_premium status.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    let payload: any

    try {
      payload = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const event = payload.event || payload.type || 'payment.successful'
    const data = payload.data || payload

    // Extract customer email or user identifier from Pebble payload
    const customerEmail =
      data.customer_email ||
      data.customer?.email ||
      data.email ||
      data.metadata?.email

    const userId = data.metadata?.user_id || data.metadata?.userId

    if (!customerEmail && !userId) {
      return NextResponse.json(
        { error: 'Missing customer email or user ID in webhook payload' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Handle premium activation events
    const activationEvents = [
      'payment.successful',
      'charge.successful',
      'charge.completed',
      'subscription.created',
      'subscription.renewed',
      'subscription.active',
    ]

    // Handle premium deactivation events
    const deactivationEvents = [
      'subscription.cancelled',
      'subscription.expired',
      'payment.failed',
      'subscription.paused',
    ]

    let isPremium = true
    if (deactivationEvents.includes(event)) {
      isPremium = false
    } else if (!activationEvents.includes(event)) {
      // Event acknowledged but ignored
      return NextResponse.json({ received: true, ignored: true, event }, { status: 200 })
    }

    const customerId = data.customer_id || data.customerId || data.customer?.id
    const subscriptionId = data.subscription_id || data.subscriptionId || data.id

    const updateData: Record<string, any> = {
      is_premium: isPremium,
    }
    if (isPremium) {
      updateData.premium_since = new Date().toISOString()
    }
    if (customerId) {
      updateData.pebble_customer_id = customerId
    }
    if (subscriptionId) {
      updateData.pebble_subscription_id = subscriptionId
    }

    // Update profiles row
    let query = supabase.from('profiles').update(updateData)

    if (userId) {
      query = query.eq('id', userId)
    } else {
      query = query.eq('email', customerEmail)
    }

    const { error: updateError } = await query

    if (updateError) {
      console.error('Failed to update profile premium status from Pebble webhook:', updateError)
      return NextResponse.json(
        { error: 'Failed to update user profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      received: true,
      event,
      isPremium,
      target: userId || customerEmail,
    })
  } catch (err: any) {
    console.error('Unexpected error in Pebble webhook:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Yadesh Pebble Webhook Receiver',
    timestamp: new Date().toISOString(),
  })
}
