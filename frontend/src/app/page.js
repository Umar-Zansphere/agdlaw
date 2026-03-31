import Image from "next/image";

export default function Home() {
	return (
		<main className="relative min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-yellow-100 flex items-center justify-center overflow-hidden">
			{/* Overlay for darkening background */}
			<div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/60 to-yellow-100/40 z-0" />
			<div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 py-16 gap-10">
				{/* Left: Text Content */}
				<div className="flex-1 max-w-xl">
					<div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full bg-green-200/60 text-green-900 font-medium text-sm shadow">
						<span className="inline-block w-2 h-2 bg-yellow-500 rounded-full" />
						Justice, Expertise, Results
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
						Your Trusted<br />Partner For Legal<br />Solutions
					</h1>
					<p className="text-lg text-green-100 mb-8">
						Expert legal guidance for your personal and business needs.<br />
						Let's build your strongest case together.
					</p>
					<div className="flex flex-wrap gap-4 mb-6">
						<button className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-6 py-3 rounded-full shadow transition flex items-center gap-2">
							Contact Now <span className="text-xl">→</span>
						</button>
						<button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full border border-white/30 shadow transition flex items-center gap-2">
							Free consultation <span className="text-xl">→</span>
						</button>
					</div>
					<div className="flex flex-wrap gap-3">
						<span className="bg-green-800/80 text-green-100 px-4 py-2 rounded-full text-sm font-medium">Corporate</span>
						<span className="bg-green-800/80 text-green-100 px-4 py-2 rounded-full text-sm font-medium">Litigation</span>
						<span className="bg-green-800/80 text-green-100 px-4 py-2 rounded-full text-sm font-medium">Employment</span>
						<span className="bg-green-700/70 text-green-50 px-4 py-2 rounded-full text-sm font-medium">+ More</span>
					</div>
				</div>
				{/* Right: Hero Image */}
				<div className="flex-1 flex items-end justify-center relative min-w-[320px] max-w-lg">
					<Image
						src="/hero_bg.png"
						alt="Lawyer Hero"
						width={500}
						height={600}
						className="rounded-3xl shadow-2xl object-cover object-bottom border-4 border-white/20 bg-green-900/30"
						priority
					/>
				</div>
			</div>
		</main>
	);
}
