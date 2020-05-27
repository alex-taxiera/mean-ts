import {
  Injectable,
  Inject,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  GetType,
  PostType,
  GetType$Name,
  PatchType$Name,
  DeleteType$Name,
} from '@poke-app/api'

import { SERVICE_URL_TOKEN } from '../util/types'

@Injectable({
  providedIn: 'root',
})
export class TypeService {

  private readonly baseUrl: string;

  constructor (
    @Inject(SERVICE_URL_TOKEN) url: string,
    private readonly http: HttpClient,
  ) {
    this.baseUrl = `${url}/type`
  }

  public getAllTypes (): Observable<GetType.$200> {
    return this.http.get<GetType.$200>(this.baseUrl)
  }

  public postType (data: PostType.RequestBody): Observable<PostType.$200> {
    return this.http.post<PostType.$200>(this.baseUrl, data)
  }

  public getType (
    name: GetType$Name.Parameters.Name,
  ): Observable<GetType$Name.$200> {
    return this.http.get<GetType$Name.$200>(`${this.baseUrl}/${name}`)
  }

  public updateType (
    name: PatchType$Name.Parameters.Name,
    data: PatchType$Name.RequestBody,
  ): Observable<PatchType$Name.$200> {
    return this.http.patch<PatchType$Name.$200>(
      `${this.baseUrl}/${name}`,
      data,
    )
  }

  public deleteType (
    name: DeleteType$Name.Parameters.Name,
  ): Observable<undefined> {
    return this.http.delete<undefined>(`${this.baseUrl}/${name}`)
  }

}
