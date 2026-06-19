import ProviderStore from "@/services/ProviderStore";

export default function AuthLayout({ children }) {
  return <>
    <ProviderStore>
      <section>
        {children}
      </section>
    </ProviderStore>
  </>
}