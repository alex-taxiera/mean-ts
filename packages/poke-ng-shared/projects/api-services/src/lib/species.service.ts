import {
  Injectable,
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

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {

  constructor (
    private readonly url: string,
    private readonly http: HttpClient,
  ) {}

  public getAllSpecies (): Observable<GetSpecies.$200> {
    return this.http.get<GetSpecies.$200>(`${this.url}/species`)
  }

  public postSpecies (
    data: PostSpecies.RequestBody,
  ): Observable<PostSpecies.$200> {
    return this.http.post<PostSpecies.$200>(`${this.url}/species`, data)
  }

  public getSpecies (
    number: GetSpecies$Number.Parameters.Number,
  ): Observable<GetSpecies$Number.$200> {
    return this.http.get<GetSpecies$Number.$200>(
      `${this.url}/species/${number}`,
    )
  }

  public updateSpecies (
    number: PatchSpecies$Number.Parameters.Number,
    data: PatchSpecies$Number.RequestBody,
  ): Observable<PatchSpecies$Number.$200> {
    return this.http.patch<PatchSpecies$Number.$200>(
      `${this.url}/species/${number}`,
      data,
    )
  }

  public deleteSpecies (
    number: DeleteSpecies$Number.Parameters.Number,
  ): Observable<undefined> {
    return this.http.delete<undefined>(`${this.url}/species/${number}`)
  }

}
