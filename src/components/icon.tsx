import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

export const iconVariants = cva("", { // (""): classes base (nenhuma, aqui).
  variants: {
    animate: { // objeto que define “eixos” de variação:
      false: "",
      true: "animate-spin",
    },
  },
  defaultVariants: {
    animate: false,
  },
})
// react.componentProps<"svg">: Puxa todas as props nativas de um <svg> HTML (width, height, fill, onClick, etc.).
interface IconProps extends React.ComponentProps<"svg">, VariantProps<typeof iconVariants> { // 
  svg: React.FC<React.ComponentProps<"svg">>; // Prop obrigatória svg que espera um componente React funcional capaz de receber props de <svg>.
}

export default function Icon({svg: SvgComponent, animate, className, ...props}: IconProps) {
  return <SvgComponent className={iconVariants({animate, className})} {...props}/>
}