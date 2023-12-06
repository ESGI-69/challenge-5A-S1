<?php

namespace App\Story;

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
        ]);
        UserFactory::createOne([
          'email' => 'admin@platiny.com',
          'firstname' => 'Chad',
          'lastname' => 'Giga',
          'password' => password_hash('password', PASSWORD_BCRYPT),
          'phonenumber' => '+3369696969',
          'roles' => ['ROLE_USER', 'ROLE_ADMIN'],
        ]);
        UserFactory::createOne([
          'email' => 'user@platiny.com',
          'firstname' => 'Peon',
          'lastname' => 'Juste',
          'password' => password_hash('password', PASSWORD_BCRYPT),
          'phonenumber' => '+3369696969',
          'roles' => ['ROLE_USER'],
        ]);
    }
}
