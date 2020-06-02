import bodyParser from 'body-parser'
import cors from 'cors'
import {
  Request,
  Response,
} from 'express'

import { Server } from '@overnightjs/core'

import config from 'config'
import { mongoose } from '@typegoose/typegoose'

import { init as initValidator } from 'openapi-validator-middleware'

import { RootController } from '@api'
import {
  logger,
} from '@utils/logger'

class NormalRouterServer extends Server {

  private readonly FRONT_END_MSG =
    'OvernightJS with standard express router started.'

  private readonly START_MSG =
    'OvernightJS with standard express router started on port: '

  constructor () {
    super(true)
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    super.addControllers([
      new RootController(),
    ])
  }

  public start (): void {
    const port = 3000

    this.app.get('*', (_: Request, res: Response) => {
      res.send(this.FRONT_END_MSG)
    })

    this.app.listen(port, () => {
      logger.info(`${this.START_MSG}${port}`)
    })
  }

}

async function setup (): Promise<void> {
  initValidator('docs.yml', {
    beautifyErrors: true,
    makeOptionalAttributesNullable: true,
    ajvConfigBody: {
      allErrors: true,
      coerceTypes: true,
    },
  })

  await mongoose.connect(config.get('db.uri'), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

setup().then(() => {
  const server = new NormalRouterServer()
  server.start()
}).catch((error) => logger.error(error))
