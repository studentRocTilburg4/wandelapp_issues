# wandelapp_basis_project
Webapp which is a base for a student project in which they have to add new features.

##Voor de student
Voor wandelaars kan het handig zijn om een app te hebben waarop de te wandelen route is aangegeven. Op deze manier kunnen ze nooit de weg kwijtraken.
Deze app heeft dit als doel. Op een eenvoudige manier moet het mogelijk zijn om een gpx bestand (een speciaal xml bestand met de route) te uploaden.
Tijdens het wandelen kan de wandelaar de route kiezen en wordt een kaart getoond waarin die route is aangegeven alsmede de positie.

Bij dit project hoort een ander project, namelijk wandelappbackend. Hierin hoeft niets ontwikkeld te worden maar je hebt het wel nodig om routes in op te slaan of uit te lezen.

De app is voor een deel ontwikkeld maar nog niet af. In de issues in Github staan verbeterpunten die jullie moeten ontwikklen.


### Praktisch

* Je gaat werken in een projectgroep van 3 leden (door docent bepaald).
* Maak als <u>projectgroep</u> je eigen Github account aan (dus niet als individuele gebruiker).
* 'Fork' wandelapp_issues naar jullie nieuwe account (forking is kopieren).
* Ieder lid van de projectgroep maakt in bv. Webstorm een lokale gitkopie.
* Vergeet niet een npm install te doen (waarom?)
* Je werkt aan dit project volgens de scrum-methode. Bepaal de rollen:
  - scrummaster
  - product owner
  - developers
* Maak in Trello een scrumboard met een backlog.
* De productowner bepaalt de prioriteit van de backlogitems.
* Werk een aantal backlogitems uit zodat je kunt pokeren.
* Bepaal welke onderdelen je in de volgende sprint gaat maken. Een sprint mag maximaal 3 weken duren (9 uur per week). In totaal heb je 6 weken, dus twee sprints.
* Let op: niet ALLE issues hoeven per se opgelost te worden in deze zes weken! Het gaat om kwlaiteit en niet om kwantiteit.
* <u>Vraag aan de docent of de gekozen items voor de sprint akkoord zijn.</u>
* Start de ontwikkeling aan de hand van het scrumboard.
* Werk met branches tijdens de ontwikkeling! Bekijk: https://www.youtube.com/watch?v=SBuxRiPk2Zg en kies een strategie.
* <u>Als tijdens de ontwikkeling tegen problemen aanloopt of extra instructie nodig hebt, ga naar de docent.</u>.
* <u>Na drie weken wordt klassikaal een retrospective gedaan waarin problemen worden benoemd.</u> 


### Testen Wandelapp
Na wijzigingen in Webstorm: 
* In de Terminal grunt uitvoeren (waarom?)
* index.html openen in Webstorm
* Kiezen voor openen in Chrome (index.html moet via localhost geopend worden i.v.m. doorgeven postitie device)


### Wandelappbackend
* De webapp maakt gebruik van een backend (wandelappbackend).
* Om de checken of deze draait ga je naar http://nodejs-mongo-persistent-wandelappbackend-v2.a3c1.starter-us-west-1.openshiftapps.com/health (OPENSHIFT V3)
* Informatie over de backend kun je opvragen via http://nodejs-mongo-persistent-wandelappbackend-v2.a3c1.starter-us-west-1.openshiftapps.com/
