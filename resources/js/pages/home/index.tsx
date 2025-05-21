import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { Camera, ChevronDown, Filter, Search } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
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

            {/* Main Content */}
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Rent Professional Cameras</h1>
                                    <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                        Get access to high-quality cameras and equipment for your photography needs without the high cost of
                                        ownership.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button size="lg">Browse Cameras</Button>
                                    <Button variant="outline" size="lg">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                            <img
                                src="https://picsum.photos/200"
                                alt="Professional camera equipment"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                            />
                        </div>
                    </div>
                </section>

                {/* Camera Collection */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Camera Collection</h2>
                                <p className="text-muted-foreground max-w-[600px]">
                                    Browse our extensive collection of professional cameras available for rent.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input type="search" placeholder="Search cameras..." className="w-full min-w-[260px] pl-8" />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Filter</span>
                                </Button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="all" className="mt-8">
                            <TabsList className="mb-8">
                                <TabsTrigger value="all">All Cameras</TabsTrigger>
                                <TabsTrigger value="dslr">DSLR</TabsTrigger>
                                <TabsTrigger value="mirrorless">Mirrorless</TabsTrigger>
                                <TabsTrigger value="cinema">Cinema</TabsTrigger>
                                <TabsTrigger value="action">Action</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="space-y-8">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {cameras.map((camera) => (
                                        <Link href={`/cameras/${camera.id}`} key={camera.id} className="group">
                                            <Card className="overflow-hidden py-0 transition-all hover:shadow-md">
                                                <CardHeader className="p-0">
                                                    <div className="relative aspect-[4/3] overflow-hidden">
                                                        <img
                                                            src={camera.image || 'https://picsum.photos/200'}
                                                            alt={camera.name}
                                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                        />
                                                        <Badge className="absolute top-2 right-2">{camera.category}</Badge>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-4">
                                                    <CardTitle className="line-clamp-1">{camera.name}</CardTitle>
                                                    <div className="text-muted-foreground mt-2 line-clamp-2 text-sm">{camera.description}</div>
                                                </CardContent>
                                                <CardFooter className="flex items-center justify-between p-4 pt-0">
                                                    <div className="font-bold">
                                                        ${camera.price} <span className="text-muted-foreground text-sm font-normal">/day</span>
                                                    </div>
                                                    <Button size="sm" variant="outline">
                                                        View Details
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center">
                                    <Button variant="outline" className="gap-1">
                                        Load More <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                                <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                    Renting a camera is easy with our simple 3-step process.
                                </p>
                            </div>
                            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
                                {['Choose Your Camera', 'Book Your Rental', 'Pickup or Delivery'].map((title, idx) => (
                                    <div className="space-y-2" key={idx}>
                                        <div className="bg-primary text-primary-foreground inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-xl font-bold">{title}</h3>
                                        <p className="text-muted-foreground">
                                            {idx === 0
                                                ? 'Browse our collection and select the perfect camera for your needs.'
                                                : idx === 1
                                                  ? 'Select your rental dates and complete the booking process.'
                                                  : 'Pick up your camera at our store or choose delivery to your location.'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
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
        </div>
    );
}

// Example Camera List — Replace this later with real backend data
const cameras = [
    {
        id: '1',
        name: 'Canon EOS 5D Mark IV',
        description: 'Professional full-frame DSLR with 30.4MP sensor, 4K video recording, and dual pixel autofocus.',
        price: 75,
        category: 'DSLR',
        image: 'https://picsum.photos/200',
    },
    {
        id: '2',
        name: 'Sony Alpha a7 III',
        description: 'Full-frame mirrorless camera with 24.2MP sensor, 4K HDR video, and 5-axis image stabilization.',
        price: 85,
        category: 'Mirrorless',
        image: 'https://picsum.photos/200',
    },
    {
        id: '3',
        name: 'Nikon Z6 II',
        description: 'Versatile mirrorless camera with 24.5MP sensor, 4K/60p video, and dual EXPEED 6 processors.',
        price: 80,
        category: 'Mirrorless',
        image: 'https://picsum.photos/200',
    },
    {
        id: '4',
        name: 'Blackmagic Pocket Cinema Camera 6K',
        description: 'Compact cinema camera with Super 35 sensor, 6K resolution, and 13 stops of dynamic range.',
        price: 120,
        category: 'Cinema',
        image: 'https://picsum.photos/200',
    },
    {
        id: '5',
        name: 'Fujifilm X-T4',
        description: 'Flagship X Series mirrorless camera with 26.1MP sensor, 4K/60p video, and in-body stabilization.',
        price: 70,
        category: 'Mirrorless',
        image: 'https://picsum.photos/200',
    },
    {
        id: '6',
        name: 'GoPro HERO10 Black',
        description: 'Waterproof action camera with 5.3K video, 23MP photos, and HyperSmooth 4.0 stabilization.',
        price: 45,
        category: 'Action',
        image: 'https://picsum.photos/200',
    },
    {
        id: '7',
        name: 'Panasonic Lumix GH5',
        description: 'Micro Four Thirds camera with 20.3MP sensor, 4K/60p video, and 5-axis dual I.S.',
        price: 65,
        category: 'Mirrorless',
        image: 'https://picsum.photos/200',
    },
    {
        id: '8',
        name: 'Canon EOS R5',
        description: 'High-resolution mirrorless camera with 45MP sensor, 8K video, and in-body stabilization.',
        price: 95,
        category: 'Mirrorless',
        image: 'https://picsum.photos/200',
    },
];
