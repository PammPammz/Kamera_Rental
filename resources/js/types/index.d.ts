import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

export interface Equipment {
    id: number;
    name: string;
    description?: string | null;
    stock: number;
    status: 'active' | 'inactive';
    slug?: string;
    category_id?: number | null;
    category?: Category | null;
    image?: string | null;
    price?: number | null;
    created_at?: string;
    updated_at?: string;
}
export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    first_page_url: string;
    last_page_url: string;
    path: string;
}

export type CartItem = {
    id: number;
    equipment_id: number;
    quantity: number;
    equipment: {
        id: number;
        name: string;
        category: Category;
        image: string;
        price: number;
    };
};

export interface OrderItem {
    id: number;
    equipment: Equipment;
    quantity: number;
    price: number;
    total: number;
}

export interface Order {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    purpose: string;
    notes?: string;
    delivery_method: 'pickup' | 'delivery';
    delivery_fee: number;
    rental_start: string; // ISO date
    rental_end: string; // ISO date
    status: 'pending' | 'approved' | 'cancelled';
    proof_image_url?: string;
    subtotal: number;
    total: number;
    created_at: string;
    updated_at: string;

    orderItems?: OrderItem[]; // optional, for when including items
}
