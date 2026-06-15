import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import { Container, Button } from '@/src/components/common';

export default function InsightArticlePage() {
  const { slug } = useParams();

  // Mock content for demonstration
  const article = {
    title: slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || "Insight Estratégico",
    date: "21 Feb 2026",
    category: "Estrategia",
    readTime: "6 min",
    content: `
      <p>El crecimiento es el objetivo de toda organización, pero sin la infraestructura adecuada, se convierte en el mayor riesgo operativo. Cuando una empresa escala más rápido que sus procesos, la eficiencia se desploma y el margen se erosiona.</p>
      
      <h3>La trampa de la escala</h3>
      <p>Muchas empresas intentan solucionar el desorden contratando más personas. Sin embargo, si el proceso está roto, más personas solo significan más ruido y más micro-coordinación necesaria.</p>
      
      <blockquote>"La orquestación digital no es una opción para la empresa que crece; es su sistema de supervivencia."</blockquote>
      
      <h3>El rol de la orquestación</h3>
      <p>Orquestar no es simplemente conectar herramientas. Es diseñar el flujo de valor para que la información viaje sola, los sistemas se sincronicen en tiempo real y el equipo humano pueda enfocarse en la toma de decisiones estratégicas, no en la entrada de datos.</p>
    `
  };

  return (
    <div className="pb-32">
      <Container className="py-12">
        <Link to="/insights" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-ink/40 hover:text-brand-accent transition-colors mb-12">
          <ArrowLeft size={14} /> Volver a Insights
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40">
              <span className="flex items-center gap-2"><Clock size={12} /> {article.readTime}</span>
              <span className="flex items-center gap-2 text-brand-accent"><Tag size={12} /> {article.category}</span>
              <span>{article.date}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {article.title}
            </h1>
          </div>

          <div className="aspect-video bg-brand-ink/5 rounded-[3rem] overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/${slug}/1200/800?grayscale`} 
              alt={article.title}
              className="w-full h-full object-cover opacity-60 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div 
                className="prose prose-xl prose-slate max-w-none font-medium text-brand-ink/80 leading-relaxed
                  prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-accent prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-2xl
                  prose-strong:text-brand-ink prose-a:text-brand-accent"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              <div className="mt-20 p-12 bg-brand-bg rounded-[3rem] border border-brand-ink/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black tracking-tighter uppercase">¿Te ha resultado útil?</h4>
                  <p className="text-sm font-medium text-brand-ink/60">Comparte este insight con tu equipo directivo.</p>
                </div>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-white border border-brand-ink/5 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-12">
              <div className="sticky top-32 space-y-12">
                <div className="p-10 bg-brand-ink text-white rounded-[3rem] space-y-8">
                  <h4 className="text-xl font-black tracking-tighter uppercase leading-none">Ordenamos tu crecimiento</h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Si este artículo resuena con los desafíos de tu empresa, es momento de actuar.
                  </p>
                  <Link to="/contacto#diagnostico" className="block">
                    <Button className="w-full py-5">Solicitar Diagnóstico</Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
