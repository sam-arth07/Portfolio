"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

const links = [
	{
		title: "GitHub",
		description: "Open source contributions and personal projects",
		href: "https://github.com/sam-arth07",
		icon: Github,
	},
	{
		title: "LinkedIn",
		description: "Professional profile and work experience",
		href: "https://www.linkedin.com/in/samarth-chaplot-130b88256/",
		icon: Linkedin,
	},
	{
		title: "LeetCode",
		description: "Coding challenges and problem solving",
		href: "https://leetcode.com/u/samarthchaplot/",
		icon: Code2,
	},
	{
		title: "Email",
		description: "Get in touch for opportunities",
		href: "mailto:samarthchaplot7@gmail.com",
		icon: Mail,
	},
];

export default function Footer() {
	return (
		<footer className="flex justify-center items-center min-h-screen py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-background border-t border-border">
			<div className="w-[80%] max-w-[1600px]">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8">
					<h2 className="text-6xl md:text-8xl font-heading text-foreground">
						Let's
						<br />
						<span className="text-muted">Connect</span>
					</h2>
					<p className="text-muted text-lg md:text-xl max-w-md text-right mt-6 md:mt-0">
						Have a project in mind? Let's build something
						extraordinary together.
					</p>
				</motion.div>

				<div className="h-12 w-full" />
				{/* Links Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
					{links.map((link, index) => {
						const Icon = link.icon;
						return (
							<motion.a
								key={link.title}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="bento-card group flex flex-col justify-between min-h-[200px]">
								<div className="flex items-center justify-between mb-6">
									<Icon className="w-8 h-8 text-muted group-hover:text-accent transition-colors" />
									<ExternalLink className="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
								</div>

								<div>
									<h3 className="text-2xl font-heading text-foreground mb-2 group-hover:text-accent transition-colors">
										{link.title}
									</h3>

									<p className="text-sm text-muted leading-relaxed">
										{link.description}
									</p>
								</div>
							</motion.a>
						);
					})}
				</div>

				<div className="h-12 w-full" />
				{/* Bottom Bar */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="mt-12 border-t-2 border-border">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-muted font-mono">
							© {new Date().getFullYear()} Samarth Chaplot. All
							rights reserved.
						</p>
						<p className="text-sm text-muted font-mono">
							Designed & Built with ❤️
						</p>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
