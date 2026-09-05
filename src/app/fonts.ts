import localFont from "next/font/local";

export const googleSans = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});
