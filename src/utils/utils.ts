import { useParam } from "@blitzjs/next"

export const useStringParam = (name) => {
  return useParam(name, "string")
}
