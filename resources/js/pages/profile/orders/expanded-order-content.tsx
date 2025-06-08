import { CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { calculateRentalDays, formatRupiah } from '@/lib/utils';
import { Order } from '@/types';

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
                            src={item.equipment.image_url || 'https://picsum.photos/1000'}
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
    if (order.status !== 'approved' && order.status !== 'rejected') return null;

    return (
        <>
            <Separator />
            <CardFooter className="w-full">
                {order.status === 'approved' && (
                    <div className="flex w-full justify-between gap-6">
                        {order.transaction_proof_url && (
                            <div>
                                <p>Proof of Payment:</p>
                                <img src={order.transaction_proof_url} className="mt-2 w-48 rounded" />
                            </div>
                        )}
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
            <Separator />
            <OrderFooter order={order} />
        </>
    );
};
