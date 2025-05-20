// resources/js/Pages/Dashboard/Categories/Create.tsx

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { categoriesBreadcrumbs } from '.';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.post('/dashboard/categories', {
            name,
            description,
        });
    };

    return (
        <AppLayout breadcrumbs={[...categoriesBreadcrumbs, { title: 'Create Category', href: '/dashboard/categories/create' }]}>
            <Head title="Create Category" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Create Category</h1>
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

                    <Button type="submit">Create Category</Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreateCategory;
