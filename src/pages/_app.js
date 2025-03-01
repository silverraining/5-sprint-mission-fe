import "@/styles/globals.css";
import "@/styles/globals.css";
import Head from "next/head";
import Container from "@/components/Container";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <style>{fontStyle}</style> */}
      </Head>
      <GNB />
      <Container page className="min-h-screen">
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
