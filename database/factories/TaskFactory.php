<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'project_id' => $this->faker->numberBetween(1, 1),
            'completed' => $this->faker->boolean(),
        ];
    }
}
