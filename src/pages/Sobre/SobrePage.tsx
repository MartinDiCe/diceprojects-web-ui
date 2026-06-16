import React from 'react';
import { ArrowRight, Network, Puzzle, ShieldCheck, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, SectionHeader, buttonClassName } from '@/src/components/common';

export default function SobrePage() {
  React.useEffect(() => {
    document.title = "Sobre Dice Projects | Orquestación Digital";
  }, []);

  const verticals = [
    { name: 'Salud y turnos', desc: 'Flujos de pacientes, agenda, derivaciones y datos operativos sin duplicar carga.' },
    { name: 'Seguros', desc: 'Casos, documentación, estados, derivaciones y seguimiento entre canales.' },
    { name: 'ERP y backoffice', desc: 'Integración con sistemas de gestión existentes, APIs, bases y procesos internos.' },
    { name: 'Logística e inventario', desc: 'Stock, depósitos, movimientos, pedidos, entregas y trazabilidad operativa.' },
    { name: 'Arquitectura y servicios', desc: 'Proyectos, presupuestos, recursos, avances, desvíos y propuestas al cliente.' },
    { name: 'Administración contable', desc: 'Circuitos administrativos, comprobantes, reportes, conciliaciones e indicadores.' },
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
              Integramos sistemas, automatizamos procesos y construimos plataformas operativas para empresas que necesitan ordenar datos, equipos y decisiones.
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
                  No vendemos solamente pantallas. Diseñamos circuitos: cómo entra un dato, quién lo valida, qué sistema lo consume, qué alerta se dispara y qué decisión queda trazada.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-brand-ink text-white rounded-[3rem] space-y-6">
                  <Network className="text-brand-accent" size={40} />
                  <h3 className="text-xl font-black uppercase tracking-tighter">Integración transversal</h3>
                  <p className="text-sm text-white/50 leading-relaxed">Conectamos APIs, bases, archivos, ERPs, CRMs, sitios públicos y backoffices para que la información circule sin retrabajo.</p>
                </div>
                <div className="p-10 bg-brand-bg border border-brand-ink/5 rounded-[3rem] space-y-6">
                  <Workflow className="text-brand-accent" size={40} />
                  <h3 className="text-xl font-black uppercase tracking-tighter">Automatización aplicada</h3>
                  <p className="text-sm text-brand-ink/50 leading-relaxed">Priorizamos soluciones que reduzcan carga manual, errores, espera entre áreas y decisiones tomadas sin dato confiable.</p>
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
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">Servicio core</h3>
                      <p className="text-3xl font-black tracking-tighter uppercase leading-none">Integración y automatización</p>
                      <p className="text-sm font-bold uppercase tracking-widest text-white/60">Soluciones a medida con o sin nuestra plataforma modular</p>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="space-y-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40">Ámbitos donde podemos aportar</p>
                      <div className="flex flex-wrap gap-2">
                        {['Salud', 'Seguros', 'ERP', 'Logística', 'Arquitectura', 'Integraciones'].map(v => (
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
              subtitle="Soluciones transversales" 
              title="Integramos sistemas aunque el punto de partida no sea Dice Projects." 
              light
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Diagnóstico de sistemas', desc: 'Mapeamos fuentes, permisos, responsables, datos duplicados y puntos donde la operación se corta.' },
                { title: 'Integración y middleware', desc: 'Creamos conectores, normalización de datos, jobs, eventos y APIs para unir sistemas existentes.' },
                { title: 'Producto operativo', desc: 'Cuando conviene, montamos módulos Dice Projects para resolver el backoffice, el portal o la automatización completa.' },
              ].map((item, i) => (
                <div key={i} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                  <Puzzle className="mx-auto text-brand-accent" size={28} />
                  <h3 className="text-xl font-black uppercase tracking-tighter text-brand-accent">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container className="space-y-12">
          <div className="text-center">
            <ShieldCheck size={64} className="mx-auto text-brand-accent" />
            <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-black tracking-tighter md:text-6xl leading-none">
              CONSTRUYAMOS UNA OPERACIÓN MÁS INTEGRADA.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {verticals.map((vertical) => (
              <article key={vertical.name} className="rounded-2xl border border-brand-ink/10 bg-brand-bg p-6">
                <h3 className="text-base font-black uppercase tracking-tight text-brand-ink">{vertical.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/58">{vertical.desc}</p>
              </article>
            ))}
          </div>
          <Link to="/contacto#diagnostico" className={buttonClassName({ size: 'lg', className: 'px-12 py-6' })}>
            Conectar con Dice Projects <ArrowRight className="ml-2" />
          </Link>
        </Container>
      </section>
    </div>
  );
}
