import type { Config } from "tailwindcss";
export default <Partial<Config>> {
  theme: {
    extend: {
      fontFamily: {
        "poppins": [
          "Poppins",
          "sans-serif"
        ]
      },
      colors: {
        "light": "#1e1e1e",
        "dark": {
          "primary": "#121212",
          "secondary": "#1e1e1e",
          "tertiary": "#2d2d2d"
        }
      }
    }
  }
};