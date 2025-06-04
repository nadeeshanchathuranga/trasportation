<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourierReceiver extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'courier_id',
        'receiver_name',
        'receiver_address',
        'receiver_telephone',
        'location_order'
    ];
    
    public function courier()
    {
        return $this->belongsTo(Courier::class);
    }
}