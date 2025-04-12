export interface NoteDTO {
	id: string;
	title: string | null;
	content: string | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
