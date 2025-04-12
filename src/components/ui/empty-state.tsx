import { cn } from "@/utils";

function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("flex justify-center", className)} {...props} />;
}

function EmptyStateContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex w-full max-w-sm flex-col gap-2 text-center",
				"[&>svg]:text-muted [&>svg]:mx-auto [&>svg]:size-20 [&>svg]:stroke-1",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyStateTitle({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn("text-lg leading-none font-medium", className)}
			{...props}
		/>
	);
}

function EmptyStateDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return <p className={cn("text-muted text-sm", className)} {...props} />;
}

export {
	EmptyState,
	EmptyStateContent,
	EmptyStateDescription,
	EmptyStateTitle,
};
