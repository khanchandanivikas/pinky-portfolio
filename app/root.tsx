import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./tailwind.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntroProvider } from "@/components/Intro/IntroProvider";
import { Preloader } from "@/components/Intro/Preloader";
import { useHashLinks } from "@/lib/useHashLinks";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f3f3f1" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const App = () => {
  useHashLinks();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <IntroProvider>
          <Preloader />
          <Header />
          <main id="main-content">
            <Outlet />
          </main>
        </IntroProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
};

export default App;
