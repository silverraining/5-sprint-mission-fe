import "@/styles/globals.css";
import "@/styles/globals.css";
import Head from "next/head";
import Container from "@/components/Container";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/contexts/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 1번 재시도
      refetchOnWindowFocus: false, // 포커스 이동 시 리패치 안 함
    },
  },
});
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideLayout = ["/login", "/register"].includes(router.pathname);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* AuthProvider 추가 */}
        <Head>
          <title>판다마켓</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {!hideLayout && <GNB />}
        <Container
          page
          className="min-h-screen w-full max-w-full xl:max-w-[1520px] px-4"
        >
          <Component {...pageProps} />
        </Container>
        {!hideLayout && <Footer />}
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
