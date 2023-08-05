import { Suspense } from 'react'
import HomeUI from '@/components/HomeUI'

function HomeFallback() {
  return <></>
}

export default async function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeUI />
    </Suspense>
  )
}
