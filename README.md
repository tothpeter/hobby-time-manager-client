# TimeManager Client

This is the frontend of my hobby project. 

[The main project page](https://github.com/tothpeter/hobby-time-manager)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd time-manager-client`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Set up env variable:

- HOBBY_TIME_MANAGER_DATABASE_URL
- HOBBY_TIME_MANAGER_AWS_ACCESS_KEY_ID
- HOBBY_TIME_MANAGER_AWS_SECRET_ACCESS_KEY

#### To production
- To check the available versions: `ember deploy:list prod`
- To send a new version to production: `ember deploy production`
- Don't forget to activate the new version `ember deploy:activate production --revision=...`

#### To local for testing
Set up env variable: `LOCAL_DATABASE_URL`

`ember deploy development`

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
