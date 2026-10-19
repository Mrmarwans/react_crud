<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       

        $message = "success";
        $data = Student::all();

        return response()->json(['message' => $message, 'data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'course' => 'required'
        ]);

        $student = Student::create($validated);  
        
        if($student){
            return response()->json(['message' => 'Student created successfully', 'data' => $student], 201); 
        }
        else{
            return response()->json(['message' => 'Student creation failed'], 500);
        }

       
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $edit = Student::find($student->id);

        if($edit){
            return response()->json(['message' => 'Student found successfully', 'data' => $edit]);
        }
        else{
            return response()->json(['message' => 'Student not found', 'data' => $edit]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'course' => 'required'
        ]);

        $update = $student->update($validated);

        if($update){
            return response()->json(['message' => 'Student updated successfully', 'data' => $student]);
        }
        else{
            return response()->json(['message' => 'Student update failed'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $delete = Student::destroy($student->id);
        if($delete){
            return response()->json(['message' => 'Student deleted successfully']);
        }
        else{
            return response()->json(['message' => 'Student deletion failed']);
        }
    }
}
