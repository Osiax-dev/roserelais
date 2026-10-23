
import { useEffect, useRef, useState } from 'react'

const ENDPOINT = '/api/chat'
const MAX_HISTORY = 11
const MAX_CHARS = 1000
const TIMEOUT_MS = 30000

const GREETING =
  "Bonjour 🌸 Je suis l'assistant RoseRelais. Je peux vous informer sur les signes à surveiller, la prévention et le dépistage du cancer du sein et du col de l'utérus. Je ne remplace pas un professionnel de santé."

const SUGGESTIONS = [
  'Quels sont les signes à surveiller ?',
  "Comment faire l'autopalpation ?",
  'À quel moment faire un dépistage ?',
  "J'ai senti une boule, que faire ?",
]

const SOURCES = [
  {
    label: 'OMS',
    url: 'https://www.who.int/fr/',
  },
  {
    label: 'Ministère de la Santé',
    url: 'https://sante.gouv.bj/',
  },
  {
    label: 'PNLMNT',
    url: 'https://pnlmnt.bj/',
  },
]

/*
 * Prépare un historique valide :
 * - premier message utilisateur ;
 * - alternance utilisateur / assistant ;
 * - dernier message utilisateur ;
 * - 11 messages maximum.
 */
function fenetre(messages) {
  const recents = messages.slice(-MAX_HISTORY)
  const debut = recents.findIndex((message) => message.role === 'user')

  if (debut === -1) return []

  const resultat = recents.slice(debut)

  while (
    resultat.length > 0 &&
    resultat[resultat.length - 1].role !== 'user'
  ) {
    resultat.pop()
  }

  return resultat
}

/*
 * Affiche les URL comme des liens.
 * Le texte reste du texte React : aucun HTML fourni par l'IA n'est exécuté.
 */
