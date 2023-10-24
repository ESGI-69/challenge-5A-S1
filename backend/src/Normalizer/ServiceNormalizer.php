<?php

namespace App\Normalizer;

use App\Entity\Service;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ServiceNormalizer implements NormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'REVIEW_NORMALIZER_ALREADY_CALLED';


    public function __construct(
        protected Security $security,
    ) {}

    public function supportsNormalization(mixed $data, string $format = null, array $context = []): bool
    {
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }

        return $data instanceof Service;
    }

    public function normalize(mixed $object, string $format = null, array $context = []): mixed
    {
        $norm = $this->normalizer;

        /** @var Service $object */

        /** @var User $loggedUser */
        $loggedUser = $this->security->getUser();

        if ($loggedUser && $loggedUser->isAdmin()) {
            $context['groups'][] = 'admin-read-service';
        }

        $context[self::ALREADY_CALLED] = true;

        return $this->normalizer->normalize($object, $format, $context);
    }
}