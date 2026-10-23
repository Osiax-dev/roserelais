
const THEMES = {
  sein: {
    label: 'Cancer du sein',
    facts: [
      'Une nouvelle masse dans le sein doit être évaluée par un professionnel de santé. Elle ne signifie pas automatiquement un cancer.',
      'Les signes à faire évaluer peuvent inclure une modification inhabituelle de la peau du sein, du mamelon ou un écoulement inhabituel.',
      'Le cancer du sein peut aussi toucher les hommes, même si la maladie est beaucoup plus fréquente chez les femmes.',
      'L’absence de douleur ne suffit pas à exclure une maladie du sein.',
    ],
  },
  col_uterus: {
    label: 'Cancer du col de l’utérus',
    facts: [
      'Une infection persistante par certains types de papillomavirus humains (HPV) est à l’origine de la grande majorité des cancers du col de l’utérus.',
      'Selon la méthode utilisée, le dépistage peut rechercher un HPV à haut risque ou des anomalies des cellules du col.',
      'Un résultat de dépistage anormal ne signifie pas automatiquement que la personne a un cancer.',
      'Un saignement vaginal inhabituel, notamment après un rapport sexuel ou après la ménopause, mérite une évaluation médicale.',
    ],
  },
  prevention: {
    label: 'Prévention et dépistage',
    facts: [
      'Certaines lésions précancéreuses peuvent être détectées avant qu’un cancer ne se développe.',
      'Les personnes éligibles au dépistage peuvent avoir besoin de le faire même en l’absence de symptômes.',
      'Les âges et intervalles de dépistage dépendent des recommandations nationales, de la méthode utilisée et de la situation individuelle.',
      'Un résultat anormal doit être interprété par un professionnel de santé qui indiquera les examens complémentaires éventuels.',
    ],
  },
  hpv: {
    label: 'Vaccination contre le HPV',
    facts: [
      'La vaccination contre le HPV prévient plusieurs infections par des types de HPV associés à des cancers.',
      'La vaccination ne protège pas contre tous les types de HPV à risque et ne remplace pas le dépistage recommandé.',
      'La vaccination est particulièrement efficace lorsqu’elle est réalisée avant l’exposition au virus, selon le calendrier recommandé.',
      'Le calendrier vaccinal et les conditions d’accès doivent être vérifiés auprès des autorités sanitaires locales.',
    ],
  },
  orientation: {
    label: 'Orientation sanitaire',
    facts: [
      'Un signe inhabituel ne permet pas à lui seul de diagnostiquer un cancer ; une évaluation médicale est nécessaire.',
      'Un centre de santé ou un professionnel qualifié peut renseigner sur les services de dépistage et d’orientation disponibles.',
      'Un saignement abondant accompagné d’un malaise ou une douleur intense peut nécessiter une aide médicale urgente.',
      'Il faut éviter de commencer un traitement contre un cancer supposé sans évaluation par un professionnel qualifié.',
    ],
  },
  general: {
    label: 'Connaissances générales',
    facts: [
      'Un diagnostic de cancer nécessite une évaluation médicale et les examens adaptés à la situation.',
      'De nombreux cancers peuvent être traités et certains peuvent être guéris ; les résultats dépendent notamment du type et du stade.',
      'Les symptômes ne suffisent pas à confirmer ou exclure un cancer.',
      'Les informations éducatives en ligne ne remplacent pas une consultation médicale.',
    ],
  },
}

const NIVEAUX = ['facile', 'moyen', 'difficile']

const SOURCES = [
  {
    nom: 'Organisation mondiale de la Santé (OMS)',
    url: 'https://www.who.int/',
  },
  {
    nom: 'OMS — Cancer du sein',
    url: 'https://www.who.int/news-room/fact-sheets/detail/breast-cancer',
  },
  {
    nom: 'OMS — Cancer du col de l’utérus',
    url: 'https://www.who.int/news-room/fact-sheets/detail/cervical-cancer',
  },
]

function reponseJSON(res, status, data) {
  return res.status(status).json(data)
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
        option.length > 220
    )
  ) {
    return false
  }

  if (
    new Set(q.options.map((option) => option.trim().toLowerCase())).size !== 4
  ) {
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

  if (typeof q.faitSource !== 'string' || q.faitSource.trim().length < 10) {
    return false
  }

  return true
}

function melanger(tableau) {
  const resultat = [...tableau]

  for (let i = resultat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[resultat[i], resultat[j]] = [resultat[j], resultat[i]]
  }

  return resultat
}

