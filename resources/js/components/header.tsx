import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <Camera className="h-6 w-6" />
                    <span>CameraRent</span>
                </div>
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="font-medium">
                        Home
                    </Link>
                    <Link href="#" className="text-muted-foreground font-medium">
                        Camera Equipments
                    </Link>
                    <Link href="#" className="text-muted-foreground font-medium">
                        How It Works
                    </Link>
                    <Link href="#" className="text-muted-foreground font-medium">
                        Contact
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => Inertia.visit('/login')}>
                        Sign In
                    </Button>
                    <Button size="sm" onClick={() => Inertia.visit('/register')}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </header>
    );
}
