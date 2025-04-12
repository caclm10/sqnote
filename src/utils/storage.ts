import { openDB, type DBSchema } from "idb";

import type { NoteDTO } from "@/types/dto";

const DB_NAME = "notes-pwa";
const DB_VERSION = 1;

interface NotesPWADB extends DBSchema {
	notes: {
		key: string;
		value: NoteDTO;
		indexes: {
			deletedAt: string;
		};
	};
}

async function getDB() {
	return await openDB<NotesPWADB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			const store = db.createObjectStore("notes", {
				keyPath: "id",
			});

			store.createIndex("deletedAt", "deletedAt");
		},
	});
}

export { getDB };
