<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Note::class, 100)->create();
    }
}
