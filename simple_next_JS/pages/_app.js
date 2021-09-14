// scroll bar
import "simplebar/src/simplebar.css";

import { useEffect } from "react";
// next
import Head from "next/head";
// theme
import ThemeConfig from "src/theme";
// contexts
import { SettingsProvider } from "src/contexts/SettingsContext";
// components
import Settings from "src/components/settings";
import RtlLayout from "src/components/RtlLayout";
import TopProgressBar from "src/components/TopProgressBar";
import ThemePrimaryColor from "src/components/ThemePrimaryColor";

// ----------------------------------------------------------------------

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <SettingsProvider>
      <ThemeConfig>
        <ThemePrimaryColor>
          <RtlLayout>
            <Settings />
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
            </Head>
            <TopProgressBar />
            <Component {...pageProps} />
          </RtlLayout>
        </ThemePrimaryColor>
      </ThemeConfig>
    </SettingsProvider>
  );
}
