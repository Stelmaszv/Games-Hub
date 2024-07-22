<?php

declare(strict_types=1);

namespace App\Infrastructure;

class Languages
{
    private const LANGUAGES_LIST = [
        [
            'key' => 'en', 
            'name' => 'English',
            'flag' => 'https://d.allegroimg.com/original/0160c5/3b0359234c95b7a4baac988680dd/OFICJALNA-FLAGA-WIELKIEJ-BRYTANII-UK-ANGIELSKA' 
        ],
        [
            'key' => 'pl', 
            'name' => 'Polski',
            'flag' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACgCAMAAADUx0IOAAAAElBMVEXp6OfUIT3q7Ovmz9DYWWfTETQtMyOrAAAA0UlEQVR4nO3QCQ3AQAzAsO7jT3kwolNtBFFmAAAAAAAAAAAAAAAAAAAAAAAAADjQvdw8y8273HzLzbWcAXVAzYA6oGZAHVAzoA6oGVAH1AyoA2oG1AE1A+qAmgF1QM2AOqBmQB1QM6AOqBlQB9QMqANqBtQBNQPqgJoBdUDNgDqgZkAdUDOgDqgZUAfUDKgDagbUATUD6oCaAXVAzYA6oGZAHVAzoA6oGVAH1AyoA2oG1AE1A+qAmgF1QM2AOqBmQB1QM6AOqBlQB9QMqANq6wf80jJcAW6NkIwAAAAASUVORK5CYII=' 
        ],
        [
            'key' => 'fr', 
            'name' => 'Français',
            'flag' => 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg' 
        ]
    ];

    public static function getLanguagesKeys(): array
    {
        return array_map(function ($language) {
            return $language['lang'];
        }, self::LANGUAGES_LIST);
    }

    public static function getLanguagesList(): array
    {
        return self::LANGUAGES_LIST;
    }

}