'use client';

import React, { useState, useEffect } from 'react';
import { EditorialNavbarBar } from './HeaderPortal';

export function HeaderFrostedGlass() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const brandEl = document.getElementById('header-portal-brand');
      if (brandEl) {
        const rect = brandEl.getBoundingClientRect();
        // Assim que a área da logo grande sai pelo topo da viewport, o menu flutuante assume na posição exata
        setVisivel(rect.bottom <= 0);
      } else {
        setVisivel(window.scrollY > 110);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`header-editorial-frosted bg-white/30 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 shadow-lg ${
        visivel ? '' : 'is-hidden'
      }`}
    >
      <EditorialNavbarBar ariaLabel="Menu Flutuante Principal" />
    </header>
  );
}
