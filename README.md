# Run

1. Rename env.example to .env, uncomment DB_CONNECTION
2. php artisan migrate
3. php artisan storage:link
4. Copy public/images/product_photos to public/storage
5. php artisan migrate --seed
6. php artisan key:generate
7. php artisan serve
8. npm run dev

## Create Laravel - React

1. composer create-project laravel/laravel laravel_react
2. composer require laravel/breeze --dev
3. php artisan breeze:install react
4. php artisan make:model -mrcf Product

## One to Many --- Project - Task

Project model  
public function tasks()  
{  
&emsp; return $this->hasMany(Task::class, 'project_id', 'id');  
}

Task migration  
$table->foreignIdFor(App\Models\Project::class, 'project_id')->constrained();

Task model  
public function project()  
{  
&emsp; return $this->belongsTo(Project::class, 'project_id', 'id');  
}
