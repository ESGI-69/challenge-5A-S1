<?php

namespace App\Denormalizer;

use App\Entity\Feedback;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\SecurityBundle\Security;
use App\Entity\FeedbackType;
use App\Repository\SubFeedbackRepository;

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
        protected SubFeedbackRepository $subFeedbackRepository

    ) {
        $this->subFeedbackRepository = $subFeedbackRepository;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null ): bool
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

        $averageRating = $feedback->getAverageRating();
        $feedbacksNumber = $establishment->getFeedback()->count();
        $oldAverageRating = $establishment->getAverageNotation();
        if ($oldAverageRating === null) {
            $oldAverageRating = 0;
        }

        $averageNotation = ($oldAverageRating * $feedbacksNumber + $averageRating) / ($feedbacksNumber + 1);

        $subFeedbacksCollection = $feedback->getSubFeedback();
        foreach ($subFeedbacksCollection as $subFeedback) {
            $feedbackType = $subFeedback->getFeedbackType();
            $subFeedbackCount = $this->subFeedbackRepository->countSubFeedBacksByFeedbackType($feedbackType->getId());
            $subFeedbackNewNote = $subFeedback->getNote();
            $subFeedbackOldAverageNotation = $feedbackType->getAverageNotation();
            if ($subFeedbackOldAverageNotation === null) {
                $subFeedbackOldAverageNotation = 0;
            }
            $subFeedbackAverageNotation = ($subFeedbackOldAverageNotation * $subFeedbackCount + $subFeedbackNewNote) / ($subFeedbackCount + 1);
            $feedbackType->setAverageNotation($subFeedbackAverageNotation);
        }

        $establishment->setAverageNotation($averageNotation);

        return $feedback;
    }
}