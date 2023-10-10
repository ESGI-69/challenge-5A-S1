<?php

declare(strict_types=1);

namespace App\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Post;
use ApiPlatform\State\ProcessorInterface;
use App\Provider\ColorStateProvider;
use App\ValueObject\Color;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\String\Slugger\AsciiSlugger;

class ColorStateProcessor implements ProcessorInterface
{
    public function __construct(
        protected KernelInterface $kernel,
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if (
            !$data instanceof Color
            || !$operation instanceof Post
        ) {
            return;
        }

        $slugger = new AsciiSlugger();
        $slug = $slugger->slug($data->getName())->snake()->toString();
        $data->setId($slug);

        $data->setHexa(strtolower($data->getHexa()));

        $data = [$data->getId(), $data->getName(), $data->getHexa(), $data->getRed(), $data->getGreen(), $data->getBlue()];
        $this->writeInFile($data);
    }

    protected function writeInFile(array $data): void
    {
        $filePath = $this->kernel->getProjectDir() . ColorStateProvider::COLOR_CSV_PATH;
        $file = fopen($filePath, 'wb');
        fputcsv($file, $data);
        fclose($file);
    }
}
