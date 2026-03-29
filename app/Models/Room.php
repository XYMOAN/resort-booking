<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'room_category_id', 'name', 'slug', 'capacity', 'available',
        'tour', 'base_price', 'amenities', 'inclusions',
        'images', 'is_featured',
    ];

    protected $casts = [
        'tour'        => 'array',
        'amenities'   => 'array',
        'inclusions'  => 'array',
        'images'      => 'array',
        'is_featured' => 'boolean',
        'base_price'  => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(RoomCategory::class, 'room_category_id');
    }
}