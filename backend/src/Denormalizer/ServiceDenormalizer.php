<?php

namespace App\Denormalizer;

use App\Entity\Service;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * @method  getSupportedTypes(?string $format)
 */
class ServiceDenormalizer implements DenormalizerInterface
{
    use DenormalizerAwareTrait;

    public function __construct(
        protected ObjectNormalizer $normalizer,
        private Security $security
    ) {}

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === Service::class;
    }

    public function denormalize(mixed $data, string $type, string $format = null, array $context = [])
    {
        $service = $this->normalizer->denormalize($data, $type, $format, $context);

        /** @var Service $service */

        $user = $this->security->getUser();

        if ($context['operation_name'] === 'creation') {
            $service->setAuthor($user);
        }

        if ($context['operation_name'] === 'edition-presta') {
            if ($service->getAuthor() !== $user) {
                throw new \Exception('You are not the author of this service');
            }
            if ($service->getValidatedAt() !== null || $service->getValidatedBy() !== null) {
                $service->setValidatedAt(null);
                $service->setValidatedBy(null);
            }
        }

        if ($context['operation_name'] === 'validation' && $service->getValidatedAt() !== null) {
            throw new \Exception('This service is already validated');
        }

        return $service;
    }
}
