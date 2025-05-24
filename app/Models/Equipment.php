<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Equipment extends Model
{
    protected $table = 'equipments';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'stock',
        'status',
        'category_id',
        'image',
        'price'
    ];

    protected static function booted()
    {
        static::saving(function ($equipment) {
            if (empty($equipment->slug)) {
                $equipment->slug = Str::slug($equipment->name);
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
