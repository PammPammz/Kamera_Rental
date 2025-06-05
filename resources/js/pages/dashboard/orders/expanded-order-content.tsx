import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { calculateRentalDays, formatRupiah } from '@/lib/utils';
import { Order } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Order Items Component
const OrderItems = ({ items }: { items: Order['items'] }) => (
    <div className="space-y-2">
        <div className="text-sm font-medium">Items</div>
        <div className="overflow-hidden rounded-md border">
            <div className="bg-muted/50 grid grid-cols-[auto_1fr_auto] gap-4 p-3 text-sm font-medium">
                <div>Item</div>
                <div>Details</div>
                <div className="text-right">Price</div>
            </div>
            {items?.map((item, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t p-3">
                    <div className="h-16 w-16 overflow-hidden rounded-md">
                        <img
                            src={item.equipment.image || 'https://picsum.photos/1000'}
                            alt={item.equipment.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-medium">{item.equipment.name}</div>
                        <div className="text-muted-foreground text-sm">{item.equipment.category?.name}</div>
                        <div className="text-sm">Quantity: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                        <div className="font-medium">{formatRupiah(item.price * item.quantity)}</div>
                        <div className="text-muted-foreground text-xs">
                            {formatRupiah(item.price)} × {item.quantity}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Order Summary Component
const OrderSummary = ({ order }: { order: Order }) => (
    <div className="space-y-2">
        <div className="text-sm font-medium">Order Summary</div>
        <div className="space-y-1 text-sm">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatRupiah(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>{formatRupiah(order.delivery_fee)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 font-medium">
                <span>Total</span>
                <span>{formatRupiah(order.total)}</span>
            </div>
        </div>
    </div>
);

const OrderFooter = ({ order }: { order: Order }) => {
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [rejectReason, setRejectReason] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleStatusChange = ({
        orderId,
        newStatus,
        file,
        rejectReason,
    }: {
        orderId: number;
        newStatus: 'approved' | 'rejected' | 'finished';
        file?: File | null;
        rejectReason?: string;
    }) => {
        const formData = new FormData();
        formData.append('status', newStatus);
        formData.append('_method', 'PUT');

        if (newStatus === 'approved' && file) {
            formData.append('transaction_proof', file);
        }

        if (newStatus === 'rejected' && rejectReason) formData.append('reject_reason', rejectReason);

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }

        router.post(`/dashboard/orders/${orderId}`, formData, {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally reset file input
                setProofFile(null);
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to update order');
            },
        });
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <>
            <Separator />
            <CardFooter className="w-full">
                {order.status === 'pending' && (
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <Label>Proof of Payment</Label>
                            <Input type="file" onChange={(e) => setProofFile(e.target.files?.[0] || null)} accept="image/*" />
                            {previewUrl && <img src={previewUrl} className="mt-2 w-48 rounded" />}
                        </div>

                        <div>
                            <Label>Rejection Reason</Label>
                            <Textarea
                                placeholder="Enter reason for rejection..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button
                                onClick={() => handleStatusChange({ orderId: order.id, newStatus: 'rejected', rejectReason: rejectReason })}
                                variant="destructive"
                            >
                                Reject
                            </Button>
                            <Button onClick={() => handleStatusChange({ orderId: order.id, newStatus: 'approved', file: proofFile })}>Approve</Button>
                        </div>
                    </div>
                )}

                {order.status === 'approved' && (
                    <div className="flex w-full justify-between gap-6">
                        {order.transaction_proof_url && (
                            <div>
                                <p>Proof of Payment:</p>
                                <img src={order.transaction_proof_url} className="mt-2 w-48 rounded" />
                            </div>
                        )}
                        <Button onClick={() => handleStatusChange({ orderId: order.id, newStatus: 'finished' })}>Finish Order</Button>
                    </div>
                )}

                {order.status === 'rejected' && (
                    <div>
                        <p className="font-bold">Reject Reason:</p>
                        <p>{order.reject_reason}</p>
                    </div>
                )}
            </CardFooter>
        </>
    );
};

// Expanded Order Content Component
export const ExpandedOrderContent = ({ order }: { order: Order }) => {
    return (
        <>
            <Separator />
            <CardContent className="space-y-4 p-4">
                <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                            <div className="text-sm font-medium">Rental Period</div>
                            <div className="text-sm">
                                {new Date(order.rental_start).toLocaleDateString()} - {new Date(order.rental_end).toLocaleDateString()} (
                                {calculateRentalDays(new Date(order.rental_start), new Date(order.rental_end))} days)
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm font-medium">Delivery Method</div>
                            <div className="text-sm">{order.delivery_method}</div>
                        </div>
                    </div>

                    <OrderItems items={order.items} />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <div className="text-sm font-medium">Payment Information</div>
                            <div className="text-sm">
                                <p></p>
                            </div>
                        </div>
                        <OrderSummary order={order} />
                    </div>
                </div>
            </CardContent>
            <OrderFooter order={order} />
        </>
    );
};
