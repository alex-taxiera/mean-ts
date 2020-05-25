import path from 'path'
import fs from 'fs'

import bodyParser from 'body-parser'
import {
  Request,
  Response,
} from 'express'

import { Server } from '@overnightjs/core'
import {
  Logger,
  LoggerModes,
} from '@overnightjs/logger'
import { mongoose } from '@typegoose/typegoose'

import { init as initValidator } from 'openapi-validator-middleware'

import { RootController } from '@api'
// Set env variables
const logFilePath = path.join(__dirname, '../sampleProject.log')
process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath
process.env.OVERNIGHT_LOGGER_MODE = LoggerModes.Console
process.env.OVERNIGHT_LOGGER_RM_TIMESTAMP = 'false'

class NormalRouterServer extends Server {

  private readonly FRONT_END_MSG =
    'OvernightJS with standard express router started.'

  private readonly START_MSG =
    'OvernightJS with standard express router started on port: '

  constructor () {
    super(true)
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    super.addControllers([
      new RootController(),
    ])
  }

  public start (port?: number): void {
    port = port || 3000
    this.app.get('*', (_: Request, res: Response) => {
      res.send(this.FRONT_END_MSG)
    })
    this.app.listen(port, () => {
      Logger.Imp(this.START_MSG + port)
    })
  }

}

async function setup (): Promise<void> {
  try {
    fs.unlinkSync(logFilePath)
  } catch (e) {}

  initValidator('docs.yml', {
    beautifyErrors: true,
    makeOptionalAttributesNullable: true,
    ajvConfigBody: {
      allErrors: true,
      coerceTypes: true,
    },
  })

  await mongoose.connect('mongodb://localhost/poke-db', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

setup().then(() => {
  const server = new NormalRouterServer()
  server.start(3000)
})
