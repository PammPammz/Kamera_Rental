<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
       'order_id', 'checkout_id', 'equipment_id', 'quantity', 'price',
    ];

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
