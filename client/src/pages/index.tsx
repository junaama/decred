import Head from 'next/head'
import { Inter } from '@next/font/google'
import useMintKudos from '@/hooks/useMintKudos'
import useFarcasterUser from '@/hooks/useFarcasterUser'
export default function Home() {
  const { kudos, loading, error } = useMintKudos('0x75479B52c8ccBD74716fb3EA17074AAeF14c66a2')
  const { user } = useFarcasterUser('0x75479B52c8ccBD74716fb3EA17074AAeF14c66a2')
  console.log("user", user,)
  console.log("kudos", kudos,)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
        </div>
      </main>
    </>
  )
}
