# Sign / Sign out Feature @livestorm.co

POC de tests d'acceptation UI avec Capybara et WebdriverIo.

## :rocket: POC

### :clipboard: Objectifs 

| Résumé  |  Capybara |  Wdio | Remarque(s) |
|:---        |:---:    |:---:  | --- |
| Rédiger des exemples (test d'acceptation) permettant de valider les features **Sign in et Sign out @livestorm.co**.  | :white_check_mark:| :white_check_mark: | cf. `Couverture des Tests d'acceptation UI` |
| Exécuter automatiquement les tests avec **circleci** | :white_check_mark: | :white_check_mark: | cf. `CircleCi` | 
| Utiliser des containers **docker** pour l'exécution des tests | :white_check_mark: | :white_check_mark: | cf `CircleCi` et `Serveur Selenium en local` | 
| Exécuter les tests en remote avec **browserstack** | :white_check_mark:| :white_check_mark: | cf. `Ruby / Capybara` et `NodeJS / WebdriverIo` |
| :gift: Générer/Publier le reporting des tests avec **allure** | :white_check_mark:| :white_check_mark: | cf. `Ruby / Capybara` et `NodeJS / WebdriverIo`|
| :gift: Comparaison/Retour d'expérenciences **Capybara Vs. WebdriverIO** pour l'implémentation de tests automatisés de pages web | :white_check_mark:| :white_check_mark: | cf. `Tableau comparatif WebdriverIO VS. Capybara` |

## :mag: Couverture des Tests d'acceptation UI 

Liste des tests d'acceptation UI (Rspec et Mocha) :

* :arrow_down_small: **Sign in Failures**
  * :white_check_mark: should not be signed in with incorrect password
  * :white_check_mark: should redirect to login page in case of sign in failure on server side
* :arrow_down_small: **Sign in Field Errors**
  * :white_check_mark: each invalid field should return an error
  * :white_check_mark: email with invalid format should return an error
  * :white_check_mark: empty email should return an error
  * :white_check_mark: empty password should return an error
  * :white_check_mark: password too short should return an error
* :arrow_down_small: **Sign in Form Errors**
  * :white_check_mark: unknown email should return an error
  * :white_check_mark: incorrect password should return an error
* :arrow_down_small: **Sign in Success**
  * :white_check_mark: should be signed in
  * :white_check_mark: should redirect to Webinars page
* :arrow_down_small: **Sign Out Success**
  * :white_check_mark: should destroy session
  * :white_check_mark: should redirect to sign in page

> **Notes** :
> 1. Les tests décrivent le comportement du système, c'est à dire ce qu'il fait et chaque test vérifie une seule intension à la fois.
> 1. Le niveau de test e2e est le niveau avec le feedback le plus long, c'est à un niveau unitaire qu'il faut être exhaustif sur le domaine/ la fonctionnalité. Au niveau e2e, il est recommandé de couvrir les cas les plus importants de manière à limiter les coûts, la maintenance et à avoir une boucle de feedback rapide.
> 1. Dans un contexte projet avec les méthodologies agiles, pour rédiger ces exemples il est souhaitable de collaborer au travers du célèbre "three amigos" (dev/qa/po) ([example mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/)) pour idéalement les avoir avant de démarrer l'implémentation (aka. BDD/ATDD/TDD).


### :trophy: Tableau comparatif WebdriverIO VS. Capybara

| Critères  |  WebdriverIO | Capybara  |  Commentaires  |
|:---:        |:---:    |:---:       |---        |
| **Mise en place**          | :thumbsup:  |  :thumbsdown: | Plus de code à écrire et de configuration à mettre en place avec capybara (capabilities, test en parallèle, etc.), cli pour la mise en place avec wdio et fichier de configuration.|
| **Allure (Reporting)** | :thumbsup:  | :thumbsdown:   | fonctionnalités non supportés avec allure-ruby e.g : addArgument, hook mieux géré avec mocha vs. Rspec   |
| **Utilisation webdriver**          |  :thumbsdown:  | :thumbsup:  | Pas de gestion d'attente nécessaire avec Capybara  |
| **Framework de tests**          |  :thumbsup:  | :thumbsup:  | Tous deux supportent plusieurs frameworks de tests  |
| **Learning** / **Documentation** / **Communauté**    |  :thumbsup:  | :thumbsdown:  | Sur wdio documentation accessible avec nombreux exemples et communauté d'utilisateurs plus importante |
| **Debug** / **Analyse statique**   |  :thumbsup:  | :thumbsdown:  | Analyse statique du code plus puissante avec typescript et debug plus efficace avec wdio et `browser.debug()` |



## Démo

> **Pré-requis** : Après avoir cloné le projet et avant d'exécuter les tests :
>
> 1. Dupliquer les fichiers `fixtures/users.fixture.default.json` et `config/browserstack.default.config.yml`
> 2. Les renommer en `fixtures/users.fixture.json` et `config/browserstack.config.yml`
> 3. Configurer vos identifiants :
>     * modifier `validUser` dans `users.fixture.json`
>     * modifier `user` et `key` dans `browserstack.config.yml`

### Ruby / Capybara

#### Exécution des tests
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
>**Note** : le rapport allure est généré et ouvert automatiquement lors de l'utilisation d'une tâche rake.

### NodeJS / WebdriverIo

#### Exécution des tests

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

### CircleCi

#### Gestion des secrets

La gestion des secrets s'effectue conjointement avec secrethub et les variables d'environnement circleci.

Liste des secrets :
* `fixtures/users.fixture.json` : contient les users nécessaires à l'authentification. Stocké dans secrethub.
* `config/browserstack.config.yml` : contient la configuration browserstack (credentials, capabilities) pour Capybara. Stocké dans secrethub.
* var d'env circleci `BROWSERSTACK_USERNAME` et `BROWSERSTACK_ACCESS_KEY` accès browser pour WebdriverIO.
* var d'env circleci `CIRCLE_TOKEN` : token d'accès à l'api (build artefacts)
* var d'env circleci `SECRETHUB_CREDENTIAL` : token d'accès pour secrethub

#### Capybara

1. Exécution des tests avec webdriver dans un container docker :
    - [Reporting junit]()
    - [Reporting Allure](https://64-281498399-gh.circle-artifacts.com/0/allure-report/index.html)
2. Exécution des tests avec browserstack :
    - [Reporting junit]()
    - [Reporting Allure](https://64-281498399-gh.circle-artifacts.com/0/allure-report/index.html)


#### Nodejs

1. Exécution d'un serveur selenium dans le container docker :

- [Reporting junit]()
- [Reporting Allure]()

2. Exécution avec browserstack

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

