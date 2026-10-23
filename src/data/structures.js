
const structures = [
  // COTONOU — Programme de dépistage du col
  {
    id: 'chu-mel-cotonou',
    nom: 'Centre Hospitalier Universitaire de la Mère et de l’Enfant (CHU-MEL)',
    type: 'Centre hospitalier universitaire',
    ville: 'Cotonou',
    quartier: '',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=CHU-MEL+Cotonou+Benin',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Entr%C3%A9e_principale_du_centre_hospitalier_universitaire_de_la_m%C3%A8re_et_l%27enfant_de_Lagune_Cotonou%28CHU-MEL.jpg',
    imageSource:
      'https://commons.wikimedia.org/wiki/File:Entr%C3%A9e_principale_du_centre_hospitalier_universitaire_de_la_m%C3%A8re_et_l%27enfant_de_Lagune_Cotonou%28CHU-MEL.jpg',
    imageCredit: 'Saliousoft — Wikimedia Commons, CC BY-SA 4.0',
  },
  {
    id: 'maternite-ahouansori',
    nom: 'Maternité d’Ahouansori',
    type: 'Maternité / centre de santé',
    ville: 'Cotonou',
    quartier: 'Ahouansori',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Maternit%C3%A9+Ahouansori+Cotonou+Benin',
    image: '',
    imageSource: '',
    imageCredit: '',
  },
  {
    id: 'maternite-gbegamey',
    nom: 'Maternité de Gbégamey',
    type: 'Maternité / centre de santé',
    ville: 'Cotonou',
    quartier: 'Gbégamey',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Maternit%C3%A9+Gb%C3%A9gamey+Cotonou+Benin',
    image: '',
    imageSource: '',
    imageCredit: '',
  },
  {
    id: 'maternite-missessin',
    nom: 'Maternité de Missessin',
    type: 'Maternité / centre de santé',
    ville: 'Cotonou',
    quartier: 'Missessin',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Maternit%C3%A9+Missessin+Cotonou+Benin',
    image: '',
    imageSource: '',
    imageCredit: '',
  },
  {
    id: 'maternite-sikekodji',
    nom: 'Maternité de Sikècodji',
    type: 'Maternité / centre de santé',
    ville: 'Cotonou',
    quartier: 'Sikècodji',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/le-blog/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Centre+de+sant%C3%A9+Sik%C3%A8codji+Cotonou+Benin',
    image: '',
    imageSource: '',
    imageCredit: '',
  },
  {
    id: 'maternite-suru-lere',
    nom: 'Maternité de Suru Léré',
    type: 'Maternité / centre de santé',
    ville: 'Cotonou',
    quartier: 'Suru Léré',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=H%C3%B4pital+de+zone+Suru-L%C3%A9r%C3%A9+Cotonou+Benin',
    // Des photos existent dans l’album de la Présidence.
    // Vérifier la façade exacte avant d’ajouter une image.
    image: '',
    imageSource: '',
    imageCredit: '',
  },
  {
    id: 'centre-sante-zogbo',
    nom: 'Centre de santé de Zogbo',
    type: 'Centre de santé',
    ville: 'Cotonou',
    quartier: 'Zogbo',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Centre+de+sant%C3%A9+Zogbo+Cotonou+Benin',
    image: '',
    imageSource: '',
    imageCredit: '',
  },

  // PARAKOU — Programme de dépistage du col
  {
    id: 'chud-borgou-alibori',
    nom: 'Centre Hospitalier Universitaire Départemental du Borgou et de l’Alibori (CHUD-BA)',
    type: 'Centre hospitalier universitaire',
    ville: 'Parakou',
    quartier: '',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=CHUD+Borgou+Alibori+Parakou+Benin',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Centre_Hospitalier_D%C3%A9partemental_Borgou-Alibori.jpg',
    imageSource:
      'https://commons.wikimedia.org/wiki/File:Centre_Hospitalier_D%C3%A9partemental_Borgou-Alibori.jpg',
    imageCredit: 'Wikimedia Commons — voir la page source pour la licence',
  },
  {
    id: 'centre-sante-kpebie',
    nom: 'Centre de santé de Kpébié',
    type: 'Centre de santé',
    ville: 'Parakou',
    quartier: 'Kpébié',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Centre+de+sant%C3%A9+Kp%C3%A9bi%C3%A9+Parakou+Benin',
    image: '',
    imageSource: '',
    imageCredit: '',
  },
  {
    id: 'centre-sante-zongo-parakou',
    nom: 'Centre de santé de Zongo',
    type: 'Centre de santé',
    ville: 'Parakou',
    quartier: 'Zongo',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Centre+de+sant%C3%A9+Zongo+Parakou+Benin',
    image: '',
    imageSource: '',
    imageCredit: '',
  },
  {
    id: 'cscom-parakou',
    nom: 'Centre de Santé Communal de Parakou (CSCOM)',
    type: 'Centre de santé communal',
    ville: 'Parakou',
    quartier: '',
    adresse: '',
    telephone: '',
    services: ['Dépistage du cancer du col de l’utérus'],
    horaires: 'À confirmer auprès de la structure',
    sourceUrl:
      'https://fondationclaudinetalon.org/index.php/lutte-contre-le-cancer-du-col-de-luterus/',
    verifieLe: '2026-10-23',
    statut: 'source-officielle',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Centre+de+Sant%C3%A9+Communal+Parakou+Benin',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Centre_de_sant%C3%A9_de_la_commune_de_Parakou.jpg',
    imageSource:
      'https://commons.wikimedia.org/wiki/File:Centre_de_sant%C3%A9_de_la_commune_de_Parakou.jpg',
    imageCredit: 'Saliousoft — Wikimedia Commons, CC BY-SA 4.0',
  },

  // COTONOU — Mammographie et gynécologie
  {
    id: 'polyclinique-les-cocotiers',
    nom: 'Polyclinique Les Cocotiers',
    type: 'Polyclinique privée',
    ville: 'Cotonou',
    quartier: 'Haie Vive - Cocotiers',
    adresse:
      'Îlot n°1792, parcelle E, Résidence Les Cocotiers, Cotonou',
    telephone: '+2290121400401',
    services: [
      'Mammographie',
      'Consultation gynécologique',
      'Imagerie médicale',
    ],
    horaires:
      'Lundi au vendredi : 07 h–19 h ; samedi : 07 h–13 h. Confirmer la disponibilité de la mammographie.',
    sourceUrl:
      'https://www.polycliniquelescocotiers.com/services/mammographie/',
    verifieLe: '2026-10-23',
    statut: 'verifie',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Polyclinique+Les+Cocotiers+Cotonou+Benin',
    image: '',
    imageSource:
      'https://www.polycliniquelescocotiers.com/',
    imageCredit: '',
  },
]

export default structures
