<?php 

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\User;
use App\Entity\Employee;


#[AsController]
class GetEmployeesOfCompanyController
{
    public function __construct(
        protected Security $security,
    ) {}


    public function __invoke(Company $company): Company
    {
            return $company;
    }

}