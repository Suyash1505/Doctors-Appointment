/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },

      colors: {
        primary: "#3DA1FF",
        primaryHover: "#1E80D6",
        primarySoft: "rgba(61,161,255,0.18)",

        bg: "#040812",
        bgAlt: "#0A0F1E",

        surface: "rgba(20,30,55,0.75)",
        surfaceLight: "rgba(32,45,75,0.85)",

        text: "#F2F7FF",
        textSecondary: "#A8B6D0",
        textMuted: "#7688A2",

        border: "rgba(61,161,255,0.18)",
        borderSoft: "rgba(61,161,255,0.08)",

        inputBg: "rgba(10,20,40,0.6)",
        inputBorder: "rgba(61,161,255,0.2)",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },

      boxShadow: {
        soft: "0 12px 30px rgba(0,0,0,0.6)",
        glow: "0 0 25px rgba(61,161,255,0.4)",
        hero: "0 20px 60px rgba(61,161,255,0.15)",
      },

      borderRadius: {
        xl: "18px",
        "2xl": "24px",
      },

      backgroundImage: {
        hero: "radial-gradient(circle at 70% 30%, rgba(61,161,255,0.25), transparent), linear-gradient(135deg,#040812,#0A0F1E)",
        glow: "radial-gradient(circle, rgba(61,161,255,0.15), transparent 70%)",
      },
    },
  },

  plugins: [],
}
