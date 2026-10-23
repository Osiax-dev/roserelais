/* ------------------------------------------------------------------ */
/*  BANQUE DE FAITS (à faire relire par un professionnel de santé)     */
/* ------------------------------------------------------------------ */

const THEMES = {
  sein: {
    label: 'Cancer du sein',
    facts: [
      'Une nouvelle masse dans le sein doit être évaluée par un professionnel de santé. Elle ne signifie pas automatiquement un cancer.',
      'Une modification inhabituelle de la peau du sein (rougeur, aspect de peau d’orange, rétraction) mérite une évaluation médicale.',
      'Une modification du mamelon ou un écoulement inhabituel doit être signalé à un professionnel de santé.',
      'Le cancer du sein peut aussi toucher les hommes, même si la maladie est beaucoup plus fréquente chez les femmes.',
      'L’absence de douleur ne suffit pas à exclure une maladie du sein.',
      'De nombreuses masses du sein sont bénignes, mais seul un examen adapté permet de le confirmer.',
      'Se familiariser avec l’aspect et la sensation habituels de ses seins aide à repérer rapidement un changement.',
      'Une masse ou un gonflement sous l’aisselle peut aussi nécessiter une évaluation médicale.',
      'Un changement du sein doit être signalé sans attendre le prochain dépistage.',
      'L’autopalpation seule ne permet pas de confirmer un cancer : le diagnostic nécessite des examens médicaux adaptés.',
      'Lorsqu’un cancer du sein est détecté tôt, les possibilités de traitement sont en général meilleures.',
      'L’absence d’antécédent familial n’exclut pas un risque de cancer du sein.',
      'Face à un changement du sein, il faut consulter un professionnel qualifié plutôt qu’essayer des remèdes non évalués.',
      'Un résultat d’examen anormal ne signifie pas automatiquement un cancer : des examens complémentaires peuvent être nécessaires.',
    ],
  },
  col_uterus: {
    label: 'Cancer du col de l’utérus',
    facts: [
      'Une infection persistante par certains types de papillomavirus humains (HPV) à haut risque est à l’origine de la grande majorité des cancers du col de l’utérus.',
      'Le HPV est un virus très fréquent : dans la plupart des cas, le corps l’élimine seul.',
      'Être porteuse du HPV ne signifie pas avoir un cancer.',
      'Le cancer du col de l’utérus évolue en général lentement, sur de nombreuses années, à partir de lésions précancéreuses.',
      'Les lésions précancéreuses du col n’entraînent en général aucun symptôme.',
      'Selon la méthode utilisée, le dépistage peut rechercher un HPV à haut risque ou des anomalies des cellules du col.',
      'Un résultat de dépistage anormal ne signifie pas automatiquement que la personne a un cancer.',
      'Un saignement vaginal inhabituel, notamment après un rapport sexuel ou après la ménopause, mérite une évaluation médicale.',
      'Des pertes vaginales inhabituelles et persistantes, ou des douleurs pendant les rapports, peuvent nécessiter un avis médical.',
      'Des défenses immunitaires affaiblies, par exemple en cas d’infection par le VIH, peuvent rendre l’élimination du HPV plus difficile et justifient un suivi régulier.',
      'Le tabac est associé à un risque plus élevé de lésions du col chez les femmes infectées par le HPV.',
      'Lorsqu’elles sont détectées tôt, les lésions précancéreuses du col peuvent être traitées avant de devenir un cancer.',
      'Le test HPV, le frottis et l’inspection visuelle sont des méthodes de dépistage différentes.',
      'Le vaccin contre le HPV ne remplace pas le dépistage.',
    ],
  },
  prevention: {
    label: 'Prévention et dépistage',
    facts: [
      'Certaines lésions précancéreuses peuvent être détectées avant qu’un cancer ne se développe.',
      'Le dépistage s’adresse à des personnes qui n’ont aucun symptôme.',
      'Les personnes éligibles au dépistage peuvent avoir besoin de le faire même en l’absence de symptômes.',
      'Les âges et intervalles de dépistage dépendent des recommandations nationales, de la méthode utilisée et de la situation individuelle.',
      'Un résultat anormal doit être interprété par un professionnel de santé qui indiquera les examens complémentaires éventuels.',
      'Le dépistage recherche une anomalie chez une personne sans symptôme, alors que le diagnostic cherche la cause d’un signe ou d’un résultat anormal.',
      'Un résultat de dépistage normal ne dispense pas de consulter si un signe inhabituel apparaît ensuite.',
      'Un signe inhabituel doit être évalué sans attendre le prochain dépistage.',
      'La vaccination contre le HPV et le dépistage sont deux moyens complémentaires de prévenir le cancer du col de l’utérus.',
      'Le tabac est un facteur de risque que l’on peut éviter.',
      'Revenir au rendez-vous de retour pour obtenir son résultat et la suite éventuelle fait partie du dépistage.',
      'Un centre de santé ou un professionnel qualifié peut indiquer quels dépistages sont disponibles.',
    ],
  },
  hpv: {
    label: 'Vaccination contre le HPV',
    facts: [
      'La vaccination contre le HPV prévient plusieurs infections par des types de HPV associés à des cancers.',
      'La vaccination ne protège pas contre tous les types de HPV à risque et ne remplace pas le dépistage recommandé.',
      'La vaccination est particulièrement efficace lorsqu’elle est réalisée avant l’exposition au virus, selon le calendrier recommandé.',
      'Le calendrier vaccinal et les conditions d’accès doivent être vérifiés auprès des autorités sanitaires locales.',
      'Le HPV se transmet surtout par contact intime.',
      'Le vaccin est préventif : il ne traite pas une infection ou une lésion déjà présente.',
      'Une campagne nationale de vaccination contre le HPV s’est déroulée au Bénin en décembre 2025, pour les filles de 9 à 14 ans, avec une dose unique.',
      'La gratuité d’une campagne de vaccination concerne la campagne, pas nécessairement les services proposés ensuite.',
      'Une femme vaccinée contre le HPV doit quand même se faire dépister selon les recommandations.',
      'Avoir le HPV ne signifie pas avoir un cancer.',
      'Les jeunes filles sont ciblées par la vaccination car le vaccin est plus efficace avant les premiers contacts avec le virus.',
      'Une personne plus âgée peut demander à un professionnel de santé si la vaccination est adaptée à sa situation.',
    ],
  },
  orientation: {
    label: 'Orientation sanitaire',
    facts: [
      'Un signe inhabituel ne permet pas à lui seul de diagnostiquer un cancer ; une évaluation médicale est nécessaire.',
      'Un centre de santé ou un professionnel qualifié peut renseigner sur les services de dépistage et d’orientation disponibles.',
      'Un saignement abondant accompagné d’un malaise, une forte douleur ou une fièvre importante peuvent nécessiter une aide médicale urgente.',
      'Il faut éviter de commencer un traitement contre un cancer supposé sans évaluation par un professionnel qualifié.',
      'Un centre de santé est un bon premier point de contact pour une question sur un signe inhabituel ou sur le dépistage.',
      'Avant une consultation, noter les signes observés et depuis quand ils sont présents aide le professionnel de santé.',
      'Les informations éducatives en ligne ne remplacent pas une consultation médicale.',
      'Un résultat anormal n’est pas un cancer en soi : le professionnel de santé explique la suite à donner.',
      'Il est important de garder son rendez-vous de retour pour recevoir son résultat.',
      'Pendant un examen, on peut poser toutes ses questions et signaler une douleur ou une inquiétude au professionnel.',
      'Les dates, conditions d’accès et tarifs des campagnes de santé se vérifient auprès des structures concernées.',
      'Un saignement vaginal inhabituel doit être évalué par un professionnel de santé sans attendre.',
    ],
  },
  general: {
    label: 'Connaissances générales',
    facts: [
      'Un diagnostic de cancer nécessite une évaluation médicale et les examens adaptés à la situation.',
      'De nombreux cancers peuvent être traités et certains peuvent être guéris ; les résultats dépendent notamment du type et du stade.',
      'Les symptômes ne suffisent pas à confirmer ou exclure un cancer.',
      'Les informations éducatives en ligne ne remplacent pas une consultation médicale.',
      'Une infection persistante par certains types de HPV à haut risque est la cause principale du cancer du col de l’utérus.',
      'Le cancer du sein peut aussi toucher les hommes, même si la maladie est beaucoup plus fréquente chez les femmes.',
      'Le dépistage s’adresse à des personnes qui n’ont aucun symptôme.',
      'Un résultat anormal à un examen de dépistage ne signifie pas automatiquement un cancer.',
      'Le vaccin contre le HPV ne remplace pas le dépistage.',
      'Lorsqu’un cancer est détecté tôt, les possibilités de traitement sont en général meilleures.',
      'Le tabac est associé à un risque plus élevé de lésions du col chez les femmes infectées par le HPV.',
      'Une nouvelle masse dans le sein doit être évaluée par un professionnel de santé.',
    ],
  },
}

