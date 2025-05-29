import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Category, type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const categoriesBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

interface Props {
    categories: Category[];
}

const CategoryIndex = ({ categories }: Props) => {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            Inertia.delete(`/dashboard/categories/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={categoriesBreadcrumbs}>
            <Head title="Categories" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Button onClick={() => Inertia.visit('/dashboard/categories/create')} className="my-4">
                    Add New Category
                </Button>

                <div className="overflow-hidden rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => Inertia.visit(`/dashboard/categories/${category.id}/edit`)} className="mr-2">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDelete(category.id)} variant="destructive">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="py-4 text-center">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
};

export default CategoryIndex;
