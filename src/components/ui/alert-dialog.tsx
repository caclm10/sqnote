import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

function AlertDialog(props: React.ComponentProps<typeof BaseAlertDialog.Root>) {
	return <BaseAlertDialog.Root {...props} />;
}

function AlertDialogTrigger(
	props: React.ComponentProps<typeof BaseAlertDialog.Trigger>,
) {
	return <BaseAlertDialog.Trigger {...props} />;
}

function AlertDialogPortal(
	props: React.ComponentProps<typeof BaseAlertDialog.Portal>,
) {
	return <BaseAlertDialog.Portal {...props} />;
}

function AlertDialogClose(
	props: React.ComponentProps<typeof BaseAlertDialog.Close>,
) {
	return <BaseAlertDialog.Close {...props} />;
}

function AlertDialogBackdrop({
	className,
	...props
}: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) {
	return (
		<BaseAlertDialog.Backdrop
			className={cn(
				"fixed inset-0 bg-black/50 transition-opacity",
				"data-starting-style:opacity-0",
				"data-ending-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogPopup({
	className,
	children,
	...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
	return (
		<AlertDialogPortal>
			<div className="fixed inset-0 z-99999 flex items-center justify-center">
				<AlertDialogBackdrop />
				<BaseAlertDialog.Popup
					className={cn(
						"bg-body rounded-default relative grid w-full max-w-[calc(100%-2rem)] gap-4 border p-6 shadow-lg transition-[opacity,scale] duration-200 sm:max-w-lg",
						"data-starting-style:scale-95 data-starting-style:opacity-0",
						"data-ending-style:scale-95 data-ending-style:opacity-0",
						className,
					)}
					{...props}
				>
					{children}

					<AlertDialogClose className="ring-offset-body focus:ring-input absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
						<XIcon />
						<span className="sr-only">Close</span>
					</AlertDialogClose>
				</BaseAlertDialog.Popup>
			</div>
		</AlertDialogPortal>
	);
}

function AlertDialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col gap-2 text-center sm:text-left",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) {
	return (
		<BaseAlertDialog.Title
			className={cn("text-lg leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
	return (
		<BaseAlertDialog.Description
			data-slot="dialog-description"
			className={cn("text-muted text-sm", className)}
			{...props}
		/>
	);
}

function AlertDialogCancel(
	props: React.ComponentProps<typeof AlertDialogClose>,
) {
	return (
		<AlertDialogClose
			render={<Button type="button" variant="outline" />}
			{...props}
		/>
	);
}

function AlertDialogAction({
	variant = "primary",
	...props
}: React.ComponentProps<typeof AlertDialogClose> & {
	variant?: "primary" | "error";
}) {
	return (
		<AlertDialogClose
			render={<Button type="button" variant={variant} />}
			{...props}
		/>
	);
}

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogBackdrop,
	AlertDialogCancel,
	AlertDialogClose,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPopup,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
