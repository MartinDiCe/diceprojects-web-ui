import React from 'react';
import { motion } from 'motion/react';
import { Container, SectionHeader } from '@/src/components/common';

interface LegalPageProps {
  title: string;
  updateDate: string;
  children: React.ReactNode;
}

export const LegalPageLayout = ({ title, updateDate, children }: LegalPageProps) => {
  React.useEffect(() => {
    document.title = `${title} | Dice Projects`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="pb-32 pt-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <SectionHeader 
            subtitle="Legal & Transparencia" 
            title={title} 
          />
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-12">
            <span>Última actualización: {updateDate}</span>
            <div className="w-1 h-1 bg-brand-accent rounded-full" />
            <span>Dice Projects</span>
          </div>
          
          <div className="prose prose-slate max-w-none 
            prose-headings:text-brand-ink prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
            prose-p:text-brand-ink/70 prose-p:leading-relaxed prose-p:font-medium
            prose-li:text-brand-ink/70 prose-li:font-medium
            prose-strong:text-brand-ink prose-strong:font-bold">
            {children}
          </div>

          <div className="mt-20 pt-12 border-t border-brand-ink/5">
            <p className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest">
              Contacto Legal: <a href="mailto:legal@diceprojects.com" className="text-brand-accent hover:underline">legal@diceprojects.com</a>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};
