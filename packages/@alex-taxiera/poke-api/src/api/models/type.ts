import {
  prop,
  getModelForClass,
  DocumentType,
} from '@typegoose/typegoose'

import {
  Base,
} from './base'

export class Type extends Base {

  @prop({
    lowercase: true,
  })
  public name!: string;

  @prop()
  public flavorText?: string;

}

export const TypeModel = getModelForClass(Type)

export type TypeDoc = DocumentType<Type>

export type TypeView = Components.Schemas.TypeView
