<?php

namespace App\EventSubscriber;

use App\Entity\Company;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

class CompanyMailSubscriber implements EventSubscriberInterface
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
      // KernelEvents::REQUEST => ['sendMail', EventPriorities::POST_DESERIALIZE]
    ];
  }

  public function sendMail(ViewEvent $event)
  {
    $company = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if (!$company instanceof Company || Request::METHOD_POST !== $method) {
      return;
    }

    if (Request::METHOD_POST === $method) {
      $email = (new Email())
      ->from('notify@platiny.fr')
      ->to($company->getEmail())
      ->subject("Votre entreprise est en cours de validation")
      ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
      <p>Votre demande d'ajout d'entreprise a bien été prise en compte et sera examinée.</p>
      <p>Vous receverez un mail quand la demande sera traitée.</p>");
    }


    $this->mailer->send($email);
  }
}
