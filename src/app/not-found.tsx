import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <span className="section-kicker">Erro 404</span>
      <h1 className="title-display text-5xl">
        Página não encontrada<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
      </h1>
      <p className="text-lead text-base max-w-lg mx-auto">
        O conteúdo que você procurava não existe, foi renomeado ou ainda não foi publicado na revista.
      </p>
      <div className="pt-4">
        <Link href="/" className="btn-accent">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Capa</span>
        </Link>
      </div>
    </div>
  );
}

