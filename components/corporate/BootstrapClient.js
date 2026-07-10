"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // Bootstrap's JS (collapse, accordion, navbar toggler) needs the DOM/window,
    // so it's imported client-side only, after mount.
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
