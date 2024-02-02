<?php

namespace App\Factory;

use App\Entity\Establishment;
use App\Repository\EstablishmentRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Establishment>
 *
 * @method        Establishment|Proxy                     create(array|callable $attributes = [])
 * @method static Establishment|Proxy                     createOne(array $attributes = [])
 * @method static Establishment|Proxy                     find(object|array|mixed $criteria)
 * @method static Establishment|Proxy                     findOrCreate(array $attributes)
 * @method static Establishment|Proxy                     first(string $sortedField = 'id')
 * @method static Establishment|Proxy                     last(string $sortedField = 'id')
 * @method static Establishment|Proxy                     random(array $attributes = [])
 * @method static Establishment|Proxy                     randomOrCreate(array $attributes = [])
 * @method static EstablishmentRepository|RepositoryProxy repository()
 * @method static Establishment[]|Proxy[]                 all()
 * @method static Establishment[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Establishment[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Establishment[]|Proxy[]                 findBy(array $attributes)
 * @method static Establishment[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Establishment[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class EstablishmentFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'city' => self::faker()->city(),
            'company' => CompanyFactory::random(),
            'country' => 'France',
            'email' => self::faker()->email(),
            'lat' => self::faker()->randomFloat(6, 46, 50),
            'long' => self::faker()->randomFloat(6, 2, 3),
            'street' => self::faker()->streetAddress(),
            'type' => EstablishmentTypeFactory::random(),
            'zipCode' => self::faker()->postcode(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Establishment $establishment): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Establishment::class;
    }
}
