"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * GlowCardEffect - adds a mouse-tracking glow border effect to all .bento-card elements.
 * Tracks cursor position within each card and updates CSS custom properties for the radial gradient.
 */
export default function GlowCardEffect() {
	const rafRef = useRef<number>(0);
	const mouseRef = useRef({ x: 0, y: 0 });

	const updateCards = useCallback(() => {
		const cards = document.querySelectorAll<HTMLElement>(".bento-card");
		cards.forEach((card) => {
			const rect = card.getBoundingClientRect();
			const x = mouseRef.current.x - rect.left;
			const y = mouseRef.current.y - rect.top;
			card.style.setProperty("--glow-x", `${x}px`);
			card.style.setProperty("--glow-y", `${y}px`);
		});
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
			cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(updateCards);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(rafRef.current);
		};
	}, [updateCards]);

	return null;
}
