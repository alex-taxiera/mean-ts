import {
  SpeciesDoc,
  SpeciesModel,
  Species,
} from '@api/models/species'
import { getByName as getTypeByName } from './type'
import { BadRequestError } from '@utils/error'

export function populate (species: SpeciesDoc): Promise<SpeciesDoc>
export function populate (
  species: Array<SpeciesDoc>
): Promise<Array<SpeciesDoc>>
export function populate (
  species: SpeciesDoc | Array<SpeciesDoc>,
): Promise<SpeciesDoc | Array<SpeciesDoc>> {
  return Array.isArray(species)
    ? Promise.all(
      species.map((s) => s.populate('type1').populate('type2').execPopulate()),
    ) : species.populate('type1').populate('type2').execPopulate()
}

export async function getAll (): Promise<Array<SpeciesDoc>> {
  const models = await SpeciesModel.find({
    isDeleted: false,
  })

  return populate(models)
}

export async function getByNumber (
  num: number | string,
): Promise<SpeciesDoc | undefined> {
  const number = typeof num === 'number' ? num : parseInt(num)

  const model = await SpeciesModel.findOne({
    number,
    isDeleted: false,
  })

  if (model) {
    return populate(model)
  }

  return model ?? undefined
}

export async function createOne (
  data: Paths.Species.Post.RequestBody,
): Promise<SpeciesDoc> {
  const {
    type1,
    type2,
    ...rest
  } = data

  const t1 = await getTypeByName(type1)
  const t2 = (type2 ? await getTypeByName(type2) : null) ?? undefined

  if (!t1 || (type2 && !t2)) {
    throw Error('Invalid Type')
  }

  if (await getByNumber(rest.number)) {
    throw new BadRequestError('Species already exists')
  }

  const model = await SpeciesModel.create({
    ...rest,
    type1: t1,
    type2: t2,
  })

  return populate(model)
}

export async function updateOne (
  num: number | string,
  data: Paths.Species$Number.Patch.RequestBody,
): Promise<SpeciesDoc | undefined> {
  const number = typeof num === 'number' ? num : parseInt(num)

  const {
    type1,
    type2,
    ...rest
  } = data

  const patch: Partial<Species> = {
    ...rest,
  }

  if (type1) {
    patch.type1 = await getTypeByName(type1)
    if (!patch.type1) {
      throw new BadRequestError(`Bad type: "${type1}"`)
    }
  }

  if (type2) {
    patch.type2 = await getTypeByName(type2)
    if (!patch.type2) {
      throw new BadRequestError(`Bad type: "${type2}"`)
    }
  }

  if (patch.number && await getByNumber(patch.number)) {
    throw new BadRequestError('Species already exists')
  }

  const model = await SpeciesModel.findOneAndUpdate({
    number,
    isDeleted: false,
  }, patch, { new: true })

  if (model) {
    return populate(model)
  }

  return model ?? undefined
}

export async function deleteOne (
  num: number | string,
): Promise<void> {
  const number = typeof num === 'number' ? num : parseInt(num)

  await SpeciesModel.deleteOne({
    number,
    isDeleted: false,
  })
}
