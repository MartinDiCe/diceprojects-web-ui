import React from 'react';
import { motion } from 'motion/react';
import { Container, SectionHeader } from '@/src/components/common';
import { LegalLinks } from '@/src/components/legal/LegalLinks';

export default function LegalHubPage() {
  React.useEffect(() => {
    document.title = "Legal & Transparencia | Dice Projects";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-32 pt-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <SectionHeader 
            subtitle="Centro de Confianza" 
            title="Legal & Transparencia" 
          />
          <p className="text-2xl text-brand-ink/60 leading-relaxed font-medium mb-16">
            En Dice Projects, la transparencia y la seguridad de la información son pilares fundamentales de nuestra orquestación digital. Aquí encontrarás todos nuestros marcos legales y políticas.
          </p>
          
          <div className="bg-brand-bg rounded-[3rem] p-12 md:p-16 border border-brand-ink/5">
            <LegalLinks variant="page" showTitle={false} />
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-brand-ink text-white rounded-[3rem] space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tighter">Seguridad de Datos</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Utilizamos estándares de cifrado y protocolos de seguridad de nivel empresarial para todas nuestras integraciones.
              </p>
            </div>
            <div className="p-10 bg-brand-accent/5 border border-brand-accent/10 rounded-[3rem] space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tighter text-brand-ink">Confidencialidad</h3>
              <p className="text-sm text-brand-ink/60 leading-relaxed">
                Cada diagnóstico y proyecto está protegido por acuerdos de confidencialidad estrictos.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
