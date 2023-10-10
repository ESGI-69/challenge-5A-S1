<?php

declare(strict_types=1);

namespace App\GroupGenerator\Shop;

use ApiPlatform\Metadata\Post;
use ApiPlatform\Symfony\Validator\ValidationGroupsGeneratorInterface;
use App\Entity\Shop\Product;
use Symfony\Component\Validator\Constraints\GroupSequence;

class ProductGroupGenerator implements ValidationGroupsGeneratorInterface
{
    public function __invoke(object $object): array|GroupSequence
	{
		assert($object instanceof Product);

		if ($object->isPublished()) {
			return ['product:create:published'];
		}

        return [];
    }
}
