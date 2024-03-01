# Laravel React + Laravel Vue
Підготовка:  
composer create-project laravel/laravel laravel_react  
composer require laravel/breeze --dev  
php artisan breeze:install react  

Запуск:  
php artisan serve  
npm run dev  

Створення моделі, міграції та контролера:  
php artisan make:model -mrc Product  

Лінк storage - public/storage для фото:  
php artisan storage:link  

Створення фабрики(фейкові пости):  
php artisan make:factory ProductFactory  

Застосувати міграцію та сід:  
php artisan migrate:fresh --seed  
