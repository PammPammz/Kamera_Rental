import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import UserLayout from '@/layouts/user-layout';
import { formatRupiah } from '@/lib/utils';
import { CartItem } from '@/types';
import { InertiaPageProps } from '@/types/inertia';
import { Inertia } from '@inertiajs/inertia';
import { Link, router, usePage } from '@inertiajs/react';
import { differenceInCalendarDays, format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const DELIVERY_FEE = 100000;

export default function RentPage() {
    const { auth, cartItems } = usePage<InertiaPageProps & { cartItems: CartItem[] }>().props;
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });
    const [form, setForm] = useState({
        full_name: auth.user?.name,
        email: auth.user?.email,
        phone: '',
        address: '',
        notes: '',
        purpose: '',
        delivery_method: 'pickup',
        rental_period: date,
    });

    const rentDuration = date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) + 1 : 1;
    const subtotal = cartItems.reduce((total, item) => total + item.equipment.price * rentDuration * item.quantity, 0);

    const handleSubmit = () => {
        router.post('/orders', form, {
            onSuccess: () => {
                Inertia.visit('/');
                console.log('success');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <UserLayout>
            <div className="container mx-auto py-8">
                <Link href="/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium hover:underline">
                    <ArrowLeft className="h-4 w-4" />
                    Back to cameras
                </Link>
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                    <div className="space-y-8">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">Complete Your Order</h1>
                            <p className="text-muted-foreground">Please fill out the form below to complete your camera rentals.</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Personal Information</h2>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="full-name">Full Name</Label>
                                        <Input
                                            id="full-name"
                                            placeholder="Enter your full name"
                                            value={form.full_name}
                                            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Rental Details</h2>
                                <div className="space-y-2">
                                    <Label>Rental Period</Label>
                                    <Calendar
                                        mode="range"
                                        className="rounded-md border"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="purpose">Purpose of Rental</Label>
                                    <Select value={form.purpose} onValueChange={(e) => setForm({ ...form, purpose: e })}>
                                        <SelectTrigger id="purpose">
                                            <SelectValue placeholder="Select purpose" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="personal">Personal Use</SelectItem>
                                            <SelectItem value="event">Event Photography</SelectItem>
                                            <SelectItem value="commercial">Commercial Shoot</SelectItem>
                                            <SelectItem value="travel">Travel Photography</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Delivery Method</Label>
                                    <RadioGroup
                                        value={form.delivery_method}
                                        onValueChange={(e) => setForm({ ...form, delivery_method: e })}
                                        defaultValue="pickup"
                                        className="grid gap-4 sm:grid-cols-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="pickup" id="pickup" />
                                            <Label htmlFor="pickup" className="flex flex-col">
                                                <span>Store Pickup</span>
                                                <span className="text-muted-foreground text-sm font-normal">Free</span>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="delivery" id="delivery" />
                                            <Label htmlFor="delivery" className="flex flex-col">
                                                <span>Delivery</span>
                                                <span className="text-muted-foreground text-sm font-normal">{formatRupiah(DELIVERY_FEE)}</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Delivery Address</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Enter your delivery address"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Special Requests</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Any special requests or notes for your rental"
                                        value={form.notes}
                                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary ({cartItems.length} items)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium">Rental Period</h3>
                                        <div className="text-muted-foreground text-sm">
                                            {format(date?.from ?? new Date(), 'MMM dd, yyyy')} - {format(date?.to ?? new Date(), 'MMM dd, yyyy')} (
                                            {rentDuration} days)
                                        </div>
                                    </div>
                                    <Separator />
                                    <h3 className="font-medium">Items in your order ({cartItems.length} items)</h3>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                                            <div className="h-16 w-16 overflow-hidden rounded-md">
                                                <img
                                                    src={item.equipment.image || 'https://picsum.photos/1000'}
                                                    alt={item.equipment.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">{item.equipment.name}</h4>
                                                <p className="text-muted-foreground text-xs">{item.equipment.category.name}</p>
                                                <p className="text-xs">
                                                    Qty: {item.quantity} × {formatRupiah(item.equipment.price)}/day
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium">
                                                {formatRupiah(item.equipment.price * rentDuration * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal ({rentDuration} days)</span>
                                        <span>{formatRupiah(subtotal)}</span>
                                    </div>
                                    {form.delivery_method === 'delivery' && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Delivery</span>
                                            <span>{formatRupiah(DELIVERY_FEE)}</span>
                                        </div>
                                    )}
                                    <Separator className="my-2" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>{formatRupiah(subtotal + (form.delivery_method === 'delivery' ? DELIVERY_FEE : 0))}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleSubmit}>
                                    Complete Order
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
