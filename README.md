# Laravel + React
Підготовка:  
composer create-project laravel/laravel laravel_react  
composer require laravel/breeze --dev  
php artisan breeze:install react  

Запуск:  
php artisan serve  
npm run dev  

Створення моделі, міграції та контролера:  
php artisan make:model -mrc Product

Створення фабрики(фейкові пости):  
php artisan make:factory ProductFactory  

Застосувати міграцію та сід:  
php artisan migrate:fresh --seed  

Для цього проекту:
Зробити .env  
php artisan migrate  
php artisan migrate:fresh --seed  
php artisan storage:link
php artisan key:generate
