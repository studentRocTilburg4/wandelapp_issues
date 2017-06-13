/**
 *
 * Start project:
 *
 * Maak als projectgroep je eigen Github account aan.
 * 'Fork' wandelapp_issues naar jullie nieuwe account (forking is kopieren).
 * Ieder lid van de projectgroep maakt in bv. Webstorm een lokale gitkopie.
 * Vergeet niet een npm install te doen (waarom?)
 * Je maakt dit project volgens de scrum-methode. Dat betekent dus dat je de volgende rollen hebt:
 * - scrummaster
 * - product owner
 * - developers
 *
 * De productowner heeft de prioriteit van de backlogitems bepaald
 * Werk de backlogitems zo uit dat je kunt pokeren.
 * Bepaal de velocity en welke onderdelen je in de volgende sprint gaat maken.
 *
 * Elke twee weken lever je de nieuwe features en bugfixes op in een nieuwe branch!
 * Bij de naamgeving van de nieuwe release houd je rekening met 'semantic versioning', zie http://semver.org/.
 *
 *
 * WANDELAPP BACKEND:
 * De webapp maakt gebruik van een backend (wandelappbackend).
 * Om de checken of deze draait ga je naar https://wandelappbackend-dvriet.rhcloud.com/ (OPENSHIFT)
 * Om de MongoDB in te kijken:
 * Dat kan via RockMongo: https://wandelappbackend-dvriet.rhcloud.com/rockmongo/index.php?action=admin.index&host=0
 *
 * Informatie over de backend kun je opvragen via https://wandelappbackend-dvriet.rhcloud.com/help
 *
 * Start deze webapp:
 * Na wijzigingen: in de Terminal:
 * wandelapp_issues/grunt (waarom?)
 * Dan in index.html openen (moet via localhost ivm doorgeven postitie device) door in Webstorm
 * te kiezen voor openen in een browser (dan auto via localhost)
 *
 */

import {hikingapp} from './hikingapp';

// Server that stores route data
const remoteserver = "https://wandelappbackend-dvriet.rhcloud.com";

document.addEventListener('DOMContentLoaded', () => {
    //Load the app with the REST server
    hikingapp(remoteserver);
});
