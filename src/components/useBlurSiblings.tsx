import { useEffect } from 'react'

export function useBlurSiblings(gridSelector: string, cardSelector: string) {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (!isTouch) return

    const grids = document.querySelectorAll<HTMLElement>(gridSelector)
    const cleanupFns: Array<() => void> = []

    grids.forEach(grid => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(cardSelector))

      cards.forEach(card => {
        const onTouchStart = () => {
          requestAnimationFrame(() => {
            cards.forEach(c => {
              if (c === card) {
                c.style.filter = 'blur(0px)'
              } else {
                c.style.filter = 'blur(2px)'
              }
            })
          })
        }
        card.addEventListener('touchstart', onTouchStart, { passive: true })
        cleanupFns.push(() => card.removeEventListener('touchstart', onTouchStart))
      })

      const onDocTouchStart = (e: TouchEvent) => {
        const touched = e.target as Element | null
        if (touched && !touched.closest(cardSelector)) {
          requestAnimationFrame(() => {
            cards.forEach(c => {
              c.style.filter = ''
            })
          })
        }
      }
      document.addEventListener('touchstart', onDocTouchStart, { passive: true })
      cleanupFns.push(() => document.removeEventListener('touchstart', onDocTouchStart))
    })

    return () => {
      cleanupFns.forEach(fn => fn())
    }
  }, [gridSelector, cardSelector])
}
