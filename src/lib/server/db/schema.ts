import { mysqlTable, bigint, int, text, varchar, boolean, timestamp } from 'drizzle-orm/mysql-core';

export const task = mysqlTable('task', {
	id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
	title: text('title').notNull(),
	completed: boolean('completed').notNull().default(false),
	priority: int('priority').notNull().default(1),
	userId: varchar('userId', { length: 36 }).notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow()
});

export * from './auth.schema';
