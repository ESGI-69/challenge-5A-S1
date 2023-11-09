<?php

namespace App\Controller\User;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

#[AsController]
class PatchUserMeController
{
  public function __construct(
    protected Security $security,
    private SerializerInterface $serializer,
    private EntityManagerInterface $entityManager,
    private UserPasswordHasherInterface $passwordEncoder,
  ) {
  }


  public function __invoke(Request $request): User
  {
     /** @var User $user */
     $user = $this->security->getUser();

     if(!$user) {
         throw new \Exception('Not authenticated');
     }
 
     $data = json_decode($request->getContent(), true);
 
     // Check if the current password is correct
     if (!isset($data['currentPassword']) || !$this->passwordEncoder->isPasswordValid($user, $data['currentPassword'])) {
         throw new BadRequestException('Invalid current password');
     }
 
     // If a new password is provided, update it
     if (isset($data['newPassword']) && $data['newPassword']) {
         $user->setPassword($this->passwordEncoder->hashPassword($user, $data['newPassword']));
     }
 
     // Remove the password fields from the data
     unset($data['currentPassword'], $data['newPassword']);
 
     // Update the user
     $this->serializer->deserialize(json_encode($data), User::class, 'json', ['object_to_populate' => $user, 'ignored_attributes' => ['roles', 'plainPassword']]);
 
     $this->entityManager->persist($user);
     $this->entityManager->flush();
 
     return $user;
  }
}
