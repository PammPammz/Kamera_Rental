<?php

namespace App\Models;

use App\Helpers\DiskHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Equipment extends Model
{
    protected $table = 'equipments';
    protected $appends = ['image_url'];

    protected $fillable = [
        'name',
        'slug',
        'description',
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

    
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        return DiskHelper::getS3Disk()->temporaryUrl(
            $this->image,
            now()->addMinutes(60)
        );
    }
}
