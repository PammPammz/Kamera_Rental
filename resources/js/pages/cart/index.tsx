import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import UserLayout from '@/layouts/user-layout';
import { formatRupiah } from '@/lib/utils';
import { CartItem } from '@/types';
import { InertiaPageProps } from '@/types/inertia';
import { Link, router, usePage } from '@inertiajs/react';
import { differenceInCalendarDays } from 'date-fns';
import { ArrowLeft, CalendarIcon, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function CartPage() {
    const { cartItems } = usePage<InertiaPageProps & { cartItems: CartItem[] }>().props;
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const toggleSelect = (id: number) => {
        setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
    };

    const updateQuantity = (equipmentId: number, newQty: number) => {
        if (newQty < 1 || newQty > 5) return;

        router.patch(
            `/cart/${equipmentId}`,
            { quantity: newQty },
            {
                preserveScroll: true,
            },
        );
    };

    const rentDuration = date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) + 1 : 1;

    return (
        <UserLayout>
            <div className="container mx-auto p-8">
                <Link href="/camera-equipments" className="mb-6 inline-flex items-center gap-1 text-sm font-medium hover:underline">
                    <ArrowLeft className="h-4 w-4" />
                    Back to equipment list
                </Link>
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                    <div className="space-y-6">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">Your Cart</h1>
                            <p className="text-muted-foreground">Review your selected cameras and rental details.</p>
                        </div>
                        <div className="space-y-4">
                            {cartItems.map((item) => {
                                return (
                                    <Card key={item.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col items-center justify-start gap-2">
                                                    <Checkbox
                                                        checked={selectedItems.includes(item.id)}
                                                        onCheckedChange={() => toggleSelect(item.id)}
                                                    />
                                                </div>
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                                    <img
                                                        src={item.equipment.image ?? 'https://picsum.photos/1000'}
                                                        alt={item.equipment.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex h-full justify-between">
                                                        <div>
                                                            <h3 className="font-semibold">{item.equipment.name}</h3>
                                                            <Badge variant="secondary" className="mt-1">
                                                                {item.equipment.category.name}
                                                            </Badge>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-destructive"
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to remove this item from your cart?')) {
                                                                    router.delete(`/cart/${item.equipment.id}`);
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Remove item</span>
                                                        </Button>
                                                    </div>
                                                    <div className="grid gap-4 sm:grid-cols-3">
                                                        <div className="space-y-1">
                                                            <div className="text-sm font-medium">Quantity</div>
                                                            <div className="flex items-center gap-1">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    onClick={() => updateQuantity(item.equipment.id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <Minus className="h-3 w-3" />
                                                                </Button>
                                                                <Input
                                                                    type="number"
                                                                    readOnly
                                                                    value={item.quantity}
                                                                    className="h-8 w-12 text-center text-sm"
                                                                />
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    onClick={() => updateQuantity(item.equipment.id, item.quantity + 1)}
                                                                    disabled={item.quantity >= 5}
                                                                >
                                                                    <Plus className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div></div>
                                                        <div className="space-y-1">
                                                            <div className="text-sm font-medium">Price</div>
                                                            <div className="font-semibold">{formatRupiah(item.equipment.price)}/day</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                            {cartItems.length === 0 && (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <ShoppingCart className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                        <h3 className="mb-2 text-lg font-semibold">Your cart is empty</h3>
                                        <p className="text-muted-foreground mb-4">Add some cameras to get started with your rental.</p>
                                        <Button asChild>
                                            <Link href="/">Browse Cameras</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                    <div>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="font-medium">Select Dates</div>
                                    <div className="rounded-md border p-4">
                                        <div className="mb-4 flex items-center gap-2">
                                            <CalendarIcon className="text-muted-foreground h-4 w-4" />
                                            <span className="text-muted-foreground text-sm">Pick your rental period</span>
                                        </div>
                                        <Calendar
                                            mode="range"
                                            className="mx-auto rounded-md border"
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.equipment.name} ({rentDuration}d × {item.quantity})
                                            </span>
                                            <span>{formatRupiah(item.equipment.price * rentDuration * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>
                                            {formatRupiah(
                                                cartItems.reduce((total, item) => total + item.equipment.price * rentDuration * item.quantity, 0),
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button className="w-full" size="lg" asChild>
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/">Continue Shopping</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
