<?php

namespace App\DataFixtures;

use App\Story\DefaultCompaniesStory;
use App\Story\DefaultEstablishmentsStory;
use App\Story\DefaultEstablishmentTypeStory;
use App\Story\DefaultServicesStory;
use App\Story\DefaultServiceTypesStory;
use App\Story\DefaultUsersStory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        DefaultUsersStory::load();
        DefaultCompaniesStory::load();
        DefaultEstablishmentTypeStory::load();
        DefaultEstablishmentsStory::load();
        DefaultServiceTypesStory::load();
        DefaultServicesStory::load();
    }
}
