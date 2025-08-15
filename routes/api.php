<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\UploadController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',     [AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);

    Route::apiResource('educations',   EducationController::class);
    Route::apiResource('experiences',  ExperienceController::class);
    Route::apiResource('skills',       SkillController::class);
    Route::apiResource('projects',     ProjectController::class);
    Route::apiResource('certificates', CertificateController::class);

    Route::post('/upload/profile',     [UploadController::class, 'profile']);
    Route::post('/upload/project',     [UploadController::class, 'projectImage']);
    Route::post('/upload/certificate', [UploadController::class, 'certificateImage']);
});
