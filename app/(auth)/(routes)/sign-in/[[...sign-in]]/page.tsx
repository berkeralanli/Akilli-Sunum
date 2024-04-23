// pages/_app.tsx

import { AppProps } from 'next/app';
import { SignIn } from '@clerk/nextjs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
