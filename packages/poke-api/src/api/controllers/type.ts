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
  ServerError,
  BadRequestError,
} from '@utils/error'
import {
  Params,
} from '@utils/params'

@Controller('type')
@ClassWrapper(async)
export class TypeController implements CRUDController {

  @Get()
  public async getAll (
    req: Request,
    res: Response<GetType.$200>,
  ): Promise<typeof res> {
    const docs = await getAll()

    return res.status(OK).json(view(docs))
  }

  @Post()
  @Middleware(validate)
  public async post (
    req: Request<
      Params,
      PostType.$200,
      PostType.RequestBody
    >,
    res: Response<PostType.$200>,
  ): Promise<typeof res> {
    const {
      body,
    } = req

    if (await getByName(body.name)) {
      throw new BadRequestError('Type already exists')
    }

    const doc = await createOne(body)

    return res.status(OK).json(view(doc))
  }

  @Get(':name')
  @Middleware(validate)
  public async get (
    req: Request<
      Params<GetType$Name.PathParameters>,
      GetType$Name.$200
    >,
    res: Response<GetType$Name.$200>,
  ): Promise<typeof res> {
    const {
      params,
    } = req

    const doc = await getByName(params.name)

    if (!doc) {
      throw new NotFoundError()
    }

    return res.status(OK).json(view(doc))
  }

  @Patch(':name')
  @Middleware(validate)
  public async patch (
    req: Request<
      Params<PatchType$Name.PathParameters>,
      PatchType$Name.$200,
      PatchType$Name.RequestBody
    >,
    res: Response<PatchType$Name.$200>,
  ): Promise<typeof res> {
    const {
      params,
      body,
    } = req

    const doc = await getByName(params.name)

    if (!doc) {
      throw new NotFoundError()
    }

    const updated = await updateOne(params.name, body)

    if (!updated) {
      throw new ServerError()
    }

    return res.status(OK).json(view(updated))
  }

  @Delete(':name')
  @Middleware(validate)
  public async delete (
    req: Request<
      Params<DeleteType$Name.PathParameters>,
      undefined
    >,
    res: Response<undefined>,
  ): Promise<typeof res> {
    const {
      params,
    } = req

    const doc = await getByName(params.name)

    if (!doc) {
      throw new NotFoundError()
    }

    await deleteOne(params.name)

    return res.status(NO_CONTENT).send()
  }

}
