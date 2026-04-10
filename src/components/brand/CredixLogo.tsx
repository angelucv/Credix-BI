import React from 'react';
import { cn } from '@/lib/utils';

interface CredixLogoProps {
  className?: string;
  /** Color del sufijo BI (hex). Por defecto legible sobre fondo oscuro. */
  biFill?: string;
}

/**
 * Wordmark Credix + BI — gradiente magenta → violeta.
 * viewBox ~3.2:1 para alinear con el ancho del sidebar y usar todo el alto (evita logo “pequeño” con h-16).
 */
export function CredixLogo({ className, biFill = '#ddd6fe' }: CredixLogoProps) {
  const gid = React.useId().replace(/:/g, '');
  return (
    <svg
      className={cn('select-none block max-w-full', className)}
      viewBox="0 0 340 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Credix BI"
    >
      <defs>
        <linearGradient id={`credix-grad-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF007F" />
          <stop offset="45%" stopColor="#E91E8C" />
          <stop offset="100%" stopColor="#6A0DAD" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="68"
        fontSize="56"
        fontWeight="800"
        fontFamily="'Nunito', ui-rounded, 'Segoe UI', system-ui, sans-serif"
        letterSpacing="-0.04em"
        fill={`url(#credix-grad-${gid})`}
      >
        credix
      </text>
      <text
        x="218"
        y="68"
        fontSize="28"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.2em"
        fill={biFill}
      >
        BI
      </text>
    </svg>
  );
}
