"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
	() => import("@/components/ParticleBackground"),
	{ ssr: false },
);

const MouseGlow = dynamic(() => import("@/components/MouseGlow"), {
	ssr: false,
});

const GlowCardEffect = dynamic(() => import("@/components/GlowCardEffect"), {
	ssr: false,
});

const PaperTexture = dynamic(() => import("@/components/PaperTexture"), {
	ssr: false,
});

export default function ClientEffects() {
	return (
		<>
			<PaperTexture />
			<ParticleBackground />
			<MouseGlow />
			<GlowCardEffect />
		</>
	);
}
