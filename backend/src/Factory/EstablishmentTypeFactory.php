<?php

namespace App\Factory;

use App\Entity\EstablishmentType;
use App\Repository\EstablishmentTypeRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<EstablishmentType>
 *
 * @method        EstablishmentType|Proxy                     create(array|callable $attributes = [])
 * @method static EstablishmentType|Proxy                     createOne(array $attributes = [])
 * @method static EstablishmentType|Proxy                     find(object|array|mixed $criteria)
 * @method static EstablishmentType|Proxy                     findOrCreate(array $attributes)
 * @method static EstablishmentType|Proxy                     first(string $sortedField = 'id')
 * @method static EstablishmentType|Proxy                     last(string $sortedField = 'id')
 * @method static EstablishmentType|Proxy                     random(array $attributes = [])
 * @method static EstablishmentType|Proxy                     randomOrCreate(array $attributes = [])
 * @method static EstablishmentTypeRepository|RepositoryProxy repository()
 * @method static EstablishmentType[]|Proxy[]                 all()
 * @method static EstablishmentType[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static EstablishmentType[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static EstablishmentType[]|Proxy[]                 findBy(array $attributes)
 * @method static EstablishmentType[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static EstablishmentType[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class EstablishmentTypeFactory extends ModelFactory
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
            'name' => self::faker()->words(3, true),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(EstablishmentType $establishmentType): void {})
        ;
    }

    protected static function getClass(): string
    {
        return EstablishmentType::class;
    }
}
