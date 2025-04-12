import { nanoid } from "nanoid";

import type { NoteDTO } from "@/types/dto";
import { getDB } from "@/utils";

const storage = {
	all: async () => {
		const db = await getDB();
		return (await db.getAll("notes"))
			.filter((note) => note.deletedAt === null)
			.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
	},

	allDeleted: async () => {
		const db = await getDB();
		return (await db.getAll("notes")).filter(
			(note) => note.deletedAt !== null,
		);
	},

	find: async (id: NoteDTO["id"]) => {
		const db = await getDB();
		const result = await db.get("notes", id);

		if (result?.deletedAt) return null;

		return result ?? null;
	},

	create: async (values: Partial<Pick<NoteDTO, "title" | "content">>) => {
		const db = await getDB();

		const id = nanoid();
		return await db.add("notes", {
			id,
			title: values.title || null,
			content: values.content || null,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		});
	},

	update: async (id: NoteDTO["id"], values: Partial<NoteDTO>) => {
		const db = await getDB();
		const tx = db.transaction("notes", "readwrite");
		const store = tx.objectStore("notes");

		const existing = await store.get(id);
		if (!existing) {
			throw new Error("Note not found.");
		}

		const updated: NoteDTO = {
			...existing,
			...values,
			updatedAt: new Date(),
		};

		await store.put(updated);
		await tx.done;
	},

	delete: async (id: NoteDTO["id"]) => {
		const db = await getDB();
		const tx = db.transaction("notes", "readwrite");
		const store = tx.objectStore("notes");

		const existing = await store.get(id);
		if (!existing) {
			throw new Error("Note not found.");
		}

		const updated: NoteDTO = {
			...existing,
			updatedAt: new Date(),
			deletedAt: new Date(),
		};

		await store.put(updated);
		await tx.done;
	},

	deleteExpired: async () => {
		const db = await getDB();

		const tx = db.transaction("notes", "readwrite");
		const store = tx.objectStore("notes");

		const notes = (await db.getAll("notes")).filter(
			(note) => note.deletedAt !== null,
		);

		const now = new Date().getTime();
		for (const note of notes) {
			const time = now - note.deletedAt!.getTime();
			const days = time / (1000 * 60 * 60 * 24);

			if (days > 15) {
				await store.delete(note.id);
			}
		}

		await tx.done;
	},
};

export { storage as noteStorage };
