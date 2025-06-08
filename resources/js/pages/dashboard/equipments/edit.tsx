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
        price: equipment.price,
        status: equipment.status,
        category_id: equipment.category_id ? equipment.category_id.toString() : '',
        image_attachment: null as File | null,
        image_url: equipment.image_url,
    });

    const handleChange = (field: string, value: unknown) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('_method', 'PUT');
        data.append('name', form.name);
        data.append('description', form.description);
        data.append('price', String(form.price));
        data.append('status', form.status);
        if (form.category_id) data.append('category_id', form.category_id);
        if (form.image_attachment) data.append('image_attachment', form.image_attachment);

        for (const [key, val] of data.entries()) {
            console.log(key, val);
        }

        Inertia.post(`/dashboard/equipments/${equipment.slug}`, data, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={[...equipmentsBreadcrumbs, { title: 'Edit Equipment', href: `/dashboard/equipments/${equipment.slug}/edit` }]}>
            <Head title={`Edit Equipment: ${equipment.name}`} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Edit Equipment</h1>

                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            min={0}
                            value={form.price}
                            onChange={(e) => handleChange('price', parseInt(e.target.value, 10))}
                            required
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>

                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChange('image_attachment', e.target.files?.[0] || null)}
                        />
                        {form.image_url && <img src={form.image_url} alt="camera equipment" className="mt-2 w-48 rounded" />}
                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
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
                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
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
                        {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                    </div>

                    {/* Submit */}
                    <Button type="submit">Update Equipment</Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditEquipment;
