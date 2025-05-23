import type React from "react"; 
import Icon from "./icon"; 
import { cva, type VariantProps } from "class-variance-authority";

// 🎨 buttonIconVariants: define as classes base e variantes para o <button> que envolve o ícone
export const buttonIconVariants = cva(
  `
  inline-flex items-center justify-center 
  cursor-pointer transition group
  `, // classes base: inline-flex para centralizar, cursor-pointer para indicar clicável, transition para animações suaves, group para agrupar states
  {
    variants: {
      // variação de cor/fundo
      variant: {
        primary: "bg-green-base hover:bg-green-dark",
        secondary: "bg-gray-200 hover:bg-pink-base",
        tertiary: "bg-transparent hover:bg-gray-200",
      },
      // variação de tamanho/padding
      size: {
        sm: "w-6 h-6 p-1 rounded", // largura 1.5rem, altura 1.5rem, padding 0.25rem, bordas arredondadas
      },
      // estado desabilitado
      disabled: {
        true: "opacity-50 pointer-events-none", // meio transparente e não clicável
      },
    },
    defaultVariants: {
      variant: "primary", // cor padrão
      size: "sm",         // tamanho padrão
      disabled: false,    // habilitado por padrão
    },
  }
);

// 🖋️ buttonIconIconVariants: classes para o próprio <svg> do ícone dentro do botão
export const buttonIconIconVariants = cva("transition", {
  variants: {
    // cor de preenchimento do ícone
    variant: {
      primary: "fill-white",
      secondary: "fill-pink-base group-hover:fill-white", // muda ao passar o mouse no botão (group-hover)
      tertiary: "fill-gray-300 group-hover:fill-gray-400",
    },
    // tamanho do ícone
    size: {
      sm: "w-4 h-4", // largura/altura 1rem
    },
  },
  defaultVariants: {
    variant: "primary", // cor padrão do ícone
    size: "sm",         // tamanho padrão do ícone
  },
});

// 🧩 Tipagem das props do componente ButtonIcon:
// - Omit<..., "size"|"disabled"> remove props nativas que conflitam
// - VariantProps<typeof buttonIconVariants> adiciona variant?, size?, disabled?
// - icon: componente SVG a ser renderizado
interface ButtonIconProps
  extends Omit<
      React.ComponentProps<"button">, 
      "size" | "disabled"
    >,
    VariantProps<typeof buttonIconVariants> {
  icon: React.ComponentProps<typeof Icon>["svg"];
}

// 🚀 Componente ButtonIcon: um botão que exibe só um ícone SVG
export default function ButtonIcon({
  variant,    // define cor/fundo via buttonIconVariants
  size,       // define dimensões via buttonIconVariants
  disabled,   // aplica estilo disabled se true
  className,  // classes extras vindas de quem usa o componente
  icon,       // componente SVG que será renderizado
  ...props    // demais props nativas de <button> (onClick, aria-*, etc.)
}: ButtonIconProps) {
  return (
    <button
      // combina as classes geradas pelo CVA e classes extras
      className={buttonIconVariants({ variant, size, disabled, className })}
      {...props}
    >
      {/* Renderiza o SVG passado, com classes de transição e cor definidas */}
      <Icon
        svg={icon}
        className={buttonIconIconVariants({ variant, size })}
      />
    </button>
  );
}
