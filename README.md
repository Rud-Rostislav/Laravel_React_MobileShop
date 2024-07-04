# Laravel + React

## Routes:

Направлення URL додатка до відповідного метода контролера.

## Controller:

Керування логікою додатка, створення методів.

## Models:

Структура даних для взаємодії з базою даних. Кожна таблиця у базі даних матиме відповідну модель.

## Migrations:

Спосіб створення / модифікації структури бази даних.

## Request:

Перевірка даних, які надійшли від користувача.

Створення Request:  
php artisan make:request PostRequest

## Factory:

Створення фейкових даних для моделей.

## Seeders:

Застосування Factory до бази даних.

## Middleware:

Механізм фільтрації запитів до вашого додатку.

Створення Middleware:  
php artisan make:middleware IsAdminMiddleware

## Laravel Breeze:

Стартовий шаблон, який надає базовий функціонал для автентифікації, реєстрації, скидання паролю та іншого.

## One to many:

Project - Task:  
Task migration:  
$table->foreignIdFor(App\Models\Project::class, 'project_id')->constrained();

Project model:  
public function tasks()  
{  
return $this->hasMany(Task::class, 'project_id', 'id');  
}

Task model:  
public function project()  
{  
return $this->belongsTo(Project::class, 'project_id', 'id');  
}

## Створення проєкту:

1. composer create-project laravel/laravel laravel_react
2. composer require laravel/breeze --dev
3. php artisan breeze:install react

## Створення моделі, міграції, контролера та фабрики:

php artisan make:model -mrcf Product

## Запуск проєкту:

1. env створити / оновити на sqlite
2. php artisan migrate
3. php artisan migrate:fresh --seed
4. php artisan storage:link
5. php artisan key:generate
6. php artisan serve
7. npm run dev
