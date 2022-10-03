/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/ads/**/*.{js,ts,jsx,tsx}",
    "./src/articles/**/*.{js,ts,jsx,tsx}",
    "./src/news/**/*.{js,ts,jsx,tsx}",
    "./src/newspaper/**/*.{js,ts,jsx,tsx}",
    "./src/reviews/**/*.{js,ts,jsx,tsx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx}",
    "./src/video/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // roboto: ["Roboto", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
    },
    fontSize: {
      "13px": ["13px", "1.3"],
      "14px": ["14px", "1.3"],
      "16px": ["16px", "1.3"],
      "18px": ["18px", "1.3"],
      "20px": ["20px", "1.3"],
      "22px": ["22px", "1.3"],
      "24px": ["24px", "1.3"],
      "26px": ["26px", "1.3"],
      "28px": ["28px", "1.3"],
      "30px": ["30px", "1.3"],
      "32px": ["32px", "1.3"],
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      "grey-100": "#F2F2F2",
      "grey-200": "#D9D9D9",
      "grey-300": "#BDBDBD",
      "grey-400": "#828282",
      "grey-450": "#4D515D",
      "grey-480": "#373E4A",
      "grey-490": "#474D58",
      "grey-500": "#333333",
      "grey-600": "#212831",

      "blue-100": "#4DB2E7",
      "blue-200": "#3E8EB9",
      "blue-300": "#154291",

      telegram: "#2F89CE",
      vk: "#7294C7",
      twitter: "#55ACE3",
      youtube: "#F40000",
      ok: "#F79A38",
    },
    screens: {
      sm: "460px",
      smx1: "560px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    extend: {
      container: {
        center: true,
        margin: "auto",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1330px",
        },
      },
      height: {
        "navbar-sm": "50px",
        "navbar-md": "80px",
      },
      padding: {
        "navbar-sm": "50px",
        "navbar-md": "80px",
      },
    },
  },
  plugins: [],
};
