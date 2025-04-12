import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { useRef } from "react";

import { cn } from "@/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-default text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-input focus-visible:ring-input/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
	{
		variants: {
			size: {
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				md: "h-9 px-4 py-2 has-[>svg]:px-3",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},

			variant: {
				primary: "bg-primary text-on-primary hover:bg-primary/90",
				outline:
					"border border-on-body text-on-body hover:bg-on-body/6",
				ghost: "text-on-body hover:bg-on-body/6",
				error: "bg-error text-on-error hover:bg-error/90",
				"error-ghost":
					"text-error hover:bg-error/6 dark:hover:bg-error/20",
			},
		},

		defaultVariants: {
			size: "md",
			variant: "primary",
		},
	},
);

export interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

interface ButtonProps
	extends useRender.ComponentProps<"button">,
		ButtonVariants {}

function Button({
	variant,
	size,
	className,
	render = <button />,
	...props
}: ButtonProps) {
	const internalRef = useRef<HTMLElement | null>(null);

	const { renderElement } = useRender({
		render,
		props: mergeProps<"button">(
			{ className: cn(buttonVariants({ variant, size }), className) },
			props,
		),
		refs: [internalRef],
	});

	return renderElement();
}

export { Button };
