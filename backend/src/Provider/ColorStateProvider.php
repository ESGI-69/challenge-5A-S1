<?php

declare(strict_types=1);

namespace App\Provider;

use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ValueObject\Color;
use Symfony\Component\HttpKernel\KernelInterface;

class ColorStateProvider implements ProviderInterface
{
    public const COLOR_CSV_PATH = '/var/uploads/colors.csv';

    public function __construct(
        protected KernelInterface $kernel,
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $content = $this->getColorData();

        if ($operation instanceof CollectionOperationInterface) {
            return $this->getCollection($content, $operation, $uriVariables, $context);
        }

        return $content[$uriVariables['id']] ?? null;
    }

    protected function getColorData(): array
    {
        $result = [];
        $filePath = $this->kernel->getProjectDir() . self::COLOR_CSV_PATH;

        $file = fopen($filePath, 'rb');
        while (($line = fgetcsv($file)) !== FALSE) {
            $color = new Color(...$line);
            $result[$color->getHexa()] = $color;
        }
        fclose($file);

        return $result;
    }

    protected function getCollection(array $content, CollectionOperationInterface $operation, array $uriVariables, array $context): array
    {
        $page = $context['filters']['page'] ?? 1;
        $perPage = $operation->getPaginationItemsPerPage() ?? $operation->getPaginationClientItemsPerPage() ?? 30;
        $offset = $perPage * ((int) $page - 1);

        return array_slice($content, $offset, $perPage);
    }
}
