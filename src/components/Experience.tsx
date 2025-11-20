"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const experiences = [
	{
		role: "Development Lead",
		organization: "National Service Scheme, NIT Surat",
		period: "Mar. 2024 - May 2025",
		type: "Position of Responsibility",
		description:
			"Led development initiatives and coordinated technical projects for the NSS chapter.",
	},
	{
		role: "Summer Intern (Remote)",
		organization: "Mifos Initiative",
		period: "Jan. 2025 - Nov. 2025",
		type: "Open Source",
		description:
			"Contributed to open-source financial inclusion software. Implemented end-to-end client address functionality and optimized UI workflows.",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
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

export default function Experience() {
	return (
		<section
			id="experience"
			className="min-h-screen flex items-center justify-center py-32 px-6 md:px-12 lg:px-20 bg-background">
			<div className="w-full max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-8">
					<h2 className="text-6xl md:text-8xl font-heading text-foreground">
						Experience
					</h2>
				</motion.div>

				<div className="h-8 w-full" />
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{experiences.map((exp, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className="bento-card group">
							<div className="flex justify-between items-start mb-6">
								<span className="font-mono text-xs text-muted border border-border px-3 py-1 rounded-full">
									{exp.type}
								</span>
								<span className="flex items-center gap-2 text-xs text-muted font-mono">
									<Calendar className="w-3 h-3" />
									{exp.period}
								</span>
							</div>

							<h3 className="text-3xl font-heading text-foreground mb-3 group-hover:text-accent transition-colors">
								{exp.role}
							</h3>

							<p className="text-lg text-muted mb-4 font-medium">
								{exp.organization}
							</p>

							<p className="text-muted/80 leading-relaxed">
								{exp.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
