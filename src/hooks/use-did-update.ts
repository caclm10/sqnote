import {
	type DependencyList,
	type EffectCallback,
	useEffect,
	useRef,
} from "react";

function useDidUpdate(fn: EffectCallback, dependencies?: DependencyList) {
	const mounted = useRef(false);

	useEffect(
		() => () => {
			mounted.current = false;
		},
		[],
	);

	useEffect(() => {
		if (mounted.current) {
			return fn();
		}

		mounted.current = true;
		return undefined;
	}, dependencies);
}

export { useDidUpdate };
