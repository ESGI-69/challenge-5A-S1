<?php 

namespace App\Controller\Employee;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; // Assurez-vous d'ajouter cette ligne
use App\Entity\User;
use App\Entity\Employee;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\CompanyRepository;
use App\Repository\EstablishmentRepository;

#[AsController]
class DeleteEmployeeOfCompanyController extends AbstractController
{
    public function __construct(
        protected Security $security,
        protected CompanyRepository $companyRepository,
        protected EstablishmentRepository $establishmentRepository,
    ) {}

    public function __invoke(Employee $employee): Employee
    {
        //delete employee
        return $employee;
    }

}