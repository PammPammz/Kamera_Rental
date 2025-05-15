import { Button } from '@/components/ui/button'; // Button component
import AppLayout from '@/layouts/app-layout'; // App Layout component
import { Category, type BreadcrumbItem } from '@/types'; // Category type definition
import { Inertia } from '@inertiajs/inertia'; // Inertia.js for handling navigation
import { Head } from '@inertiajs/react'; // Inertia's Head for managing titles

// Breadcrumbs for the Categories page
const breadcrumbs: BreadcrumbItem[] = [
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
    categories: Category[]; // List of categories passed as props
}

const CategoryIndex = ({ categories }: Props) => {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            Inertia.delete(`/dashboard/categories/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" /> {/* Set page title */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="my-4">
                    <Button onClick={() => Inertia.visit('/dashboard/categories/create')} className="mb-4">
                        Add New Category
                    </Button>
                    <div className="overflow-hidden rounded-xl border">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="border px-4 py-2">{category.id}</td>
                                            <td className="border px-4 py-2">{category.name}</td>
                                            <td className="border px-4 py-2">
                                                <Button onClick={() => Inertia.visit(`/dashboard/categories/${category.id}/edit`)} className="mr-2">
                                                    Edit
                                                </Button>
                                                <Button onClick={() => handleDelete(category.id)} variant="destructive">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="py-4 text-center">
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CategoryIndex;
