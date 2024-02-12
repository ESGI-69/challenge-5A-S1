<?php

namespace App\EventSubscriber;

use App\Entity\User;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

class UserMailSubscriber implements EventSubscriberInterface
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
    $user = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if (!$user instanceof User || Request::METHOD_POST !== $method) {
      return;
    }

    if ($user instanceof User || Request::METHOD_POST === $method) {
      $email = (new Email())
      ->from('notify@platiny.fr')
      ->to($user->getEmail())
      ->subject("Bienvenue chez Platiny ". $user->getFirstname() . " !")
      ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
                <p>Votre compte a bien été créé. Vous avez désormais accéder au site et reserver les prestations de votre choix.</p>
                <p>Vous pouvez vous connecter à votre compte en cliquant sur le bouton ci-dessous.</p>
                <p style='text-align: center;'><a href='".$_ENV["URL_PROD"]."/login' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Se connecter</a></p>
                <hr>
                <p><small>Vous êtes une entreprise ? Vous pouvez dès maintenant envoyer une demande pour inscrire vos établissements depuis le site.</small></p>
                ");
       
    } else if ($user instanceof User || Request::METHOD_PATCH === $method) {
      $email = (new Email())
      ->from('notify@platiny.fr')
      ->to($user->getEmail())
      ->subject("Modifications sur votre compte")
      ->text("Des modifications on été effectuées sur votre compte.");
    }
      
    $this->mailer->send($email);
  }
}
