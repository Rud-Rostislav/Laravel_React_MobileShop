<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\Photo;
use App\Models\Product;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail',
            'password' => 1,
            'is_admin' => true
        ]);

        Category::create(['name' => 'Смартфони']);
        Category::create(['name' => 'Планшети']);
        Category::create(['name' => 'Ноутбуки']);
        Category::create(['name' => 'Навушники']);
        Category::create(['name' => 'Смарт-годинники']);

        $now = Carbon::now();

        for ($i = 1; $i <= 5; $i++) {
            $created_at = $now->copy()->subDays(6 - $i);
            Product::create([
                'name' => 'iPhone 1' . ($i + 1) . ' Pro Max',
                'description' => 'Опис для iPhone 1' . $i . ' Pro Max',
                'price' => 55000 + $i * 1000,
                'quantity' => 10 * $i,
                'category_id' => 1,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
            for ($p = 1; $p <= 2; $p++) {
                Photo::create([
                    'product_id' => $i,
                    'path' => 'product_photos/iPhone_' . $i . '_' . $p . '.jpg'
                ]);
            }
        }

        for ($i = 1; $i <= 5; $i++) {
            $created_at = $now->copy()->subDays(11 - $i);
            Product::create([
                'name' => 'iPad ' . ($i + 4),
                'description' => 'Опис для iPad ' . ($i + 4),
                'price' => 35000 + $i * 1000,
                'quantity' => 10 * $i,
                'category_id' => 2,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
            for ($p = 1; $p <= 2; $p++) {
                Photo::create([
                    'product_id' => $i + 5,
                    'path' => 'product_photos/iPad_' . $i . '_' . $p . '.jpg'
                ]);
            }
        }

        for ($i = 1; $i <= 5; $i++) {
            $created_at = $now->copy()->subDays(16 - $i);
            Product::create([
                'name' => 'MacBook ' . $i,
                'description' => 'Опис для MacBook ' . $i,
                'price' => 45000 + $i * 1000,
                'quantity' => 10 * $i,
                'category_id' => 3,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
            for ($p = 1; $p <= 2; $p++) {
                Photo::create([
                    'product_id' => $i + 10,
                    'path' => 'product_photos/MacBook_' . $i . '_' . $p . '.jpg'
                ]);
            }
        }

        for ($i = 1; $i <= 5; $i++) {
            $created_at = $now->copy()->subDays(21 - $i);
            Product::create([
                'name' => 'Notebook ' . $i,
                'description' => 'Опис для Notebook ' . $i,
                'price' => 40000 + $i * 1000,
                'quantity' => 10 * $i,
                'category_id' => 3,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
            for ($p = 1; $p <= 2; $p++) {
                Photo::create([
                    'product_id' => $i + 15,
                    'path' => 'product_photos/Notebook_' . $i . '_' . $p . '.jpg'
                ]);
            }
        }

        for ($i = 1; $i <= 5; $i++) {
            $created_at = $now->copy()->subDays(26 - $i);
            Product::create([
                'name' => 'AirPods ' . $i,
                'description' => 'Опис для AirPods ' . $i,
                'price' => 8000 + $i * 1000,
                'quantity' => 10 * $i,
                'category_id' => 4,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
            for ($p = 1; $p <= 2; $p++) {
                Photo::create([
                    'product_id' => $i + 20,
                    'path' => 'product_photos/AirPods_' . $i . '_' . $p . '.jpg'
                ]);
            }
        }

        for ($i = 1; $i <= 5; $i++) {
            $created_at = $now->copy()->subDays(31 - $i);
            Product::create([
                'name' => 'Apple Watch ' . $i,
                'description' => 'Опис для Apple Watch ' . $i,
                'price' => 10000 + $i * 1000,
                'quantity' => 10 * $i,
                'category_id' => 5,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
            for ($p = 1; $p <= 2; $p++) {
                Photo::create([
                    'product_id' => $i + 25,
                    'path' => 'product_photos/Watch_' . $i . '_' . $p . '.jpg'
                ]);
            }
        }

        Order::create([
            'name' => 'Іван',
            'email' => 'ivan@mail.com',
            'phone' => '0965662823',
            'comment' => 'Не телефонуйте',
            'products_id' => '1',
            'confirmed' => 0
        ]);

        Order::create([
            'name' => 'Петро',
            'email' => 'petro@mail.com',
            'phone' => '0965662823',
            'comment' => 'Не телефонуйте',
            'products_id' => '4,5,6',
            'confirmed' => 0
        ]);

        Order::create([
            'name' => 'Вася',
            'email' => 'vasya@mail.com',
            'phone' => '0965662823',
            'comment' => 'Не телефонуйте',
            'products_id' => '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20',
            'confirmed' => 0
        ]);

        Order::create([
            'name' => 'Маша',
            'email' => 'masha@mail.com',
            'phone' => '0965662823',
            'comment' => 'Не телефонуйте',
            'products_id' => '1',
            'confirmed' => 1
        ]);

        Order::create([
            'name' => 'Саша',
            'email' => 'sasha@mail.com',
            'phone' => '0965662823',
            'comment' => 'Не телефонуйте',
            'products_id' => '16,17,18',
            'confirmed' => 1
        ]);

        Order::create([
            'name' => 'Вася',
            'email' => 'vasya@mail.com',
            'phone' => '0965662823',
            'comment' => 'Не телефонуйте',
            'products_id' => '19,20,21, 1, 3, 7, 9, 12',
            'confirmed' => 1
        ]);

        for ($i = 1; $i <= 2; $i++) {
            $project = Project::create([
                'name' => "Проєкт $i",
            ]);

            for ($j = 1; $j <= 5; $j++) {
                Task::create([
                    'name' => "Задача $j",
                    'description' => "Опис задачі $j",
                    'project_id' => $project->id,
                    'completed' => rand(0, 1)
                ]);
            }
        }
    }
}
