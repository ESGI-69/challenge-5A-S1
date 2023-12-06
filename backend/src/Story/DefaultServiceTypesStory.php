<?php

namespace App\Story;

use App\Factory\ServiceTypeFactory;
use Zenstruck\Foundry\Story;

final class DefaultServiceTypesStory extends Story
{
    public function build(): void
    {
        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
        ServiceTypeFactory::createMany(30);
    }
}
