import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";

export default function AuthLayout({ children }) {
  return <>
    <Header />
    <section>
      {children}
    </section>
    <Footer />
  </>
}