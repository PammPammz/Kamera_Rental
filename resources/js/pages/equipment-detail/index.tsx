import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Equipment } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function EquipmentDetail({ equipment }: Readonly<{ equipment: Equipment }>) {
    console.log('oooooooo', equipment);

    return (
        <div className="container mx-auto py-8">
            <button
                type="button"
                onClick={() => window.history.back()}
                className="mb-6 inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to cameras
            </button>
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                <div>
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={equipment.image ?? 'https://picsum.photos/1000'}
                            alt={equipment.name}
                            className="aspect-[4/3] w-full object-cover"
                        />
                    </div>
                    <div className="mt-8 space-y-4">
                        <h2 className="text-2xl font-bold">{equipment.name}</h2>
                        <Badge>{equipment.category?.name}</Badge>
                        <p>{equipment.description}</p>
                    </div>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Rent This Camera</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="font-medium">Price</div>
                                <div className="text-3xl font-bold">
                                    {formatRupiah(equipment.price as number)} <span className="text-muted-foreground text-sm font-normal">/day</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full">Add to Cart</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
