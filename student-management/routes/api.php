<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LectureController;
use App\Http\Controllers\ContactController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', [TestController::class, 'index']);
Route::apiResource('students', StudentController::class);
Route::apiResource('courses', CourseController::class);
Route::apiResource('lectures', LectureController::class);

// Contact routes
Route::apiResource('contacts', ContactController::class);
Route::post('/contacts/{contact}/mark-as-read', [ContactController::class, 'markAsRead']);
Route::post('/contacts/{contact}/mark-as-replied', [ContactController::class, 'markAsReplied']);
Route::get('/contacts-unread-count', [ContactController::class, 'unreadCount']);
