import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';

const message = { type: 'error', message: 'Message from /private' } as const;

export const load: PageServerLoad = async (event) => {
	throw redirect(303, '/', message, event);
};
