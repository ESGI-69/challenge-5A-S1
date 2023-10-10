<?php

declare(strict_types=1);

namespace App\Normalizer\Auth;

use App\Entity\Auth\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class UserDenormalizer implements DenormalizerInterface
{
    public function __construct(
        protected Security $security,
        protected PasswordHasherFactoryInterface $hasher,
        protected ObjectNormalizer $normalizer,
    ) {}

    public function denormalize(mixed $data, string $type, string $format = null, array $context = []): mixed
    {
        $user = $this->normalizer->denormalize($data, $type, $format, $context);

        assert($user instanceof User);

        $plainPassword = $user->getPlainPassword();

        if (empty($plainPassword)) {
            return $user;
        }

        $hasher = $this->hasher->getPasswordHasher($user);
        $hashedPassword = $hasher->hash($plainPassword);

        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        return $user;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === User::class;
    }
}
