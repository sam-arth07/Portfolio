"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Code2, Github, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
	const [mounted, setMounted] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig = { damping: 25, stiffness: 200 };
	const x = useSpring(mouseX, springConfig);
	const y = useSpring(mouseY, springConfig);

	// Enhanced parallax effect
	const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
	const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

	useEffect(() => {
		setMounted(true);

		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef.current) return;

			const rect = containerRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const percentX = (e.clientX - centerX) / (rect.width / 2);
			const percentY = (e.clientY - centerY) / (rect.height / 2);

			mouseX.set(percentX * 1.5);
			mouseY.set(percentY * 1.5);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	if (!mounted) return null;

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000 bg-background">
			{/* Background Grid (Subtle) */}
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
					backgroundSize: "50px 50px",
				}}
			/>

			<motion.div
				style={{
					rotateX,
					rotateY,
					transformStyle: "preserve-3d",
				}}
				className="relative z-10 text-center px-4 max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-8">
					<span className="text-accent text-lg tracking-[0.2em] uppercase font-medium">
						Portfolio 2025
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					style={{ transform: "translateZ(80px)" }}
					className="text-8xl md:text-[10rem] leading-[0.8] font-heading text-foreground mb-8 tracking-wide">
					SAMARTH
					<br />
					<span className="text-surface-highlight text-stroke-white">
						CHAPLOT
					</span>
				</motion.h1>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					style={{ transform: "translateZ(50px)" }}
					className="flex flex-col items-center gap-6">
					<p className="text-xl md:text-2xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
						Full Stack Mobile Developer & Android Specialist
						crafting robust, scalable solutions.
					</p>

					<div className="flex gap-8 mt-8">
						<a
							href="https://github.com/sam-arth07"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted hover:text-accent transition-colors duration-300">
							<Github className="w-8 h-8" />
						</a>
						<a
							href="https://www.linkedin.com/in/samarth-chaplot-130b88256/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted hover:text-accent transition-colors duration-300">
							<Linkedin className="w-8 h-8" />
						</a>
						<a
							href="https://leetcode.com/u/samarthchaplot/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted hover:text-accent transition-colors duration-300">
							<Code2 className="w-8 h-8" />
						</a>
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1 }}
				className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
				<ChevronDown className="w-6 h-6 text-muted animate-bounce" />
			</motion.div>
		</section>
	);
}
