"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Code2, Github, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
	const [mounted, setMounted] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig = { damping: 25, stiffness: 200 };
	const x = useSpring(mouseX, springConfig);
	const y = useSpring(mouseY, springConfig);

	// Enhanced parallax effect
	const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
	const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

	// Floating layers for depth
	const floatX = useTransform(x, [-1, 1], [-20, 20]);
	const floatY = useTransform(y, [-1, 1], [-20, 20]);
	const floatX2 = useTransform(x, [-1, 1], [15, -15]);
	const floatY2 = useTransform(y, [-1, 1], [15, -15]);

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
			className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000 bg-transparent">
			{/* Radial gradient backdrop for depth */}
			<div
				className="absolute inset-0"
				style={{
					background: isDark
						? "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(30, 40, 80, 0.15) 0%, transparent 60%)"
						: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(161, 118, 57, 0.06) 0%, rgba(180, 130, 60, 0.03) 40%, transparent 70%)",
				}}
			/>

			{/* Background Grid (Subtle) */}
			<div
				className="absolute inset-0"
				style={{
					opacity: isDark ? 0.03 : 0.035,
					backgroundImage: isDark
						? "linear-gradient(rgba(100, 140, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 140, 255, 0.5) 1px, transparent 1px)"
						: "linear-gradient(rgba(161, 118, 57, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(161, 118, 57, 0.3) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			{/* Floating accent orbs */}
			<motion.div
				style={{ x: floatX, y: floatY }}
				className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${isDark ? "opacity-[0.04]" : "opacity-[0.10]"}`}
				animate={{
					scale: [1, 1.2, 1],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}>
				<div
					className={`w-full h-full rounded-full blur-3xl ${isDark ? "bg-linear-to-br from-blue-500/30 to-purple-500/20" : "bg-linear-to-br from-amber-500/30 to-orange-400/20"}`}
				/>
			</motion.div>

			<motion.div
				style={{ x: floatX2, y: floatY2 }}
				className={`absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full ${isDark ? "opacity-[0.03]" : "opacity-[0.08]"}`}
				animate={{
					scale: [1.2, 1, 1.2],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}>
				<div
					className={`w-full h-full rounded-full blur-3xl ${isDark ? "bg-linear-to-tr from-indigo-500/30 to-cyan-500/20" : "bg-linear-to-tr from-yellow-600/25 to-amber-400/15"}`}
				/>
			</motion.div>

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
					<span className="text-accent/80 text-lg tracking-[0.3em] uppercase font-medium inline-flex items-center gap-3">
						<span
							className={`w-8 h-px bg-linear-to-r from-transparent ${isDark ? "to-blue-400/50" : "to-amber-600/50"}`}
						/>
						Hajime Mashite, Orewa
						<span
							className={`w-8 h-px bg-linear-to-l from-transparent ${isDark ? "to-blue-400/50" : "to-amber-600/50"}`}
						/>
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					style={{ transform: "translateZ(80px)" }}
					className="text-8xl md:text-[10rem] leading-[0.8] font-heading text-foreground mb-8 tracking-wide glow-text">
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
						{[
							{
								href: "https://github.com/sam-arth07",
								Icon: Github,
								label: "GitHub",
							},
							{
								href: "https://www.linkedin.com/in/samarth-chaplot-130b88256/",
								Icon: Linkedin,
								label: "LinkedIn",
							},
							{
								href: "https://leetcode.com/u/samarthchaplot/",
								Icon: Code2,
								label: "LeetCode",
							},
						].map(({ href, Icon, label }) => (
							<motion.a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="relative text-muted hover:text-accent transition-colors duration-300 group"
								whileHover={{ scale: 1.2, y: -2 }}
								whileTap={{ scale: 0.95 }}>
								<Icon className="w-8 h-8 relative z-10" />
								<div
									className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 scale-[2.5] ${isDark ? "bg-blue-500/0 group-hover:bg-blue-500/10" : "bg-amber-600/0 group-hover:bg-amber-600/10"}`}
								/>
							</motion.a>
						))}
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1 }}
				className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}>
					<ChevronDown className="w-6 h-6 text-muted/50" />
				</motion.div>
			</motion.div>
		</section>
	);
}
