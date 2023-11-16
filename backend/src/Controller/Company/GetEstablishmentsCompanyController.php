<?php

namespace App\Controller\Company;

use App\Entity\Company;
use App\Entity\Establishment;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Doctrine\Common\Collections\Collection;


#[AsController]
class GetEstablishmentsCompanyController
{
  public function __construct(
    protected Security $security,
  ) {}

  /**
   * @ParamConverter("company", options={"id" = "id"})
   * @return Collection|Establishment[]
   */
  public function __invoke(Company $company): Collection
  {
    $establishments = $company->getEstablishments();

    return $establishments;
  }
}