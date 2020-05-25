import { HttpClient } from '@angular/common/http'
import {
  Injectable,
} from '@angular/core'
import { Observable } from 'rxjs'

import {
  GetType,
  PostType,
  GetType$Name,
  PatchType$Name,
  DeleteType$Name,
} from '@poke-app/api'

@Injectable({
  providedIn: 'root',
})
export class TypeService {

  constructor (
    private readonly url: string,
    private readonly http: HttpClient,
  ) {}

  public getAllTypes (): Observable<GetType.$200> {
    return this.http.get<GetType.$200>(`${this.url}/types`)
  }

  public postType (data: PostType.RequestBody): Observable<PostType.$200> {
    return this.http.post<PostType.$200>(`${this.url}/types`, data)
  }

  public getType (
    name: GetType$Name.Parameters.Name,
  ): Observable<GetType$Name.$200> {
    return this.http.get<GetType$Name.$200>(`${this.url}/types/${name}`)
  }

  public updateType (
    name: PatchType$Name.Parameters.Name,
    data: PatchType$Name.RequestBody,
  ): Observable<PatchType$Name.$200> {
    return this.http.patch<PatchType$Name.$200>(
      `${this.url}/types/${name}`,
      data,
    )
  }

  public deleteType (
    name: DeleteType$Name.Parameters.Name,
  ): Observable<undefined> {
    return this.http.delete<undefined>(`${this.url}/types/${name}`)
  }

}
