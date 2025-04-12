import { noteStorage } from "@/storages/note";
import type { NoteDTO } from "@/types/dto";
import { useEffect, useState } from "react";

function useNotes() {
	const [notes, setNotes] = useState<NoteDTO[] | undefined>();

	useEffect(() => {
		noteStorage.all().then(setNotes);
	}, []);

	return { notes };
}

function useNote(id: NoteDTO["id"]) {
	const [note, setNote] = useState<NoteDTO | undefined | null>();

	useEffect(() => {
		noteStorage.find(id).then(setNote);
	}, [id]);

	return { note };
}

export { useNote, useNotes };
