import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

// definindo variantes css com class-variance-authority
export const textVariants = cva("font-sans text-gray-400", {
  variants: { // variações disponiveis para serem escolhidas
    variant: {
      "body-sm-bold": "text-sm leading-5 font-semibold",
      "body-md": "text-base leading-6 font-normal",
      "body-md-bold": "text-base leading-6 font-semibold",
    }
  },
  defaultVariants: { // por padrão escolhe esta variação
    variant: 'body-md'
  }
})

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements; // Permite escolher qual tag HTML será renderizada.
  className?: string; // Permite adicionar classes CSS (normal em React).
  children: React.ReactNode; // Define o conteúdo interno do componente.
}

export default function Text({as = "span", variant, className, children, ...props}: TextProps) {
  return React.createElement(
    as, 
    {
      className: textVariants({variant, className}), // Adiciona as variantes e classes CSS anteriores.
      ...props
    },
    children
  )
}