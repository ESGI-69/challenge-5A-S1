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
class CreateEmployeeOfCompanyController extends AbstractController
{
    public function __construct(
        protected Security $security,
        protected CompanyRepository $companyRepository,
        protected EstablishmentRepository $establishmentRepository,
    ) {}

    // public function __invoke(Employee $employee, Request $request): Employee
    public function __invoke(Employee $employee): Employee
    {
        return $employee;
    
        // $data = json_decode($request->getContent(), true);
        // $company = $this->security->getUser()->getCompany();
        // $employee = new Employee();
        // $employee->setCompanyId($company);
        // $employee->setFirstname($data['firstname']);
        // $employee->setLastname($data['lastname']);
        // $establishment = $this->establishmentRepository->find("1");
        // $employee->setPreferedEstablishment($establishment);
        // $employee->setAvatar($data['avatar']);


    }

}