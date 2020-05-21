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
  UnhandledError,
} from '@utils/error'

@Controller('pokemon')
@ClassWrapper(async)
export class PokemonController implements CRUDController {

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

  @Get(':id')
  @Middleware(validate)
  public async get (req: Request, res: Response): Promise<Response> {
    const params: Paths.Pokemon$Id.Get.PathParameters = req.params as any
    const doc = await getById(params.id)

    if (!doc) {
      throw new NotFoundError()
    }

    return res.status(OK).json(view(doc))
  }

  @Patch(':id')
  @Middleware(validate)
  public async patch (req: Request, res: Response): Promise<Response> {
    const params: Paths.Pokemon$Id.Patch.PathParameters = req.params as any
    const doc = await getById(params.id)

    if (!doc) {
      throw new NotFoundError()
    }

    const updated = await updateOne(params.id, req.body)

    if (!updated) {
      throw new UnhandledError()
    }

    return res.status(OK).json(view(updated))
  }

  @Delete(':id')
  @Middleware(validate)
  public async delete (req: Request, res: Response): Promise<Response> {
    const params: Paths.Pokemon$Id.Get.PathParameters = req.params as any
    const doc = await getById(params.id)

    if (!doc) {
      throw new NotFoundError()
    }

    await deleteOne(params.id)

    return res.status(NO_CONTENT).send()
  }

}
