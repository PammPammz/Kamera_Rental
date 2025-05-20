// resources/js/Pages/Dashboard/Categories/Edit.tsx

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { categoriesBreadcrumbs } from '.';

interface Props {
    category: {
        id: number;
        name: string;
        description: string;
    };
}

const EditCategory = ({ category }: Props) => {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.put(`/dashboard/categories/${category.id}`, {
            name,
            description,
        });
    };

    return (
        <AppLayout breadcrumbs={[...categoriesBreadcrumbs, { title: 'Edit Category', href: `/dashboard/categories/${category.id}/edit` }]}>
            <Head title="Edit Category" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Edit Category</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description (optional)
                        </label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1" />
                    </div>

                    <Button type="submit">Update Category</Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditCategory;
