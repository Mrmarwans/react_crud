<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'description',
        'duration_minutes',
        'scheduled_at',
        'status',
    ];

    /**
     * A lecture belongs to a course.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
