import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const tasks = await db
		.select()
		.from(task)
		.where(eq(task.userId, event.locals.user.id))
		.orderBy(desc(task.createdAt));

	return {
		user: event.locals.user,
		tasks
	};
};

export const actions: Actions = {
	create: async (event) => {
		if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		const formData = await event.request.formData();
		const title = formData.get('title')?.toString() ?? '';

		if (!title.trim()) return fail(400, { message: 'Title is required' });

		await db.insert(task).values({
			title: title.trim(),
			userId: event.locals.user.id
		});

		return { success: true };
	},

	toggle: async (event) => {
		if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		const formData = await event.request.formData();
		const id = Number(formData.get('id')?.toString());
		const completed = formData.get('completed') === 'true';

		await db
			.update(task)
			.set({ completed })
			.where(eq(task.id, id));

		return { success: true };
	},

	delete: async (event) => {
		if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		const formData = await event.request.formData();
		const id = Number(formData.get('id')?.toString());

		await db.delete(task).where(eq(task.id, id));

		return { success: true };
	},

	updateName: async (event) => {
		if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		const formData = await event.request.formData();
		const name = formData.get('name')?.toString() ?? '';

		if (!name.trim() || name.trim().length < 2) {
			return fail(400, { message: 'Name must be at least 2 characters' });
		}

		try {
			await auth.api.updateUser({
				body: { name: name.trim() },
				headers: event.request.headers
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message });
			}
			return fail(500, { message: 'Failed to update profile' });
		}

		return { success: true };
	},

	changePassword: async (event) => {
		if (!event.locals.user) return fail(401, { message: 'Unauthorized' });

		const formData = await event.request.formData();
		const currentPassword = formData.get('currentPassword')?.toString() ?? '';
		const newPassword = formData.get('newPassword')?.toString() ?? '';

		if (!currentPassword) {
			return fail(400, { message: 'Current password is required' });
		}

		if (!newPassword || newPassword.length < 8) {
			return fail(400, { message: 'New password must be at least 8 characters' });
		}

		try {
			await auth.api.changePassword({
				body: { currentPassword, newPassword },
				headers: event.request.headers
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message });
			}
			return fail(500, { message: 'Failed to change password' });
		}

		return { success: true };
	}
};
