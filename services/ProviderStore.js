"use client"

import { Provider } from "react-redux"
import { persistor, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"

function ProviderStore({ children }) {
  if (typeof window === "undefined") {
    return <Provider store={store}>{children}</Provider>
  }

  return (
    <Provider store={store}>
      <PersistGate loading={children} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ProviderStore