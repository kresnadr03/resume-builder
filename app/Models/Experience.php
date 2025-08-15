<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes; // aktifkan jika perlu

class Experience extends Model
{
    use HasFactory; //, SoftDeletes;

    protected $fillable = [
        'user_id',
        'company',
        'role',
        'start_date',
        'end_date',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
