import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type InertiaPageProps } from '@/types/inertia';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import { Camera, LogOut, ShoppingCart, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function Header() {
    const { props, url } = usePage<InertiaPageProps>();
    const user = props.auth?.user;

    const isActive = (path: string) => {
        return url === path || url.startsWith(path + '/');
    };

    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <Camera className="h-6 w-6" />
                    <span>CameraRent</span>
                </div>

                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/" className={`font-medium ${isActive('/') ? '' : 'text-muted-foreground'}`}>
                        Home
                    </Link>
                    <Link href="/camera-equipments" className={`font-medium ${isActive('/camera-equipments') ? '' : 'text-muted-foreground'}`}>
                        Camera Equipments
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <Button variant="ghost" size="sm" onClick={() => Inertia.visit('/cart')} className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                                    {props.cartCount}
                                </Badge>
                                <span className="sr-only">Cart</span>
                            </Button>
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
                                    <Link href="/profile/orders" className="flex items-center gap-2">
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