const NIVEAUX = {
  facile:
    'Facile : questions directes pour reconnaître une notion de base. Une mauvaise réponse doit être nettement fausse.',
  moyen:
    'Moyen : applique la notion à une situation simple et générale (sans diagnostic, sans cas individuel précis).',
  difficile:
    'Difficile : fais distinguer des notions proches (par exemple dépistage et diagnostic, infection et cancer) sans ajouter aucune recommandation médicale nouvelle.',
}

const SOURCES = [
  { nom: 'Organisation mondiale de la Santé (OMS)', url: 'https://www.who.int/' },
  { nom: 'OMS — Cancer du sein', url: 'https://www.who.int/news-room/fact-sheets/detail/breast-cancer' },
  { nom: 'OMS — Cancer du col de l’utérus', url: 'https://www.who.int/news-room/fact-sheets/detail/cervical-cancer' },
]

/* ------------------------------------------------------------------ */
/*  RÉGLAGES                                                           */
/* ------------------------------------------------------------------ */

const NB_QUESTIONS = 10
const MAX_ESSAIS = 3
const BUDGET_MS = 50_000 // durée totale maximale de la requête
const TIMEOUT_ESSAI_MS = 25_000 // durée maximale d'un appel au modèle
const MARGE_MIN_MS = 8_000 // en dessous, on ne tente plus d'essai

