// resources/js/Pages/Public/EquipmentsPage.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserLayout from '@/layouts/user-layout';
import { Category, Equipment, PaginatedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import EquipmentGrid from './equipment-grid';

export default function EquipmentsPage() {
    const { equipments, categories, selectedCategory } = usePage<{
        equipments: PaginatedData<Equipment>;
        categories: Category[];
        selectedCategory: string;
    }>().props;

    const [currentCategory, setCurrentCategory] = useState(selectedCategory ?? 'all');

    useEffect(() => {
        if (currentCategory !== selectedCategory) {
            Inertia.get('/camera-equipments', { category: currentCategory }, { preserveState: true, replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategory]);

    const handlePagination = (url: string | null) => {
        if (url) Inertia.get(url, {}, { preserveState: true });
    };

    return (
        <UserLayout>
            <div className="w-full py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Camera Equipment for Rent</h2>
                            <p className="text-muted-foreground max-w-[600px]">
                                Choose from a variety of professional camera equipment tailored to your needs.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                <Input type="search" placeholder="Search equipment..." className="w-full min-w-[260px] pl-8" />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                                <span className="sr-only">Filter</span>
                            </Button>
                        </div>
                    </div>

                    <Tabs value={currentCategory} onValueChange={setCurrentCategory} className="mt-8">
                        <TabsList className="mb-8">
                            <TabsTrigger value="all">All</TabsTrigger>
                            {categories.map((category) => (
                                <TabsTrigger key={category.id} value={category.slug}>
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value={currentCategory} className="space-y-8">
                            <EquipmentGrid equipments={equipments.data} />

                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="outline"
                                    disabled={!equipments.prev_page_url}
                                    onClick={() => handlePagination(equipments.prev_page_url)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={!equipments.next_page_url}
                                    onClick={() => handlePagination(equipments.next_page_url)}
                                >
                                    Next
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </UserLayout>
    );
}
