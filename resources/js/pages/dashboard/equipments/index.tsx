import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Equipment } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';

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
    const handleDelete = (id: number) => {
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

                <table className="mt-4 min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Stock</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipments.map((equipment) => (
                            <tr key={equipment.id}>
                                <td className="border px-4 py-2">{equipment.id}</td>
                                <td className="border px-4 py-2">{equipment.name}</td>
                                <td className="border px-4 py-2">{equipment.category?.name || '-'}</td>
                                <td className="border px-4 py-2">{equipment.stock}</td>
                                <td className="border px-4 py-2 capitalize">{equipment.status}</td>
                                <td className="border px-4 py-2">
                                    <Button onClick={() => Inertia.visit(`/dashboard/equipments/${equipment.id}/edit`)} className="mr-2">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(equipment.id)} variant="destructive">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
