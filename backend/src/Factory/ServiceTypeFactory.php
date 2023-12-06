<?php

namespace App\Factory;

use App\Entity\ServiceType;
use App\Repository\ServiceTypeRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<ServiceType>
 *
 * @method        ServiceType|Proxy                     create(array|callable $attributes = [])
 * @method static ServiceType|Proxy                     createOne(array $attributes = [])
 * @method static ServiceType|Proxy                     find(object|array|mixed $criteria)
 * @method static ServiceType|Proxy                     findOrCreate(array $attributes)
 * @method static ServiceType|Proxy                     first(string $sortedField = 'id')
 * @method static ServiceType|Proxy                     last(string $sortedField = 'id')
 * @method static ServiceType|Proxy                     random(array $attributes = [])
 * @method static ServiceType|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ServiceTypeRepository|RepositoryProxy repository()
 * @method static ServiceType[]|Proxy[]                 all()
 * @method static ServiceType[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static ServiceType[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static ServiceType[]|Proxy[]                 findBy(array $attributes)
 * @method static ServiceType[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static ServiceType[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class ServiceTypeFactory extends ModelFactory
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
            'establishment' => EstablishmentFactory::random(),
            'name' => self::faker()->text(25),
            'description' => self::faker()->text(150),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(ServiceType $serviceType): void {})
        ;
    }

    protected static function getClass(): string
    {
        return ServiceType::class;
    }
}
