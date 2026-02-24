"use client";

import { useCallback, useEffect, useRef } from "react";

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	opacity: number;
	baseOpacity: number;
	pulseSpeed: number;
	pulseOffset: number;
}

interface ThemeColors {
	core: string;
	glow: string;
	line: string;
	glowAccent: string;
}

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 140;
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 0.08;
const FRICTION = 0.97;
const BASE_SPEED = 0.3;

function getThemeColors(): ThemeColors {
	const style = getComputedStyle(document.documentElement);
	return {
		core:
			style.getPropertyValue("--particle-core").trim() || "255, 255, 255",
		glow:
			style.getPropertyValue("--particle-glow").trim() || "200, 210, 255",
		line:
			style.getPropertyValue("--particle-line").trim() || "180, 200, 255",
		glowAccent:
			style.getPropertyValue("--glow-accent").trim() || "100, 140, 255",
	};
}

export default function ParticleBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const mouseRef = useRef({ x: -9999, y: -9999 });
	const animationRef = useRef<number>(0);
	const timeRef = useRef(0);
	const dimensionsRef = useRef({ width: 0, height: 0 });
	const colorsRef = useRef<ThemeColors>({
		core: "255, 255, 255",
		glow: "200, 210, 255",
		line: "180, 200, 255",
		glowAccent: "100, 140, 255",
	});
	const isLightRef = useRef(false);

	const createParticles = useCallback((width: number, height: number) => {
		const particles: Particle[] = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const baseOpacity = Math.random() * 0.5 + 0.1;
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * BASE_SPEED,
				vy: (Math.random() - 0.5) * BASE_SPEED,
				radius: Math.random() * 1.8 + 0.5,
				opacity: baseOpacity,
				baseOpacity,
				pulseSpeed: Math.random() * 0.02 + 0.005,
				pulseOffset: Math.random() * Math.PI * 2,
			});
		}
		return particles;
	}, []);

	const animate = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const { width, height } = dimensionsRef.current;
		const particles = particlesRef.current;
		const mouse = mouseRef.current;
		const time = timeRef.current;
		const colors = colorsRef.current;
		const isLight = isLightRef.current;

		ctx.clearRect(0, 0, width, height);

		// Update and draw particles
		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];

			// Pulse opacity
			p.opacity =
				p.baseOpacity +
				Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.15;

			// Mouse repulsion (antigravity effect)
			const dx = p.x - mouse.x;
			const dy = p.y - mouse.y;
			const distSq = dx * dx + dy * dy;
			const dist = Math.sqrt(distSq);

			if (dist < MOUSE_RADIUS && dist > 0) {
				const force =
					((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_FORCE;
				const angle = Math.atan2(dy, dx);
				p.vx += Math.cos(angle) * force;
				p.vy += Math.sin(angle) * force;
			}

			// Apply friction
			p.vx *= FRICTION;
			p.vy *= FRICTION;

			// Add very subtle drift
			p.vx += Math.sin(time * 0.001 + p.pulseOffset) * 0.002;
			p.vy += Math.cos(time * 0.001 + p.pulseOffset * 0.7) * 0.002;

			// Update position
			p.x += p.vx;
			p.y += p.vy;

			// Wrap around edges with soft transition
			if (p.x < -20) p.x = width + 20;
			if (p.x > width + 20) p.x = -20;
			if (p.y < -20) p.y = height + 20;
			if (p.y > height + 20) p.y = -20;

			// Draw particle with glow
			const glowRadius = p.radius * 3;
			const gradient = ctx.createRadialGradient(
				p.x,
				p.y,
				0,
				p.x,
				p.y,
				glowRadius,
			);
			gradient.addColorStop(
				0,
				`rgba(${colors.core}, ${p.opacity * 0.8})`,
			);
			gradient.addColorStop(
				0.4,
				`rgba(${colors.glow}, ${p.opacity * 0.3})`,
			);
			gradient.addColorStop(1, `rgba(${colors.glow}, 0)`);

			ctx.beginPath();
			ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
			ctx.fillStyle = gradient;
			ctx.fill();

			// Core dot
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${colors.core}, ${p.opacity})`;
			ctx.fill();
		}

		// Draw connections
		ctx.lineWidth = 0.5;
		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const distSq = dx * dx + dy * dy;

				if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
					const dist = Math.sqrt(distSq);
					const opacity =
						(1 - dist / CONNECTION_DISTANCE) *
						(isLight ? 0.25 : 0.15) *
						Math.min(particles[i].opacity, particles[j].opacity);
					ctx.beginPath();
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.strokeStyle = `rgba(${colors.line}, ${opacity})`;
					ctx.stroke();
				}
			}
		}

		// Draw mouse glow
		if (mouse.x > 0 && mouse.y > 0) {
			const mouseGlow = ctx.createRadialGradient(
				mouse.x,
				mouse.y,
				0,
				mouse.x,
				mouse.y,
				MOUSE_RADIUS * 0.6,
			);
			mouseGlow.addColorStop(0, `rgba(${colors.glowAccent}, 0.03)`);
			mouseGlow.addColorStop(0.5, `rgba(${colors.glowAccent}, 0.01)`);
			mouseGlow.addColorStop(1, `rgba(${colors.glowAccent}, 0)`);

			ctx.beginPath();
			ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS * 0.6, 0, Math.PI * 2);
			ctx.fillStyle = mouseGlow;
			ctx.fill();
		}

		timeRef.current += 1;
		animationRef.current = requestAnimationFrame(animate);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const handleResize = () => {
			const dpr = window.devicePixelRatio || 1;
			const width = window.innerWidth;
			const height = window.innerHeight;

			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			const ctx = canvas.getContext("2d");
			if (ctx) ctx.scale(dpr, dpr);

			dimensionsRef.current = { width, height };

			if (particlesRef.current.length === 0) {
				particlesRef.current = createParticles(width, height);
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = {
				x: e.clientX,
				y: e.clientY,
			};
		};

		const handleMouseLeave = () => {
			mouseRef.current = { x: -9999, y: -9999 };
		};

		handleResize();

		// Watch for theme changes on <html data-theme>
		colorsRef.current = getThemeColors();
		isLightRef.current =
			document.documentElement.getAttribute("data-theme") === "light";
		const themeObserver = new MutationObserver(() => {
			colorsRef.current = getThemeColors();
			isLightRef.current =
				document.documentElement.getAttribute("data-theme") === "light";
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
			themeObserver.disconnect();
			cancelAnimationFrame(animationRef.current);
		};
	}, [animate, createParticles]);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed inset-0 z-0"
			style={{ opacity: 0.7 }}
		/>
	);
}
