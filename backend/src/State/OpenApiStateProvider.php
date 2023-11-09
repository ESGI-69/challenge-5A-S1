<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;

class OpenApiStateProvider implements ProviderInterface
{
    public function provide(
      Operation $operation,
      array $uriVariables = [],
      array $context = []
      ): object|array|null
    {
      // Get root directory
      $root = dirname(__DIR__, 2);
      $jsonFilePath = $root . '/resources/swagger.json';
      $jsonData = file_get_contents($jsonFilePath);
      $data = json_decode($jsonData, true);
      return $data;
    }
}
