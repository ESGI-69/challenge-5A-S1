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
        $getParameters = $request->query->all();
        $address = $getParameters['address'];

        if(empty($address)){
            return new JsonResponse(['error' => 'Address not found'], 404);
        }
    
        $url = sprintf('https://nominatim.openstreetmap.org/search?q=%s&format=json', urlencode($address));
    
        //On doit ajouter un user agent pour que l'api d'openstreetmap accepte
        $options = [
            'http' => [
                'header' => 'User-Agent: Platiny/1.0',
            ],
        ];
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
    
        if ($response === false) {
            return new JsonResponse(['error' => 'Access denied'], 403);
        }
    
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