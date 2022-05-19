# Projet Dev Mobile
Rendu projet final

### [lien vers expo](https://app.livestorm.co/promyze/comment-booster-lonboarding-dans-vos-equipes-de-developpement/live?s=1efb6bed-d085-4498-88e0-c171fd9e69b0#/chat)
## Procédure d’installation :
<ul>
<li>Clone du projet,</li>
<li>Copie du .env à la racine du projet</li>
<li>Lancer un yarn install</li>
</ul>

 
## Component Swipper :
Implémentation de PanGestureResponder, génère un index aléatoire pour Data/Cities.json qui sera ensuite afficher sur le bloc bleu
Si le bloc est poussé à gauche un appel à Google géocoding est fait, on ajoute alors les longitudes et latitudes à l’objet city
On place l’objet city sur un document firestore, l’action est confirmée par une vibration
## Component Map :
Map affiche toutes les villes stockées sur le projet firebase
Component Search :
Filtre toutes les villes dans Data/Cities.json en fonction de la ville et du pays. Un bouton détail est censé conduire à une vue pour éditer la donnée mais visiblement je ne maîtrise pas la navigation à deux niveaux
