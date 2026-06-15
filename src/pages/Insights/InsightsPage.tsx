import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, SectionHeader, Button } from '@/src/components/common';

const insights = [
  {
    slug: "crecer-sin-perder-control",
    title: "Crecer sin perder el control: El arte de la orquestación digital.",
    excerpt: "Por qué la mayoría de las empresas fallan al escalar y cómo los procesos inteligentes pueden salvar tu rentabilidad.",
    date: "21 Feb 2026",
    category: "Estrategia",
    readTime: "6 min"
  },
  {
    slug: "excel-como-sintoma",
    title: "El Excel como síntoma: Cuando tu herramienta favorita frena tu negocio.",
    excerpt: "Si tu operación depende de hojas de cálculo compartidas, tienes una bomba de tiempo operativa. Descubre por qué.",
    date: "18 Feb 2026",
    category: "Eficiencia",
    readTime: "4 min"
  },
  {
    slug: "sistemas-que-no-hablan",
    title: "Sistemas que no hablan: El costo oculto de la desconexión digital.",
    excerpt: "La falta de integración entre tu CRM y tu ERP te está costando más de lo que crees en horas hombre y errores manuales.",
    date: "12 Feb 2026",
    category: "Integración",
    readTime: "8 min"
  },
  {
    slug: "costo-invisible-friccion",
    title: "El costo invisible de la fricción operativa en empresas en crecimiento.",
    excerpt: "Cómo identificar y eliminar los cuellos de botella que están devorando tu margen operativo sin que te des cuenta.",
    date: "05 Feb 2026",
    category: "ROI Operativo",
    readTime: "7 min"
  }
];

export default function InsightsPage() {
  React.useEffect(() => {
    document.title = "Insights & Perspectiva | Dice Projects";
  }, []);

  return (
    <div className="pb-32">
      <section className="py-24 bg-brand-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <Container className="relative z-10">
          <div className="max-w-4xl space-y-8">
            <SectionHeader 
              subtitle="Insights & Perspectiva" 
              title="Pensamiento estratégico para líderes operativos." 
              light
            />
            <p className="text-2xl text-white/60 leading-relaxed font-medium">
              Analizamos los desafíos de la escalabilidad, la integración y el futuro de la orquestación empresarial.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Main Feed */}
            <div className="lg:col-span-8 space-y-24">
              {insights.map((post, i) => (
                <motion.article 
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40">
                      <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                      <span className="flex items-center gap-2 text-brand-accent"><Tag size={12} /> {post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <Link to={`/insights/${post.slug}`} className="block space-y-4">
                      <h2 className="text-4xl md:text-5xl font-black tracking-tighter group-hover:text-brand-accent transition-colors leading-none">
                        {post.title}
                      </h2>
                      <p className="text-xl text-brand-ink/60 leading-relaxed max-w-2xl font-medium">
                        {post.excerpt}
                      </p>
                    </Link>
                    <Link to={`/insights/${post.slug}`} className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] group-hover:translate-x-3 transition-transform text-brand-accent">
                      Leer Insight Completo <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="mt-16 h-px bg-brand-ink/5 w-full" />
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-16">
              <div className="p-12 bg-brand-bg rounded-[3rem] border border-brand-ink/5 space-y-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-accent">Newsletter Estratégica</h3>
                <p className="text-sm font-medium text-brand-ink/60 leading-relaxed">
                  Recibe mensualmente nuestra perspectiva sobre orquestación y escalabilidad operativa.
                </p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="w-full bg-white border border-brand-ink/10 p-5 text-sm font-bold focus:outline-none focus:border-brand-accent transition-colors rounded-2xl"
                  />
                  <Button className="w-full py-5">Suscribirse</Button>
                </form>
              </div>

              <div className="space-y-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Temas Populares</h3>
                <div className="flex flex-wrap gap-3">
                  {["Estrategia", "Automatización", "Orquestación", "ROI Operativo", "Eficiencia", "Integración"].map(cat => (
                    <button key={cat} className="px-6 py-3 bg-white border border-brand-ink/5 text-[10px] font-bold uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-all rounded-full">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
