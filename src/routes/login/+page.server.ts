import { fail, redirect } from '@sveltejs/kit';
import * as m from '$paraglide/messages';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
	signInEmail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		const errors: { email?: string; password?: string } = {};

		if (!email) {
			errors.email = m.email_required();
		} else if (!emailRegex.test(email)) {
			errors.email = m.invalid_email();
		}

		if (!password) {
			errors.password = m.password_required();
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values: { email } });
		}

		try {
			await auth.api.signInEmail({
				body: { email, password, callbackURL: '/dashboard' }
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Signin failed' });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		return redirect(302, '/dashboard');
	},

	signInSocial: async (event) => {
		const formData = await event.request.formData();
		const provider = formData.get('provider')?.toString() ?? 'github';
		const callbackURL = formData.get('callbackURL')?.toString() ?? '/dashboard';

		const result = await auth.api.signInSocial({
			body: { provider: provider as 'github', callbackURL }
		});

		if (result.url) {
			return redirect(302, result.url);
		}
		return fail(400, { message: 'Social sign-in failed' });
	}
};
