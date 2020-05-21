import {
  Controller,
  Get,
  ClassWrapper,
  Post,
  Patch,
  Delete,
  Middleware,
} from '@overnightjs/core'
import {
  Request,
  Response,
} from 'express'
import {
  getAll,
  getByName,
  createOne,
  deleteOne,
  updateOne,
} from '@api/services/type'
import { view } from '@api/views/type'
import {
  OK,
  NO_CONTENT,
} from 'http-status-codes'
import { async } from '@utils/asyncWrapper'
import { validate } from 'openapi-validator-middleware'
import { CRUDController } from './CRUD'
import {
  NotFoundError,
  UnhandledError,
  BadRequestError,
} from '@utils/error'
import {
  Params,
} from '@utils/params'

@Controller('type')
@ClassWrapper(async)
export class TypeController implements CRUDController {

  @Get()
  public async getAll (req: Request, res: Response): Promise<Response> {
    const docs = await getAll()

    return res.status(OK).json(view(docs))
  }

  @Post()
  @Middleware(validate)
  public async post (req: Request, res: Response): Promise<Response> {
    const body: Paths.Type.Post.RequestBody = req.body

    if (await getByName(body.name)) {
      throw new BadRequestError('Type already exists')
    }

    const doc = await createOne(body)

    return res.status(OK).json(view(doc))
  }

  @Get(':name')
  @Middleware(validate)
  public async get (req: Request, res: Response): Promise<Response> {
    const params: Paths.Type$Name.Get.PathParameters = req.params as any
    const doc = await getByName(params.name)

    if (!doc) {
      throw new NotFoundError()
    }

    return res.status(OK).json(view(doc))
  }

  @Patch(':name')
  @Middleware(validate)
  public async patch (req: Request, res: Response): Promise<Response> {
    const params: Paths.Type$Name.Patch.PathParameters = req.params as any
    const doc = await getByName(params.name)

    if (!doc) {
      throw new NotFoundError()
    }

    const updated = await updateOne(params.name, req.body)

    if (!updated) {
      throw new UnhandledError()
    }

    return res.status(OK).json(view(updated))
  }

  @Delete(':name')
  @Middleware(validate)
  public async delete (req: Request, res: Response): Promise<Response> {
    const params: Paths.Type$Name.Delete.PathParameters = req.params as any
    const doc = await getByName(params.name)

    if (!doc) {
      throw new NotFoundError()
    }

    await deleteOne(params.name)

    return res.status(NO_CONTENT).send()
  }

}
