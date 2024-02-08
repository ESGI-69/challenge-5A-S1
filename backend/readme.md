# Install project : 

```shell
make install
```

### Show all commands

```shell
make # or
make help
```

### Useful commands : 

```shell
> make stop # Stop all docker images
> make start # Start all docker images
> make restart # Restart all docker images
> make migration # Create migration with changes
> make migrate # Apply new migration 
> make composer # Composer install in docker container
> make entity # Create new entity
> make fixtures # Load fixtures (faker data)

> make docker-disable # Disable docker for php container 
> make docker-enable # Enable docker for php container
...
```

If you disable docker for php container, you should create a .env.local file with 

```dotenv
MAILER_DSN=smtp://localhost:1025
DATABASE_URL="postgresql://symfony:password@localhost:5432/postgres?serverVersion=15&charset=utf8"
```


If make is not enabled : 

```shell
# Si make n'est pas installé 
> docker compose build
> docker compose up -d
> docker compose exec -it php sh

# Le terminal du container s'ouvre :
> composer install
> bin/console lexik:jwt:generate-keypair -n --overwrite
> bin/console doctrine:database:create --if-not-exists
> bin/console doctrine:migrations:migrate -n
> bin/console doctrine:fixtures:load -n
```
# Access to the project
```
localhost:8888
localhost:8888/api/docs
```
# Install and configure extensions

## Install PHP
```
brew install php
```

## Install recommanded extensions
[PHP Intelephense]([URL](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client))
[PHP Getters & Setters](https://marketplace.visualstudio.com/items?itemName=phproberto.vscode-php-getters-setters)
[Symfony for VSCode](https://marketplace.visualstudio.com/items?itemName=TheNouillet.symfony-vscode)
[PHP Debug](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug)

## Get PHP Path
copy the result of this command
```
$ which php
```

## Configure extensions
Past the result of the previous command in the settings.json file of VSCode for these lines:
```
  "php.validate.executablePath": "/opt/homebrew/bin/php",
  "php.debug.executablePath": "/opt/homebrew/bin/php",
  "symfony-vscode.phpExecutablePath": "/opt/homebrew/bin/php",
```

# Export open API documentation
For api usage in hopscotch, you can export the open API documentation with this command:
```sh
bin/console api:openapi:export --output=swagger.json
```

# Deploy with docker compose

- Deploy the project with docker compose:
  ```sh
  docker compose up -d
  ```

- migrate the database:
  ```sh
  docker compose exec php bin/console doctrine:migrations:migrate
  ```

- load fixtures:
  ```sh
  docker compose exec php bin/console doctrine:fixtures:load
  ```

You can log to the project with the following credentials:
- email: `admin@platiny.com`
- password: `password`
