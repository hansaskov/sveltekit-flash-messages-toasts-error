import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const message = { type: 'error', message: 'Message from /private', pathname: '/' } as const;	
	throw redirect(303, message.pathname, message, event);
};
