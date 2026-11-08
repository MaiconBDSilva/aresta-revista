'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export const DEFAULT_COVER_IMAGE = '/images/default-cover.svg';

interface EditorialImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src?: string | null;
  fallbackSrc?: string;
}

/**
 * Componente de Imagem Editorial Seguro.
 * Caso a imagem falhe ao carregar (404, bloqueio de CORS ou rede) ou o src seja nulo,
 * reverte de forma elegante para a capa padrão oficial da revista (fundo carmim com pílula aresta.).
 */
export function EditorialImage({
  src,
  fallbackSrc = DEFAULT_COVER_IMAGE,
  alt,
  className,
  ...props
}: EditorialImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src?.trim() ? src : fallbackSrc);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Capa editorial Aresta Revista'}
      className={className}
      onError={handleError}
      unoptimized
    />
  );
}

