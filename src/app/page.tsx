import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollToTop from "@/components/ScrollToTop";
import Skills from "@/components/Skills";

export default function Home() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main>
				<Hero />
				<About />
				<Experience />
				<Projects />

				{/* Spacer & Divider */}
				<div className="w-full px-6 md:px-12 lg:px-20">
					<div className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent opacity-20" />
				</div>

				<Skills />
			</main>
			<Footer />
			<ScrollToTop />
		</div>
	);
}
