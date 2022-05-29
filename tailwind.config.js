module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        main: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      },
      colors: { dark: "#131516" },
    },
  },
  plugins: [],
};
