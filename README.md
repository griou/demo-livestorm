# Sign / Sign out Feature @livestorm.co

POC de tests d'acceptation UI avec Capybara et WebdriverIo.

## :rocket: POC

### :clipboard: Objectifs

| Résumé                                                                                                                       |      Capybara      |        Wdio        | Remarque(s)                                       |
| :--------------------------------------------------------------------------------------------------------------------------- | :----------------: | :----------------: | ------------------------------------------------- |
| Rédiger des exemples (test d'acceptation) permettant de valider les features **Sign in et Sign out @livestorm.co**.          | :white_check_mark: | :white_check_mark: | cf. `Couverture des Tests d'acceptation UI`       |
| Exécuter automatiquement les tests avec **circleci**                                                                         | :white_check_mark: | :white_check_mark: | cf. `CircleCi`                                    |
| Utiliser des containers **docker** pour l'exécution des tests                                                                | :white_check_mark: | :white_check_mark: | cf `CircleCi` et `Serveur Selenium en local`      |
| Exécuter les tests en remote avec **browserstack**                                                                           | :white_check_mark: | :white_check_mark: | cf. `Ruby / Capybara` et `NodeJS / WebdriverIo`   |
| :gift: Générer/Publier le reporting des tests avec **allure**                                                                | :white_check_mark: | :white_check_mark: | cf. `Ruby / Capybara` et `NodeJS / WebdriverIo`   |
| :gift: Comparaison/Retour d'expériences **Capybara Vs. WebdriverIO** pour l'implémentation de tests automatisés de pages web | :white_check_mark: | :white_check_mark: | cf. `Tableau comparatif WebdriverIO VS. Capybara` |

## :mag: Couverture des Tests d'acceptation UI

Liste des tests d'acceptation UI (Rspec et Mocha) :

- :arrow_down_small: **Sign in Failures**
  - :white_check_mark: should not be signed in with incorrect password
  - :white_check_mark: should redirect to login page in case of sign in failure on server side
- :arrow_down_small: **Sign in Field Errors**
  - :white_check_mark: each invalid field should return an error
  - :white_check_mark: email with invalid format should return an error
  - :white_check_mark: empty email should return an error
  - :white_check_mark: empty password should return an error
  - :white_check_mark: password too short should return an error
- :arrow_down_small: **Sign in Form Errors**
  - :white_check_mark: unknown email should return an error
  - :white_check_mark: incorrect password should return an error
- :arrow_down_small: **Sign in Success**
  - :white_check_mark: should be signed in
  - :white_check_mark: should redirect to Webinars page
- :arrow_down_small: **Sign Out Success**
  - :white_check_mark: should destroy session
  - :white_check_mark: should redirect to sign in page

> **Notes** :
>
> 1. Les tests décrivent le comportement du système, c'est à dire ce qu'il fait (et non comment) et chaque test vérifie une seule intension à la fois.
> 1. C'est à un niveau unitaire qu'il faut être exhaustif sur le domaine/la fonctionnalité. Au niveau e2e, il est recommandé de couvrir les cas les plus importants (happy path) de manière à limiter les coûts, la maintenance et à avoir une boucle de feedback rapide.
> 1. Dans un contexte projet avec les méthodologies agiles, pour rédiger ces exemples il est souhaitable de collaborer au travers du célèbre "three amigos" avec dev/qa/po pour avoir les exemples avant de démarrer l'implémentation (aka. BDD/ATDD/TDD).
> 1. Les tests utilisent le design pattern page object model.
>
> **Références** :
>
> - [PageObject](https://martinfowler.com/bliki/PageObject.html)
> - [Creating Fast, Reliable, Focused UI Automation With Atomic Tests](https://medium.com/swlh/creating-fast-reliable-focused-ui-automation-with-atomic-tests-582e4318c0bb)
> - [The world's most misunderstood collaboration tool](https://cucumber.io/blog/collaboration/the-worlds-most-misunderstood-collaboration-tool/)
> - [Introducing Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/)

### :trophy: Tableau comparatif WebdriverIO VS. Capybara

|                     Critères                      | WebdriverIO  |   Capybara   | Commentaires                                                                                                                                                                                                                                                       |
| :-----------------------------------------------: | :----------: | :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                 **Mise en place**                 |  :thumbsup:  | :thumbsdown: | Plus de code à écrire et de configuration à mettre en place avec capybara (capabilities, test en parallèle, allure, browserstack), cli pour la mise en place avec wdio et gestion de la configuration via fichiers built-in.                                       |
|                **Fonctionnalités**                |  :thumbsup:  | :thumbsdown: | Wdio est un framework riche pour l'automatisation de tests e2e avec de nombreux services disponibles (shared store, selenium, browserstack, appium), protocoles (webdriver, appiup, devtools) et nombreux format de supporting géré (allure, junit, cucumber, etc) |
|              **Allure (Reporting)**               |  :thumbsup:  | :thumbsdown: | fonctionnalités non supportées avec allure-ruby e.g addArgument, plus de fonctionnalités pour le reporting avec mocha VS. Rspec.                                                                                                                                   |
|             **Utilisation webdriver**             | :thumbsdown: |  :thumbsup:  | Pas de gestion d'attente nécessaire avec Capybara, téléchargement automatique des webdrivers avec wdio et Capybara                                                                                                                                                 |
|              **Framework de tests**               |  :thumbsup:  |  :thumbsup:  | Tous deux supportent plusieurs frameworks de tests.                                                                                                                                                                                                                |
| **Learning** / **Documentation** / **Communauté** |  :thumbsup:  | :thumbsdown: | Documentation wdio accessible avec nombreux exemples et communauté d'utilisateurs importante. Utilisé dans de nombreux projets open source, e.g appium.                                                                                                            |
|         **Debug** / **Analyse statique**          |  :thumbsup:  | :thumbsdown: | Analyse statique du code puissante avec typescript et debug efficace avec la commande wdio `browser.debug()` permettant d'exécuter du code via un REPL (Read Eval Print Loop).                                                                                     |

## :video_game: Démo

> **Pré-requis** : Après avoir cloné le projet et avant d'exécuter les tests :
>
> 1. Dupliquer les fichiers `fixtures/users.fixture.default.json` et `config/browserstack.default.config.yml`
> 2. Les renommer en `fixtures/users.fixture.json` et `config/browserstack.config.yml`
> 3. Configurer vos identifiants :
>    - modifier `validUser` dans `users.fixture.json`
>    - modifier `user` et `key` dans `browserstack.config.yml`

### :gem: Ruby / Capybara

#### :coffee: Exécution des tests

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
# Exécution des tests en local avec chromedriver
$ rake e2e
# Exécution des tests en remote avec un serveur selenium
# (serveur selenium à démarrer au préalable, cf. Serveur Selenium en local)
$ rake e2e:chrome_remote
# Exécution des tests en parallèle avec browserstack
$ rake e2e:parallel_bs
```

> **Note** : le rapport allure est généré et ouvert automatiquement lors de l'utilisation d'une tâche rake.

### :robot: NodeJS / WebdriverIo

#### :coffee: Exécution des tests

```shell
$ cd nodejs-wdio
# Installation
$ npm install
# Exéuction des tests en local avec un serveur selenium
# (serveur démarré automatiquement en tant que service par wdio)
$ npm test
# Exéuction des tests en remote avec browserstack
$ npm run e2e:bs
# Génération du reporting et ouverture
$ npm run report
```

### :truck: CircleCi

:arrow_right: **[Accès CircleCi](https://app.circleci.com/pipelines/github/griou/demo-livestorm)** :arrow_left:

#### :door: Gestion des secrets

La gestion des secrets s'effectue conjointement avec secrethub et les variables d'environnement circleci.

Liste des secrets :

- `fixtures/users.fixture.json` : contient les users nécessaires à l'authentification. Stocké dans secrethub.
- `config/browserstack.config.yml` : contient la configuration browserstack (credentials, capabilities) pour Capybara. Stocké dans secrethub.
- var d'env circleci `BROWSERSTACK_USERNAME` et `BROWSERSTACK_ACCESS_KEY` accès browser pour WebdriverIO.
- var d'env circleci `CIRCLE_TOKEN` : token d'accès à l'api (build artefacts)
- var d'env circleci `SECRETHUB_CREDENTIAL` : token d'accès pour secrethub

#### :hamster: Capybara

1. Exécution des tests avec webdriver dans un container docker :
   - Reporting junit : [OK]() / [KO](https://app.circleci.com/pipelines/github/griou/demo-livestorm/57/workflows/9361b2e7-19df-4a63-8459-91b30989749f/jobs/141/tests)
   - Reporting Allure : [OK]() / [KO](https://141-281498399-gh.circle-artifacts.com/0/allure-report/index.html)

#### :robot: WebdriverIo

1. Exécution d'un serveur selenium dans le container docker :
   - Reporting junit : [OK](https://app.circleci.com/pipelines/github/griou/demo-livestorm/43/workflows/ed05443a-81de-4209-af6d-e0aa41a7df60/jobs/103/tests)
   - Reporting Allure : [OK](https://app.circleci.com/pipelines/github/griou/demo-livestorm/43/workflows/ed05443a-81de-4209-af6d-e0aa41a7df60/jobs/103/tests)
2. Exécution avec browserstack
   - Reporting Allure : [OK](https://app.circleci.com/pipelines/github/griou/demo-livestorm/44/workflows/5e533997-5399-46ff-a51f-983da5378dcf/jobs/105/tests)

## :whale: Serveur Selenium en local

Pour lancer un serveur selenium en local nous pouvons aussi utiliser Selenoid :

```shell
# Récupération des images docker pour les browsers
$ docker pull selenoid/chrome
$ docker pull selenoid/firefox
# Démarrage de Selenoid
$ docker-compose up -d
```

> **Note :** Ouvrir http://localhost:8080 une fois démarré pour avoir accès à la UI et voir les tests s'exécuter et utiliser l'adresse http://localhost:4444/wd/hub pour configurer l'adresse du serveur remote.
