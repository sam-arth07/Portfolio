"use client";

import { motion } from "framer-motion";

const skillGroups = [
	{
		title: "Languages",
		skills: ["Kotlin", "JavaScript", "Python", "C/C++", "TypeScript"],
	},
	{
		title: "Frameworks & Libraries",
		skills: [
			"Android",
			"Jetpack Compose",
			"KMP",
			"Next.js",
			"Node.js",
			"Retrofit",
			"Ktor",
		],
	},
	{
		title: "Tools & Technologies",
		skills: [
			"Git",
			"Firebase",
			"Android Studio",
			"VS Code",
			"Postman",
			"Linux",
		],
	},
	{
		title: "Databases",
		skills: ["MongoDB", "SQLite", "MySQL", "RoomDB"],
	},
];

export default function Skills() {
	return (
		<section
			id="skills"
			className="min-h-screen flex items-center justify-center py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-background">
			<div className="max-w-[1600px] w-[80%]">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-8">
					<h2 className="text-6xl md:text-8xl font-heading text-foreground">
						Skills &
						<br />
						<span className="text-muted">Expertise</span>
					</h2>
					<p className="text-muted text-lg md:text-xl max-w-md text-right mt-6 md:mt-0">
						A comprehensive overview of my technical proficiency and
						academic background.
					</p>
				</motion.div>
				<div className="h-8 w-full" />
				{/* Skills Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					{skillGroups.map((group, index) => (
						<motion.div
							key={group.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="bento-card group">
							<h3 className="text-2xl font-heading text-foreground mb-6 tracking-wide group-hover:text-accent transition-colors">
								{group.title}
							</h3>
							<div className="flex flex-wrap gap-4">
								{group.skills.map((skill) => (
									<span
										key={skill}
										className="rounded-full text-md font-mono bg-surface-highlight/50 border border-border text-muted hover:text-foreground hover:border-muted transition-colors duration-300 cursor-pointer px-4 py-4">
										{skill}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>

				<div className="h-8 w-full" />

				{/* Education & Certifications */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Education - Takes 2 columns */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="lg:col-span-2 bento-card group flex flex-col justify-between">
						<div>
							<span className="text-xs font-mono text-muted uppercase tracking-wider block mb-6 border border-border px-2 py-1 rounded-full w-fit">
								Education
							</span>
							<h3 className="text-3xl md:text-4xl font-heading text-foreground mb-4 leading-tight group-hover:text-accent transition-colors">
								B.Tech in Electronics &<br />
								Communication Engineering
							</h3>
							<p className="text-xl text-muted font-light">
								National Institute of Technology, Surat
							</p>
						</div>

						<div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-border/50">
							<div>
								<p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
									CGPA
								</p>
								<p className="text-4xl font-heading text-foreground">
									8.73
								</p>
							</div>
							<div>
								<p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
									Duration
								</p>
								<p className="text-xl font-mono text-foreground">
									2022 - 2026
								</p>
							</div>
						</div>
					</motion.div>

					{/* Certifications - Takes 1 column */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="bento-card group">
						<span className="text-xs font-mono text-muted uppercase tracking-wider block mb-6 border border-border px-2 py-1 rounded-full w-fit">
							Certifications
						</span>
						<div className="space-y-8">
							<div className="group/item">
								<p className="text-lg text-foreground font-medium mb-1 group-hover/item:text-accent transition-colors">
									Python 3 Bootcamp
								</p>
								<p className="text-sm text-muted font-mono">
									Udemy • 2025
								</p>
							</div>
							<div className="group/item">
								<p className="text-lg text-foreground font-medium mb-1 group-hover/item:text-accent transition-colors">
									OOP & Design
								</p>
								<p className="text-sm text-muted font-mono">
									Udemy • 2025
								</p>
							</div>
							<div className="group/item">
								<p className="text-lg text-foreground font-medium mb-1 group-hover/item:text-accent transition-colors">
									Google Cloud Study Jams
								</p>
								<p className="text-sm text-muted font-mono">
									Google • 2023
								</p>
							</div>
						</div>
					</motion.div>
					<div className="h-48 w-full" />
				</div>
			</div>
		</section>
	);
}
