<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

//filter that return the list of establishement where the service given is serviced by the establishement
final class EstablishementServicesFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {

        // if (!isset($context['filters']['is_open']) || $context['filters']['is_open'] == "false") {
        //     return;
        // }

        $rootAlias = $queryBuilder->getRootAliases()[0];
            //should return the establishement if they have the service given in the filter,
            // services are linked through the working_hours_range_service table (working_hours_range_id,services_id), then working_hours_range (id,employee_id) to employee (id,prefered_establishment_id)

            $queryBuilder
            ->leftJoin("$rootAlias.workingHoursRanges", 'whr')
            ->leftJoin('whr.services', 's')
            ->andWhere('s.id = :serviceId')
            ->setParameter('serviceId', $value);
       

    }

    public function getDescription(string $resourceClass): array
    {
        $description['service_establishement'] = [
            'property' => null,
            'type' => Type::BUILTIN_TYPE_STRING,
            'required' => false,
            'swagger' => [
                'description' => 'Filter if the establishement has the service',
                'name' => 'service_establishement',
                'type' => 'string',
            ],
        ];

        return $description;
    }
}