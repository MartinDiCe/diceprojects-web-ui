import React from 'react';
import { BRAND } from '../config/branding.config';

export default function BrandPage() {
  const colors = BRAND.colors as Record<string, string>;
  
  return (
    <div className="min-h-screen bg-[#EDEEF0] text-[#25292F] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-black/5 py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-4">Brand Identity System</h1>
          <p className="text-xl text-black/60 max-w-2xl">
            A systematized visual language for <span className="font-bold text-[#387EBC]">Dice Projects</span>. 
            Built for digital orchestration and enterprise-level technology.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-16 px-8 space-y-24">
        
        {/* Color Palette */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10" />
            <h2 className="text-xs font-bold uppercase tracking-widest opacity-50">01. Color Palette</h2>
            <div className="h-px flex-1 bg-black/10" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(colors).map(([name, value]) => (
              <div key={name} className="space-y-3">
                <div 
                  className="h-32 rounded-2xl shadow-sm border border-black/5" 
                  style={{ backgroundColor: value }}
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-50">{name}</p>
                  <p className="font-mono text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logo Versions */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10" />
            <h2 className="text-xs font-bold uppercase tracking-widest opacity-50">02. Logo Versions</h2>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Horizontal */}
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-black/5 space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">Main Horizontal (Lineal)</p>
              <div className="flex justify-center py-8">
                <img src="/assets/logos/dice-logo-lineal.svg" alt="Dice Projects Logo" className="h-16" />
              </div>
              <p className="text-sm text-black/60 leading-relaxed">
                Primary version for light backgrounds. Vector SVG format for maximum scalability and precision.
              </p>
            </div>

            {/* Negative Version */}
            <div className="bg-[#25292F] p-12 rounded-3xl shadow-sm space-y-6 text-white">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">Main Horizontal (Negative)</p>
              <div className="flex justify-center py-8">
                <img src="/assets/logos/dice-logo-negativo.svg" alt="Dice Projects Logo Negative" className="h-16" />
              </div>
              <p className="text-sm opacity-60 leading-relaxed">
                Optimized for dark backgrounds. Typography and isotype adjusted for maximum contrast in vector format.
              </p>
            </div>

            {/* Positive Version */}
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-black/5 space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">Main Horizontal (Positive)</p>
              <div className="flex justify-center py-8">
                <img src="/assets/logos/dice-logo-positivo.svg" alt="Dice Projects Logo Positive" className="h-16" />
              </div>
              <p className="text-sm text-black/60 leading-relaxed">
                Standard version for light backgrounds, ideal for institutional and high-resolution digital applications.
              </p>
            </div>

            {/* Isologo Only */}
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-black/5 space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">Isologo Only</p>
              <div className="flex justify-center py-8">
                <img src="/assets/logos/dice-isologo.svg" alt="Dice Isologo" className="h-24" />
              </div>
              <p className="text-sm text-black/60 leading-relaxed text-center">
                The standalone dice mark in vector format. Optimized for favicons, app icons, and social media profiles.
              </p>
            </div>
          </div>
        </section>

        {/* Spacing & Construction */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10" />
            <h2 className="text-xs font-bold uppercase tracking-widest opacity-50">03. Construction & Spacing</h2>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <div className="bg-white p-12 rounded-3xl shadow-sm border border-black/5 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Clear Space</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                To ensure visibility and impact, the logo should always be surrounded by a minimum area of clear space. 
                The minimum clear space is equal to the height of the "D" in the logo.
              </p>
              <div className="p-4 bg-[#EDEEF0] rounded-xl border border-dashed border-black/20 flex justify-center">
                <div className="relative p-8 bg-white border border-blue-500/20">
                  <img src="/assets/logos/dice-logo-lineal.svg" alt="Spacing Example" className="h-8" />
                  <div className="absolute inset-0 border border-dashed border-blue-500 opacity-30" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold">Typography Hierarchy</h3>
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold tracking-tight">DICE</span>
                  <span className="text-xs font-mono opacity-40">Cocogoose Regular / Bold</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-light tracking-[0.2em]">PROJECTS</span>
                  <span className="text-xs font-mono opacity-40">Cocogoose Light</span>
                </div>
              </div>
              <p className="text-sm text-black/60 leading-relaxed">
                The word "DICE" is the primary identifier and should always carry more visual weight than "PROJECTS". 
                "PROJECTS" uses a lighter weight and increased letter-spacing for a sophisticated, architectural feel.
              </p>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-[#25292F] text-white p-12 rounded-3xl space-y-8">
          <h2 className="text-3xl font-bold">Usage Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-emerald-400 font-bold">✓ Do</p>
              <ul className="text-sm opacity-70 space-y-1 list-disc list-inside">
                <li>Use the full-color version on light backgrounds</li>
                <li>Maintain minimum clear space</li>
                <li>Use the isotype for small sizes (under 32px)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-red-400 font-bold">✗ Don't</p>
              <ul className="text-sm opacity-70 space-y-1 list-disc list-inside">
                <li>Stretch or distort the logo</li>
                <li>Change the colors of the isotype</li>
                <li>Add shadows or gradients</li>
                <li>Use the full logo at very small sizes</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-blue-400 font-bold">ℹ Note</p>
              <p className="text-sm opacity-70">
                The isotype represents the "orchestration" of different parts into a cohesive whole, 
                symbolized by the faces of the dice coming together in an isometric perspective.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-black/5 text-center">
        <p className="text-xs font-bold uppercase tracking-widest opacity-30">
          &copy; {new Date().getFullYear()} Dice Projects Brand System
        </p>
      </footer>
    </div>
  );
}
