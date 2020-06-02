import { isDocument } from '@typegoose/typegoose'

import {
  PokemonDoc,
  PokemonView,
} from '@api/models/pokemon'

import {
  view as speciesView,
} from '@api/views/species'

export function view (pokemon: PokemonDoc): PokemonView
export function view (
  pokemon: Array<PokemonDoc>
): Array<PokemonView>
export function view (
  pokemon: PokemonDoc | Array<PokemonDoc>,
): PokemonView | Array<PokemonView> {
  if (Array.isArray(pokemon)) {
    return pokemon.map((p): PokemonView => {
      if (!isDocument(p.species)) {
        throw Error('Bad "species"')
      }

      return {
        id: p._id, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        nickname: p.nickname,
        species: speciesView(p.species),
      }
    })
  }

  if (!isDocument(pokemon.species)) {
    throw Error('Bad "species"')
  }

  return {
    id: pokemon.id, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    nickname: pokemon.nickname,
    species: speciesView(pokemon.species),
  }
}
