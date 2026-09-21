import LegacyFeed from '@/components/legacy-feed'

// Authenticated users are redirected to /learn by proxy.ts middleware
// before this page renders, so this is always the unauthenticated view.
export default function Page() {
  return <LegacyFeed isLoggedIn={false} />
}
