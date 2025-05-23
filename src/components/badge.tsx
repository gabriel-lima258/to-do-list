import type React from "react";
import Text from "./text";
import { cva, cx, type VariantProps } from "class-variance-authority";
import Skeleton from "./skeleton";

// 👑 badgeVariants: define as classes base e as variantes de estilo para o container do badge
export const badgeVariants = cva(
	// classes base: inline-flex para alinhar itens, rounded-full para cantos arredondados
	"inline-flex items-center justify-center rounded-full",
	{
		variants: {
			// eixo de variação “variant”: muda o fundo
			variant: {
				none: "", // sem fundo
				primary: "bg-green-light", // fundo verde claro
				secondary: "bg-pink-light", // fundo rosa claro
			},
			// eixo de variação “size”: muda o padding
			size: {
				sm: "py-0.5 px-2", // padding vertical e horizontal reduzido
			},
		},
		defaultVariants: {
			variant: "primary", // valor padrão de variant
			size: "sm", // valor padrão de size
		},
	},
);

// 👑 badgeTextVariants: define as classes de texto internas do badge
export const badgeTextVariants = cva(
	"", // sem classes base adicionais
	{
		variants: {
			// eixo “variant” reutiliza a mesma chave para cor do texto
			variant: {
				none: "", // sem fundo
				primary: "text-green-dark", // texto verde escuro para variante primary
				secondary: "text-pink-dark", // texto rosa escuro para variante secondary
			},
		},
		defaultVariants: {
			variant: "primary", // default de color variant
		},
	},
);

export const badgeSkeletonVariants = cva("", {
	variants: {
		size: {
			sm: "w-6 h-6",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

// Props do componente Badge:
// - React.ComponentProps<"div">: aceita todas as props nativas de uma <div>
// - VariantProps<typeof badgeVariants>: extrai { variant?: "primary" | "secondary"; size?: "sm" }
interface BadgeProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof badgeVariants> {
	loading?: boolean; // prop opcional para indicar carregamento
}

// Componente Badge reutilizável
export default function Badge({
	variant, // determina qual esquema de cores usar
	size, // determina o padding (aqui só 'sm')
	className, // classes adicionais que o consumidor quiser passar
	children, // conteúdo interno (normalmente texto)
	loading, // prop opcional para indicar carregamento
	...props // demais props nativas de div (ex.: id, onClick, aria-*, etc.)
}: BadgeProps) {
	if (loading) {
		return (
			<Skeleton
				rounded={"full"}
				className={cx(
					badgeVariants({ variant: "none" }),
					badgeSkeletonVariants({ size }),
					className,
				)}
			/>
		);
	}

	return (
		<div
			// combina classes de badgeVariants e eventuais classes extras
			className={badgeVariants({ variant, size, className })}
			{...props}
		>
			<Text
				// usa um componente Text para estilizar o conteúdo do badge
				variant="body-sm-bold"
				// aplica as classes de cor de texto geradas por badgeTextVariants
				className={badgeTextVariants({ variant })}
			>
				{children}
			</Text>
		</div>
	);
}
