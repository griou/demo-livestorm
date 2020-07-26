# Sign / Sign out Feature @livestorm.co

## Configuration

> **Important** : Après avoir cloné le projet et avant d'exécuter les tests :
>
> 1. Dupliquer les fichiers `fixtures/users.fixture.default.json` et `config/browserstack.default.config.yml`
> 2. Les renommer en `fixtures/users.fixture.json` et `config/browserstack.config.yml`
> 3. Configurer vos identifiants :
>     * modifier `validUser` dans `users.fixture.json`
>     * modifier `user` et `key` dans `browserstack.config.yml`

## Ruby / Capybara

### Exécution des tests
> **Important**: pour le reporting allure, l'installation de java est nécessaire ainsi que le client allure, on utilise le package npm `allure-commandline` qui n'a pas d'équivalent avec ruby.

```shell
# installation
$ npm i -g allure-commandline
# génération du reporting allure et ouverture
$ allure genenate -c allure-results && allure open
```
Une fois allure installé :
```shell
$ cd ruby-capybara
# Installation
$ bundle install
# Exécution des tests en local avec chrome
$ rake e2e
# Exécution des tests en parallèle avec browserstack
$ rake e2e:parallel_bs
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

### Gestion des secrets

La gestion des secrets s'effectue conjointement avec secrethub et les varaibles d'environnement circleci.

### Nodejs

Exécution d'un serveur selenium dans le container docker :

- [Reporting junit]()
- [Reporting Allure]()
### Ruby

Exécution des tests avec browsers stacks :

- [Reporting junit]()
- [Reporting Allure](https://64-281498399-gh.circle-artifacts.com/0/allure-report/index.html)


## Serveur Selenium en local

Pour lancer un serveur selenium en local nous pouvons aussi utiliser Selenoid :

```shell
# Récupération des images docker pour les browsers
$ docker pull selenoid/chrome
$ docker pull selenoid/firefox
# Démarrage de Selenoid
$ docker-compose up -d
```

> **Note :** Ouvrir http://localhost:8080 une fois démarré pour avoir accès à la UI et voir les tests s'exécuter et utiliser l'adresse http://localhost:4444/wd/hub pour configurer l'adresse du serveur remote.

## Comparaison WebdriverIO vs Capybara

| Critères  |  WebdriverIO | Capybara  |  Commentaires  |
|:---:        |:---:    |:---:       |---        |
| **Mise en place**          | :thumbsup:  |  :thumbsdown: | Plus de code à écrire et de configuration à mettre en place avec capybara (capabilities, test en parallèle, etc.), cli pour la mise en place avec wdio et fichier de configuration.|
| **Allure (Reporting)** | :thumbsup:  | :thumbsdown:   | fonctionnalités non supportés avec allure-ruby e.g : addArgument, hook mieux géré avec mocha vs. Rspec   |
| **Utilisation webdriver**          |  :thumbsdown:  | :thumbsup:  | Pas de gestion d'attente nécessaire avec Capybara  |
| **Framework de tests**          |  :thumbsup:  | :thumbsup:  | Tous deux supportent plusieurs frameworks de tests  |
| **Learning** / **Documentation** / **Communauté**    |  :thumbsup:  | :thumbsdown:  | Sur wdio documentation accessible avec nombreux exemples et communauté d'utilisateurs plus importante |
| **Debug** / **Analyse statique**   |  :thumbsup:  | :thumbsdown:  | Analyse statique du code plus puissante avec typescript et debug plus efficace avec wdio et `browser.debug()` |

