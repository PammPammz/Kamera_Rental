import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type InertiaPageProps } from '@/types/inertia';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import { Camera, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
    const { props } = usePage<InertiaPageProps>();
    const user = props.auth?.user;

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
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-3">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={user.avatar ?? undefined} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden font-medium md:inline-block">{user.name}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2">
                                        <User className="h-4 w-4" /> Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/logout" method="post" className="flex items-center gap-2 text-red-600">
                                        <LogOut className="h-4 w-4" /> Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" onClick={() => Inertia.visit('/login')}>
                                Sign In
                            </Button>
                            <Button size="sm" onClick={() => Inertia.visit('/register')}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
