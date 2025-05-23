import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

// 🎨 Define variantes de estilo para o container centralizado
export const containerVariants = cva(
  "mx-auto", // centraliza horizontalmente o container
  {
    variants: {
      // eixo de variação "size": controla largura máxima e padding lateral
      size: {
        md: "max-w-[31.5rem] px-2", // largura máxima de ~504px e padding horizontal de 0.5rem
      },
    },
    defaultVariants: {
      size: "md", // tamanho padrão do container
    },
  }
);

// 📦 Props do Container:
// - VariantProps<typeof containerVariants>: adiciona a prop opcional `size`
// - React.ComponentProps<"div">: aceita todas as props padrão de <div>
// - as?: permite usar outra tag HTML em vez de <div>
interface ContainerProps
  extends VariantProps<typeof containerVariants>,
    React.ComponentProps<"div"> {
  as?: keyof React.JSX.IntrinsicElements;
}

// 🏷️ Componente Container: envolve conteúdo em um elemento centralizado e responsivo
export default function Container({
  as = "div",      // tag HTML padrão
  className,       // classes extras que o usuário queira adicionar
  children,        // conteúdo interno do container
  ...props         // demais props de <div> (id, style, aria-*, etc.)
}: ContainerProps) {
  return React.createElement(
    as,
    {
      // combina as classes definidas em containerVariants + classes extras
      className: containerVariants({ size: "md", className }),
      ...props,
    },
    children
  );
}
