import { CRUDController } from './CRUD'
import {
  Controller,
  ClassWrapper,
  Get,
  Post,
  Patch,
  Delete,
  Middleware,
} from '@overnightjs/core'
import { async } from '@utils/asyncWrapper'
import {
  Request,
  Response,
} from 'express'
import { validate } from 'openapi-validator-middleware'
import { view } from '@api/views/pokemon'
import {
  createOne,
  getAll,
  deleteOne,
  getById,
  updateOne,
} from '@api/services/pokemon'
import {
  OK,
  NO_CONTENT,
} from 'http-status-codes'
import {
  NotFoundError,
  ServerError,
} from '@utils/error'
import { Params } from '@utils/params'
import {
  GetPokemon,
  PostPokemon,
  GetPokemon$Id,
  PatchPokemon$Id,
  DeletePokemon$Id,
} from '@poke-app/api'

@Controller('pokemon')
@ClassWrapper(async)
export class PokemonController implements CRUDController {

  @Get()
  public async getAll (
    req: Request,
    res: Response<GetPokemon.$200>,
  ): Promise<typeof res> {
    const docs = await getAll()

    return res.status(OK).json(view(docs))
  }

  @Post()
  @Middleware(validate)
  public async post (
    req: Request<
      Params,
      PostPokemon.$200,
      PostPokemon.RequestBody
    >,
    res: Response<PostPokemon.$200>,
  ): Promise<typeof res> {
    const model = await createOne(req.body)

    return res.status(OK).json(view(model))
  }

  @Get(':id')
  @Middleware(validate)
  public async get (
    req: Request<
      Params<GetPokemon$Id.PathParameters>,
      GetPokemon$Id.$200
    >,
    res: Response<GetPokemon$Id.$200>,
  ): Promise<typeof res> {
    const doc = await getById(req.params.id)

    if (!doc) {
      throw new NotFoundError()
    }

    return res.status(OK).json(view(doc))
  }

  @Patch(':id')
  @Middleware(validate)
  public async patch (
    req: Request<
      Params<PatchPokemon$Id.PathParameters>,
      PatchPokemon$Id.$200,
      PatchPokemon$Id.RequestBody
    >,
    res: Response<PatchPokemon$Id.$200>,
  ): Promise<typeof res> {
    const doc = await getById(req.params.id)

    if (!doc) {
      throw new NotFoundError()
    }

    const updated = await updateOne(doc, req.body)

    if (!updated) {
      throw new ServerError()
    }

    return res.status(OK).json(view(updated))
  }

  @Delete(':id')
  @Middleware(validate)
  public async delete (
    req: Request<
      Params<DeletePokemon$Id.PathParameters>,
      undefined
    >,
    res: Response<undefined>,
  ): Promise<typeof res> {
    const doc = await getById(req.params.id)

    if (!doc) {
      throw new NotFoundError()
    }

    await deleteOne(doc)

    return res.status(NO_CONTENT).send()
  }

}
