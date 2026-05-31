import type { Component } from 'svelte';

export interface SidebarGroupItem {
	title: string;
	url?: string;
	icon?: Component;
	isActive?: boolean;
}

export interface SidebarGroupType {
	label?: string;
	items: SidebarGroupItem[];
}
