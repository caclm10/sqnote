import { AppHeader } from "@/components/app";
import { NoteCreateButton, NoteList } from "@/components/note";
import { useNotes } from "@/hooks/use-notes";
import { noteStorage } from "@/storages/note";
import { useEffect } from "react";

function NotesView() {
	const { notes } = useNotes();

	useEffect(() => {
		noteStorage.deleteExpired();
	}, []);

	return (
		<>
			<AppHeader>
				<span></span>

				<NoteCreateButton />
			</AppHeader>

			<div
				className="container data-empty:flex data-empty:grow data-empty:items-center data-empty:justify-center"
				data-empty={notes && notes.length === 0 ? "" : undefined}
			>
				{notes && <NoteList notes={notes} />}
			</div>
		</>
	);
}

export { NotesView };
