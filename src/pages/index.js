import Head from 'next/head'
import FractionComponent from "../components/FractionComponent"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fraction Calculator</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <FractionComponent/>

      
    </div>
  )
}
