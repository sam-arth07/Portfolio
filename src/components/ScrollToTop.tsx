"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			{/* Progress bar at top */}
			<motion.div
				className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
				style={{ scaleX }}
			/>

			{/* Scroll to top button */}
			<motion.button
				onClick={scrollToTop}
				className="fixed bottom-8 right-8 z-40 bg-accent text-background p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 group"
				initial={{ opacity: 0, scale: 0 }}
				animate={{
					opacity: isVisible ? 1 : 0,
					scale: isVisible ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					type: "spring",
					stiffness: 260,
					damping: 20,
				}}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				aria-label="Scroll to top">
				<ArrowUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform duration-200" />
			</motion.button>
		</>
	);
}
