import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Marlon's Bed n Bath</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER */}
      <Header />

      {/* BANNER */}
      <Banner />
    </div>
  )
}
