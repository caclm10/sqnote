import type EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";
import { useCallback, useEffect, useId, useRef } from "react";

export type EditorType = EditorJS;

interface EditorProps {
	data?: OutputData;
	onChange?: (editor: EditorJS) => void;
}

function Editor({ data, onChange }: EditorProps) {
	const id = useId();

	const ref = useRef<EditorJS | undefined>(undefined);

	const initEditor = useCallback(async () => {
		const EditorJS = (await import("@editorjs/editorjs")).default;

		const CodeTool = (await import("@editorjs/code")).default;
		const Header = (await import("@editorjs/header")).default;
		const List = (await import("@editorjs/list")).default;
		const Table = (await import("@editorjs/table")).default;
		const Quote = (await import("@editorjs/quote")).default;

		const editor = new EditorJS({
			holder: id,
			data,
			onReady: () => {
				ref.current = editor;
			},
			onChange: async () => {
				onChange?.(editor);
			},
			tools: {
				code: CodeTool,
				header: {
					class: Header as any,
					config: {
						levels: [1, 2, 3, 4],
						defaultLevel: 2,
					},
				},
				list: {
					class: List as any,
					inlineToolbar: true,
					config: {
						defaultStyle: "unordered",
					},
				},
				table: Table,
				quote: Quote,
			},
		});
	}, []);

	useEffect(() => {
		if (!ref.current) {
			initEditor();
		}

		return () => {
			ref.current?.destroy();
			ref.current = undefined;
		};
	}, []);

	return (
		<div
			className="prose prose-zinc dark:prose-invert max-w-full whitespace-pre-wrap"
			id={id}
		></div>
	);
}

export { Editor };