const FENETRE_MS = 10 * 60 * 1000
const MAX_REQUETES = 10

const AVERTISSEMENT =
  'Quiz éducatif. Il ne permet pas de diagnostiquer une maladie et ne remplace pas un avis médical.'

const OPTION_PIEGE =
  /(toutes?\s+(les\s+)?(r[ée]ponses|propositions|options)|aucune?\s+(de\s+)?(ces|les)\b|ci-dessus|les deux (premi|derni)|\b[a-d]\s+(et|et\/ou)\s+[a-d]\b)/i

/* ------------------------------------------------------------------ */
/*  LIMITE PAR IP (en mémoire : protège par instance serveur)          */
/* ------------------------------------------------------------------ */

const compteurs = new Map()

function adresseIP(req) {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim()
  return req.socket?.remoteAddress || 'inconnue'
}

function limiteAtteinte(ip) {
  const maintenant = Date.now()

  if (compteurs.size > 5000) {
    for (const [cle, entree] of compteurs) {
      if (maintenant > entree.fin) compteurs.delete(cle)
    }
  }

  const entree = compteurs.get(ip)

  if (!entree || maintenant > entree.fin) {
    compteurs.set(ip, { n: 1, fin: maintenant + FENETRE_MS })
    return 0
  }

  entree.n += 1
  return entree.n > MAX_REQUETES ? Math.ceil((entree.fin - maintenant) / 1000) : 0
}

/* ------------------------------------------------------------------ */
/*  OUTILS                                                             */
/* ------------------------------------------------------------------ */

function reponseJSON(res, status, data) {
  return res.status(status).json(data)
}

function melanger(tableau) {
  const resultat = [...tableau]

  for (let i = resultat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[resultat[i], resultat[j]] = [resultat[j], resultat[i]]
  }

  return resultat
}

