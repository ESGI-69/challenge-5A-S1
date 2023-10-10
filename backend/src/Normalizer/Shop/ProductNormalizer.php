<?php

declare(strict_types=1);

namespace App\Normalizer\Shop;

use App\Entity\Auth\User;
use App\Entity\Shop\Product;
use App\Enum\Groups\ProductGroupsEnum;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\Encoder\NormalizationAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ProductNormalizer implements NormalizerInterface, NormalizationAwareInterface
{
    use NormalizerAwareTrait;

    public function __construct(
        protected Security $security,
    ) {}

    public function normalize(mixed $object, string $format = null, array $context = []): mixed
    {
        /** @var ?User $user */
        $user = $this->security->getUser();

        if ($user?->hasProduct($object) ?? false) {
            $context['groups'][] = ProductGroupsEnum::READ_AS_AUTHORIZED_USER;
        }

        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization(mixed $data, string $format = null): bool
    {
        return $data instanceof Product;
    }
}
