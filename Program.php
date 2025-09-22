<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'artist_id',
        'runtime',
        'payment_type',
        'price',
    ];

    public function Artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function Performance(): BelongsToMany
    {
        return $this->belongsToMany(Performance::class);
    }
}
