declare namespace DeletePokemon$Id {
  export type $404 = Responses.$404
  namespace Parameters {
    export type Id = string
  }
  export interface PathParameters {
    id: Parameters.Id
  }
}
declare namespace DeleteSpecies$Number {
  export type $404 = Responses.$404
  namespace Parameters {
    export type Number = number
  }
  export interface PathParameters {
    number: Parameters.Number
  }
}
declare namespace DeleteType$Name {
  export type $404 = Responses.$404
  namespace Parameters {
    export type Name = string
  }
  export interface PathParameters {
    name: Parameters.Name
  }
}
declare namespace GetPokemon {
  export type $200 = Schemas.PokemonView[]
}
declare namespace GetPokemon$Id {
  export type $200 = Schemas.PokemonView
  export type $404 = Responses.$404
  namespace Parameters {
    export type Id = string
  }
  export interface PathParameters {
    id: Parameters.Id
  }
}
declare namespace GetSpecies {
  export type $200 = Schemas.SpeciesView[]
}
declare namespace GetSpecies$Number {
  export type $200 = Schemas.SpeciesView
  export type $404 = Responses.$404
  namespace Parameters {
    export type Number = number
  }
  export interface PathParameters {
    number: Parameters.Number
  }
}
declare namespace GetType {
  export type $200 = Schemas.TypeView[]
}
declare namespace GetType$Name {
  export type $200 = Schemas.TypeView
  export type $404 = Responses.$404
  namespace Parameters {
    export type Name = string
  }
  export interface PathParameters {
    name: Parameters.Name
  }
}
declare namespace PatchPokemon$Id {
  export type $200 = Schemas.PokemonView
  export type $404 = Responses.$404
  namespace Parameters {
    export type Id = string
  }
  export interface PathParameters {
    id: Parameters.Id
  }
  export type RequestBody = Schemas.PokemonUpdate
}
declare namespace PatchSpecies$Number {
  export type $200 = Schemas.SpeciesView
  export type $404 = Responses.$404
  namespace Parameters {
    export type Number = number
  }
  export interface PathParameters {
    number: Parameters.Number
  }
  export type RequestBody = Schemas.SpeciesUpdate
}
declare namespace PatchType$Name {
  export type $200 = Schemas.TypeView
  export type $404 = Responses.$404
  namespace Parameters {
    export type Name = string
  }
  export interface PathParameters {
    name: Parameters.Name
  }
  export type RequestBody = Schemas.TypePartial
}
declare namespace PostPokemon {
  export type $200 = Schemas.PokemonView
  export type RequestBody = Schemas.PokemonPost
}
declare namespace PostSpecies {
  export type $200 = Schemas.SpeciesView
  export type $400 = Responses.$400
  export type RequestBody = Schemas.SpeciesPost
}
declare namespace PostType {
  export type $200 = Schemas.TypeView
  export type $400 = Responses.$400
  export type RequestBody = Schemas.TypeView
}
declare namespace Responses {
  export type $400 = Schemas.Error
  export type $404 = Schemas.Error
}
declare namespace Schemas {
  export interface Error {
    /**
     * example:
     * 404
     */
    code: number
    /**
     * example:
     * Not Found
     */
    message: string
  }
  export interface PokemonPartial {
    /**
     * example:
     * Sparky
     */
    nickname?: string
  }
  export interface PokemonPost {
    /**
     * example:
     * Sparky
     */
    nickname?: string
    /**
     * example:
     * 151
     */
    species: number
  }
  export interface PokemonUpdate {
    /**
     * example:
     * Sparky
     */
    nickname?: string
    /**
     * example:
     * 151
     */
    species?: number
  }
  export interface PokemonView {
    /**
     * example:
     * Sparky
     */
    nickname?: string
    /**
     * example:
     * 5ec0b86ae1e41239ff665b6c
     */
    id: string
    species: SpeciesView
  }
  export interface SpeciesPartial {
    /**
     * example:
     * 151
     */
    number?: number
    /**
     * example:
     * Pikachu
     */
    name?: string
  }
  export interface SpeciesPost {
    /**
     * example:
     * 151
     */
    number: number
    /**
     * example:
     * Pikachu
     */
    name: string
    /**
     * example:
     * Normal
     */
    type1: string
    /**
     * example:
     * Fairy
     */
    type2?: string
  }
  export interface SpeciesUpdate {
    /**
     * example:
     * 151
     */
    number?: number
    /**
     * example:
     * Pikachu
     */
    name?: string
    /**
     * example:
     * Normal
     */
    type1?: string
    /**
     * example:
     * Fairy
     */
    type2?: string
  }
  export interface SpeciesView {
    /**
     * example:
     * 151
     */
    number: number
    /**
     * example:
     * Pikachu
     */
    name: string
    type1: TypeView
    type2?: TypeView
  }
  export interface TypePartial {
    /**
     * example:
     * Poison
     */
    name?: string
    /**
     * example:
     * Poison Type Pokemon are poisonous
     */
    flavorText?: string
  }
  export interface TypeView {
    /**
     * example:
     * Poison
     */
    name: string
    /**
     * example:
     * Poison Type Pokemon are poisonous
     */
    flavorText?: string
  }
}
