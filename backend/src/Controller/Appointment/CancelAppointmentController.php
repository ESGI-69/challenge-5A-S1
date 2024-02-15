<?php

namespace App\Controller\Appointment;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\Appointment;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsController]
class CancelAppointmentController
{
  private $mailer;

  public function __construct(
    protected Security $security,
    MailerInterface $mailer
  ) {
    $this->mailer = $mailer;

  }

  public function __invoke(Appointment $appointment): Appointment
  {
    $appointment->setCancelledAt(new \DateTimeImmutable());

    $email = (new Email())
      ->from('notify@platiny.fr')
      ->to($appointment->getEstablishment()->getEmail())
      ->subject("Un rendez-vous a été annulé")
      ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
            <p>Annulé le <strong>" . $appointment->getCancelledAt()->format('d/m/Y') . " à " . $appointment->getCancelledAt()->format('H:i') . "</strong></p>
            <p><strong>Détails</strong> :
            <strong>Client</strong> : " . $appointment->getClient()->getFirstname() . " " . $appointment->getClient()->getLastname() . "
            <strong>Lieux</strong> : " . $appointment->getEstablishment()->getStreet() . ", " . $appointment->getEstablishment()->getCity() . " " . $appointment->getEstablishment()->getZipCode() . "
            <strong>Type de prestation</strong> : " . $appointment->getService()->getName() . "
            <strong>Date</strong> : " . $appointment->getStartDate()->format('d/m/Y') . " à " . $appointment->getStartDate()->format('H:i') . "</p>
            <strong>Employé(e)</strong> : " . $appointment->getEmployee()->getFirstname() . " " . $appointment->getEmployee()->getLastname() . "<br>
            </p>
            <p style='text-align: center;'><a href='" . $_ENV["URL_PROD"] . "/backoffice' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Accéder à votre espace</a></p>");
    $this->mailer->send($email);

    $email = (new Email())
    ->from('notify@platiny.fr')
    ->to($appointment->getClient()->getEmail())
    ->subject("Votre rendez-vous a été annulé")
    ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
          <p>Annulé le <strong>" . $appointment->getCancelledAt()->format('d/m/Y') . " à " . $appointment->getCancelledAt()->format('H:i') . "</strong></p>
          <p><strong>Détails</strong> :
          <strong>Client</strong> : " . $appointment->getClient()->getFirstname() . " " . $appointment->getClient()->getLastname() . "
          <strong>Lieux</strong> : " . $appointment->getEstablishment()->getStreet() . ", " . $appointment->getEstablishment()->getCity() . " " . $appointment->getEstablishment()->getZipCode() . "
          <strong>Type de prestation</strong> : " . $appointment->getService()->getName() . "
          <strong>Date</strong> : " . $appointment->getStartDate()->format('d/m/Y') . " à " . $appointment->getStartDate()->format('H:i') . "</p>
          <strong>Employé(e)</strong> : " . $appointment->getEmployee()->getFirstname() . " " . $appointment->getEmployee()->getLastname() . "<br>
          </p>
          <p style='text-align: center;'><a href='" . $_ENV["URL_PROD"] . "/profile' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Accéder à votre espace</a></p>");
    $this->mailer->send($email);

    return $appointment;
  }
}
