"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function About() {
	return (
		<section
			id="about"
			className="min-h-screen flex items-center justify-center py-32 px-6 md:px-12 lg:px-20">
			<div className="w-[80%] max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-12">
					<h2 className="text-5xl md:text-7xl font-heading text-foreground mb-6">
						About
					</h2>
					<div className="h-1 w-24 bg-surface-highlight" />
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="space-y-6">
						<p className="text-lg text-muted leading-relaxed">
							I'm a passionate{" "}
							<span className="text-foreground font-semibold">
								Full Stack Developer
							</span>{" "}
							and{" "}
							<span className="text-foreground font-semibold">
								Android Specialist
							</span>{" "}
							currently pursuing my B.Tech in Electronics and
							Communication Engineering at NIT Surat.
						</p>
						<p className="text-lg text-muted leading-relaxed">
							With experience in Kotlin Multiplatform, Android
							Development, and Web Technologies, I've contributed
							to open-source projects and built applications that
							serve hundreds of users.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="bento-card">
						<h2 className="font-heading text-3xl tracking-wider text-muted mb-8 block">
							Contact
						</h2>
						<div className="space-y-6">
							<div>
								<p className="text-sm font-heading tracking-wide text-muted mb-2">
									Email
								</p>
								<a
									href="mailto:samarthchaplot7@gmail.com"
									className="text-lg font-medium text-foreground hover:text-accent transition-colors">
									samarthchaplot7@gmail.com
								</a>
							</div>
							<div>
								<p className="text-sm font-heading tracking-wide text-muted mb-2">
									Phone
								</p>
								<a
									href="tel:+919078637346"
									className="text-lg font-medium text-foreground hover:text-accent transition-colors">
									+91-9078637346
								</a>
							</div>
							<div>
								<p className="text-sm font-heading tracking-wide text-muted mb-2">
									Location
								</p>
								<p className="text-lg font-medium text-foreground flex items-center gap-2">
									<MapPin className="w-4 h-4" />
									Surat, Gujarat
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
