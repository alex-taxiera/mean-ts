import {
  prop,
  Ref,
  getModelForClass,
  DocumentType,
} from '@typegoose/typegoose'

import { Type } from './type'
import { Base } from './base'
import { Schemas } from '@poke-app/api'

export class Species extends Base {

  @prop({
    required: true,
  })
  public number!: number

  @prop({
    required: true,
  })
  public name!: string

  @prop({
    required: true,
    ref: Type,
  })
  public type1!: Ref<Type>

  @prop({
    ref: Type,
  })
  public type2?: Ref<Type>

}

export const SpeciesModel = getModelForClass(Species, {
  schemaOptions: {
    collection: 'species',
  },
})

export type SpeciesDoc = DocumentType<Species>

export type SpeciesView = Schemas.SpeciesView
