import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

export default function UserLayout({ children }: Readonly<MainLayoutProps>) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