function nettoyerQuestion(q) {
  return {
    question: q.question.trim(),
    options: q.options.map((option) => option.trim()),
    correctIndex: q.correctIndex,
    explication: q.explication.trim(),
    faitSource: q.faitSource.trim(),
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return reponseJSON(res, 405, {
      error: 'Méthode non autorisée. Utilise POST.',
    })
  }

  const { theme, niveau } = req.body || {}

  if (!Object.prototype.hasOwnProperty.call(THEMES, theme)) {
    return reponseJSON(res, 400, {
      error: 'Thème invalide.',
    })
  }

  if (!NIVEAUX.includes(niveau)) {
    return reponseJSON(res, 400, {
      error: 'Niveau invalide.',
    })
  }

  if (!process.env.GROQ_API_KEY) {
    return reponseJSON(res, 500, {
      error: 'La clé Groq est absente de la configuration du serveur.',
    })
  }

  const sujet = THEMES[theme]

  const prompt = `
Tu es le générateur de quiz éducatifs de RoseRelais, une plateforme d'information
sur les cancers du sein et du col de l'utérus, destinée notamment au public béninois.

MISSION
Génère exactement 10 questions à choix unique sur le thème : ${sujet.label}.
Niveau demandé : ${niveau}.

FAITS MÉDICAUX AUTORISÉS
${sujet.facts.map((fait, i) => `${i + 1}. ${fait}`).join('\n')}

RÈGLES IMPÉRATIVES
- Base chaque question sur un ou plusieurs faits autorisés ci-dessus.
- Ne crée pas de statistiques, d'âges de dépistage, de calendriers vaccinaux,
  de numéros de téléphone ou de recommandations propres au Bénin non fournis.
- N'invente pas de sources ni de citations.
- Ne pose pas de diagnostic et ne recommande pas de traitement individuel.
- Une réponse doit être clairement correcte au regard des faits autorisés.
- Les 4 propositions doivent être distinctes, plausibles et sans ambiguïté.
- Une seule proposition est correcte.
- Évite les répétitions de questions et de faits testés.
- Niveau facile : reconnaître les notions de base.
- Niveau moyen : appliquer les notions à une situation générale.
- Niveau difficile : distinguer des notions proches sans ajouter de nouvelles
  recommandations médicales.
- L'explication doit préciser pourquoi la réponse est correcte et rester prudente.
- Le champ faitSource doit reprendre fidèlement le fait de référence utilisé.
- Si tu ne peux pas produire 10 questions distinctes, ne complète pas avec
  des faits inventés : renvoie {"questions":[]}.

FORMAT DE SORTIE
Réponds uniquement avec un objet JSON valide, sans Markdown, de cette forme :
{
  "questions": [
    {
      "question": "Question complète",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explication": "Explication prudente et éducative",
      "faitSource": "Fait de référence utilisé"
    }
  ]
}
`

  try {
    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.GROQ_QUIZ_MODEL || 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_tokens: 6000,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'Tu génères des quiz éducatifs de santé. Respecte strictement les faits fournis, le schéma JSON et les limites médicales.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      }
    )

    if (!groqResponse.ok) {
      console.error('Erreur API Groq quiz:', groqResponse.status)
      return reponseJSON(res, 502, {
        error: 'Le service de génération du quiz est temporairement indisponible.',
      })
    }

    const payload = await groqResponse.json()
    const content = payload.choices?.[0]?.message?.content

    if (typeof content !== 'string') {
      return reponseJSON(res, 502, {
        error: 'La réponse générée par le service est vide.',
      })
    }

    let parsed

    try {
      parsed = JSON.parse(content)
    } catch {
      return reponseJSON(res, 502, {
        error: 'Le service a renvoyé un format de quiz invalide. Réessaie.',
      })
    }

    if (!Array.isArray(parsed.questions) || parsed.questions.length !== 10) {
      return reponseJSON(res, 502, {
        error: 'Le quiz généré ne contient pas exactement 10 questions valides.',
      })
    }

    const questions = parsed.questions.map(nettoyerQuestion)

    if (!questions.every(validerQuestion)) {
      return reponseJSON(res, 502, {
        error: 'Certaines questions ne respectent pas le format attendu. Réessaie.',
      })
    }

    const signatures = questions.map((q) =>
      q.question.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
    )

    if (new Set(signatures).size !== 10) {
      return reponseJSON(res, 502, {
        error: 'Le quiz contient des questions répétées. Génère une nouvelle partie.',
      })
    }

    // Mélange les propositions tout en conservant la bonne réponse.
    const questionsFinales = questions.map((q) => {
      const optionsAvecStatut = q.options.map((texte, index) => ({
        texte,
        correcte: index === q.correctIndex,
      }))

      const optionsMelangees = melanger(optionsAvecStatut)

      return {
        question: q.question,
        options: optionsMelangees.map((option) => option.texte),
        correctIndex: optionsMelangees.findIndex((option) => option.correcte),
        explication: q.explication,
        faitSource: q.faitSource,
      }
    })

    return reponseJSON(res, 200, {
      theme: sujet.label,
      niveau,
      questions: questionsFinales,
      sources: SOURCES,
      avertissement:
        'Quiz éducatif généré par IA. Les vérifications automatiques ne garantissent pas une validation médicale. Ce quiz ne permet pas de diagnostiquer une maladie.',
    })
  } catch (error) {
    console.error('Erreur génération quiz:', error)

    return reponseJSON(res, 500, {
      error: 'Une erreur est survenue lors de la génération. Réessaie plus tard.',
    })
  }
}
