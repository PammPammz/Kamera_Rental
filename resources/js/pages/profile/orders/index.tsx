'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserLayout from '@/layouts/user-layout';
import { Order, PaginatedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import ProfileSidebar from '../profile-sidebar';
import OrderCard from './order-card';

export default function OrdersPage() {
    const { orders, status } = usePage<{ orders: PaginatedData<Order>; status: string }>().props;
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    const toggleOrderExpand = (orderId: number) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    const handleTabChange = (value: string) => {
        Inertia.visit(`/profile/orders`, {
            preserveScroll: true,
            preserveState: true,
            only: ['orders', 'selectedStatus'],
            data: { status: value },
        });
    };

    return (
        <UserLayout>
            <div className="container mx-auto p-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    <ProfileSidebar />
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-2xl font-bold">My Orders</h1>
                                <p className="text-muted-foreground">View and manage your rental orders</p>
                            </div>
                        </div>

                        <Tabs value={status} onValueChange={handleTabChange} className="w-full">
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
                                {orders.data.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        isExpanded={expandedOrder === order.id}
                                        toggleOrderExpand={toggleOrderExpand}
                                    />
                                ))}
                            </TabsContent>
                            <TabsContent value="approved" className="space-y-4">
                                {orders.data.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        isExpanded={expandedOrder === order.id}
                                        toggleOrderExpand={toggleOrderExpand}
                                    />
                                ))}
                            </TabsContent>
                            <TabsContent value="rejected" className="space-y-4">
                                {orders.data.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        isExpanded={expandedOrder === order.id}
                                        toggleOrderExpand={toggleOrderExpand}
                                    />
                                ))}
                            </TabsContent>
                            <TabsContent value="finished" className="space-y-4">
                                {orders.data.map((order) => (
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
        </UserLayout>
    );
}
