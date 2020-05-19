import {
  prop, modelOptions
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
})
export class Base {

  @prop({ default: false })
  public isDeleted!: boolean

}
