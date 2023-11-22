<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

//filter that checks if the current time is between the opening hours of the establishment (start_time and end_time)
final class IsOpenFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {

        if (!isset($context['filters']['is_open']) || $context['filters']['is_open'] == "false") {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $parameterName = $queryNameGenerator->generateParameterName('isOpen');
    
        $subqueryAlias = $queryNameGenerator->generateJoinAlias('oh');
        
        //make a query that returns the establishment_id of the opening hours that are open at the current time
        $subquery = $this->managerRegistry->getManagerForClass($resourceClass)->createQueryBuilder()
            ->select('IDENTITY('.$subqueryAlias.'.establishment)')
            ->from('App\Entity\OpeningHour', $subqueryAlias)
            ->where($subqueryAlias.'.startTime <= :currentTime')
            ->andWhere($subqueryAlias.'.endTime >= :currentTime')
            ->getDQL();

        //add the subquery to the main query
        $queryBuilder
            ->andWhere($rootAlias.'.id IN ('.$subquery.')')
            ->setParameter('currentTime', date('H:i:s'));

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