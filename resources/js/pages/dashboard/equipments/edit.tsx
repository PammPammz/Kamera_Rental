import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Category, Equipment } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { equipmentsBreadcrumbs } from '.';

interface Props {
    equipment: Equipment;
    categories: Category[];
    errors: Partial<Record<keyof Equipment, string[]>>;
}

const EditEquipment = ({ equipment, categories, errors }: Props) => {
    const [form, setForm] = useState({
        name: equipment.name,
        description: equipment.description || '',
        stock: equipment.stock,
        status: equipment.status,
        category_id: equipment.category_id ? equipment.category_id.toString() : '',
    });

    const handleChange = (field: string, value: unknown) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.put(`/dashboard/equipments/${equipment.id}`, form);
    };

    return (
        <AppLayout breadcrumbs={[...equipmentsBreadcrumbs, { title: 'Edit Equipment', href: `/dashboard/equipments/${equipment.id}/edit` }]}>
            <Head title={`Edit Equipment: ${equipment.name}`} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Edit Equipment</h1>

                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={3}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>}
                    </div>

                    {/* Stock */}
                    <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            type="number"
                            min={0}
                            value={form.stock}
                            onChange={(e) => handleChange('stock', parseInt(e.target.value, 10))}
                            required
                        />
                        {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock[0]}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(value) => handleChange('status', value)} value={form.status} id="status" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status[0]}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="category_id">Category</Label>
                        <Select onValueChange={(value) => handleChange('category_id', value)} value={form.category_id} id="category_id">
                            <SelectTrigger>
                                <SelectValue placeholder="Select category (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id[0]}</p>}
                    </div>

                    {/* Submit */}
                    <Button type="submit">Update Equipment</Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditEquipment;
