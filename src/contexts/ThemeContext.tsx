import { createContext, useState, ReactNode, useEffect } from "react";

interface IThemeContext {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "dark",
  toggleTheme: () => undefined,
});

interface Props {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  function toggleTheme() {
    const newTheme = theme == "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark");
  }

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme == "light") {
      toggleTheme();
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
