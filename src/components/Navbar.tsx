"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
	{ name: "About", href: "#about" },
	{ name: "Experience", href: "#experience" },
	{ name: "Projects", href: "#projects" },
	{ name: "Skills", href: "#skills" },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-50% 0px -50% 0px",
				threshold: 0,
			}
		);

		const sections = document.querySelectorAll("section[id]");
		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, []);

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
			className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-auto`}>
			<div className="bento-card px-6 py-3">
				<div className="flex items-center gap-8">
					{/* Logo */}
					<motion.a
						href="#"
						whileHover={{ scale: 1.05 }}
						className="text-xl font-heading text-foreground">
						SC
					</motion.a>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6">
						{navItems.map((item) => {
							const isActive =
								activeSection === item.href.substring(1);
							return (
								<a
									key={item.name}
									href={item.href}
									className={`text-sm font-medium uppercase tracking-wider transition-colors relative ${
										isActive
											? "text-accent"
											: "text-muted hover:text-foreground"
									}`}>
									{item.name}
									{isActive && (
										<motion.div
											layoutId="activeSection"
											className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
											transition={{
												type: "spring",
												stiffness: 380,
												damping: 30,
											}}
										/>
									)}
								</a>
							);
						})}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden text-muted hover:text-foreground transition-colors">
						{isOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="md:hidden mt-4 pt-4 border-t border-border overflow-hidden">
							<div className="flex flex-col gap-3">
								{navItems.map((item) => {
									const isActive =
										activeSection ===
										item.href.substring(1);
									return (
										<a
											key={item.name}
											href={item.href}
											onClick={() => setIsOpen(false)}
											className={`text-sm font-medium uppercase tracking-wider transition-colors ${
												isActive
													? "text-accent"
													: "text-muted hover:text-foreground"
											}`}>
											{item.name}
										</a>
									);
								})}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
}
