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
import { Request, Response } from 'express'
import { validate } from 'openapi-validator-middleware'
import { view } from '@api/views/species'
import {
  createOne,
  getAll,
  deleteOne,
  getByNumber,
  updateOne,
} from '@api/services/species'
import { OK, NO_CONTENT } from 'http-status-codes'
import { NotFoundError, UnhandledError } from '@utils/error'

@Controller('species')
@ClassWrapper(async)
export class SpeciesController implements CRUDController {

  @Get()
  public async getAll (req: Request, res: Response): Promise<Response> {
    const docs = await getAll()

    return res.status(OK).json(view(docs))
  }

  @Post()
  @Middleware(validate)
  public async post (req: Request, res: Response): Promise<Response> {
    const model = await createOne(req.body)

    return res.status(OK).json(view(model))
  }

  @Get(':number')
  @Middleware(validate)
  public async get (req: Request, res: Response): Promise<Response> {
    const params: Paths.Species$Number.Get.PathParameters = req.params as any
    const doc = await getByNumber(params.number)

    if (!doc) {
      throw new NotFoundError()
    }

    return res.status(OK).json(view(doc))
  }

  @Patch(':number')
  @Middleware(validate)
  public async patch (req: Request, res: Response): Promise<Response> {
    const params: Paths.Species$Number.Patch.PathParameters = req.params as any
    const doc = await getByNumber(params.number)

    if (!doc) {
      throw new NotFoundError()
    }

    const updated = await updateOne(params.number, req.body)

    if (!updated) {
      throw new UnhandledError()
    }

    return res.status(OK).json(view(updated))
  }

  @Delete(':number')
  @Middleware(validate)
  public async delete (req: Request, res: Response): Promise<Response> {
    const params: Paths.Species$Number.Delete.PathParameters = req.params as any
    const doc = await getByNumber(params.number)

    if (!doc) {
      throw new NotFoundError()
    }

    await deleteOne(params.number)

    return res.status(NO_CONTENT).send()
  }

}
