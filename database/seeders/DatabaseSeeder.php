<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => '1',
            'is_admin' => true
        ]);

        for ($i = 0; $i <= 100; $i++) {
            if ($i !== 4) {
                if ($i >= 6) {
                    Product::create([
                        'name' => 'iPhone ' . 5 + $i . " Pro Max",
                        'description' => 'Опис iPhone ' . 5 + $i . " Pro Max",
                        'price' => 5000 + ($i * 5000),
                        'quantity' => 1 + ($i * 10)
                    ]);
                } else {
                    Product::create([
                        'name' => 'iPhone ' . 5 + $i,
                        'description' => 'Опис iPhone ' . 5 + $i,
                        'price' => 5000 + ($i * 1000),
                        'quantity' => 1 + ($i * 10)
                    ]);
                }
            }
        }

        for ($i = 1; $i <= 2; $i++) {
            $project = Project::create([
                'name' => "Проєкт $i",
            ]);

            for ($j = 1; $j <= 5; $j++) {
                Task::create([
                    'name' => "Задача $j",
                    'description' => "Опис задачі $j",
                    'project_id' => $project->id,
                    'completed' => rand(false, true)
                ]);
            }
        }

    }
}
