'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronRight, Eye, FileText, Search } from 'lucide-react';
import { useState } from 'react';
import ProfileSidebar from '../profile-sidebar';
import OrderCard from './order-card';

export const getStatusBadgeClasses = (status: string) => {
    switch (status) {
        case 'Active':
            return 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800';
        case 'Upcoming':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800';
        case 'Completed':
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800';
        default:
            return 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800';
    }
};

export default function OrdersPage() {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const toggleOrderExpand = (orderId: string) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <div className="container mx-auto py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    <ProfileSidebar />
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-2xl font-bold">My Orders</h1>
                                <p className="text-muted-foreground">View and manage your rental orders</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input type="search" placeholder="Search orders..." className="w-full pl-8 md:w-[200px]" />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Filter by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Orders</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="mb-6 grid grid-cols-4">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="space-y-4">
                                {orders.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        isExpanded={expandedOrder === order.id}
                                        toggleOrderExpand={toggleOrderExpand}
                                    />
                                ))}
                            </TabsContent>
                            <TabsContent value="active" className="space-y-4">
                                {orders
                                    .filter((order) => order.status === 'Active')
                                    .map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            isExpanded={expandedOrder === order.id}
                                            toggleOrderExpand={toggleOrderExpand}
                                        />
                                    ))}
                            </TabsContent>
                            <TabsContent value="upcoming" className="space-y-4">
                                {orders
                                    .filter((order) => order.status === 'Upcoming')
                                    .map((order) => (
                                        <Card key={order.id} className="overflow-hidden">
                                            {/* Similar structure as above */}
                                            <CardHeader className="hover:bg-muted/50 cursor-pointer p-4" onClick={() => toggleOrderExpand(order.id)}>
                                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                                    <div className="flex items-center gap-3">
                                                        {expandedOrder === order.id ? (
                                                            <ChevronDown className="text-muted-foreground h-5 w-5" />
                                                        ) : (
                                                            <ChevronRight className="text-muted-foreground h-5 w-5" />
                                                        )}
                                                        <div>
                                                            <div className="font-medium">Order #{order.id}</div>
                                                            <div className="text-muted-foreground text-sm">
                                                                Placed on {new Date(order.orderDate).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
                                                            {order.status}
                                                        </Badge>
                                                        <div className="text-right">
                                                            <div className="font-medium">${order.total.toFixed(2)}</div>
                                                            <div className="text-muted-foreground text-sm">{order.items.length} items</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            {expandedOrder === order.id && (
                                                <>
                                                    <Separator />
                                                    <CardContent className="space-y-4 p-4">{/* Content */}</CardContent>
                                                    <Separator />
                                                    <CardFooter className="flex flex-wrap gap-2 p-4">
                                                        <Button variant="outline" size="sm" className="gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            View Details
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="gap-1">
                                                            <FileText className="h-4 w-4" />
                                                            View Invoice
                                                        </Button>
                                                        <Button variant="destructive" size="sm">
                                                            Cancel Order
                                                        </Button>
                                                    </CardFooter>
                                                </>
                                            )}
                                        </Card>
                                    ))}
                            </TabsContent>
                            <TabsContent value="completed" className="space-y-4">
                                {orders
                                    .filter((order) => order.status === 'Completed')
                                    .map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            isExpanded={expandedOrder === order.id}
                                            toggleOrderExpand={toggleOrderExpand}
                                        />
                                    ))}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

export interface MockOrderItem {
    name: string;
    category: string;
    price: number;
    quantity: number;
    image: string;
}

export interface MockPaymentInfo {
    cardType: string;
    cardLast4: string;
    billingName: string;
}

export interface MockOrder {
    id: string;
    orderDate: string; // ISO date string
    status: 'Active' | 'Completed' | 'Upcoming' | 'Cancelled';
    total: number;
    subtotal: number;
    insurance: number;
    delivery: number;
    tax: number;
    rentalStart: string; // ISO date string
    rentalEnd: string; // ISO date string
    deliveryMethod: 'Store Pickup' | 'Delivery';
    items: MockOrderItem[];
    paymentInfo: MockPaymentInfo;
}

