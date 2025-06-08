import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Equipment } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
    equipments: Equipment[];
}

export const equipmentsBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Equipments',
        href: '/equipments',
    },
];

export default function EquipmentIndex({ equipments }: Props) {
    const handleDelete = (id: number | string) => {
        if (confirm('Are you sure you want to delete this equipment?')) {
            Inertia.delete(`/dashboard/equipments/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={equipmentsBreadcrumbs}>
            <Head title="Equipments" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Equipments</h1>
                <Button onClick={() => Inertia.visit('/dashboard/equipments/create')} className="my-4">
                    Add New Equipment
                </Button>

                <div className="overflow-hidden rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {equipments.length > 0 ? (
                                equipments.map((equipment) => (
                                    <TableRow key={equipment.id}>
                                        <TableCell>{equipment.id}</TableCell>
                                        <TableCell>{equipment.name}</TableCell>
                                        <TableCell>{equipment.category?.name || '-'}</TableCell>
                                        <TableCell>{equipment.stock}</TableCell>
                                        <TableCell className="capitalize">{equipment.status}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => Inertia.visit(`/dashboard/equipments/${equipment.slug}/edit`)} className="mr-2">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDelete(equipment.slug)} variant="destructive">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-4 text-center">
                                        No equipments found.
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
