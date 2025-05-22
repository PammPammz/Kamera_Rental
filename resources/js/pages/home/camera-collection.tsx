import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { useState } from 'react';

const dummyCameras = [
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

export default function CameraCollection() {
    const [cameras] = useState(dummyCameras);

    return (
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
    );
}
