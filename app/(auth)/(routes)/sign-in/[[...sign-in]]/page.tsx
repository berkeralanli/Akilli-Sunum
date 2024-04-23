import { SignIn } from "@clerk/nextjs";
import type { AppProps } from "next/app";

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

export default MyApp;
