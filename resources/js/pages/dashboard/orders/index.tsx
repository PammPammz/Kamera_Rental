'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Order, PaginatedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import OrderCard from './order-card';

export const ordersBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/orders',
    },
];

export const getStatusBadgeClasses = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800';
        case 'Approved':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800';
        case 'Finished':
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800';
        default:
            return 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800';
    }
};

export default function OrdersPage() {
    const { orders } = usePage<{ orders: PaginatedData<Order> }>().props;
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    const toggleOrderExpand = (orderId: number) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    return (
        <AppLayout breadcrumbs={ordersBreadcrumbs}>
            <div className="container mx-auto py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-2xl font-bold">Orders</h1>
                            </div>
                        </div>

                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="mb-6 grid grid-cols-5">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                <TabsTrigger value="approved">Approved</TabsTrigger>
                                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                                <TabsTrigger value="finished">Finished</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="space-y-4">
                                {orders.data.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        isExpanded={expandedOrder === order.id}
                                        toggleOrderExpand={toggleOrderExpand}
                                    />
                                ))}
                            </TabsContent>
                            <TabsContent value="pending" className="space-y-4">
                                {orders.data
                                    .filter((order) => order.status === 'pending')
                                    .map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            isExpanded={expandedOrder === order.id}
                                            toggleOrderExpand={toggleOrderExpand}
                                        />
                                    ))}
                            </TabsContent>
                            <TabsContent value="approved" className="space-y-4">
                                {orders.data
                                    .filter((order) => order.status === 'approved')
                                    .map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            isExpanded={expandedOrder === order.id}
                                            toggleOrderExpand={toggleOrderExpand}
                                        />
                                    ))}
                            </TabsContent>
                            <TabsContent value="rejected" className="space-y-4">
                                {orders.data
                                    .filter((order) => order.status === 'rejected')
                                    .map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            isExpanded={expandedOrder === order.id}
                                            toggleOrderExpand={toggleOrderExpand}
                                        />
                                    ))}
                            </TabsContent>
                            <TabsContent value="finished" className="space-y-4">
                                {orders.data
                                    .filter((order) => order.status === 'finished')
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
        </AppLayout>
    );
}
