<?php

namespace App\Story;

use App\Factory\ServiceFactory;
use Zenstruck\Foundry\Story;

final class DefaultServicesStory extends Story
{
    public function build(): void
    {
        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
        ServiceFactory::createMany(120);
    }
}
