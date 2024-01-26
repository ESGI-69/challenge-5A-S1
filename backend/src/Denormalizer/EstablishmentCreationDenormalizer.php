<?php

namespace App\Denormalizer;

use App\Entity\Establishment;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * @method  getSupportedTypes(?string $format)
 */
class EstablishmentCreationDenormalizer implements DenormalizerInterface
{
    use DenormalizerAwareTrait;

    public function __construct(
        protected ObjectNormalizer $normalizer,
    ) {}

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === Establishment::class;
    }

    public function denormalize(mixed $data, string $type, string $format = null, array $context = [])
    {
        $establishment = $this->normalizer->denormalize($data, $type, $format, $context);

        /** @var Establishment $establishment */

        $address = "{$establishment->getStreet()} {$establishment->getZipCode()} {$establishment->getCity()} {$establishment->getCountry()}";

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
            return ['error' => 'Access denied'];
        }

        $data = json_decode($response, true);

        if (empty($data)) {
            return ['error' => 'Address not found'];
        }

        $result = [
            'latitude' => $data[0]['lat'],
            'longitude' => $data[0]['lon'],
        ];

        $establishment->setLat($result['latitude']);

        $establishment->setLong($result['longitude']);

        return $establishment;
    }
}
