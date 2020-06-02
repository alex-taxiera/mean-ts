import { Injectable } from '@angular/core'
import {
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita'
import { Schemas } from '@poke-app/api'

export interface TypeState extends EntityState<Schemas.TypeView, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'type', idKey: 'name' })
export class TypeStore extends EntityStore<TypeState> {

  constructor() {
    super()
  }

}
