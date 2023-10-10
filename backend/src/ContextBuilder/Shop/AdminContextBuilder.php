<?php

declare(strict_types=1);

namespace App\ContextBuilder\Shop;

use ApiPlatform\Serializer\SerializerContextBuilderInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\DependencyInjection\Attribute\AutowireDecorated;
use Symfony\Component\HttpFoundation\Request;

#[AsDecorator(decorates: 'api_platform.serializer.context_builder', priority: 1000)]
class AdminContextBuilder implements SerializerContextBuilderInterface
{
    public function __construct(
        #[AutowireDecorated] protected SerializerContextBuilderInterface $decorated,
        protected Security $security,
    ) {}

    public function createFromRequest(Request $request, bool $normalization, array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);

        // If no groups is defined or if we are in denormalization mode (json -> to object)
        if (!isset($context['groups']) || false === $normalization) {
            return $context;
        }

        if ($this->security->isGranted('ROLE_ADMIN')) {
            $context['groups'][] = 'admin:read';
        }

        return $context;
    }
}
