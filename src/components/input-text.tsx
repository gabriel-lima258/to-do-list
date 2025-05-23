import { cva, cx, type VariantProps } from "class-variance-authority";
import type React from "react";
import { textVariants } from "./text";

// 🎨 Define estilos dinâmicos para o <input> de texto usando CVA
export const inputTextVariants = cva(
  `
  border-b border-solid border-gray-200 focus:border-pink-base
  bg-transparent outline-none
  `,
  {
    variants: {
      // Eixo “size”: controla padding inferior e lateral
      size: {
        md: "pb-2 px-2",        // padding-bottom 0.5rem e padding-left/right 0.5rem
      },
      // Eixo “disabled”: controla se o input está desabilitado
      disabled: {
        true: "pointer-events-none", // bloqueia eventos de mouse quando desabilitado
      },
    },
    defaultVariants: {
      size: "md",         // tamanho padrão
      disabled: false,    // habilitado por padrão
    },
  }
);

// 🔧 Props do componente:
// - Omit<…, "size" | "disabled">: remove props nativas conflitantes de <input>
// - VariantProps<typeof inputTextVariants>: adiciona size? e disabled? às props
interface InputTextProps
  extends Omit<React.ComponentProps<"input">, "size" | "disabled">,
          VariantProps<typeof inputTextVariants> {}

// 🚀 Componente InputText: um <input> estilizado e flexível
export default function InputText({
  size,        // variante de padding vertical/horizontal
  disabled,    // flag para desabilitar interações
  className,   // classes extras vindas de quem usa o componente
  ...props     // demais props de <input> (type, value, onChange, placeholder, etc.)
}: InputTextProps) {
  return (
    <input
      // cx: combina múltiplas fontes de classe em uma única string
      className={cx(
        inputTextVariants({ size, disabled }), // classes do CVA para borda, foco e disabled
        textVariants(),                        // classes tipográficas reutilizadas de "./text"
        className                              // quaisquer classes adicionais passadas externamente
      )}
      {...props}
    />
  );
}
