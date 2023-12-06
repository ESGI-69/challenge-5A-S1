<?php

namespace App\Story;

use App\Factory\EstablishmentTypeFactory;
use Zenstruck\Foundry\Story;

final class DefaultEstablishmentTypeStory extends Story
{
    public function build(): void
    {
        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
        EstablishmentTypeFactory::createMany(5);
    }
}
