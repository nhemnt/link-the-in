import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useRouter } from 'next/router';

import { AppProvider } from "contexts/app/reducer";
import { QuizProvider } from "contexts/quiz/reducer";

import { theme } from "theme";
// External CSS import here
import "styles/common.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag("config", "G-R525K9B1DC", {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <QuizProvider>
          <Component {...pageProps} />
        </QuizProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default MyApp;
