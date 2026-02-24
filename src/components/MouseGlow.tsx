"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function MouseGlow() {
	const [mounted, setMounted] = useState(false);
	const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
	const { theme } = useTheme();

	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
	const smoothX = useSpring(cursorX, springConfig);
	const smoothY = useSpring(cursorY, springConfig);

	useEffect(() => {
		setMounted(true);

		const handleMouseMove = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const interactive = target.closest(
				"a, button, [role='button'], input, textarea, .bento-card, .interactive",
			);
			setIsHoveringInteractive(!!interactive);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseover", handleMouseOver);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseover", handleMouseOver);
		};
	}, [cursorX, cursorY]);

	if (!mounted) return null;

	const isDark = theme === "dark";
	const glowColor = isDark ? "100, 140, 255" : "161, 118, 57";
	const dotColor = isDark
		? "rgba(255, 255, 255, 0.6)"
		: "rgba(124, 45, 18, 0.7)";
	const dotHoverBg = isDark
		? `rgba(${glowColor}, 0.15)`
		: `rgba(${glowColor}, 0.12)`;

	return (
		<>
			{/* Large ambient glow */}
			<motion.div
				className={`pointer-events-none fixed z-50 ${isDark ? "mix-blend-screen" : "mix-blend-normal"}`}
				style={{
					left: smoothX,
					top: smoothY,
					x: "-50%",
					y: "-50%",
					width: isHoveringInteractive ? 400 : 300,
					height: isHoveringInteractive ? 400 : 300,
					background: isHoveringInteractive
						? `radial-gradient(circle, rgba(${glowColor}, ${isDark ? 0.08 : 0.06}) 0%, rgba(${glowColor}, ${isDark ? 0.03 : 0.02}) 40%, transparent 70%)`
						: `radial-gradient(circle, rgba(${glowColor}, ${isDark ? 0.05 : 0.04}) 0%, rgba(${glowColor}, ${isDark ? 0.02 : 0.01}) 40%, transparent 70%)`,
					transition:
						"width 0.4s ease, height 0.4s ease, background 0.4s ease",
				}}
			/>

			{/* Small dot cursor */}
			<motion.div
				className="pointer-events-none fixed z-50 rounded-full"
				style={{
					left: smoothX,
					top: smoothY,
					x: "-50%",
					y: "-50%",
					width: isHoveringInteractive ? 40 : 6,
					height: isHoveringInteractive ? 40 : 6,
					backgroundColor: isHoveringInteractive
						? dotHoverBg
						: dotColor,
					border: isHoveringInteractive
						? `1px solid rgba(${glowColor}, 0.3)`
						: "none",
					transition:
						"width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border 0.3s ease",
				}}
			/>
		</>
	);
}