function signature(texte) {
  return texte
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

function validerQuestion(q) {
  if (!q || typeof q !== 'object') return false

  if (
    typeof q.question !== 'string' ||
    q.question.trim().length < 15 ||
    q.question.length > 500
  ) {
    return false
  }

  if (
    !Array.isArray(q.options) ||
    q.options.length !== 4 ||
    q.options.some(
      (option) =>
        typeof option !== 'string' ||
        option.trim().length < 1 ||
        option.length > 220 ||
        OPTION_PIEGE.test(option)
    )
  ) {
    return false
  }

  if (new Set(q.options.map((option) => signature(option))).size !== 4) {
    return false
  }

  if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) {
    return false
  }

  if (
    typeof q.explication !== 'string' ||
    q.explication.trim().length < 20 ||
    q.explication.length > 900
  ) {
    return false
  }

  return true
}

function construirePrompt({ sujet, niveau, faits, nombre }) {
  return `
Tu es le générateur de quiz éducatifs de RoseRelais, une plateforme d'information
sur les cancers du sein et du col de l'utérus, destinée notamment au public béninois.

MISSION
Génère exactement ${nombre} questions à choix unique sur le thème : ${sujet.label}.
${NIVEAUX[niveau]}

FAITS AUTORISÉS (identifiant : fait)
${faits.map((fait) => `${fait.id} : ${fait.texte}`).join('\n')}

RÈGLES IMPÉRATIVES
- Chaque question repose sur UN seul fait autorisé, repéré par son identifiant (factId).
- Utilise un factId différent pour chaque question.
- Ne crée aucune statistique, aucun âge de dépistage, aucun calendrier vaccinal,
  aucun numéro de téléphone ni recommandation propre au Bénin qui ne soit pas dans les faits.
- N'invente ni source ni citation.
- Ne pose pas de diagnostic et ne recommande aucun traitement individuel.
- Une seule proposition est correcte, clairement correcte au regard du fait.
- Les 4 propositions sont distinctes, plausibles, courtes et sans ambiguïté.
- Interdit : « Toutes les réponses », « Aucune de ces réponses », « A et B », « Les deux premières ».
- L'explication dit pourquoi la réponse est correcte, en restant prudente (2 à 3 phrases).
- La question doit être compréhensible seule, sans mentionner le numéro du fait.

FORMAT DE SORTIE
Réponds uniquement avec un objet JSON valide, sans Markdown :
{
  "questions": [
    {
      "factId": 1,
      "question": "Question complète",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explication": "Explication prudente et éducative"
    }
  ]
}
`
}

async function demanderQuestions({ sujet, niveau, faits, nombre, timeoutMs }) {
  const modele = process.env.GROQ_QUIZ_MODEL || 'openai/gpt-oss-20b'
  const controleur = new AbortController()
  const minuteur = setTimeout(() => controleur.abort(), timeoutMs)

  const corps = {
    model: modele,
    temperature: 0.6,
    max_tokens: 5000,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'Tu génères des quiz éducatifs de santé. Respecte strictement les faits fournis, le schéma JSON et les limites médicales.',
      },
      { role: 'user', content: construirePrompt({ sujet, niveau, faits, nombre }) },
    ],
  }

  // Limite le raisonnement pour que les tokens de réflexion ne tronquent pas le JSON.
  if (modele.includes('gpt-oss')) corps.reasoning_effort = 'low'

  try {
    const reponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(corps),
      signal: controleur.signal,
    })

    if (!reponse.ok) {
      console.error('Erreur API Groq quiz:', reponse.status)
      throw new Error(`groq_${reponse.status}`)
    }

    const payload = await reponse.json()
    const choix = payload.choices?.[0]

    if (choix?.finish_reason === 'length') throw new Error('tronque')

    const contenu = choix?.message?.content
    if (typeof contenu !== 'string' || !contenu.trim()) throw new Error('vide')

    const nettoye = contenu.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, '')
    const analyse = JSON.parse(nettoye)

    if (!Array.isArray(analyse.questions)) throw new Error('format')

    return analyse.questions
  } finally {
    clearTimeout(minuteur)
  }
}

