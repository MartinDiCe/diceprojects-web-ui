import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';

export default function SobrePage() {
  React.useEffect(() => {
    document.title = "Sobre Dice Projects | Orquestación Digital";
  }, []);

  const verticals = [
    { name: "Salud & HealthTech", desc: "Orquestación de flujos de pacientes y datos clínicos críticos." },
    { name: "Logística & Supply Chain", desc: "Sincronización de inventarios y trazabilidad automatizada." },
    { name: "ERPs & Sistemas Core", desc: "Integración profunda con infraestructuras empresariales complejas." }
  ];

  return (
    <div className="pb-32">
      <section className="py-24 bg-brand-bg border-b border-brand-ink/5">
        <Container>
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-accent/10 text-brand-accent text-[11px] font-extrabold uppercase tracking-[0.3em] rounded-full">
              Identidad Híbrida
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              DICE <span className="text-brand-accent italic font-serif font-normal">Projects</span>
            </h1>
            <p className="text-2xl text-brand-ink/60 leading-relaxed font-medium">
              Somos el puente entre la visión de negocio y la ejecución tecnológica. Un estudio boutique enfocado en la arquitectura de orquestación digital.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8">
                <SectionHeader subtitle="Nuestra Visión" title="La tecnología debe ser invisible. La estrategia debe ser evidente." />
                <p className="text-xl text-brand-ink/70 leading-relaxed font-medium">
                  Dice Projects nace para dar respuesta a empresas que ya tienen tecnología, pero no tienen orden. Entendemos que el software por sí solo no soluciona problemas de negocio; es la orquestación de esos sistemas lo que genera valor real.
                </p>
                <p className="text-xl text-brand-ink/70 leading-relaxed font-medium">
                  No nos presentamos como una fábrica de código. Nos presentamos como arquitectos que diseñan cómo tu empresa respira y se mueve digitalmente.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-brand-ink text-white rounded-[3rem] space-y-6">
                  <Award className="text-brand-accent" size={40} />
                  <h3 className="text-xl font-black uppercase tracking-tighter">Autoridad Operativa</h3>
                  <p className="text-sm text-white/50 leading-relaxed">Años orquestando ecosistemas digitales en sectores de alta complejidad y exigencia.</p>
                </div>
                <div className="p-10 bg-brand-bg border border-brand-ink/5 rounded-[3rem] space-y-6">
                  <Briefcase className="text-brand-accent" size={40} />
                  <h3 className="text-xl font-black uppercase tracking-tighter">Visión Ejecutiva</h3>
                  <p className="text-sm text-brand-ink/50 leading-relaxed">Entendemos el balance financiero, el ROI operativo y la necesidad de control del C-Level.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] bg-brand-ink rounded-[4rem] overflow-hidden shadow-2xl">
                 <img 
                   src="https://picsum.photos/seed/dice-vision/800/1000?grayscale" 
                   alt="Dice Projects Vision" 
                   className="w-full h-full object-cover opacity-40 mix-blend-multiply"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 p-12 flex flex-col justify-end text-white space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">Fundado por</h3>
                      <p className="text-3xl font-black tracking-tighter uppercase leading-none">Martin Díaz</p>
                      <p className="text-sm font-bold uppercase tracking-widest text-white/60">Arquitecto de Orquestación Digital</p>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="space-y-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40">Verticales de Experiencia</p>
                      <div className="flex flex-wrap gap-2">
                        {["Salud", "Logística", "ERP", "Middleware", "Integraciones"].map(v => (
                          <span key={v} className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32 bg-brand-ink text-white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            <SectionHeader 
              align="center"
              subtitle="Por qué Dice" 
              title="Diseño deliberado frente al azar operativo." 
              light
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "No somos CVs", desc: "Somos resultados medibles. No listamos habilidades, demostramos impacto en tu margen operativo." },
                { title: "Marca Híbrida", desc: "Hablamos el lenguaje del CEO y el del CTO. Traducimos visión en automatización real." },
                { title: "Contexto Real", desc: "Entendemos las particularidades de sectores complejos. No aplicamos recetas genéricas." }
              ].map((item, i) => (
                <div key={i} className="space-y-4 text-center">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-brand-accent">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container className="text-center space-y-12">
          <ShieldCheck size={64} className="mx-auto text-brand-accent" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter max-w-3xl mx-auto leading-none">
            CONSTRUYAMOS TU AUTORIDAD OPERATIVA.
          </h2>
          <Link to="/contacto">
            <Button size="lg" className="px-12 py-6">
              Conectar con Dice Projects <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
