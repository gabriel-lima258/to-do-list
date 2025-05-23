import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import Icon from "./icon";
import CheckIcon from "../assets/icons/check.svg?react";
import Skeleton from "./skeleton";

// 🌟 inputCheckboxWrapperVariants: classes base para o <label> que envolve o checkbox
// - inline-flex: para alinhar checkbox e ícone
// - relative: para posicionar o ícone absolutemente dentro
// - group: permite usar group-hover, peer, etc.
export const inputCheckboxWrapperVariants = cva(`
  inline-flex items-center justify-center relative group
`);

// 🎨 inputCheckboxVariants: estilos dinâmicos para o <input type="checkbox">
// - appearance-none: remove estilos nativos do browser
// - peer: marca o input para controlar o ícone via peer-checked
// - transições e bordas verdes com hover
export const inputCheckboxVariants = cva(
	`
  appearance-none peer flex items-center justify-center cursor-pointer
  transition overflow-hidden

  `,
	{
		variants: {
			variant: {
        none: "", // sem fundo
				default: `
        border-2 border-solid 
        border-green-base hover:border-green-dark hover:bg-green-dark/20
        checked:border-green-base checked:bg-green-base
        group-hover:checked:border-green-dark group-hover:checked:bg-green-dark
        `,
			},
			// tamanho do checkbox
			size: {
				md: "w-5 h-5 rounded-sm", // 1.25rem square, cantos levemente arredondados
			},
			// estado desabilitado
			disabled: {
				true: "pointer-events-none", // desabilita cliques
			},
		},
		defaultVariants: {
      variant: "default",
			size: "md",
			disabled: false,
		},
	},
);

// ✨ inputCheckboxIconVariants: posiciona e estiliza o ícone de check
// - absolute + top/left/translate: centraliza o ícone dentro do checkbox
// - hidden por padrão, mas peer-checked:block exibe quando marcado
export const inputCheckboxIconVariants = cva(
	`
  absolute top-1/2 left-1 -translate-y-1/2
  hidden peer-checked:block fill-white
  `,
	{
		variants: {
			size: {
				md: "w-3 h-3", // 0.75rem square para o ícone
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

// 📦 Props do InputCheckbox:
// - VariantProps<typeof inputCheckboxVariants>: extrai { size?, disabled? }
// - Omit<…>: remove props nativas de <input> que conflitam (size, disabled)
interface InputCheckboxProps
	extends VariantProps<typeof inputCheckboxVariants>,
		Omit<React.ComponentProps<"input">, "size" | "disabled"> {
	loading?: boolean; // flag para indicar carregamento
}

// 🚀 Componente InputCheckbox: renderiza um checkbox customizado
export default function InputCheckbox({
  variant,
	size, // controla largura, altura e border-radius
	disabled, // controla pointer-events
	className, // classes extras para o wrapper <label>
	loading,
	...props // demais props padrão de <input> (checked, onChange, id, etc.)
}: InputCheckboxProps) {
	if (loading) {
		return <Skeleton rounded={"sm"} className={inputCheckboxVariants({variant: "none", size})}/>;
	}

	return (
		// 👇 label wrapper para capturar o clique e posicionar o ícone
		<label className={inputCheckboxWrapperVariants({ className })}>
			{/* 👇 o próprio checkbox estilizado */}
			<input
				type="checkbox"
				className={inputCheckboxVariants({ variant, size, disabled })}
				{...props}
			/>
			{/* 👇 ícone de check, aparece só quando o input estiver marcado */}
			<Icon svg={CheckIcon} className={inputCheckboxIconVariants({ size })} />
		</label>
	);
}
