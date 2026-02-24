"use client";

import { useTheme } from "./ThemeProvider";

export default function PaperTexture() {
	const { theme } = useTheme();

	if (theme !== "light") return null;

	return (
		<>
			{/* SVG filter definition for paper grain noise */}
			<svg className="absolute w-0 h-0" aria-hidden="true">
				<defs>
					<filter id="paper-grain">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.65"
							numOctaves="6"
							stitchTiles="stitch"
							result="noise"
						/>
						<feDiffuseLighting
							in="noise"
							lightingColor="#f5f0e6"
							surfaceScale="1.5"
							result="diffLight">
							<feDistantLight azimuth="45" elevation="55" />
						</feDiffuseLighting>
						<feComposite
							in="diffLight"
							in2="SourceGraphic"
							operator="arithmetic"
							k1="1"
							k2="0"
							k3="0"
							k4="0"
						/>
					</filter>

					<filter id="paper-noise">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.9"
							numOctaves="4"
							seed="2"
							stitchTiles="stitch"
						/>
						<feColorMatrix type="saturate" values="0" />
					</filter>
				</defs>
			</svg>

			{/* Paper grain texture layer */}
			<div
				className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-400"
				style={{
					filter: "url(#paper-grain)",
					opacity: 0.035,
					mixBlendMode: "multiply",
				}}
			/>

			{/* Fine noise overlay for paper fiber feel */}
			<div
				className="pointer-events-none fixed inset-0 z-[1]"
				style={{
					filter: "url(#paper-noise)",
					opacity: 0.04,
					mixBlendMode: "multiply",
				}}
			/>

			{/* Subtle crumple shadows — radial gradient splotches */}
			<div
				className="pointer-events-none fixed inset-0 z-[1]"
				style={{
					opacity: 0.5,
					mixBlendMode: "multiply",
					background: `
						radial-gradient(ellipse 40% 30% at 15% 20%, rgba(180, 155, 110, 0.07) 0%, transparent 70%),
						radial-gradient(ellipse 35% 45% at 75% 60%, rgba(170, 145, 100, 0.06) 0%, transparent 70%),
						radial-gradient(ellipse 50% 25% at 50% 85%, rgba(175, 150, 105, 0.05) 0%, transparent 70%),
						radial-gradient(ellipse 30% 35% at 85% 15%, rgba(165, 140, 95, 0.06) 0%, transparent 65%),
						radial-gradient(ellipse 45% 40% at 25% 70%, rgba(175, 148, 100, 0.05) 0%, transparent 70%)
					`,
				}}
			/>

			{/* Aged edge darkening — vignette effect */}
			<div
				className="pointer-events-none fixed inset-0 z-[1]"
				style={{
					background: `radial-gradient(ellipse 75% 70% at 50% 50%, transparent 50%, rgba(140, 115, 75, 0.08) 100%)`,
				}}
			/>

			{/* Very subtle sepia color wash */}
			<div
				className="pointer-events-none fixed inset-0 z-[1]"
				style={{
					backgroundColor: "rgba(210, 180, 130, 0.03)",
					mixBlendMode: "color",
				}}
			/>
		</>
	);
}
