import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function RentPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    return (
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
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" placeholder="Enter your first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" placeholder="Enter your last name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="Enter your phone number" />
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Rental Details</h2>
                            <div className="space-y-2">
                                <Label>Rental Period</Label>
                                <Calendar
                                    mode="range"
                                    className="mx-auto rounded-md border"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="purpose">Purpose of Rental</Label>
                                <Select>
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
                                <RadioGroup defaultValue="pickup" className="grid gap-4 sm:grid-cols-2">
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
                                            <span className="text-muted-foreground text-sm font-normal">$10.00</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Delivery Address</Label>
                                <Textarea id="address" placeholder="Enter your delivery address" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Special Requests</Label>
                                <Textarea id="notes" placeholder="Any special requests or notes for your rental" />
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
                                    <div className="text-muted-foreground text-sm">Jan 20 - Jan 25, 2024 (6 days)</div>
                                </div>
                                <Separator />
                                <h3 className="font-medium">Items in your order ({cartItems.length} items)</h3>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                                        <div className="h-16 w-16 overflow-hidden rounded-md">
                                            <img src={item.image || '/placeholder.svg'} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium">{item.name}</h4>
                                            <p className="text-muted-foreground text-xs">{item.category}</p>
                                            <p className="text-xs">
                                                Qty: {item.quantity} × ${item.price}/day
                                            </p>
                                        </div>
                                        <div className="text-sm font-medium">${item.price * 6 * item.quantity}</div>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal (6 days)</span>
                                    <span>$1,680.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Delivery</span>
                                    <span>$15.00</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>$1,879.20</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Complete Order</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const cartItems = [
    {
        id: '1',
        name: 'Canon EOS 5D Mark IV',
        category: 'DSLR',
        price: 75,
        quantity: 1,
        image: '/placeholder.svg?height=64&width=64',
    },
    {
        id: '2',
        name: 'Sony Alpha a7 III',
        category: 'Mirrorless',
        price: 85,
        quantity: 1,
        image: '/placeholder.svg?height=64&width=64',
    },
    {
        id: '4',
        name: 'Blackmagic Pocket Cinema Camera 6K',
        category: 'Cinema',
        price: 120,
        quantity: 1,
        image: '/placeholder.svg?height=64&width=64',
    },
];
