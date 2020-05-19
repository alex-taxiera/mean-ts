declare namespace Components {
    namespace Responses {
        export type $400 = Schemas.Error;
        export type $404 = Schemas.Error;
    }
    namespace Schemas {
        export interface Error {
            /**
             * example:
             * 404
             */
            code: number;
            /**
             * example:
             * Not Found
             */
            message: string;
        }
        export interface PokemonPartial {
            /**
             * example:
             * Sparky
             */
            nickname?: string;
        }
        export interface PokemonPost {
            /**
             * example:
             * Sparky
             */
            nickname?: string;
            /**
             * example:
             * 151
             */
            species: number;
        }
        export interface PokemonUpdate {
            /**
             * example:
             * Sparky
             */
            nickname?: string;
            /**
             * example:
             * 151
             */
            species?: number;
        }
        export interface PokemonView {
            /**
             * example:
             * Sparky
             */
            nickname?: string;
            /**
             * example:
             * 5ec0b86ae1e41239ff665b6c
             */
            id: string;
            species: SpeciesView;
        }
        export interface SpeciesPartial {
            /**
             * example:
             * 151
             */
            number?: number;
            /**
             * example:
             * Pikachu
             */
            name?: string;
        }
        export interface SpeciesPost {
            /**
             * example:
             * 151
             */
            number: number;
            /**
             * example:
             * Pikachu
             */
            name: string;
            /**
             * example:
             * Normal
             */
            type1: string;
            /**
             * example:
             * Fairy
             */
            type2?: string;
        }
        export interface SpeciesUpdate {
            /**
             * example:
             * 151
             */
            number?: number;
            /**
             * example:
             * Pikachu
             */
            name?: string;
            /**
             * example:
             * Normal
             */
            type1?: string;
            /**
             * example:
             * Fairy
             */
            type2?: string;
        }
        export interface SpeciesView {
            /**
             * example:
             * 151
             */
            number: number;
            /**
             * example:
             * Pikachu
             */
            name: string;
            type1: TypeView;
            type2?: TypeView;
        }
        export interface TypePartial {
            /**
             * example:
             * Poison
             */
            name?: string;
            /**
             * example:
             * Poison Type Pokemon are poisonous
             */
            flavorText?: string;
        }
        export interface TypeView {
            /**
             * example:
             * Poison
             */
            name: string;
            /**
             * example:
             * Poison Type Pokemon are poisonous
             */
            flavorText?: string;
        }
    }
}
declare namespace Paths {
    namespace Pokemon {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.PokemonView[];
            }
        }
        namespace Post {
            export type RequestBody = Components.Schemas.PokemonPost;
            namespace Responses {
                export type $200 = Components.Schemas.PokemonView;
            }
        }
    }
    namespace Pokemon$Id {
        namespace Delete {
            namespace Parameters {
                export type Id = string;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export type $404 = Components.Responses.$404;
            }
        }
        namespace Get {
            namespace Parameters {
                export type Id = string;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export type $200 = Components.Schemas.PokemonView;
                export type $404 = Components.Responses.$404;
            }
        }
        namespace Patch {
            namespace Parameters {
                export type Id = string;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            export type RequestBody = Components.Schemas.PokemonUpdate;
            namespace Responses {
                export type $200 = Components.Schemas.PokemonView;
                export type $404 = Components.Responses.$404;
            }
        }
    }
    namespace Species {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.SpeciesView[];
            }
        }
        namespace Post {
            export type RequestBody = Components.Schemas.SpeciesPost;
            namespace Responses {
                export type $200 = Components.Schemas.SpeciesView;
                export type $400 = Components.Responses.$400;
            }
        }
    }
    namespace Species$Number {
        namespace Delete {
            namespace Parameters {
                export type Number = number;
            }
            export interface PathParameters {
                number: Parameters.Number;
            }
            namespace Responses {
                export type $404 = Components.Responses.$404;
            }
        }
        namespace Get {
            namespace Parameters {
                export type Number = number;
            }
            export interface PathParameters {
                number: Parameters.Number;
            }
            namespace Responses {
                export type $200 = Components.Schemas.SpeciesView;
                export type $404 = Components.Responses.$404;
            }
        }
        namespace Patch {
            namespace Parameters {
                export type Number = number;
            }
            export interface PathParameters {
                number: Parameters.Number;
            }
            export type RequestBody = Components.Schemas.SpeciesUpdate;
            namespace Responses {
                export type $200 = Components.Schemas.SpeciesView;
                export type $404 = Components.Responses.$404;
            }
        }
    }
    namespace Type {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.TypeView[];
            }
        }
        namespace Post {
            export type RequestBody = Components.Schemas.TypeView;
            namespace Responses {
                export type $200 = Components.Schemas.TypeView;
                export type $400 = Components.Responses.$400;
            }
        }
    }
    namespace Type$Name {
        namespace Delete {
            namespace Parameters {
                export type Name = string;
            }
            export interface PathParameters {
                name: Parameters.Name;
            }
            namespace Responses {
                export type $404 = Components.Responses.$404;
            }
        }
        namespace Get {
            namespace Parameters {
                export type Name = string;
            }
            export interface PathParameters {
                name: Parameters.Name;
            }
            namespace Responses {
                export type $200 = Components.Schemas.TypeView;
                export type $404 = Components.Responses.$404;
            }
        }
        namespace Patch {
            namespace Parameters {
                export type Name = string;
            }
            export interface PathParameters {
                name: Parameters.Name;
            }
            export type RequestBody = Components.Schemas.TypePartial;
            namespace Responses {
                export type $200 = Components.Schemas.TypeView;
                export type $404 = Components.Responses.$404;
            }
        }
    }
}
