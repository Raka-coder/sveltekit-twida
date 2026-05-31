import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { paraglideMiddleware } from '$paraglide/server';

const handleParaglide: Handle = async ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request: proxiedRequest }) => {
		event.request = proxiedRequest;
		return resolve(event);
	});
};

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

const handleSession: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleBetterAuth, handleSession);
