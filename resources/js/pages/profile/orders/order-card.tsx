import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getStatusBadgeClasses, MockOrder } from '.';
import { ExpandedOrderContent } from './expanded-order-content';

interface Props {
    order: MockOrder;
    isExpanded: boolean;
    toggleOrderExpand: (id: string) => void;
}

export default function OrderCard({ order, isExpanded, toggleOrderExpand }: Props) {
    return (
        <Card key={order.id} className="overflow-hidden">
            <CardHeader className="hover:bg-muted/50 cursor-pointer p-4" onClick={() => toggleOrderExpand(order.id)}>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                        {isExpanded ? (
                            <ChevronDown className="text-muted-foreground h-5 w-5" />
                        ) : (
                            <ChevronRight className="text-muted-foreground h-5 w-5" />
                        )}
                        <div>
                            <div className="font-medium">Order #{order.id}</div>
                            <div className="text-muted-foreground text-sm">Placed on {new Date(order.orderDate).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge className={getStatusBadgeClasses(order.status)}>{order.status}</Badge>
                        <div className="text-right">
                            <div className="font-medium">${order.total.toFixed(2)}</div>
                            <div className="text-muted-foreground text-sm">{order.items.length} items</div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            {isExpanded && <ExpandedOrderContent order={order} />}
        </Card>
    );
}
