<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Http\Request;

class LectureController extends Controller
{
    /**
     * Display a listing of all lectures (with course info).
     */
    public function index()
    {
        $data = Lecture::with('course')->get();

        return response()->json(['message' => 'success', 'data' => $data]);
    }

    /**
     * Store a newly created lecture.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id'        => 'required|exists:courses,id',
            'title'            => 'required|string|max:255',
            'description'      => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'scheduled_at'     => 'nullable|date',
            'status'           => 'in:scheduled,completed,cancelled',
        ]);

        $lecture = Lecture::create($validated);

        return response()->json(['message' => 'Lecture created successfully', 'data' => $lecture->load('course')], 201);
    }

    /**
     * Display the specified lecture.
     */
    public function show(Lecture $lecture)
    {
        return response()->json(['message' => 'success', 'data' => $lecture->load('course')]);
    }

    /**
     * Update the specified lecture.
     */
    public function update(Request $request, Lecture $lecture)
    {
        $validated = $request->validate([
            'course_id'        => 'sometimes|exists:courses,id',
            'title'            => 'sometimes|string|max:255',
            'description'      => 'nullable|string',
            'duration_minutes' => 'sometimes|integer|min:1',
            'scheduled_at'     => 'nullable|date',
            'status'           => 'in:scheduled,completed,cancelled',
        ]);

        $lecture->update($validated);

        return response()->json(['message' => 'Lecture updated successfully', 'data' => $lecture->load('course')]);
    }

    /**
     * Remove the specified lecture.
     */
    public function destroy(Lecture $lecture)
    {
        $lecture->delete();

        return response()->json(['message' => 'Lecture deleted successfully']);
    }
}
