export function getWorkType(
  text: string
): undefined | "office" | "remote" | "hybrid" {
  switch (text) {
    case "Тільки офіс":
      return "office"
    case "Офіс":
      return "office"
    case "Тільки віддалено":
      return "remote"
    case "Офіс або віддалено":
      return "hybrid"
    case "Дистанційна робота":
      return "remote"
    case "В офісі/на місці":
      return "office"
    case "Віддалена робота":
      return "remote"
    case "Віддалено":
      return "remote"
    case "Дистанційно":
      return "remote"
    case "Гібридна":
      return "hybrid"

    default:
      return null
  }
}
