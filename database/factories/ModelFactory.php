<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Note::class, function (Faker\Generator $faker) {
    return [
        'username' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'homepage' => $faker->url,
        'text' => $faker->realText($maxNbChars = 200, $indexSize = 2),
        'ip' => $faker->ipv4,
        'browser' => $faker->randomElement($array = array ('chrome','firefox','opera', 'edge', 'safari'))
    ];
});
