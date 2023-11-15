<?php

declare(strict_types=1);

//controller qui créer un endpoint api platform qui ne soit pas lié à une entité (je voudrais faire un endpoint /resolve-pos qui lorsqu'on lui envoie une adresse, renvoie la geoposition (j'utilise l'api d'openstreetmap),

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityNotFoundException;


#[AsController]
class ResolvePosController
{

    public function __construct()
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $address = $request->request->get('address');

        $url = sprintf('https://nominatim.openstreetmap.org/search?q=%s&format=json', urlencode($address));
        $response = file_get_contents($url);
        $data = json_decode($response, true);

        if (empty($data)) {
            return new JsonResponse(['error' => 'Address not found'], 404);
        }

        $result = [
            'latitude' => $data[0]['lat'],
            'longitude' => $data[0]['lon'],
        ];

        return new JsonResponse($result);
    }
}