import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { calculateRentalDays } from '@/lib/utils';
import { MockOrder } from '.';

// Order Items Component
const OrderItems = ({ items }: { items: MockOrder['items'] }) => (
    <div className="space-y-2">
        <div className="text-sm font-medium">Items</div>
        <div className="overflow-hidden rounded-md border">
            <div className="bg-muted/50 grid grid-cols-[auto_1fr_auto] gap-4 p-3 text-sm font-medium">
                <div>Item</div>
                <div>Details</div>
                <div className="text-right">Price</div>
            </div>
            {items.map((item, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t p-3">
                    <div className="h-16 w-16 overflow-hidden rounded-md">
                        <img src={item.image || '/placeholder.svg'} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-muted-foreground text-sm">{item.category}</div>
                        <div className="text-sm">Quantity: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-muted-foreground text-xs">
                            ${item.price.toFixed(2)} × {item.quantity}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Order Summary Component
const OrderSummary = ({ order }: { order: MockOrder }) => (
    <div className="space-y-2">
        <div className="text-sm font-medium">Order Summary</div>
        <div className="space-y-1 text-sm">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>${order.delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
            </div>
        </div>
    </div>
);

// Expanded Order Content Component
export const ExpandedOrderContent = ({ order }: { order: MockOrder }) => (
    <>
        <Separator />
        <CardContent className="space-y-4 p-4">
            <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                        <div className="text-sm font-medium">Rental Period</div>
                        <div className="text-sm">
                            {new Date(order.rentalStart).toLocaleDateString()} - {new Date(order.rentalEnd).toLocaleDateString()} (
                            {calculateRentalDays(new Date(order.rentalStart), new Date(order.rentalEnd))} days)
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm font-medium">Delivery Method</div>
                        <div className="text-sm">{order.deliveryMethod}</div>
                    </div>
                </div>

                <OrderItems items={order.items} />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Payment Information</div>
                        <div className="text-sm">
                            <div>Card ending in {order.paymentInfo.cardLast4}</div>
                            <div className="text-muted-foreground">
                                {order.paymentInfo.cardType} • {order.paymentInfo.billingName}
                            </div>
                        </div>
                    </div>
                    <OrderSummary order={order} />
                </div>
            </div>
        </CardContent>
        <Separator />
    </>
);
