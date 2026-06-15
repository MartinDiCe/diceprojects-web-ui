import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-accent selection:text-white">
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};