function MessageContent({ content }) {
  const morceaux = content.split(/(https?:\/\/[^\s<>"']+)/g)

  return (
    <>
      {morceaux.map((morceau, index) => {
        if (!/^https?:\/\//i.test(morceau)) {
          return <span key={index}>{morceau}</span>
        }

        const urlPropre = morceau.replace(/[.,!?;:)\]]+$/, '')
        const ponctuation = morceau.slice(urlPropre.length)

        try {
          const url = new URL(urlPropre)

          if (!['https:', 'http:'].includes(url.protocol)) {
            return <span key={index}>{morceau}</span>
          }

          return (
            <span key={index}>
              <a
                href={url.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {urlPropre}
              </a>
              {ponctuation}
            </span>
          )
        } catch {
          return <span key={index}>{morceau}</span>
        }
      })}
    </>
  )
}

function ChatAssistant() {
  const [ouvert, setOuvert] = useState(false)
  const [messages, setMessages] = useState([])
  const [saisie, setSaisie] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')

  const finRef = useRef(null)
  const champRef = useRef(null)
  const boutonRef = useRef(null)
  const controleurRef = useRef(null)

  useEffect(() => {
    if (ouvert) {
      finRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
      champRef.current?.focus()
    }
  }, [messages, envoi, ouvert])

  useEffect(() => {
    if (!ouvert) return undefined

    function surTouche(event) {
      if (event.key === 'Escape') {
        setOuvert(false)
        boutonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', surTouche)

    return () => {
      document.removeEventListener('keydown', surTouche)
    }
  }, [ouvert])

  useEffect(() => {
    return () => {
      controleurRef.current?.abort()
    }
  }, [])

  async function envoyer(texte) {
    const contenu = texte.trim()

    if (!contenu || envoi) return

    if (contenu.length > MAX_CHARS) {
      setErreur(`Message trop long : ${MAX_CHARS} caractères maximum.`)
      return
    }

    const precedent = messages
    const suivant = [
      ...precedent,
      { role: 'user', content: contenu },
    ]

    const historique = fenetre(suivant)

    if (!historique.length) {
      setErreur('Impossible de préparer la conversation. Réessayez.')
      return
    }

    setMessages(suivant)
    setSaisie('')
    setErreur('')
    setEnvoi(true)

    const controleur = new AbortController()
    controleurRef.current = controleur

    const minuteur = setTimeout(() => {
      controleur.abort()
    }, TIMEOUT_MS)

    try {
      const reponse = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: historique,
        }),
        signal: controleur.signal,
      })

      const donnees = await reponse.json().catch(() => ({}))

      if (reponse.status === 429) {
        throw new Error(
          donnees.message ||
            'Trop de messages envoyés. Patientez une minute puis réessayez.'
        )
      }

      if (!reponse.ok || typeof donnees.reply !== 'string' || !donnees.reply.trim()) {
        throw new Error(
          donnees.message ||
            "L'assistant est momentanément indisponible."
        )
      }

      setMessages([
        ...suivant,
        {
          role: 'assistant',
          content: donnees.reply.trim(),
        },
      ])
    } catch (e) {
      setMessages(precedent)
      setSaisie(contenu)

      setErreur(
        e.name === 'AbortError'
          ? 'La réponse prend trop de temps. Vérifiez votre connexion puis réessayez.'
          : e.message || "L'assistant est momentanément indisponible."
      )
    } finally {
      clearTimeout(minuteur)

      if (controleurRef.current === controleur) {
        controleurRef.current = null
      }

      setEnvoi(false)
    }
  }

  function surSoumission(event) {
    event.preventDefault()
    envoyer(saisie)
  }

  function surTouche(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      envoyer(saisie)
    }
  }

  return (
    <div className="rr-chat">
      <style>{`
        .rr-chat {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 1000;
          font-family: inherit;
        }

        .rr-chat * {
          box-sizing: border-box;
        }

        .rr-chat-fab {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 0;
          border-radius: 999px;
          padding: 13px 18px;
          background: #96365f;
          color: #fff;
          font: inherit;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 28px rgba(112, 35, 68, .35);
        }

        .rr-chat-fab:hover {
          background: #762646;
        }

        .rr-chat-fab:focus-visible,
        .rr-chat button:focus-visible,
        .rr-chat textarea:focus-visible {
          outline: 3px solid #f2b3cc;
          outline-offset: 2px;
        }

        .rr-chat-panel {
          width: min(400px, calc(100vw - 24px));
          height: min(600px, calc(100dvh - 32px));
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #f0dfe7;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 18px 50px rgba(112, 35, 68, .28);
        }

        .rr-chat-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px;
          background: #96365f;
          color: #fff;
        }

        .rr-chat-head strong {
          display: block;
          font-size: 15px;
        }

        .rr-chat-head span {
          font-size: 12px;
          opacity: .9;
        }

        .rr-chat-close {
          flex-shrink: 0;
          border: 0;
          background: rgba(255,255,255,.18);
          color: #fff;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
        }

        .rr-chat-log {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 14px;
          background: #fff7fa;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rr-msg {
          max-width: 90%;
          padding: 10px 13px;
          border-radius: 16px;
          font-size: 14.5px;
          line-height: 1.6;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .rr-msg-bot {
          align-self: flex-start;
          background: #fff;
          color: #40303a;
          border: 1px solid #f0dfe7;
          border-bottom-left-radius: 4px;
        }

        .rr-msg-user {
          align-self: flex-end;
          background: #96365f;
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        .rr-msg a {
          overflow-wrap: anywhere;
          text-decoration: underline;
        }

        .rr-msg-bot a {
          color: #96365f;
        }

        .rr-msg-user a {
          color: #fff;
        }

        .rr-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .rr-chip {
          border: 1px solid #e3b9cc;
          background: #fff;
          color: #702344;
          border-radius: 999px;
          padding: 8px 12px;
          font: inherit;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
        }

        .rr-chip:hover {
          background: #fde9f1;
        }

        .rr-typing {
          color: #5a4853;
          font-size: 13px;
        }

        .rr-error {
          margin: 0;
          padding: 9px 14px;
          background: #fdecec;
          color: #8a1f1f;
          font-size: 13px;
        }

        .rr-chat-form {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 10px;
          border-top: 1px solid #f0dfe7;
          background: #fff;
        }

        .rr-chat-form textarea {
          flex: 1;
          min-width: 0;
          resize: vertical;
          border: 1px solid #e3b9cc;
          border-radius: 12px;
          padding: 10px 11px;
          font: inherit;
          font-size: 14.5px;
          color: #40303a;
          min-height: 42px;
          max-height: 110px;
        }

        .rr-chat-send {
          min-height: 42px;
          border: 0;
          border-radius: 12px;
          padding: 0 15px;
          background: #96365f;
          color: #fff;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .rr-chat-send:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .rr-chat-foot {
          margin: 0;
          padding: 8px 14px 12px;
          font-size: 11.5px;
          line-height: 1.5;
          color: #5a4853;
          background: #fff;
        }

        .rr-chat-foot a {
          color: #96365f;
          font-weight: 700;
        }

        .rr-chat-sources {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 14px;
          padding: 8px 14px;
          border-top: 1px solid #f0dfe7;
          background: #fff;
          font-size: 12px;
        }

        .rr-chat-sources a {
          color: #702344;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .rr-chat {
            right: 12px;
            bottom: 12px;
          }

          .rr-chat-panel {
            width: calc(100vw - 24px);
            height: min(78dvh, 600px);
          }

          .rr-msg {
            max-width: 94%;
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .rr-chat-panel {
            animation: rr-pop .18s ease-out;
          }

          @keyframes rr-pop {
            from {
              opacity: 0;
              transform: translateY(8px) scale(.98);
            }

            to {
              opacity: 1;
              transform: none;
            }
          }
        }
      `}</style>

      {!ouvert && (
        <button
          ref={boutonRef}
          type="button"
          className="rr-chat-fab"
          onClick={() => setOuvert(true)}
          aria-label="Ouvrir l'assistant RoseRelais"
        >
          <span aria-hidden="true">💬</span>
          Une question ?
        </button>
      )}

      {ouvert && (
        <section
          className="rr-chat-panel"
          role="dialog"
          aria-label="Assistant RoseRelais"
          aria-modal="false"
        >
          <header className="rr-chat-head">
            <div>
              <strong>Assistant RoseRelais 🌸</strong>
              <span>Information et orientation, pas diagnostic</span>
            </div>

            <button
              type="button"
              className="rr-chat-close"
              onClick={() => {
                setOuvert(false)
                boutonRef.current?.focus()
              }}
              aria-label="Fermer l'assistant"
            >
              ×
            </button>
          </header>

          <div className="rr-chat-log" role="log" aria-live="polite">
            <div className="rr-msg rr-msg-bot">
              {GREETING}
            </div>

            {messages.length === 0 && (
              <div className="rr-chips">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="rr-chip"
                    onClick={() => envoyer(suggestion)}
                    disabled={envoi}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`rr-msg ${
                  message.role === 'user' ? 'rr-msg-user' : 'rr-msg-bot'
                }`}
              >
                <MessageContent content={message.content} />
              </div>
            ))}

            {envoi && (
              <div className="rr-typing" role="status">
                RoseRelais prépare une réponse…
              </div>
            )}

            <div ref={finRef} />
          </div>

          {erreur && (
            <p className="rr-error" role="alert">
              {erreur}
            </p>
          )}

          <form className="rr-chat-form" onSubmit={surSoumission}>
            <textarea
              ref={champRef}
              value={saisie}
              onChange={(event) => setSaisie(event.target.value)}
              onKeyDown={surTouche}
              rows={1}
              maxLength={MAX_CHARS}
              placeholder="Écrivez votre question…"
              aria-label="Votre question"
              disabled={envoi}
            />

            <button
              type="submit"
              className="rr-chat-send"
              disabled={envoi || !saisie.trim()}
            >
              {envoi ? 'Envoi…' : 'Envoyer'}
            </button>
          </form>

          <nav className="rr-chat-sources" aria-label="Sources de santé">
            {SOURCES.map((source) => (
              <a
                key={source.label}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.label}
              </a>
            ))}
          </nav>

          <p className="rr-chat-foot">
            Informations générales : cet assistant ne remplace pas un avis
            médical. Si vous remarquez une anomalie, consultez rapidement un
            professionnel de santé. Pour parler à un expert, consultez le{' '}
            <a
              href="https://pnlmnt.bj/chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              chat du PNLMNT
            </a>.
          </p>
        </section>
      )}
    </div>
  )
}

export default ChatAssistant
