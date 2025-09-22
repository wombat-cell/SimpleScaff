<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Performance extends Model
{
    use HasFactory;

      protected $fillable = [
        'time_slot_start',
        'time_slot_end',
    ];

    public function Program(): BelongsToMany
    {
        return $this->BelongsToMany(Program::class);
    }

    public function OrderInfo(): BelongsToMany
    {
        return $this->belongsToMany(Order_info::class);
    }
}
