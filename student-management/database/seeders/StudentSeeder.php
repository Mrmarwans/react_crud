<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('students')->insert([
            [
                'name'       => 'Alice Johnson',
                'email'      => 'alice@example.com',
                'course'     => 'Computer Science',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Bob Smith',
                'email'      => 'bob@example.com',
                'course'     => 'Information Technology',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Carol White',
                'email'      => 'carol@example.com',
                'course'     => 'Data Science',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'David Brown',
                'email'      => 'david@example.com',
                'course'     => 'Cybersecurity',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Eva Martinez',
                'email'      => 'eva@example.com',
                'course'     => 'Software Engineering',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
