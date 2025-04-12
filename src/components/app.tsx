function AppHeader({ children }: React.PropsWithChildren) {
	return (
		<header className="bg-card border-b py-2 shadow-xs">
			<div className="container flex items-center justify-between">
				{children}
			</div>
		</header>
	);
}

export { AppHeader };
