<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = ['user_id', 'equipment_id', 'quantity'];

    public function equipment()
    {
         return $this->belongsTo(\App\Models\Equipment::class, 'equipment_id');
    }
}
