export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
}

export interface InertiaPageProps {
    auth: {
        user: User | null;
    };
    cartCount: number;
    [key: string]: unknown;
}
