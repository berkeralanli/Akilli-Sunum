// pages/app/(auth)/(routes)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

// İhtiyaç duyulmayan uyarıları devre dışı bırak
/* eslint-disable react/no-unescaped-entities */

const SignInPage = () => {
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

// eslint uyarılarını tekrar etkinleştir
/* eslint-enable react/no-unescaped-entities */

export default SignInPage;
