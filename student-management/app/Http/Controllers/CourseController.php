<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of courses.
     */
    public function index()
    {
        $data = Course::all();

        return response()->json(['message' => 'success', 'data' => $data]);
        
    }

    /**
     * Store a newly created course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|unique:courses',
            'description'     => 'nullable|string',
            'duration_months' => 'required|integer',
            'status'          => 'in:active,inactive',
        ]);

        $course = Course::create($validated);

        return response()->json(['message' => 'Course created successfully', 'data' => $course], 201);
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course)
    {
        return response()->json(['message' => 'success', 'data' => $course]);
    }

    /**
     * Update the specified course.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name'            => 'sometimes|string|unique:courses,name,' . $course->id,
            'description'     => 'nullable|string',
            'duration_months' => 'sometimes|integer',
            'status'          => 'in:active,inactive',
        ]);

        $course->update($validated);

        return response()->json(['message' => 'Course updated successfully', 'data' => $course]);
    }

    /**
     * Remove the specified course.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }
}
