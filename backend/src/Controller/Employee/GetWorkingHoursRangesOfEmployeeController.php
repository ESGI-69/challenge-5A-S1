<?php

namespace App\Controller\Employee;

use App\Entity\Employee;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetWorkingHoursRangesOfEmployeeController
{
    public function __construct(
    ) {}

    public function __invoke(Employee $employee): array
    {
        $workingHoursRanges = $employee->getWorkingHoursRanges();
        $workingHoursRangesArray = [];
        foreach ($workingHoursRanges as $workingHoursRange) {
            $workingHoursRangesArray[] = [
                'id' => $workingHoursRange->getId(),
                'startDate' => $workingHoursRange->getStartDate(),
                'endDate' => $workingHoursRange->getEndDate(),
            ];
        }

        if (!empty($employee->getAvatar())) {
            $employee->setAvatar('/avatar_employee/'.$employee->getAvatar());
        }
        return $workingHoursRangesArray;
    }
}