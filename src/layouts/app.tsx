import { Outlet } from "react-router";

function AppLayout() {
	return (
		<div className="flex h-dvh flex-col gap-10">
			<Outlet />
		</div>
	);
}

export { AppLayout };
