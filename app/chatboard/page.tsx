import Navbar from './navbar'
import SidebarNav from './sidebar-nav'
import { Suspense } from 'react'
import Loading from './loading'

export default async function Chatboard() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <SidebarNav />
      </Suspense>
    </div>
  )
}
