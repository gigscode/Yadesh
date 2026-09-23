import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Lightweight Supabase Keep-Alive Endpoint
 * Prevents free-tier Supabase projects from pausing due to 7 days of inactivity.
 * Can be pinged daily by any free cron service or uptime monitor.
 */
export async function GET() {
  try {
    const supabase = createAdminClient()

    // Execute minimal query against profiles
    const startTime = Date.now()
    const { error } = await supabase.from('profiles').select('id').limit(1)
    const latencyMs = Date.now() - startTime

    if (error) {
      return NextResponse.json(
        {
          status: 'warning',
          message: 'Connected to Supabase with query notice',
          error: error.message,
          latencyMs,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      )
    }

    return NextResponse.json({
      status: 'active',
      database: 'connected',
      latencyMs,
      timestamp: new Date().toISOString(),
      note: 'Supabase free-tier project kept awake successfully.',
    })
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: err.message || 'Database connection error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  return GET()
}
