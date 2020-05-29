import {
  prop,
  modelOptions,
  pre,
  DocumentType,
} from '@typegoose/typegoose'

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

  public async markDeleted<T = this> (
    this: DocumentType<T>,
  ): Promise<DocumentType<T>> {
    this.set({
      isDeleted: true,
    })

    return this.save() as Promise<DocumentType<T>> // shut up
  }

}
