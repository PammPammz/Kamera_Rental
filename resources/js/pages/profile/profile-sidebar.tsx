import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InertiaPageProps } from '@/types/inertia';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingBag, User } from 'lucide-react';

const ProfileSidebar = () => {
    const {
        props: { auth },
    } = usePage<InertiaPageProps>();
    return (
        <div className="w-full space-y-4 md:w-64">
            <Card>
                <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                            <User className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-base">{auth.user?.name}</CardTitle>
                            <CardDescription>{auth.user?.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <nav className="grid">
                        <Link href="#" className="border-primary bg-primary/5 flex items-center gap-2 border-l-2 px-4 py-2.5 text-sm">
                            <ShoppingBag className="h-4 w-4" />
                            <span>My Orders</span>
                        </Link>
                    </nav>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileSidebar;
