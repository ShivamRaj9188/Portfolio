/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        space: {
          900: "#02000a", // deep black space
          800: "#070514", // deep indigo
        },
        cosmic: {
          blue: "#4a72ff", // bolder blue
          purple: "#7b2ff7", // vibrant purple
          pink: "#b8aadd",
          cyan: "#0ff2fe",
          gold: "#e2e8f0",
          dark: "#02000a",
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(15, 242, 254, 0.4)',
        'glow-purple': '0 0 20px rgba(123, 47, 247, 0.4)',
        'glow-blue': '0 0 20px rgba(74, 114, 255, 0.4)',
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        "spin-slow": "spin 30s linear infinite",
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite alternate",
        "fade-in-up": "fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "fade-in": "fadeIn 1.5s ease-in-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(74, 114, 255, 0.5), 0 0 20px rgba(74, 114, 255, 0.3)" },
          to: { boxShadow: "0 0 20px rgba(123, 47, 247, 0.6), 0 0 40px rgba(123, 47, 247, 0.4)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }
      },
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(135deg, #02000a 0%, #070514 50%, #02000a 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
    },
  },
  plugins: [],
};
