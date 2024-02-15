<?php

namespace App\Denormalizer;

use App\Entity\Feedback;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\SecurityBundle\Security;
use App\Entity\FeedbackType;
use App\Repository\SubFeedbackRepository;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * @method  getSupportedTypes(?string $format)
 */
class FeedbackCreationDenormalizer implements DenormalizerInterface
{
    // set the user to current logged in user
    use DenormalizerAwareTrait;

    private $mailer;

    public function __construct(
        protected ObjectNormalizer $normalizer,
        protected Security $security,
        protected SubFeedbackRepository $subFeedbackRepository,
        MailerInterface $mailer
    ) {
        $this->mailer = $mailer;
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

        $email = (new Email())
        ->from('notify@platiny.fr')
        ->to($establishment->getEmail())
        ->subject("Nouvel avis pour votre établissement à " . $establishment->getCity() . ".")
        ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
                <p>Un utilisateur a laissé un avis pour votre établissement à <strong>" . $establishment->getStreet() . ", " . $establishment->getCity() . " " . $establishment->getZipCode() ."</strong>.</p> 
                <p style='background: #DEDEDE; border-radius: 16px; text-align: center; padding: 20px;'><strong>". $feedback->getAuthor()->getFirstname() ."</strong><br>". $feedback->getComment() ."<br><span style='font-weight: bold; font-size: 20px'>". $feedback->getAverageRating() . "/5</span></p>
                <p style='text-align: center;'><a href='" . $_ENV["URL_PROD"] . "/backoffice/' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Voir l'avis</a></p>
                ");
        $this->mailer->send($email);

        $email = (new Email())
        ->from('notify@platiny.fr')
        ->to($establishment->getCompany()->getEmail())
        ->subject("Nouvel avis dans un de vos établissements.")
        ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
                <p>Un utilisateur a laissé un avis pour votre établissement à <strong>" . $establishment->getStreet() . ", " . $establishment->getCity() . " " . $establishment->getZipCode() ."</strong>.</p> 
                <p style='background: #DEDEDE; border-radius: 16px; text-align: center; padding: 20px;'><strong>". $feedback->getAuthor()->getFirstname() ."</strong><br>". $feedback->getComment() ."<br><span style='font-weight: bold; font-size: 20px'>". $feedback->getAverageRating() . "/5</span></p>
                <p style='text-align: center;'><a href='" . $_ENV["URL_PROD"] . "/backoffice/' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Voir l'avis</a></p>
                ");
        $this->mailer->send($email);

        return $feedback;
    }
}