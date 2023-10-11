<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\ValueObject\ResetPassword;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Message;

#[AsController]
class ResetPasswordController
{
    public function __construct(
        protected MailerInterface $mailer,
        protected UserRepository $userRepository,
    )
    {
    }

    public function __invoke(ResetPassword $dto)
    {
        $user = $this->userRepository->findOneBy(['email' => $dto->getEmail()]);

        if (null === $user) {
            throw new EntityNotFoundException('email not found');
        }

//        $message = new Message();
//        $this->mailer->send($message);

        return $user;
    }
}
