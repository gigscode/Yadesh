import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  // Test a direct read from saved_items
  let saveTest = null
  let saveError = null
  if (user) {
    const { data, error: e } = await supabase
      .from('saved_items')
      .select('content_key')
      .eq('user_id', user.id)
      .limit(1)
    saveTest = data
    saveError = e?.message ?? null
  }

  return NextResponse.json({
    user: user ? { id: user.id, email: user.email } : null,
    authError: error?.message ?? null,
    saveTest,
    saveError,
  })
}
