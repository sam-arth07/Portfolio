"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
	{
		title: "AnimeWiki",
		description:
			"Full-stack MVVM architecture app with Retrofit, RoomDB, and Koin.",
		tech: ["Kotlin", "Retrofit", "RoomDB"],
		year: "2025",
		size: "col-span-1 md:col-span-2",
		link: "https://github.com/sam-arth07/AnimeWiki",
	},
	{
		title: "Currency Converter",
		description: "Real-time exchange rate tool with 99.9% accuracy.",
		tech: ["Kotlin", "KMP", "REST API"],
		year: "2025",
		size: "col-span-1",
		link: "https://github.com/sam-arth07/CurrencyApp",
	},
	{
		title: "Nss Meet",
		description: "Event scheduling platform for 100+ volunteers.",
		tech: ["Jetpack Compose", "Firebase"],
		year: "2025",
		size: "col-span-1",
		link: "https://github.com/sam-arth07",
	},
	{
		title: "Mifos Initiative",
		description: "Client management system with offline capabilities.",
		tech: ["Android", "Open Source"],
		year: "2025",
		size: "col-span-1 md:col-span-2",
		link: "https://github.com/sam-arth07/android-client",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function Projects() {
	return (
		<section
			id="projects"
			className="min-h-screen flex items-center justify-center py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-background">
			<div className="w-[80%] max-w-[1600px]">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-8">
					<h2 className="text-6xl md:text-8xl font-heading text-foreground">
						Selected
						<br />
						<span className="text-muted">Works</span>
					</h2>
					<p className="text-muted text-lg md:text-xl max-w-md text-right mt-6 md:mt-0">
						A collection of digital experiences crafted with
						precision and passion.
					</p>
				</motion.div>

				<div className="h-8 w-full" />
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{projects.map((project) => (
						<motion.a
							key={project.title}
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							variants={itemVariants}
							className={`bento-card group flex flex-col justify-between min-h-[300px] ${project.size} cursor-pointer`}>
							<div className="flex justify-between items-start">
								<span className="font-mono text-sm text-muted border border-border px-4 py-2 rounded-full">
									{project.year}
								</span>
								<ArrowUpRight className="w-6 h-6 text-muted group-hover:text-accent transition-colors" />
							</div>

							<div>
								<h3 className="text-3xl font-heading text-foreground mb-2 group-hover:text-accent transition-colors">
									{project.title}
								</h3>
								<p className="text-muted mb-6 line-clamp-2">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2">
									{project.tech.map((tech) => (
										<span
											key={tech}
											className="text-xs font-mono text-muted/80">
											#{tech}
										</span>
									))}
								</div>
							</div>
						</motion.a>
					))}
				</motion.div>
				<div className="h-48 w-full" />
			</div>
		</section>
	);
}
