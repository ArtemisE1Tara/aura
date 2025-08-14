import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-light text-stone-900">Aura</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-light text-stone-900 tracking-tight">
              Project management<br />
              <span className="text-stone-600">that doesn&apos;t overwhelm</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Aura is a calm-tech project tracker designed specifically for solo creative professionals who value focus over features.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="min-w-[140px]">
                Start Creating
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="lg" className="min-w-[140px]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-200 mx-auto flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-stone-400"></div>
            </div>
            <h3 className="text-lg font-medium text-stone-900">Focus Dashboard</h3>
            <p className="text-stone-600">
              See only what matters today. One priority, next tasks, and a gentle view of the week ahead.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-200 mx-auto flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-stone-400"></div>
            </div>
            <h3 className="text-lg font-medium text-stone-900">Project Streams</h3>
            <p className="text-stone-600">
              Organize work into flowing streams. Simple, chronological, and beautifully minimal.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-200 mx-auto flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-stone-400"></div>
            </div>
            <h3 className="text-lg font-medium text-stone-900">Gentle Nudges</h3>
            <p className="text-stone-600">
              No loud notifications. Just calm, weekly insights to keep you oriented and in control.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-24 text-center space-y-6">
          <h3 className="text-2xl font-light text-stone-900">Built on Calm Technology</h3>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            We believe the best project management tool is the one you barely notice. 
            Aura works with your attention, not against it, providing just enough structure 
            to keep you focused on what matters most: your creative work.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-stone-600">
            <p>&copy; 2025 Aura. Designed for calm, focused productivity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
