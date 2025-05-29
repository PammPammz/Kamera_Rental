<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'full_name', 'email', 'phone',
        'purpose', 'delivery_method', 'address', 'notes',
        'rental_start', 'rental_end', 'delivery_fee',
        'subtotal', 'total',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
