<?php

namespace App\Denormalizer;

use App\Entity\Feedback;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\SecurityBundle\Security;

/**
 * @method  getSupportedTypes(?string $format)
 */
class FeedbackCreationDenormalizer implements DenormalizerInterface
{
    // set the user to current logged in user
    use DenormalizerAwareTrait;

    public function __construct(
        protected ObjectNormalizer $normalizer,
        protected Security $security,

    ) {}

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === Feedback::class;
    }

    public function denormalize(mixed $data, string $type, string $format = null, array $context = [])
    {
        $feedback = $this->normalizer->denormalize($data, $type, $format, $context);

        /** @var Feedback $feedback */
        $loggedUser = $this->security->getUser();
        $establishment = $feedback->getAppointment()->getEstablishment();

        $feedback->setEstablishment($establishment);
        $feedback->setAuthor($loggedUser);
        $feedback->setCreatedAt(new \DateTimeImmutable());
        $feedback->setUpdatedAt(new \DateTimeImmutable());

        return $feedback;
    }
}