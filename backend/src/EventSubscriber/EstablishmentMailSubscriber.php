<?php

namespace App\EventSubscriber;

use App\Entity\Establishment;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

class EstablishmentMailSubscriber implements EventSubscriberInterface
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
    $establishment = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if (!$establishment instanceof Establishment || Request::METHOD_POST !== $method) {
      return;
    }

    if (Request::METHOD_POST === $method) {
      // To the establishment
      $email = (new Email())
      ->from('notify@platiny.fr')
      ->to($establishment->getEmail())
      ->subject("Votre nouvel établissement est sur Platiny !")
      ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
      <p>Bonjour, votre établissement offrant la préstation de " . $establishment->getType()->getName() . " a bien été ajouté.</p>
      <p>L'adresse est la suivante : " . $establishment->getStreet() . ", " . $establishment->getCity() . " " . $establishment->getZipCode() . "</p>
      <p style='text-align: center;'><a href='" . $_ENV["URL_PROD"] . "/establishment/" . $establishment->getId() . "' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Voir mon établissement</a></p>
      ");
      $this->mailer->send($email);
      // To the company
      $email = (new Email())
      ->from('notify@platiny.fr')
      ->to($establishment->getCompany()->getEmail())
      ->subject("Etablissement ajouté")
      ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
      <p>Bonjour, votre établissement offrant la préstation de " . $establishment->getType()->getName() . " a bien été ajouté.</p>
      <p>L'adresse est la suivante : " . $establishment->getStreet() . ", " . $establishment->getCity() . " " . $establishment->getZipCode() . "</p>
      <p style='text-align: center;'><a href='" . $_ENV["URL_PROD"] . "/establishment/" . $establishment->getId() . "' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Voir mon établissement</a></p>
      ");
      $this->mailer->send($email);
    }
  }
}
