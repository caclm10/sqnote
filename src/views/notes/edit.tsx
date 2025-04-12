import { ArrowLeftIcon, FolderOpenIcon } from "lucide-react";
import { Link, useParams } from "react-router";

import { AppHeader } from "@/components/app";
import {
	NoteContentInput,
	NoteDeleteButton,
	NoteTitleInput,
} from "@/components/note";
import { Button } from "@/components/ui/button";
import {
	EmptyState,
	EmptyStateContent,
	EmptyStateDescription,
	EmptyStateTitle,
} from "@/components/ui/empty-state";
import { useNote } from "@/hooks/use-notes";

function NotesEditView() {
	const { id } = useParams();
	const { note } = useNote(id || "0");

	return (
		<>
			<AppHeader>
				<Button
					variant="ghost"
					size="icon"
					render={<Link to="/notes" />}
				>
					<ArrowLeftIcon />
					<span className="sr-only">Back</span>
				</Button>

				{note && <NoteDeleteButton id={note.id} />}
			</AppHeader>

			{note === null && (
				<div className="flex grow items-center justify-center">
					<EmptyState>
						<EmptyStateContent>
							<FolderOpenIcon />

							<EmptyStateTitle>Note not found.</EmptyStateTitle>
							<EmptyStateDescription>
								Hmm… there’s nothing here. Maybe it was never
								saved?
							</EmptyStateDescription>
						</EmptyStateContent>
					</EmptyState>
				</div>
			)}

			{note && (
				<div className="container flex grow flex-col pb-6">
					<div className="bg-card flex grow flex-col gap-4 rounded-3xl border p-4 shadow-xs sm:px-16">
						<div className="border-b pb-2">
							<NoteTitleInput
								note={{ id: note.id, title: note.title }}
							/>
						</div>

						<div className="grow">
							<NoteContentInput
								note={{ id: note.id, content: note.content }}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export { NotesEditView };
