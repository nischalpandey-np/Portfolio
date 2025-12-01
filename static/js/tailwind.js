//  Tailwind Config for Custom Colors/Fonts

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        dark: "#0f172a",
        card: "rgba(30, 41, 59, 0.7)",
        primary: "#6366f1", // Indigo 500
        secondary: "#ec4899", // Pink 500
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
};
