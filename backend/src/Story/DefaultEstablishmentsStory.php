<?php

namespace App\Story;

use App\Factory\EstablishmentFactory;
use Zenstruck\Foundry\Story;

final class DefaultEstablishmentsStory extends Story
{
    public function build(): void
    {
        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
        EstablishmentFactory::createMany(60);
    }
}
