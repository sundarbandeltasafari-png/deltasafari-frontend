import ProviderStore from "@/services/ProviderStore";

export const metadata = {
  title: "Account | Delta Safari",
  robots: "noindex, nofollow",
};

export default function AuthLayout({ children }) {
  return <>
    <ProviderStore>
      <section>
        {children}
      </section>
    </ProviderStore>
  </>
}