import { ref, onMounted, onBeforeUnmount, type Ref } from "vue"

/* Typewriter */

export function useTypewriter(text: string, speed = 100) {
  const displayed = ref("")
  let index = 0

  onMounted(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        displayed.value += text[index]
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)
  })

  return { displayed }
}

/* Stagger Delay Helper */

export function useStaggerDelay(index: number, delay = 80) {
  return {
    transitionDelay: `${index * delay}ms`
  }
}

/* Reveal On Scroll */

export function useRevealOnScroll(
  element: Ref<HTMLElement | null>
) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!element.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio

          if (ratio > 0.25) {
            entry.target.classList.add("is-visible")
          }

          if (ratio < 0.1) {
            entry.target.classList.remove("is-visible")
          }
        })
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 1]
      }
    )

    observer.observe(element.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}

/*counter*/

export function useCounterOnVisible(
  target: number,
  duration = 2000
) {
  const count = ref(0)
  const isVisible = ref(false)

  let frame: number
  let startTime: number | null = null

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp

    const progress = timestamp - startTime
    const percentage = progress / duration

    if (percentage < 1) {
      count.value = Math.floor(target * easeOutCubic(percentage))
      frame = requestAnimationFrame(animate)
    } else {
      count.value = target
    }
  }

  const start = () => {
    startTime = null
    count.value = 0
    frame = requestAnimationFrame(animate)
  }

  const stop = () => {
    cancelAnimationFrame(frame)
  }

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
  })

  return { count, isVisible, start, stop }
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}
