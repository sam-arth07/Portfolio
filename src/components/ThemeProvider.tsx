"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	toggleTheme: () => {},
});

export function useTheme() {
	return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("dark");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const initial = stored ?? (prefersDark ? "dark" : "dark");
		setTheme(initial);
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;
		const root = document.documentElement;
		root.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme, mounted]);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	}, []);

	// Prevent flash — render children only after mount
	if (!mounted) {
		return (
			<div style={{ visibility: "hidden" }}>
				<ThemeContext.Provider value={{ theme: "dark", toggleTheme }}>
					{children}
				</ThemeContext.Provider>
			</div>
		);
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
