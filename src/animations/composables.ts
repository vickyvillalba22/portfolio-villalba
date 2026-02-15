import { ref, onMounted } from "vue"

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
