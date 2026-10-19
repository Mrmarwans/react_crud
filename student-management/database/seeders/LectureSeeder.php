<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LectureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('lectures')->insert([
            [
                'course_id'        => 1, // Computer Science
                'title'            => 'Introduction to Programming',
                'description'      => 'Overview of programming concepts, variables, data types, and control flow.',
                'duration_minutes' => 60,
                'scheduled_at'     => '2026-11-01 09:00:00',
                'status'           => 'scheduled',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'course_id'        => 1, // Computer Science
                'title'            => 'Data Structures & Algorithms',
                'description'      => 'Covers arrays, linked lists, stacks, queues, and sorting algorithms.',
                'duration_minutes' => 90,
                'scheduled_at'     => '2026-11-03 09:00:00',
                'status'           => 'scheduled',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'course_id'        => 2, // Information Technology
                'title'            => 'Networking Fundamentals',
                'description'      => 'Introduction to networking protocols, OSI model, and IP addressing.',
                'duration_minutes' => 75,
                'scheduled_at'     => '2026-11-02 10:00:00',
                'status'           => 'scheduled',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'course_id'        => 2, // Information Technology
                'title'            => 'Database Management Systems',
                'description'      => 'Relational databases, SQL queries, normalization, and ER diagrams.',
                'duration_minutes' => 90,
                'scheduled_at'     => '2026-11-04 10:00:00',
                'status'           => 'completed',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'course_id'        => 3, // Data Science
                'title'            => 'Statistics for Data Science',
                'description'      => 'Probability, distributions, hypothesis testing, and regression analysis.',
                'duration_minutes' => 80,
                'scheduled_at'     => '2026-11-05 11:00:00',
                'status'           => 'scheduled',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'course_id'        => 3, // Data Science
                'title'            => 'Machine Learning Basics',
                'description'      => 'Supervised and unsupervised learning, model training and evaluation.',
                'duration_minutes' => 120,
                'scheduled_at'     => '2026-11-07 11:00:00',
                'status'           => 'scheduled',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'course_id'        => 4, // Cybersecurity
                'title'            => 'Ethical Hacking Fundamentals',
                'description'      => 'Introduction to penetration testing, reconnaissance, and vulnerability scanning.',
                'duration_minutes' => 90,
                'scheduled_at'     => '2026-11-06 09:00:00',
                'status'           => 'cancelled',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'course_id'        => 5, // Software Engineering
                'title'            => 'Software Development Life Cycle',
                'description'      => 'Agile, Waterfall, and Scrum methodologies for managing software projects.',
                'duration_minutes' => 60,
                'scheduled_at'     => '2026-11-08 14:00:00',
                'status'           => 'scheduled',
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
        ]);
    }
}
