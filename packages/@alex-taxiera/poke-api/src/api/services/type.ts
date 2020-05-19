import { TypeDoc, TypeModel } from '@api/models/type'

export async function getAll (): Promise<Array<TypeDoc>> {
  const models = await TypeModel.find({
    isDeleted: false,
  })

  return models
}

export async function getByName (
  name: string,
): Promise<TypeDoc | undefined> {
  const model = await TypeModel.findOne({
    name,
    isDeleted: false,
  })

  return model ?? undefined
}

export async function createOne (
  data: Paths.Type.Post.RequestBody,
): Promise<TypeDoc> {
  const model = await TypeModel.create(data)

  return model
}

export async function updateOne (
  name: string,
  data: Components.Schemas.TypePartial,
): Promise<TypeDoc | undefined> {
  const model = await TypeModel.findOneAndUpdate({
    name,
    isDeleted: false,
  }, data, { new: true })

  return model ?? undefined
}

export async function deleteOne (
  name: string,
): Promise<void> {
  await TypeModel.deleteOne({
    name,
    isDeleted: false,
  })
}
