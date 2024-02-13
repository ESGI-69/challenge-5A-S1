<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Appointment;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

class AppointmentMailSubscriber implements EventSubscriberInterface
{
  private $mailer;

  public function __construct(MailerInterface $mailer)
  {
    $this->mailer = $mailer;
  }

  public static function getSubscribedEvents()
  {
    return [
      KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
    ];
  }

  public function sendMail(ViewEvent $event)
  {
    $appointment = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if (!$appointment instanceof Appointment || Request::METHOD_POST !== $method) {
      return;
    }

    if ($appointment instanceof Appointment || Request::METHOD_POST === $method) {
      $email = (new Email())
        ->from('notify@platiny.fr')
        ->to($appointment->getClient()->getEmail())
        ->subject("Votre rendez-vous chez " . $appointment->getEstablishment()->getCompany()->getName() . " est confirmé")
        ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
                <p>Nous vous confirmons que votre rendez-vous chez 
                  <a href=" . $_ENV["URL_PROD"] . "/establishment/" . $appointment->getEstablishment()->getId() . " style='font-weight: bold; color: black;'>" . $appointment->getEstablishment()->getCompany()->getName() . "</a> avec " . $appointment->getEmployee()->getFirstname() . " a bien été pris en compte.</p>
                <p>Il aura lieu le <strong>" . $appointment->getStartDate()->format('d/m/Y') . "</strong> à <strong>" . $appointment->getStartDate()->format('H:i') . "</strong></p>
                <p>" . $appointment->getEstablishment()->getStreet() . ", " . $appointment->getEstablishment()->getCity() . " " . $appointment->getEstablishment()->getZipCode() . "</p>
                <p style='text-align: center;'><a href='" . $_ENV["URL_PROD"] . "/profile/' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Voir mon rendez-vous</a></p>
                <hr>
                <p><small>Vous pouvez annuler votre rendez vous depuis votre profil.</small></p>
                ");

      $this->mailer->send($email);
    }
  }
}