/* ------------------------------------------------------------------ */
/*  HANDLER                                                            */
/* ------------------------------------------------------------------ */

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return reponseJSON(res, 405, { error: 'Méthode non autorisée. Utilisez POST.' })
  }

  const attente = limiteAtteinte(adresseIP(req))
  if (attente) {
    res.setHeader('Retry-After', String(attente))
    return reponseJSON(res, 429, {
      error: 'Trop de quiz demandés en peu de temps. Réessayez dans quelques minutes.',
    })
  }

  const { theme, niveau } = req.body || {}

  if (!Object.prototype.hasOwnProperty.call(THEMES, theme)) {
    return reponseJSON(res, 400, { error: 'Thème invalide.' })
  }

  if (!Object.prototype.hasOwnProperty.call(NIVEAUX, niveau)) {
    return reponseJSON(res, 400, { error: 'Niveau invalide.' })
  }

  if (!process.env.GROQ_API_KEY) {
    console.error('GROQ_API_KEY absente de la configuration du serveur.')
    return reponseJSON(res, 500, {
      error: 'Le service de quiz est momentanément indisponible.',
    })
  }

  const sujet = THEMES[theme]
  const banque = melanger(sujet.facts.map((texte, i) => ({ id: i + 1, texte })))
  const texteParId = new Map(banque.map((fait) => [fait.id, fait.texte]))

  const valides = []
  const idsUtilises = new Set()
  const idsEssayes = new Set()
  const signatures = new Set()
  const debut = Date.now()

  for (let essai = 0; essai < MAX_ESSAIS && valides.length < NB_QUESTIONS; essai++) {
    const restant = BUDGET_MS - (Date.now() - debut)
    if (restant < MARGE_MIN_MS) break

    const manque = NB_QUESTIONS - valides.length

    // Faits non utilisés ; ceux déjà tentés sans succès passent en dernier.
    const candidats = banque
      .filter((fait) => !idsUtilises.has(fait.id))
      .sort((a, b) => Number(idsEssayes.has(a.id)) - Number(idsEssayes.has(b.id)))

    const faits = candidats.slice(0, manque + 3)
    if (faits.length < manque) break

    faits.forEach((fait) => idsEssayes.add(fait.id))
    const idsProposes = new Set(faits.map((fait) => fait.id))

    try {
      const brutes = await demanderQuestions({
        sujet,
        niveau,
        faits,
        nombre: manque,
        timeoutMs: Math.min(TIMEOUT_ESSAI_MS, restant - 1000),
      })

      for (const brute of brutes) {
        if (valides.length >= NB_QUESTIONS) break
        if (!validerQuestion(brute)) continue
        if (!idsProposes.has(brute.factId) || idsUtilises.has(brute.factId)) continue

        const signe = signature(brute.question)
        if (signatures.has(signe)) continue

        signatures.add(signe)
        idsUtilises.add(brute.factId)
        valides.push({
          factId: brute.factId,
          question: brute.question.trim(),
          options: brute.options.map((option) => option.trim()),
          correctIndex: brute.correctIndex,
          explication: brute.explication.trim(),
        })
      }
    } catch (error) {
      console.error(`Quiz, essai ${essai + 1} échoué :`, error?.name === 'AbortError' ? 'timeout' : error?.message)
    }
  }

  if (valides.length < NB_QUESTIONS) {
    return reponseJSON(res, 502, {
      error: 'Impossible de préparer un quiz complet pour le moment. Réessayez dans un instant.',
    })
  }

  const questions = melanger(valides).map((q) => {
    const optionsAvecStatut = q.options.map((texte, i) => ({
      texte,
      correcte: i === q.correctIndex,
    }))
    const melangees = melanger(optionsAvecStatut)

    return {
      question: q.question,
      options: melangees.map((option) => option.texte),
      correctIndex: melangees.findIndex((option) => option.correcte),
      explication: q.explication,
      faitSource: texteParId.get(q.factId),
    }
  })

  return reponseJSON(res, 200, {
    theme: sujet.label,
    niveau,
    questions,
    sources: SOURCES,
    avertissement: AVERTISSEMENT,
  })
}