import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/utils";

function UnstyledTextarea({
	className,
	...props
}: React.ComponentProps<typeof TextareaAutosize>) {
	return (
		<TextareaAutosize
			className={cn(
				"resize-none focus-visible:outline-hidden",
				className,
			)}
			{...props}
		/>
	);
}

export { UnstyledTextarea };
