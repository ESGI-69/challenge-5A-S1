<?php

namespace App\Story;

use App\Factory\CompanyFactory;
use Zenstruck\Foundry\Story;

final class DefaultCompaniesStory extends Story
{
    public function build(): void
    {
        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
        CompanyFactory::createMany(5);
    }
}
