<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;


//filter that check if the current time is between the opening hours of the establishment (start_time and end_time)
final class IsOpenFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if (
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass)
        ) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->leftJoin($rootAlias . '.openingHours', 'opening_hour');
        $queryBuilder->andWhere('opening_hour.startTime <= :now')
            ->andWhere('opening_hour.endTime >= :now')
            ->setParameter('now', date('H:i:s'));

      

    }

    public function getDescription(string $resourceClass): array
    {
       
        $description['is_open'] = [
            'property' => null,
            'type' => Type::BUILTIN_TYPE_BOOL,
            'required' => false,
            'swagger' => [
                'description' => 'Filter if the establishment is open',
                'name' => 'is_open',
                'type' => 'boolean',
            ],
        ];

        return $description;
    }
}