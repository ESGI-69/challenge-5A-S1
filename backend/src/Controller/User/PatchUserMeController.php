<?php

namespace App\Controller\User;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
class PatchUserMeController
{
  public function __construct(
    protected Security $security,
    private SerializerInterface $serializer,
    private EntityManagerInterface $entityManager,
  ) {}

  public function __invoke(Request $request): User
  {
    /** @var User $user */
    $user = $this->security->getUser();

    if(!$user) {
      throw new \Exception('Not authenticated');
    }

    $data = $request->getContent();
    $user = $this->serializer->deserialize($data, User::class, 'json', ['object_to_populate' => $user]);
    
    $this->entityManager->persist($user);
    $this->entityManager->flush();

    return $user;
  }
}
