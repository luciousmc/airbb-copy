import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Marlon's Bed n Bath</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Lets build airBNB</h1>
    </div>
  )
}
