import "@/styles/globals.css";
import "@/styles/globals.css";
import Head from "next/head";
import Container from "@/components/Container";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideLayout = ["/login", "/register"].includes(router.pathname);
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <style>{fontStyle}</style> */}
      </Head>
      {!hideLayout && <GNB />}
      <Container
        page
        className="min-h-screen w-full max-w-full xl:max-w-[1520px] px-4"
      >
        <Component {...pageProps} />
      </Container>
      {!hideLayout && <Footer />}
    </>
  );
}
