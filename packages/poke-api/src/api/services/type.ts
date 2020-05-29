import {
  TypeDoc,
  TypeModel,
} from '@api/models/type'
import {
  PostType,
  PatchType$Name,
} from '@poke-app/api'

export async function getAll (): Promise<Array<TypeDoc>> {
  const models = await TypeModel.find()

  return models
}

export async function getByName (
  name: string,
): Promise<TypeDoc | undefined> {
  const model = await TypeModel.findOne({
    name,
  })

  return model ?? undefined
}

export async function createOne (
  data: PostType.RequestBody,
): Promise<TypeDoc> {
  const model = await TypeModel.create(data)

  return model
}

export function updateOne (
  type: TypeDoc,
  data: PatchType$Name.RequestBody,
): Promise<TypeDoc> {
  type.set(data)

  return type.save()
}

export async function deleteOne (
  type: TypeDoc,
): Promise<void> {
  await type.markDeleted()
}
