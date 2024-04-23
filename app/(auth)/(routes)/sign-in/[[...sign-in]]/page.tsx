import { SignIn } from "@clerk/nextjs";
import type { AppProps } from "next/app";
/* eslint-disable react/no-unescaped-entities */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: {
            fontSize: 14,
            textTransform: "none",
            backgroundColor: "#611BBD",
            "&:hover, &:focus, &:active": {
              backgroundColor: "#49247A",
            },
          },
        },
      }}
    />
  );
}

/* eslint-enable react/no-unescaped-entities */

export default MyApp;
