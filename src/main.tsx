import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/layouts/app";
import { NotesEditView } from "@/views/notes/edit";
import { NotesView } from "@/views/notes/index";

import "./assets/css/app.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route element={<AppLayout />}>
				<Route path="notes">
					<Route index element={<NotesView />} />
					<Route path=":id/edit" element={<NotesEditView />} />
				</Route>
			</Route>

			<Route path="*" element={<Navigate to="/notes" />} />
		</Routes>
	</BrowserRouter>,
);
