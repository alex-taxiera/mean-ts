import {
  TypeDoc,
  TypeView,
} from '@api/models/type'

export function view (type: Array<TypeDoc>): Array<TypeView>
export function view (type: TypeDoc): TypeView
export function view (
  type: TypeDoc | Array<TypeDoc>,
): TypeView | Array<TypeView> {
  if (Array.isArray(type)) {
    return type.map((t): TypeView => {
      return {
        name: t.name,
        flavorText: t.flavorText,
      }
    })
  }

  return {
    name: type.name,
    flavorText: type.flavorText,
  }
}
