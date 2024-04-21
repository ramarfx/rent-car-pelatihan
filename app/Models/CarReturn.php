<?php

namespace App\Models;

use App\Models\Rent;
use App\Models\Penalty;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CarReturn extends Model
{
    use HasFactory;

    protected $guarded = 'id';

    // 1 return hanya punya 1 rent
    public function rent()
    {
        return $this->belongsTo(Rent::class);
    }

    public function penalty()
    {
        return $this->belongsTo(Penalty::class);
    }
}
