import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

// 🎨 cardVariants: define as classes base e variantes para o container do Card
export const cardVariants = cva(
  `
  rounded-lg              /* bordas arredondadas grandes */
  border border-solid      /* borda sólida */
  border-gray-200          /* cor da borda cinza clara */
  bg-white                 /* fundo branco */
  shadow-sm                /* sombra suave */
  `,
  {
    variants: {
      // eixo de variação "size": controla o padding interno
      size: {
        none: "",          // sem padding
        md: "p-5",         // padding de 1.25rem em todo lado
      },
    },
    defaultVariants: {
      size: "none",        // tamanho padrão sem padding
    },
  }
);

// 📦 CardProps: tipagem das props do Card
// - React.ComponentProps<"div">: aceita todas as props nativas de <div>
// - VariantProps<typeof cardVariants>: adiciona { size?: "none" | "md" }
// - as?: permite trocar a tag HTML (div, section, article, etc.)
interface CardProps
  extends React.ComponentProps<"div">,
          VariantProps<typeof cardVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

// 🏷️ Componente Card reutilizável
export default function Card({
  as = "div",                // tag padrão: <div>
  size,                      // variante de padding
  className,                 // classes extras passadas pelo consumidor
  children,                  // conteúdo interno do Card
  ...props                   // demais props de <div> (id, onClick, aria-*, etc.)
}: CardProps) {
  // React.createElement permite criar dinamicamente a tag definida em `as`
  return React.createElement(
    as,
    {
      className: cardVariants({ size, className }), // combina classes CVA + extras
      ...props,                                     // espalha outras props
    },
    children                                       // insere o conteúdo interno
  );
}
