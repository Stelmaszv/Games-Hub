<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Roles\RoleUser;
use App\Roles\RoleSuperAdmin;
use App\Roles\RolePublisherEditor;
use App\Roles\RolePublisherCreator;
use App\Generic\Components\AbstractDataFixture;

class UserData extends AbstractDataFixture{
    protected ?string $entity = User::class;
    protected array $data = [
        [
            'email' => 'user@qwe.com',
            'roles' => [
                RoleSuperAdmin::NAME,
                RoleUser::NAME
            ],
            'password' => '123'
        ],
        [
            'email' => 'kot123@dot.com',
            'roles' => [
                RoleUser::NAME,
                RolePublisherCreator::NAME,
                RolePublisherEditor::NAME
            ],
            'password' => 'qwe'
        ],
        [
            'email' => 'pani@wp.pl',
            'roles' => [
                RoleUser::NAME,
                RolePublisherEditor::NAME
            ],
            'password' => 'vbn'
        ]
    ];

    public function onPasswordSet(mixed $value,object $entity){
        return $this->passwordEncoder->hashPassword(
            $entity,
            $value
        );
    }
}