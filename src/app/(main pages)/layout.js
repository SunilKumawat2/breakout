import SmoothScrolling from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReset from "@/components/ScrollReset";
import RouteLoader from "@/components/RouteLoader";
// import { Helmet } from "react-helmet";
// import SeoClientWrapper from "@/app/helpers/seoDetails/wrapper";
export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <ScrollReset />
      <RouteLoader />
      <SmoothScrolling>{children}</SmoothScrolling>
      <Footer />
    </>
  );
}
