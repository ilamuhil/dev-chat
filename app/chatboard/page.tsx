import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { Button } from '../components/Button'

export default async function Page() {
  const session = await getServerSession(options)
  return session?.user ? (
    <>
      <h1>Welcome to Dev Chatboard {session?.user?.email}</h1> <Button>Sign out</Button>
    </>
  ) : (
    <h1>You are not authenticated</h1>
  )
}
