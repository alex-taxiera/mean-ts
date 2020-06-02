import {
  Injectable,
  Inject,
} from '@angular/core'
import { tap } from 'rxjs/operators'
import { cacheable } from '@datorama/akita'
import {
  TypeService as Service,
  SERVICE_URL_TOKEN,
} from '@poke-app/ng-api-services'
import {
  TypeStore,
  TypeState,
} from './type.store'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class TypeService extends Service {

  constructor (
    private readonly typeStore: TypeStore,
    @Inject(SERVICE_URL_TOKEN) url: string,
    http: HttpClient,
  ) {
    super(url, http)
  }

  public getAll (): Observable<Array<TypeState> | undefined> {
    const req$ = super.getAllTypes().pipe(
      tap((types) => this.typeStore.set(types)),
    )

    return cacheable(this.typeStore, req$)
  }

  public get (name: string): Observable<TypeState> {
    return super.getType(name).pipe(
      tap((type) => this.typeStore.upsert(type.name, type)),
    )
  }

}
