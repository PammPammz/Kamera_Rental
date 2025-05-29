import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Order, PaginatedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';

interface Props {
    orders: PaginatedData<Order>;
}

export const ordersBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/dashboard/orders',
    },
];

export default function OrderIndex({ orders }: Props) {
    const handleApprove = (id: number) => {
        if (confirm('Approve this order?')) {
            Inertia.put(`/dashboard/orders/${id}`, { status: 'approved' });
        }
    };

    console.log('orders', orders.data[0].orderItems);

    return (
        <AppLayout breadcrumbs={ordersBreadcrumbs}>
            <Head title="Orders" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Orders</h1>

                <div className="mt-4 overflow-hidden rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Purpose</TableHead>
                                <TableHead>Delivery Method</TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead>Rental Start</TableHead>
                                <TableHead>Rental End</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead>Equipments Requested</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {orders.data.length > 0 ? (
                                orders.data.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.full_name}</TableCell>
                                        <TableCell>{order.phone}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>{order.purpose}</TableCell>
                                        <TableCell>{order.delivery_method}</TableCell>
                                        <TableCell>{order.notes}</TableCell>
                                        <TableCell>{order.rental_start}</TableCell>
                                        <TableCell>{order.rental_end}</TableCell>
                                        <TableCell>{formatRupiah(order.subtotal)}</TableCell>
                                        <TableCell>
                                            <ul className="list-inside list-disc space-y-1">
                                                {order.orderItems?.length ? (
                                                    order.orderItems.map((item) => (
                                                        <li key={item.id}>
                                                            {item.equipment.name} (Qty: {item.quantity})
                                                        </li>
                                                    ))
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </ul>
                                        </TableCell>
                                        <TableCell className="capitalize">{order.status}</TableCell>
                                        <TableCell>
                                            <TableCell>
                                                {order.status === 'pending' ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApprove(order.id)}
                                                            className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Reject this order?')) {
                                                                    Inertia.put(`/dashboard/orders/${order.id}`, { status: 'rejected' });
                                                                }
                                                            }}
                                                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 italic">No actions</span>
                                                )}
                                            </TableCell>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={13} className="py-4 text-center">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
