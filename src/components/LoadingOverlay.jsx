import { useEffect, useState } from 'react'

/**
 * Initial page loading overlay.
 * Shows immediately on first mount, then fades out and unmounts.
 */
export default function LoadingOverlay({ durationMs = 650 }) {
  const [phase, setPhase] = useState('show') // show -> fade -> gone

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), Math.max(0, durationMs - 250))
    const t2 = setTimeout(() => setPhase('gone'), durationMs)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [durationMs])

  if (phase === 'gone') return null

  return (
    <div
      className={
        'loading-overlay ' +
        (phase === 'fade' ? 'loading-overlay--fade' : '')
      }
      aria-hidden="true"
    >
      <div className="loading-overlay__inner">
        <div className="loading-spinner"><span /></div>
      </div>
    </div>
  )
}
