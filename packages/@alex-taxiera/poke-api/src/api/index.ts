import {
  Controller,
  ChildControllers,
  ClassErrorMiddleware,
} from '@overnightjs/core'
import { logErrorAndStop } from '@middleware/error'
import { TypeController } from '@api/controllers/type'
import { SpeciesController } from '@api/controllers/species'
import { PokemonController } from '@api/controllers/pokemon'

@Controller('')
@ClassErrorMiddleware(logErrorAndStop)
@ChildControllers([
  new TypeController(),
  new SpeciesController(),
  new PokemonController(),
])
export class RootController {}
