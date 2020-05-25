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
import { view } from '@api/views/species'
import {
  createOne,
  getAll,
  deleteOne,
  getByNumber,
  updateOne,
} from '@api/services/species'
import {
  OK,
  NO_CONTENT,
} from 'http-status-codes'
import {
  NotFoundError,
  ServerError,
  BadRequestError,
} from '@utils/error'
import { Params } from '@utils/params'

@Controller('species')
@ClassWrapper(async)
export class SpeciesController implements CRUDController {

  @Get()
  public async getAll (
    req: Request,
    res: Response<GetSpecies.$200>,
  ): Promise<typeof res> {
    const docs = await getAll()

    return res.status(OK).json(view(docs))
  }

  @Post()
  @Middleware(validate)
  public async post (
    req: Request<
      Params,
      PostSpecies.$200,
      PostSpecies.RequestBody
    >,
    res: Response<PostSpecies.$200>,
  ): Promise<typeof res> {
    if (await getByNumber(req.body.number)) {
      throw new BadRequestError('Species already exists')
    }

    const model = await createOne(req.body)

    return res.status(OK).json(view(model))
  }

  @Get(':number')
  @Middleware(validate)
  public async get (
    req: Request<
      Params<GetSpecies$Number.PathParameters>,
      GetSpecies$Number.$200
    >,
    res: Response<GetSpecies$Number.$200>,
  ): Promise<typeof res> {
    const doc = await getByNumber(req.params.number)

    if (!doc) {
      throw new NotFoundError()
    }

    return res.status(OK).json(view(doc))
  }

  @Patch(':number')
  @Middleware(validate)
  public async patch (
    req: Request<
      Params<PatchSpecies$Number.PathParameters>,
      PatchSpecies$Number.$200,
      PatchSpecies$Number.RequestBody
    >,
    res: Response<PatchSpecies$Number.$200>,
  ): Promise<typeof res> {
    const doc = await getByNumber(req.params.number)

    if (!doc) {
      throw new NotFoundError()
    }

    const updated = await updateOne(req.params.number, req.body)

    if (!updated) {
      throw new ServerError()
    }

    return res.status(OK).json(view(updated))
  }

  @Delete(':number')
  @Middleware(validate)
  public async delete (
    req: Request<
      Params<DeleteSpecies$Number.PathParameters>,
      undefined
    >,
    res: Response<undefined>,
  ): Promise<typeof res> {
    const doc = await getByNumber(req.params.number)

    if (!doc) {
      throw new NotFoundError()
    }

    await deleteOne(req.params.number)

    return res.status(NO_CONTENT).send()
  }

}
