<?php

namespace App\Controller\User;

use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Security\Core\Exception\AuthenticationException;


#[AsController]
class GetUserMeController
{
  public function __construct(
    protected Security $security,
  ) {}

  public function __invoke(): User
  {
    
    $user = $this->security->getUser();

    if(!$user) {
        throw new AuthenticationException('JWT Token not found');
    }

    return $user;
  }
}
 