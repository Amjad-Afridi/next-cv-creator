// app/page.tsx

import Link from "next/link";
import { ArrowRight, FileText, Download, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold text-xl">CV Builder</span>
          </div>
          <nav className="flex gap-6">
            <Link href="#features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="/templates" className="text-sm hover:text-primary">
              Templates
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            100% Free - No Hidden Costs
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Create Your Professional Resume in Minutes
          </h1>
          
          <p className="text-xl text-slate-600 mb-8">
            Build a stunning resume with our easy-to-use builder. Choose from professional templates and download as PDF - completely free!
          </p>
          
          <Link 
            href="/builder"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition"
          >
            Create My Resume
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <p className="text-sm text-slate-500 mt-4">
            No registration required to start • Free forever
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our CV Builder?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText />}
            title="Professional Templates"
            description="Choose from beautifully designed templates suitable for any industry"
            link="/templates"
          />
          <FeatureCard
            icon={<Download />}
            title="Instant PDF Download"
            description="Download your resume as a high-quality PDF with one click"
          />
          <FeatureCard
            icon={<Sparkles />}
            title="Easy to Use"
            description="Intuitive interface with real-time preview as you build"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
          <p className="text-slate-300 mb-8">Join thousands of professionals who created their resume with us</p>
          <Link 
            href="/builder"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>© 2025 CV Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string; link?: string }) {
  const content = (
    <>
      <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </>
  );

  if (link) {
    return (
      <Link href={link} className="bg-white p-6 rounded-lg border hover:shadow-lg transition block group">
        {content}
        <div className="mt-4 text-primary text-sm font-medium group-hover:underline">
          Browse Templates →
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border hover:shadow-lg transition">
      {content}
    </div>
  );
}