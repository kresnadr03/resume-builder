<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';   // <-- paksa ke tabel plural

    protected $fillable = [
        'school',
        'degree',
        'start_year',
        'end_year',
        'user_id',   // <-- penting, biar ikut ke-insert
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
