<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\OpenApiStateProvider;

#[ApiResource(
  provider: OpenApiStateProvider::class,
  normalizationContext: ['groups' => ['read-openapi']],
  operations: [
    new GetCollection(
      description: "Get the OpenAPI documentation as JSON",
      paginationEnabled: false,
      uriTemplate: '/openapi',
      security: 'is_granted("ROLE_ADMIN")'
    )
  ],
)]
class OpenApi {
  private $openapi = "";

  public function getOpenApi() {
    return $this->openapi;
  }
}