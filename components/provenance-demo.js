import { useEffect, useRef, useState } from 'react'
import styles from '@styles/provenance-demo.module.css'

const demoPath = '/demos/git-provenance/index.html'

export default function ProvenanceDemo() {
  const [expanded, setExpanded] = useState(false)
  const closeButton = useRef(null)

  useEffect(() => {
    if (!expanded) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()

    const closeOnEscape = event => {
      if (event.key === 'Escape') setExpanded(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [expanded])

  return (
    <section className={styles.breakout} aria-labelledby="provenance-demo-title">
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>Interactive prototype</span>
          <h2 id="provenance-demo-title">Review a pull request with provenance</h2>
          <p>Click highlighted code to inspect its edit history, or open Agent chats to trace a change back to the conversation.</p>
        </div>
        <button className={styles.expandButton} type="button" onClick={() => setExpanded(true)}>
          Expand demo
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className={styles.frameShell}>
        <div className={styles.browserBar} aria-hidden="true">
          <span className={styles.dots}><i /><i /><i /></span>
          <span className={styles.address}>github.com/acme/risk-engine/pull/284/files</span>
        </div>
        <iframe
          className={styles.frame}
          src={demoPath}
          title="Interactive Git provenance pull request demo"
          loading="lazy"
        />
      </div>

      {expanded && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Expanded Git provenance demo">
          <div className={styles.overlayBar}>
            <div>
              <span className={styles.liveDot} aria-hidden="true" />
              Interactive provenance review
            </div>
            <div className={styles.overlayActions}>
              <a href={demoPath} target="_blank" rel="noreferrer">Open in new tab</a>
              <button ref={closeButton} type="button" onClick={() => setExpanded(false)} aria-label="Close expanded demo">
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <iframe className={styles.expandedFrame} src={demoPath} title="Expanded Git provenance pull request demo" />
        </div>
      )}
    </section>
  )
}
