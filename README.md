# Sign / Sign out Feature @livestorm.co

## Configuration

> **Important** : Après avoir cloné le projet et avant d'exécuter les tests :
>
> 1. Dupliquer le fichier `fixtures/users.fixture.default.json`
> 2. Le renommer en `fixtures/users.fixture.json`
> 3. Configurer vos identifiants en éditant l'attribut `validUser`

## Ruby / Capybara

### Serveur Selenium

Pour avoir un serveur selenium nous utilisons Selenoid :

```shell
# Récupération des images docker pour les browsers
$ docker pull selenoid/chrome
$ docker pull selenoid/firefox
# Démarrage de Selenoid
$ docker-compose up -d
```

> **Note :** Ouvrir http://localhost:8080 une fois démarré pour avoir accès à la UI et voir les tests s'exécuter.

### Exécution des tests

```shell
$ cd ruby-capybara
# Installation
$ bundle
# Exécution des tests
$ rake local
```

Pour le reporting allure, on utilise le package npm `allure-commandline` qui n'a pas d'équivalent avec ruby.

```shell
# installation
$ npm i -g allure-commandline
# génération du reporting allure et ouverture
$ allure genenate -c allure-results && allure open
```

## Nodejs / WebdriverIo

### Exécution des tests

```shell
$ cd nodejs-wdio
# Installation
$ npm install
# Exéuction des tests
$ npm test
# Génération du reporting et ouverture
$ npm run report
```

> **Note :** Un serveur selenium est démarré en tant que service lors de l'exécution des tests avec WebdriverIo

## CircleCi

### Nodejs

Exécution d'un serveur selenium dans le container docker :

- [Reporting junit]()
- [Reporting Allure]()

### Ruby

Exécution des tests avec browsers stacks :

- [Reporting junit]()
- [Reporting Allure]()
