import React from 'react';
import { motion } from 'motion/react';
import { Target, Route, Database, Network, LineChart, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';

export default function MetodoPage() {
  React.useEffect(() => {
    document.title = "Método ORDEN | Dice Projects";
  }, []);

  const steps = [
    {
      id: "O",
      name: "Observar",
      icon: Target,
      desc: "Auditoría profunda de la infraestructura actual. Mapeamos cada proceso, cada sistema y cada punto de fricción donde la información se detiene.",
      impact: "Visibilidad total del estado operativo real."
    },
    {
      id: "R",
      name: "Reestructurar",
      icon: Route,
      desc: "No automatizamos el caos. Rediseñamos los flujos de trabajo para que sean lógicos, eficientes y escalables antes de introducir tecnología.",
      impact: "Eliminación de redundancias y procesos obsoletos."
    },
    {
      id: "D",
      name: "Diseñar Orquestación",
      icon: Database,
      desc: "Definimos la arquitectura de integración. Cómo hablarán tus sistemas entre sí para que el dato sea único y confiable en toda la organización.",
      impact: "Infraestructura de datos unificada y coherente."
    },
    {
      id: "E",
      name: "Ejecutar Automatización",
      icon: Network,
      desc: "Implementamos los nodos de automatización. El software empieza a trabajar para las personas, eliminando la carga manual repetitiva.",
      impact: "Liberación de tiempo para tareas de alto valor."
    },
    {
      id: "N",
      name: "Normalizar y Medir",
      icon: LineChart,
      desc: "Establecemos métricas de control y ROI operativo. Aseguramos que el nuevo orden se mantenga y evolucione con el negocio.",
      impact: "Control absoluto sobre el rendimiento operativo."
    }
  ];

  return (
    <div className="pb-32">
      <section className="py-24 bg-brand-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <Container className="relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-accent/20 text-brand-accent text-[11px] font-extrabold uppercase tracking-[0.3em] rounded-full">
              Framework de Escalabilidad
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              MÉTODO <span className="text-brand-accent italic font-serif font-normal">ORDEN</span>
            </h1>
            <p className="text-2xl text-white/60 leading-relaxed font-medium">
              Una estructura lógica y estratégica para transformar el desorden operativo en un motor de crecimiento predecible.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container>
          <div className="space-y-32">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
              >
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                  <span className="text-[12rem] font-serif italic text-brand-accent/10 leading-none select-none">{step.id}</span>
                </div>
                <div className="lg:col-span-5 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-accent flex items-center justify-center text-white rounded-2xl shadow-xl shadow-brand-accent/20">
                      <step.icon size={32} />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">{step.name}</h2>
                  </div>
                  <p className="text-xl text-brand-ink/70 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="bg-brand-bg p-12 rounded-[3rem] border border-brand-ink/5 space-y-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">Impacto Estratégico</h3>
                    <p className="text-2xl font-bold tracking-tight leading-tight">
                      {step.impact}
                    </p>
                    <div className="h-px bg-brand-ink/10 w-full" />
                    <p className="text-sm text-brand-ink/50">
                      Esta etapa es fundamental para asegurar que la tecnología sirva al negocio y no al revés.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-32 bg-brand-ink text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <SectionHeader 
              align="center"
              subtitle="Conclusión" 
              title="No es una tarea técnica, es una evolución estratégica." 
              light
            />
            <p className="text-xl text-white/50 leading-relaxed">
              El Método ORDEN permite que los líderes dejen de gestionar el día a día y empiecen a orquestar el futuro. Es la diferencia entre una empresa que sobrevive al crecimiento y una que lo domina.
            </p>
            <Link to="/contacto#diagnostico">
              <Button size="lg" className="px-12 py-6">
                Iniciar con un Diagnóstico <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
