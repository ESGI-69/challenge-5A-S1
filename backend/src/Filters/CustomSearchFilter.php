<?php
declare(strict_types=1);

namespace App\Filters;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\PropertyHelperTrait;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;

class CustomSearchFilter extends AbstractFilter
{
    use PropertyHelperTrait;

    public const SEARCH_EXACT = 'custom_exact';
    public const SEARCH_START_WITH = 'custom_start';
    public const SEARCH_END_WITH = 'custom_end';
    public const SEARCH_CONTAINS = 'custom_contain';

    public const OPERATIONS = [
        self::SEARCH_EXACT,
        self::SEARCH_START_WITH,
        self::SEARCH_END_WITH,
        self::SEARCH_CONTAINS,
    ];

    ## Logique du filtre
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        // Otherwise filter is applied to order and page as well
        if (
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass)
        ) {
            return;
        }

        $searchParameterName = $queryNameGenerator->generateParameterName($property);
        $type = array_key_first($value);
        $value = $value[$type];

        $alias = current($queryBuilder->getRootAliases());
        $propertyWithAlias = "$alias.$property";
        $expr = $queryBuilder->expr();

        switch ($type) {
            case self::SEARCH_START_WITH:
                $condition = $expr->like($propertyWithAlias, ":$searchParameterName");
                $value =  "{$value}%";
                break;
            case self::SEARCH_END_WITH:
                $condition = $expr->like($propertyWithAlias, ":$searchParameterName");
                $value =  "%{$value}";
                break;
            case self::SEARCH_CONTAINS:
                $condition = $expr->like($propertyWithAlias, ":$searchParameterName");
                $value =  "%{$value}%";
                break;
            case self::SEARCH_EXACT:
            default:
                $condition = $expr->eq($propertyWithAlias, ":$searchParameterName");
                $value = "'{$value}'";
                break;
        }

        $queryBuilder
            ->andWhere($condition)
            ->setParameter($searchParameterName, $value);
    }

    // Indique à l'interface comment afficher le filtre

    public function getDescription(string $resourceClass): array
    {
        $description = [];

        $properties = $this->getProperties();
        if (null === $properties) {
            $properties = array_fill_keys($this->getClassMetadata($resourceClass)->getFieldNames(), null);
        }

        foreach ($properties as $property => $nullManagement) {
            if (!$this->isPropertyMapped($property, $resourceClass)) {
                continue;
            }

            foreach (self::OPERATIONS as $operation) {
                $description += $this->getFilterDescription($property, $operation);
            }
        }

        return $description;
    }

    // Indique à l'interface comment afficher les différentes opérations du filtre

    protected function getFilterDescription(string $property, string $period): array
    {
        $propertyName = $this->normalizePropertyName($property);

        return [
            sprintf('%s[%s]', $propertyName, $period) => [
                'property' => $propertyName,
                'type' => \DateTimeInterface::class,
                'required' => false,
            ],
        ];
    }
}
