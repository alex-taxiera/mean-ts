import {
  SpeciesDoc,
  SpeciesModel,
  Species,
} from '@api/models/species'
import { getByName as getTypeByName } from './type'
import { BadRequestError } from '@utils/error'
import { populateWithDeleted } from '@utils/populateWithDeleted'

export function populate (species: SpeciesDoc): Promise<SpeciesDoc>
export function populate (
  species: Array<SpeciesDoc>
): Promise<Array<SpeciesDoc>>
export function populate (
  species: SpeciesDoc | Array<SpeciesDoc>,
): Promise<SpeciesDoc | Array<SpeciesDoc>> {
  const populatePath = 'type1 type2'
  return Array.isArray(species)
    ? Promise.all(
      species.map((s) => populateWithDeleted(s, populatePath)),
    ) : populateWithDeleted(species, populatePath)
}

export async function getAll (): Promise<Array<SpeciesDoc>> {
  const models = await SpeciesModel.find()

  return populate(models)
}

export async function getByNumber (
  number: number,
): Promise<SpeciesDoc | undefined> {
  const model = await SpeciesModel.findOne({
    number,
  })

  if (model) {
    return populate(model)
  }

  return model ?? undefined
}

export async function createOne (
  data: PostSpecies.RequestBody,
): Promise<SpeciesDoc> {
  const {
    type1,
    type2,
    ...rest
  } = data

  const t1 = await getTypeByName(type1)
  const t2 = (type2 ? await getTypeByName(type2) : null) ?? undefined

  if (!t1 || (type2 && !t2)) {
    throw new BadRequestError(`Invalid Type: ${t1 ? type2 : type1}`)
  }

  const model = await SpeciesModel.create({
    ...rest,
    type1: t1,
    type2: t2,
  })

  return populate(model)
}

export async function updateOne (
  number: number,
  data: PatchSpecies$Number.RequestBody,
): Promise<SpeciesDoc | undefined> {
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
  }, patch, { new: true })

  if (model) {
    return populate(model)
  }

  return model ?? undefined
}

export async function deleteOne (
  number: number,
): Promise<void> {
  await SpeciesModel.findOneAndMarkDeleted<Species>({
    number,
  })
}
