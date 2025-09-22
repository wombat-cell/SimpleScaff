<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order_info extends Model
{
    use HasFactory;

    public function Performance(): BelongsToMany
    {
        return $this->belongsToMany(Performance::class);
    }
}
