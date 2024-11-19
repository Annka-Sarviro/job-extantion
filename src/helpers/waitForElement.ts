/**
 * Очікування наявності елемента в DOM.
 * @param selector - CSS-селектор елемента.
 * @param timeout - Максимальний час очікування в мілісекундах.
 * @returns Проміс, який повертає елемент або null, якщо таймаут сплив.
 */

export const waitForElement = (
  selector: string,
  timeout = 5000
): Promise<Element | null> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector)
      if (element) {
        clearInterval(interval)
        resolve(element)
      }
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      resolve(null)
    }, timeout)
  })
}
