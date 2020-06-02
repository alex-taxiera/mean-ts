import {
  SpeciesDoc,
  SpeciesModel,
} from '@api/models/species'
import { getByName as getTypeByName } from './type'
import { BadRequestError } from '@utils/error'
import { populateWithDeleted } from '@utils/populateWithDeleted'
import {
  PatchSpecies$Number,
  PostSpecies,
} from '@poke-app/api'

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
    throw new BadRequestError(`Invalid Type: ${t1 && type2 ? type2 : type1}`)
  }

  const model = await SpeciesModel.create({
    ...rest,
    type1: t1,
    type2: t2,
  })

  return populate(model)
}

export async function updateOne (
  species: SpeciesDoc,
  data: PatchSpecies$Number.RequestBody,
): Promise<SpeciesDoc> {
  if (data.number && await getByNumber(data.number)) {
    throw new BadRequestError('Species already exists')
  }

  const {
    type1: t1,
    type2: t2,
    ...rest
  } = data

  if (t1) {
    const type1 = await getTypeByName(t1)
    if (!type1) {
      throw new BadRequestError(`Bad type: "${t1}"`)
    }
    species.set({
      type1,
    })
  }

  if (t2) {
    const type2 = await getTypeByName(t2)
    if (!type2) {
      throw new BadRequestError(`Bad type: "${t2}"`)
    }
    species.set({
      type2,
    })
  } else if (t2 === '') {
    species.set({
      type2: undefined,
    })
  }

  species.set(rest)

  return populate(await species.save())
}

export async function deleteOne (
  species: SpeciesDoc,
): Promise<void> {
  await species.markDeleted()
}
