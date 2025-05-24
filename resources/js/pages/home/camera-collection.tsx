import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, Equipment } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import EquipmentGrid from '../camera-equipments/equipment-grid';

export default function CameraCollection() {
    const { equipments, categories, selectedCategory } = usePage<{
        equipments: { data: Equipment[] };
        categories: Category[];
        selectedCategory: string;
    }>().props;
    const [currentCategory, setCurrentCategory] = useState(selectedCategory ?? 'all');

    useEffect(() => {
        if (currentCategory !== selectedCategory) {
            Inertia.get('/', { category: currentCategory }, { preserveState: true, replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategory]);

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Camera Equipment Collection</h2>
                        <p className="text-muted-foreground max-w-[600px]">
                            Browse our extensive collection of professional equipments available for rent.
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

                <Tabs value={currentCategory} onValueChange={setCurrentCategory} className="mt-8">
                    <TabsList className="mb-8">
                        <TabsTrigger value={'all'}>All</TabsTrigger>
                        {categories.map((category) => (
                            <TabsTrigger key={category.id} value={category.slug}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="all" className="space-y-8">
                        <EquipmentGrid equipments={equipments.data} />
                        <div className="flex items-center justify-center">
                            <Button variant="outline" className="gap-1" onClick={() => Inertia.visit('/camera-equipments')}>
                                Load More <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Category-specific tabs */}
                    {categories.map((category) => (
                        <TabsContent key={category.id} value={category.slug} className="space-y-8">
                            <EquipmentGrid equipments={equipments.data} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}
