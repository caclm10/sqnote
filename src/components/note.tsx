import { FolderOpenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useId, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPopup,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Editor, type EditorType } from "@/components/ui/editor";
import {
	EmptyState,
	EmptyStateContent,
	EmptyStateDescription,
	EmptyStateTitle,
} from "@/components/ui/empty-state";
import { UnstyledTextarea } from "@/components/ui/textarea";
import { useDebounced } from "@/hooks/use-debounced";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useDidUpdate } from "@/hooks/use-did-update";
import { noteStorage } from "@/storages/note";
import type { NoteDTO } from "@/types/dto";

function NoteCreateButton() {
	const navigate = useNavigate();

	async function handleClick() {
		const id = await noteStorage.create({});

		navigate(`/notes/${id}/edit`);
	}
	return (
		<Button type="button" variant="ghost" size="icon" onClick={handleClick}>
			<PlusIcon />
			<span className="sr-only">New Note</span>
		</Button>
	);
}

function NoteList({ notes }: { notes: NoteDTO[] }) {
	return (
		<>
			{notes.length === 0 && (
				<EmptyState>
					<EmptyStateContent>
						<FolderOpenIcon />

						<EmptyStateTitle>Nothing to see here.</EmptyStateTitle>
						<EmptyStateDescription>
							Just a lonely, empty void. Tap (+) and give it some
							purpose in life.
						</EmptyStateDescription>
					</EmptyStateContent>
				</EmptyState>
			)}
			{notes.length > 0 && (
				<ul className="grid gap-5">
					{notes.map((note) => (
						<NoteListItem key={note.id} note={note} />
					))}
				</ul>
			)}
		</>
	);
}

function NoteListItem({ note }: { note: NoteDTO }) {
	return (
		<li className="bg-card rounded-default relative flex flex-col gap-2 border p-4 shadow-sm transition-all hover:scale-101">
			<h3
				className="data-untitled:text-muted text-xl font-medium data-untitled:italic"
				data-untitled={note.title ? undefined : ""}
			>
				{note.title || "Untitled"}
			</h3>

			<Link className="absolute inset-0" to={`/notes/${note.id}/edit`}>
				<span className="sr-only">Edit</span>
			</Link>
		</li>
	);
}

function NoteTitleInput({ note }: { note: Pick<NoteDTO, "id" | "title"> }) {
	const id = useId();
	const [value, setValue] = useState(note.title || "");
	const [debouncedValue] = useDebounced(value, 350);

	function handleKeydown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	}

	useDidUpdate(() => {
		if (debouncedValue !== undefined) {
			noteStorage.update(note.id, { title: debouncedValue });
		}
	}, [debouncedValue]);

	return (
		<UnstyledTextarea
			id={id}
			className="text-3xl font-semibold"
			placeholder="Title"
			value={value}
			onChange={(event) => setValue(event.target.value)}
			onKeyDown={handleKeydown}
		></UnstyledTextarea>
	);
}

function NoteContentInput({ note }: { note: Pick<NoteDTO, "id" | "content"> }) {
	const handleChange = useDebouncedCallback(async (editor: EditorType) => {
		const content = await editor.save();

		console.log(content);

		await noteStorage.update(note.id, { content: JSON.stringify(content) });
	}, 350);

	return (
		<Editor
			data={note.content ? JSON.parse(note.content) : undefined}
			onChange={handleChange}
		/>
	);
}

function NoteDeleteButton({ id }: { id: NoteDTO["id"] }) {
	const navigate = useNavigate();

	function handleClickAction() {
		noteStorage.delete(id);
		navigate("/notes");
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={<Button variant="error-ghost" size="icon" />}
			>
				<TrashIcon />
				<span className="sr-only">Delete</span>
			</AlertDialogTrigger>

			<AlertDialogPopup>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Note</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this note?
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="error"
						onClick={handleClickAction}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogPopup>
		</AlertDialog>
	);
}

export {
	NoteContentInput,
	NoteCreateButton,
	NoteDeleteButton,
	NoteList,
	NoteTitleInput,
};
