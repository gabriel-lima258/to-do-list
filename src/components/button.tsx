import type React from "react";
import Icon from "./icon";
import { cva, type VariantProps } from "class-variance-authority";
import Text from "./text";

// 🎨 buttonVariants: define classes base e variantes para o container <button>
const buttonVariants = cva(
  `
  flex items-center justify-center cursor-pointer
  transition rounded-lg group gap-2
  `,
  {
    variants: {
      // eixo “variant”: muda a cor de fundo e o hover
      variant: {
        primary: "bg-gray-200 hover:bg-pink-light",
      },
      // eixo “size”: define altura e padding
      size: {
        md: "h-14 py-4 px-5",
      },
      // eixo “disabled”: aplica estilo quando o botão está desabilitado
      disabled: {
        true: "pointer-events-none opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",  // cor padrão
      size: "md",          // tamanho padrão
      disabled: false,     // habilitado por padrão
    },
  },
);

// 🖋️ buttonIconVariants: classes para o ícone dentro do botão
export const buttonIconVariants = cva("transition", {
  variants: {
    // reutiliza o eixo “variant” para cor do ícone
    variant: {
      primary: "fill-pink-light",
    },
    // eixo “size”: define largura e altura do ícone
    size: {
      md: "w-5 h-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// ✏️ buttonTextVariants: classes para o texto dentro do botão
export const buttonTextVariants = cva("", {
  variants: {
    variant: {
      primary: "text-gray-400",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

// 🧩 Props do componente Button
// - Omit<..., "size" | "disabled">: removemos as props nativas de button que colidem
// - VariantProps<typeof buttonVariants>: extrai { variant?, size?, disabled? }
// - icon?: tipo da SVG esperada pelo componente Icon
interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "size" | "disabled">,
          VariantProps<typeof buttonVariants> {
  icon?: React.ComponentProps<typeof Icon>["svg"];
}

// 🏷️ Componente Button reutilizável
export default function Button({
  variant,         // cor de fundo / hover
  size,            // dimensões do botão
  disabled,        // desabilita clique e reduz opacidade
  className,       // classes extras do usuário
  children,        // conteúdo textual
  icon: IconComponent, // componente SVG do ícone (opcional)
  ...props         // demais props nativas de <button> (onClick, type, aria-*, etc.)
}: ButtonProps) {
  return (
    <button
      // combina classes do CVA e quaisquer classes extras
      className={buttonVariants({ variant, size, disabled, className })}
      {...props}
    >
      {/* Se passou um ícone, renderiza-o com as classes definidas */}
      {IconComponent && (
        <Icon
          svg={IconComponent}
          className={buttonIconVariants({ variant, size })}
        />
      )}
      {/* Texto do botão com estilo tipográfico consistente */}
      <Text
        variant="body-md-bold"
        className={buttonTextVariants({ variant })}
      >
        {children}
      </Text>
    </button>
  );
}
