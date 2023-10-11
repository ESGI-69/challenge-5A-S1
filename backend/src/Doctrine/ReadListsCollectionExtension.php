<?php

declare(strict_types=1);

namespace App\Doctrine;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;

class ReadListsCollectionExtension implements QueryCollectionExtensionInterface
{
    public function __construct(
        protected Security $security
    )
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $isGoodOperation = $operation instanceof GetCollection && $operation->getName() == 'GetMyReadListsOperation';
        $user = $this->security->getUser();

        if (!$isGoodOperation) {
            return;
        }

        if (!$user) {
            throw new \RuntimeException('You must be logged to call this uri');
        }

        $alias = $queryBuilder->getRootAliases()[0];
        $queryBuilder
            ->andWhere("$alias.createdBy = :user")
            ->setParameter('user', $user->getId());
    }
}
