<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;


#[AsController]
class OpenApiController
{
  public function __construct(
    protected Security $security,
  ) {
  }

  public function __invoke()
  {
    if ($this->security->isGranted('ROLE_ADMIN')) {
      $jsonFilePath = __DIR__ . '/resources/swagger.json';
      $jsonData = file_get_contents($jsonFilePath);
      $data = json_decode($jsonData, true);
      return new JsonResponse($data);
    }
    return __DIR__ . '/resources/swagger.json';
  }
}