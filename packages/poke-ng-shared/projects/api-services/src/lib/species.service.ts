import {
  Injectable,
  Inject,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  GetSpecies,
  PostSpecies,
  GetSpecies$Number,
  PatchSpecies$Number,
  DeleteSpecies$Number,
} from '@poke-app/api'

import { SERVICE_URL_TOKEN } from '../util/types'

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {

  private readonly baseUrl: string;

  constructor (
    @Inject(SERVICE_URL_TOKEN) url: string,
    private readonly http: HttpClient,
  ) {
    this.baseUrl = `${url}/species`
  }

  public getAllSpecies (): Observable<GetSpecies.$200> {
    return this.http.get<GetSpecies.$200>(`${this.baseUrl}`)
  }

  public postSpecies (
    data: PostSpecies.RequestBody,
  ): Observable<PostSpecies.$200> {
    return this.http.post<PostSpecies.$200>(`${this.baseUrl}`, data)
  }

  public getSpecies (
    number: GetSpecies$Number.Parameters.Number,
  ): Observable<GetSpecies$Number.$200> {
    return this.http.get<GetSpecies$Number.$200>(
      `${this.baseUrl}/${number}`,
    )
  }

  public updateSpecies (
    number: PatchSpecies$Number.Parameters.Number,
    data: PatchSpecies$Number.RequestBody,
  ): Observable<PatchSpecies$Number.$200> {
    return this.http.patch<PatchSpecies$Number.$200>(
      `${this.baseUrl}/${number}`,
      data,
    )
  }

  public deleteSpecies (
    number: DeleteSpecies$Number.Parameters.Number,
  ): Observable<undefined> {
    return this.http.delete<undefined>(`${this.baseUrl}/${number}`)
  }

}
