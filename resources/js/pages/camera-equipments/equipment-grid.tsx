import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Equipment } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

const EquipmentGrid = ({ equipments }: { equipments: Equipment[] }) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {equipments.map((equipment) => (
            <Link href={`/camera-equipments/${equipment.slug}`} key={equipment.slug} className="group">
                <Card className="overflow-hidden py-0 transition-all hover:shadow-md">
                    <CardHeader className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={equipment.image_url ?? 'https://picsum.photos/1000'}
                                alt={equipment.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                            <Badge className="absolute top-2 right-2">{equipment.category?.name}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="line-clamp-1">{equipment.name}</CardTitle>
                        <div className="text-muted-foreground mt-2 line-clamp-2 text-sm">{equipment.description}</div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="font-bold">
                            {formatRupiah(equipment.price as number)} <span className="text-muted-foreground text-sm font-normal">/day</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => Inertia.visit(`/camera-equipments/${equipment.slug}`)}>
                            View Details
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
        ))}
    </div>
);

export default EquipmentGrid;
