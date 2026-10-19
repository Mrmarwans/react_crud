<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('courses')->insert([
            [
                'name'            => 'Computer Science',
                'description'     => 'Study of computation, algorithms, data structures, and software systems.',
                'duration_months' => 48,
                'status'          => 'active',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'name'            => 'Information Technology',
                'description'     => 'Focuses on the use and management of technology in organizations.',
                'duration_months' => 36,
                'status'          => 'active',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'name'            => 'Data Science',
                'description'     => 'Combines statistics, mathematics, and programming to analyze data.',
                'duration_months' => 24,
                'status'          => 'active',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'name'            => 'Cybersecurity',
                'description'     => 'Covers protection of systems, networks, and programs from digital attacks.',
                'duration_months' => 36,
                'status'          => 'active',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'name'            => 'Software Engineering',
                'description'     => 'Systematic approach to the design, development, and maintenance of software.',
                'duration_months' => 48,
                'status'          => 'active',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'name'            => 'Artificial Intelligence',
                'description'     => 'Explores machine learning, neural networks, and intelligent systems.',
                'duration_months' => 24,
                'status'          => 'inactive',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ]);
    }
}
