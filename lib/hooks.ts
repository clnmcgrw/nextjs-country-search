import { useContext, useEffect } from 'react';
import { AppContext } from '@/components/provider';
import { AppProviderValues } from '@/types';

// use app context for any global data/state
export const useAppContext = (): AppProviderValues => useContext(AppContext);

// bind to keypress, pass the event.key value you want to check against
export const useKeyPress = (
	key: string,
	handler: (e: globalThis.KeyboardEvent) => void
) => {
	useEffect(() => {
		const onKeyPress = (e: globalThis.KeyboardEvent) => {
			if (e.key === key) {
				handler(e);
			}
		};
		document.addEventListener('keydown', onKeyPress);
		return () => {
			document.removeEventListener('keydown', onKeyPress);
		};
	}, [handler, key]);
};
