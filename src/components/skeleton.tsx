import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

// 🎨 Define estilos base e variantes para o “skeleton loader”
export const skeletonVariants = cva(
  `
  animate-pulse            /* animação de pulso para indicar carregamento */
  bg-gray-200               /* fundo cinza claro */
  pointer-events-none       /* desativa interações do usuário */
  `,
  {
    variants: {
      // Eixo “rounded”: controla o grau de arredondamento dos cantos
      rounded: {
        sm: "rounded-sm",   // cantos levemente arredondados
        lg: "rounded-lg",   // cantos moderadamente arredondados
        full: "rounded-full", // círculo completo (totalmente arredondado)
      },
    },
    defaultVariants: {
      rounded: "lg",         // variante padrão: cantos “lg”
    },
  }
);

// 📦 Props do componente Skeleton:
// - React.ComponentProps<"div">: aceita todas as props nativas de <div>
// - VariantProps<typeof skeletonVariants>: adiciona `rounded?: "sm" | "lg" | "full"`
interface SkeletonProps
  extends React.ComponentProps<"div">,
          VariantProps<typeof skeletonVariants> {}

// 🚀 Componente Skeleton: elemento genérico que mostra um placeholder animado
export default function Skeleton({
  rounded,    // controla o arredondamento conforme variante
  className,  // classes CSS adicionais passadas pelo usuário
  ...props    // demais props de <div> (id, style, aria-*, etc.)
}: SkeletonProps) {
  return (
    <div
      // Combina classes de animação e arredondamento com eventuais classes extras
      className={skeletonVariants({ rounded, className })}
      {...props}
    />
  );
}
