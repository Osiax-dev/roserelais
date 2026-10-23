import { useEffect, useRef, useState } from 'react'

const ENDPOINT = '/api/chat'
const MAX_HISTORY = 11 // doit rester identique à MAX_MESSAGES dans api/chat.js
const MAX_CHARS = 1000

const GREETING =
  "Bonjour 🌸 Je suis l'assistant RoseRelais. Je peux vous expliquer les signes à surveiller, le dépistage ou la prévention du cancer du sein. Je ne remplace pas un professionnel de santé."

const SUGGESTIONS = [
  'Quels sont les signes à surveiller ?',
  "Comment faire l'autopalpation ?",
  'À quel moment faire un dépistage ?',
  "J'ai senti une boule, que faire ?",
]

/* Garde les derniers messages envoyés au serveur : la liste doit commencer par
   un message "user" et finir par un message "user" (alternance stricte). */
function fenetre(messages) {
  let recents = messages.slice(-MAX_HISTORY)
  while (recents.length && recents[0].role !== 'user') recents = recents.slice(1)
  return recents
}

function ChatAssistant() {
  const [ouvert, setOuvert] = useState(false)
  const [messages, setMessages] = useState([]) // sans le message d'accueil
  const [saisie, setSaisie] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')
  const finRef = useRef(null)
  const champRef = useRef(null)
  const boutonRef = useRef(null)

  useEffect(() => {
    if (ouvert && finRef.current) finRef.current.scrollIntoView({ block: 'end' })
  }, [messages, envoi, ouvert])

  useEffect(() => {
    if (ouvert && champRef.current) champRef.current.focus()
  }, [ouvert])

  useEffect(() => {
    if (!ouvert) return undefined
    const surTouche = (e) => {
      if (e.key === 'Escape') {
        setOuvert(false)
        if (boutonRef.current) boutonRef.current.focus()
      }
    }
    document.addEventListener('keydown', surTouche)
    return () => document.removeEventListener('keydown', surTouche)
  }, [ouvert])

  async function envoyer(texte) {
    const contenu = texte.trim()
    if (!contenu || envoi) return
    if (contenu.length > MAX_CHARS) {
      setErreur(`Message trop long (${MAX_CHARS} caractères maximum).`)
      return
    }

    const precedent = messages
    const suivant = [...precedent, { role: 'user', content: contenu }]
    setMessages(suivant)
    setSaisie('')
    setErreur('')
    setEnvoi(true)

    const controleur = new AbortController()
    const minuteur = setTimeout(() => controleur.abort(), 30000)

    try {
      const reponse = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: fenetre(suivant) }),
        signal: controleur.signal,
      })

      if (reponse.status === 429) {
        throw new Error('Trop de messages envoyés. Patientez une minute puis réessayez.')
      }
      const donnees = await reponse.json().catch(() => ({}))
      if (!reponse.ok || !donnees.reply) {
        throw new Error(donnees.message || "L'assistant est momentanément indisponible.")
      }
      setMessages([...suivant, { role: 'assistant', content: donnees.reply }])
    } catch (e) {
      // On retire le message échoué et on le remet dans le champ pour garder l'alternance valide.
      setMessages(precedent)
      setSaisie(contenu)
      setErreur(
        e.name === 'AbortError'
          ? 'La réponse a pris trop de temps. Réessayez.'
          : e.message || "L'assistant est momentanément indisponible."
      )
    } finally {
      clearTimeout(minuteur)
      setEnvoi(false)
    }
  }

  function surSoumission(e) {
    e.preventDefault()
    envoyer(saisie)
  }

  function surTouche(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      envoyer(saisie)
    }
  }

  return (
    <div className="rr-chat">
      <style>{`
        .rr-chat { position: fixed; right: 18px; bottom: 18px; z-index: 1000; font-family: inherit; }
        .rr-chat * { box-sizing: border-box; }
        .rr-chat-fab {
          display: flex; align-items: center; gap: 8px;
          border: 0; border-radius: 999px; padding: 13px 18px;
          background: #96365f; color: #fff; font: inherit; font-weight: 700; font-size: 15px;
          cursor: pointer; box-shadow: 0 10px 28px rgba(112, 35, 68, .35);
        }
        .rr-chat-fab:hover { background: #762646; }
        .rr-chat-fab:focus-visible, .rr-chat button:focus-visible, .rr-chat textarea:focus-visible {
          outline: 3px solid #f2b3cc; outline-offset: 2px;
        }
        .rr-chat-panel {
          width: min(380px, calc(100vw - 24px)); height: min(560px, calc(100vh - 32px));
          display: flex; flex-direction: column; background: #fff;
          border: 1px solid #f0dfe7; border-radius: 20px; overflow: hidden;
          box-shadow: 0 18px 50px rgba(112, 35, 68, .28);
        }
        .rr-chat-head {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: 14px 16px; background: #96365f; color: #fff;
        }
        .rr-chat-head strong { display: block; font-size: 15px; }
        .rr-chat-head span { font-size: 12px; opacity: .9; }
        .rr-chat-close {
          border: 0; background: rgba(255,255,255,.18); color: #fff; width: 32px; height: 32px;
          border-radius: 50%; font-size: 18px; line-height: 1; cursor: pointer;
        }
        .rr-chat-log {
          flex: 1; overflow-y: auto; padding: 14px; background: #fff7fa;
          display: flex; flex-direction: column; gap: 10px;
        }
        .rr-msg {
          max-width: 86%; padding: 10px 13px; border-radius: 16px;
          font-size: 14.5px; line-height: 1.55; white-space: pre-wrap; overflow-wrap: anywhere;
        }
        .rr-msg-bot { align-self: flex-start; background: #fff; color: #40303a; border: 1px solid #f0dfe7; border-bottom-left-radius: 4px; }
        .rr-msg-user { align-self: flex-end; background: #96365f; color: #fff; border-bottom-right-radius: 4px; }
        .rr-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .rr-chip {
          border: 1px solid #e3b9cc; background: #fff; color: #702344; border-radius: 999px;
          padding: 7px 12px; font: inherit; font-size: 13px; cursor: pointer;
        }
        .rr-chip:hover { background: #fde9f1; }
        .rr-typing { color: #5a4853; font-size: 13px; }
        .rr-error {
          margin: 0; padding: 8px 14px; background: #fdecec; color: #8a1f1f; font-size: 13px;
        }
        .rr-chat-form { display: flex; gap: 8px; padding: 10px; border-top: 1px solid #f0dfe7; background: #fff; }
        .rr-chat-form textarea {
          flex: 1; resize: none; border: 1px solid #e3b9cc; border-radius: 12px;
          padding: 9px 11px; font: inherit; font-size: 14.5px; color: #40303a; min-height: 42px; max-height: 110px;
        }
        .rr-chat-send {
          border: 0; border-radius: 12px; padding: 0 16px; background: #96365f; color: #fff;
          font: inherit; font-weight: 700; cursor: pointer;
        }
        .rr-chat-send:disabled { opacity: .5; cursor: not-allowed; }
        .rr-chat-foot { padding: 8px 14px 12px; font-size: 11.5px; line-height: 1.5; color: #5a4853; background: #fff; }
        .rr-chat-foot a { color: #96365f; font-weight: 700; }
        @media (max-width: 480px) {
          .rr-chat { right: 12px; bottom: 12px; }
          .rr-chat-panel { height: min(78vh, 560px); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .rr-chat-panel { animation: rr-pop .18s ease-out; }
          @keyframes rr-pop { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
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
          <span aria-hidden="true">💬</span> Une question ?
        </button>
      )}

      {ouvert && (
        <section className="rr-chat-panel" role="dialog" aria-label="Assistant RoseRelais">
          <header className="rr-chat-head">
            <div>
              <strong>Assistant RoseRelais</strong>
              <span>Information, pas diagnostic</span>
            </div>
            <button
              type="button"
              className="rr-chat-close"
              onClick={() => {
                setOuvert(false)
                if (boutonRef.current) boutonRef.current.focus()
              }}
              aria-label="Fermer l'assistant"
            >
              ×
            </button>
          </header>

          <div className="rr-chat-log" role="log" aria-live="polite">
            <div className="rr-msg rr-msg-bot">{GREETING}</div>

            {messages.length === 0 && (
              <div className="rr-chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="rr-chip" onClick={() => envoyer(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`rr-msg ${m.role === 'user' ? 'rr-msg-user' : 'rr-msg-bot'}`}>
                {m.content}
              </div>
            ))}

            {envoi && <div className="rr-typing">L'assistant écrit…</div>}
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
              onChange={(e) => setSaisie(e.target.value)}
              onKeyDown={surTouche}
              rows={1}
              maxLength={MAX_CHARS}
              placeholder="Écrivez votre question…"
              aria-label="Votre question"
            />
            <button type="submit" className="rr-chat-send" disabled={envoi || !saisie.trim()}>
              Envoyer
            </button>
          </form>

          <p className="rr-chat-foot">
            Cet assistant donne des informations générales et ne remplace pas un avis médical. En cas
            de symptôme, consultez. Pour parler à un expert :{' '}
            <a href="https://pnlmnt.bj/chat" target="_blank" rel="noopener noreferrer">
              chat du PNLMNT
            </a>
            .
          </p>
        </section>
      )}
    </div>
  )
}

export default ChatAssistant
