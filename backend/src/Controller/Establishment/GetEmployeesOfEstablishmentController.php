<?php

namespace App\Controller\Establishment;

use App\Entity\Establishment;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetEmployeesOfEstablishmentController
{
    public function __construct(
    ) {}

    public function __invoke(Establishment $establishment): array
    {
        $employees = $establishment->getEmployees();
        $employeesArray = [];
        foreach ($employees as $employee) {
            $employeesArray[] = [
                'id' => $employee->getId(),
                'firstName' => $employee->getFirstName(),
                'lastName' => $employee->getLastName(),
            ];
        }
        return $employeesArray;
    }
}