<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, Notifiable, HasFactory;

    /**
     * Kolom yang boleh diisi mass-assignment.
     * Tambahkan 'profile_photo' agar bisa di-update lewat upload controller.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_photo', // path file di storage (optional, nullable)
    ];

    /**
     * Kolom yang disembunyikan saat serialisasi (JSON).
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Properti turunan yang otomatis ikut di-serialize (JSON).
     * Frontend cukup consume 'profile_photo_url' sebagai URL publik.
     *
     * @var list<string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Casting atribut.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            // Laravel 10+ 'hashed' akan auto-hash saat set password
            'password' => 'hashed',
        ];
    }

    /* ============================================================
     |  Relationships (User → hasMany)
     |  Pastikan model-model di bawah sudah kamu buat:
     |  Education, Experience, Skill, Project, Certificate
     * ============================================================*/

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    /* ============================================================
     |  Accessors
     |  - profile_photo_url: dari path storage → URL publik
     * ============================================================*/

    /**
     * URL publik untuk foto profil.
     * Mengembalikan null jika profile_photo kosong.
     */
    protected function profilePhotoUrl(): Attribute
    {
        return Attribute::get(function () {
            if (empty($this->profile_photo)) {
                return null;
            }
            // Jika sudah berupa URL absolut, kembalikan apa adanya
            if (str_starts_with($this->profile_photo, 'http://') || str_starts_with($this->profile_photo, 'https://')) {
                return $this->profile_photo;
            }
            // Default: anggap path storage (e.g. 'public/profile/xxx.jpg')
            return Storage::url($this->profile_photo);
        });
    }
}
