<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Warehouse extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'vendor_id',
        'name',
        'address',
        'latitude',
        'longitude',
        'total_area',
        'capacity',
        'type',
        'amenities',
        'images',
        'documents',
        'pricing_model',
        'price',
        'terms_conditions',
        'is_active'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'total_area' => 'decimal:2',
        'price' => 'decimal:2',
        'amenities' => 'array',
        'images' => 'array',
        'documents' => 'array',
        'is_active' => 'boolean'
    ];

    /**
     * Get the vendor that owns the warehouse.
     */
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    /**
     * Get the availability records for the warehouse.
     */
    public function availability(): HasMany
    {
        return $this->hasMany(WarehouseAvailability::class);
    }
}
