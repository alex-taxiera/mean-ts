import { isDocument } from '@typegoose/typegoose'

import {
  SpeciesDoc,
  SpeciesView,
} from '@api/models/species'

import {
  view as typeView,
} from '@api/views/type'
import { ServerError } from '@utils/error'

export function view (species: SpeciesDoc): SpeciesView
export function view (
  species: Array<SpeciesDoc>
): Array<SpeciesView>
export function view (
  species: SpeciesDoc | Array<SpeciesDoc>,
): SpeciesView | Array<SpeciesView> {
  if (Array.isArray(species)) {
    return species.map((s): SpeciesView => {
      if (!isDocument(s.type1)) {
        throw new ServerError('Bad "type1"')
      }

      if (!isDocument(s.type2) && s.type2) {
        throw Error('Bad "type2"')
      }

      return {
        number: s.number,
        name: s.name,
        type1: typeView(s.type1),
        type2: s.type2 && typeView(s.type2),
      }
    })
  }

  if (!isDocument(species.type1)) {
    throw new ServerError('Bad "type1"')
  }

  if (!isDocument(species.type2) && species.type2) {
    throw new ServerError('Bad "type2"')
  }

  return {
    number: species.number,
    name: species.name,
    type1: typeView(species.type1),
    type2: species.type2 && typeView(species.type2),
  }
}
