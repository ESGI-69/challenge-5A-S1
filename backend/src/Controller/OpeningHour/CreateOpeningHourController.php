<?php

namespace App\Controller\OpeningHour;

use App\Entity\OpeningHour;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

#[AsController]
class CreateOpeningHourController
{
    public function __construct(
        protected Security $security,
    ) {}
    
    public function __invoke(OpeningHour $openinghour): OpeningHour
    {

        $user = $this->security->getUser();

        if ( !$this->security->isGranted('ROLE_ADMIN') && $openinghour->getEstablishment().getCompany() !== $user->getCompany() ) {
            throw new AccessDeniedException('You can only set opening hours for your own company');
        }

        return $openinghour;
    }
}