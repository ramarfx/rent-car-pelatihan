<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'username' => 'admin1',
            'password' => 'admin1',
            'phone' => '1234567890',
            'role' => 'admin'
        ]);

        User::create([
            'username' => 'user1',
            'password' => 'user1',
            'phone' => '1234567890',
            'role' => 'user'
        ]);
    }
}