const orders: MockOrder[] = [
    {
        id: 'ORD-2023-8742',
        orderDate: '2023-11-15T10:30:00',
        status: 'Active',
        total: 745.2,
        subtotal: 630.0,
        insurance: 45.0,
        delivery: 15.0,
        tax: 55.2,
        rentalStart: '2023-11-15T09:00:00',
        rentalEnd: '2023-11-22T18:00:00',
        deliveryMethod: 'Store Pickup',
        items: [
            {
                name: 'Canon EOS 5D Mark IV',
                category: 'DSLR',
                price: 75.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
            {
                name: 'Sony Alpha a7 III',
                category: 'Mirrorless',
                price: 85.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
            {
                name: 'Blackmagic Pocket Cinema Camera 6K',
                category: 'Cinema',
                price: 120.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
        ],
        paymentInfo: {
            cardType: 'Visa',
            cardLast4: '4242',
            billingName: 'John Doe',
        },
    },
    {
        id: 'ORD-2023-6531',
        orderDate: '2023-10-28T14:15:00',
        status: 'Completed',
        total: 495.6,
        subtotal: 420.0,
        insurance: 30.0,
        delivery: 10.0,
        tax: 35.6,
        rentalStart: '2023-10-30T09:00:00',
        rentalEnd: '2023-11-02T18:00:00',
        deliveryMethod: 'Delivery',
        items: [
            {
                name: 'Nikon Z6 II',
                category: 'Mirrorless',
                price: 80.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
            {
                name: 'GoPro HERO10 Black',
                category: 'Action',
                price: 45.0,
                quantity: 2,
                image: '/placeholder.svg?height=64&width=64',
            },
        ],
        paymentInfo: {
            cardType: 'Mastercard',
            cardLast4: '8765',
            billingName: 'John Doe',
        },
    },
    {
        id: 'ORD-2023-9214',
        orderDate: '2023-12-01T09:45:00',
        status: 'Upcoming',
        total: 1250.8,
        subtotal: 1080.0,
        insurance: 60.0,
        delivery: 15.0,
        tax: 95.8,
        rentalStart: '2023-12-10T09:00:00',
        rentalEnd: '2023-12-17T18:00:00',
        deliveryMethod: 'Delivery',
        items: [
            {
                name: 'Canon EOS R5',
                category: 'Mirrorless',
                price: 95.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
            {
                name: 'Blackmagic Pocket Cinema Camera 6K',
                category: 'Cinema',
                price: 120.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
            {
                name: 'Sony Alpha a7 III',
                category: 'Mirrorless',
                price: 85.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
            {
                name: 'Canon RF 24-70mm f/2.8L IS USM',
                category: 'Lens',
                price: 65.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
        ],
        paymentInfo: {
            cardType: 'Visa',
            cardLast4: '4242',
            billingName: 'John Doe',
        },
    },
    {
        id: 'ORD-2023-5127',
        orderDate: '2023-09-15T16:20:00',
        status: 'Cancelled',
        total: 320.4,
        subtotal: 270.0,
        insurance: 15.0,
        delivery: 10.0,
        tax: 25.4,
        rentalStart: '2023-09-20T09:00:00',
        rentalEnd: '2023-09-23T18:00:00',
        deliveryMethod: 'Store Pickup',
        items: [
            {
                name: 'Fujifilm X-T4',
                category: 'Mirrorless',
                price: 70.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
            {
                name: 'Fujifilm XF 16-55mm f/2.8 R LM WR',
                category: 'Lens',
                price: 40.0,
                quantity: 1,
                image: '/placeholder.svg?height=64&width=64',
            },
        ],
        paymentInfo: {
            cardType: 'Amex',
            cardLast4: '1234',
            billingName: 'John Doe',
        },
    },
];
