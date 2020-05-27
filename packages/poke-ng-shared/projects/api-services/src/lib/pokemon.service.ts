import {
  Injectable,
  Inject,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  GetPokemon,
  PostPokemon,
  GetPokemon$Id,
  PatchPokemon$Id,
  DeletePokemon$Id,
} from '@poke-app/api'

import { SERVICE_URL_TOKEN } from '../util/types'

export class PokemonService {

  private readonly baseUrl: string;

  constructor (
    @Inject(SERVICE_URL_TOKEN) url: string,
    private readonly http: HttpClient,
  ) {
    this.baseUrl = `${url}/pokemon`
  }

  public getAllPokemons (): Observable<GetPokemon.$200> {
    return this.http.get<GetPokemon.$200>(`${this.baseUrl}`)
  }

  public postPokemon (
    data: PostPokemon.RequestBody,
  ): Observable<PostPokemon.$200> {
    return this.http.post<PostPokemon.$200>(`${this.baseUrl}`, data)
  }

  public getPokemon (
    id: GetPokemon$Id.Parameters.Id,
  ): Observable<GetPokemon$Id.$200> {
    return this.http.get<GetPokemon$Id.$200>(`${this.baseUrl}/${id}`)
  }

  public updatePokemon (
    id: PatchPokemon$Id.Parameters.Id,
    data: PatchPokemon$Id.RequestBody,
  ): Observable<PatchPokemon$Id.$200> {
    return this.http.patch<PatchPokemon$Id.$200>(
      `${this.baseUrl}/${id}`,
      data,
    )
  }

  public deletePokemon (
    id: DeletePokemon$Id.Parameters.Id,
  ): Observable<undefined> {
    return this.http.delete<undefined>(`${this.baseUrl}/${id}`)
  }

}
