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
	signUpEmail: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		const errors: { name?: string; email?: string; password?: string } = {};

		if (!name) {
			errors.name = m.name_required();
		} else if (name.length < 2) {
			errors.name = m.name_minlength();
		}

		if (!email) {
			errors.email = m.email_required();
		} else if (!emailRegex.test(email)) {
			errors.email = m.invalid_email();
		}

		if (!password) {
			errors.password = m.password_required();
		} else if (password.length < 8) {
			errors.password = m.password_minlength();
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values: { name, email } });
		}

		try {
			await auth.api.signUpEmail({
				body: { email, password, name, callbackURL: '/dashboard' }
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Registration failed' });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		return redirect(302, '/dashboard');
	}
};
