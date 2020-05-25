import {
  prop,
  modelOptions,
  pre,
  DocumentType,
} from '@typegoose/typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { FilterQuery } from 'mongoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@pre<Base>([
  'count',
  'find',
  'findOne',
  'findOneAndRemove',
  'findOneAndUpdate',
  'update',
  'updateOne',
  'updateMany',
], function (): void {
  if (this.getQuery().isDeleted === undefined) {
    this.where('isDeleted').equals(false)
  }
})
export class Base {

  @prop({ default: false })
  public isDeleted!: boolean

  public static async findOneAndMarkDeleted<T extends Base = Base> (
    this: ModelType<any>,
    filter: FilterQuery<any>,
  ): Promise<DocumentType<T> | undefined> {
    const model = await this.findOneAndUpdate({
      ...filter,
      isDeleted: false,
    }, { isDeleted: true }, { new: true })

    return model ?? undefined
  }

}
