import Link from 'next/link'
import LegacyFeed from '@/components/legacy-feed'

export default function ArchivePage() {
  return (
    <>
      <div className="route-intro">
        <Link href="/" className="route-back">YADESH</Link>
        <p className="kicker">The archive</p>
        <h1>Records worth returning to.</h1>
        <p>Browse testimony and sober lessons with the source visible before the claim travels any further.</p>
      </div>
      <LegacyFeed />
    </>
  )
}
