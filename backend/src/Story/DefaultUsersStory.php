<?php

namespace App\Story;

use App\Entity\User;
use App\Factory\CompanyFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Story;
use function Zenstruck\Foundry\lazy;

final class DefaultUsersStory extends Story
{
    public function build(): void
    {
        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
        UserFactory::createMany(20);
        UserFactory::createMany(15, [
          'company' => lazy(fn() => CompanyFactory::createOne()),
          'roles' => ['ROLE_USER', 'ROLE_PRESTA']
        ]);
        UserFactory::createOne([
          'email' => 'admin@platiny.com',
          'firstname' => 'Chad',
          'lastname' => 'Giga',
          'password' => password_hash('password', PASSWORD_BCRYPT),
          'roles' => ['ROLE_USER', 'ROLE_ADMIN'],
        ]);
        UserFactory::createOne([
          'email' => 'presta@platiny.com',
          'firstname' => 'Presta',
          'lastname' => 'Tout',
          'password' => password_hash('password', PASSWORD_BCRYPT),
          'roles' => ['ROLE_USER', 'ROLE_PRESTA'],
          'company' => lazy(fn() => CompanyFactory::createOne([
            'name' => 'Presta Company',
            'email' => 'presta.company@platiny.com',
          ])),
        ]);
        UserFactory::createOne([
          'email' => 'user@platiny.com',
          'firstname' => 'Juste',
          'lastname' => 'Le Blanc',
          'password' => password_hash('password', PASSWORD_BCRYPT),
          'roles' => ['ROLE_USER'],
        ]);
    }
}
