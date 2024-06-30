# Laravel + React

## Routes:

Спосіб управління URL додатку. Використовувати для направлення додатка до відповідного метода контролера.

## Controller:

Призначений для керування логікою вашого додатка. Ця логіка може бути обробкою форми запитів, системного вводу,
автентифікації користувачів тощо.

## Models:

В Laravel, моделі представляють структуру даних. Зазвичай, кожна таблиця в вашій базі даних матиме відповідну
модель. Вони дозволяють вам взаємодіяти з вашою базою даних, запитуючи дані, вставляючи нові записи, та інше.

## Migrations:

Міграції надають спосіб створення/модифікації структури бази даних. Вони є як контролем версій для вашої
бази даних, дозволяючи вашій команді змінювати та ділитися визначенням схеми бази даних додатка.

## Request:

Використовується для отримання та роботи з даними HTTP-запиту. З його допомогою можна легко доступитися до
даних, які надійшли від клієнта, таких як введені дані форми, заголовки, файли та інші деталі HTTP-запиту.

Створення Request:  
php artisan make:request PostRequest

## Factory:

Laravel factories є способом створення фейкових даних для моделей. За допомогою
фабрик, ви можете визначити типи даних, які будуть створені для кожного з полів ваших моделей.

## Seeders:

Дозволяють застосувати Factory до бази даних тестовими значеннями із factory.

## Middleware:

Механізм фільтрації запитів до вашого додатку. Наприклад,можна створити middleware, який перевіряє, чи має
користувач необхідні права доступу до певної сторінки. Якщо у користувача немає цих прав доступу, middleware може
перенаправити його на іншу сторінку або вивести повідомлення про помилку.

Створення Middleware:  
php artisan make:middleware IsAdminMiddleware

## Laravel Breeze:

Офіційний стартовий шаблон для розробки веб-додатків на основі Laravel, який надає базовий функціонал для
автентифікації, реєстрації, скидання паролю та інших аутентифікаційних операцій.

## One to many:

Project - Task  
У міграції Task створюємо поле:  
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
