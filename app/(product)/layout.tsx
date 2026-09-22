import { ProductChrome } from '@/components/product-chrome'
import { OnboardingModal } from '@/components/onboarding-modal'
import { MobilePwaPrompt } from '@/components/mobile-pwa-prompt'
import { createClient } from '@/lib/supabase/server'

// Persistent route group layout wrapping all product pages.
// Checks if the active user is an admin to selectively render the Admin navigation button.
export default async function ProductLayout({ children }: { children: React.ReactNode }) {
  let isAdmin = false

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle()

      isAdmin = Boolean(profile?.is_admin)
    }
  } catch {
    isAdmin = false
  }

  return (
    <ProductChrome isAdmin={isAdmin}>
      {children}
      <OnboardingModal />
      <MobilePwaPrompt />
    </ProductChrome>
  )
}
