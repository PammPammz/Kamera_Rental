import { Link } from '@inertiajs/react';
import { Camera } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t py-6">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2 font-semibold">
                    <Camera className="h-5 w-5" />
                    <span>CameraRent</span>
                </div>
                <p className="text-muted-foreground text-sm">© 2023 CameraRent. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link href="#" className="text-muted-foreground text-sm hover:underline">
                        Terms
                    </Link>
                    <Link href="#" className="text-muted-foreground text-sm hover:underline">
                        Privacy
                    </Link>
                    <Link href="#" className="text-muted-foreground text-sm hover:underline">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
