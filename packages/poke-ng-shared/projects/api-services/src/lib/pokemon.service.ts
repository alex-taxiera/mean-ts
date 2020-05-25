import {
  Injectable,
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

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  constructor (
    private readonly url: string,
    private readonly http: HttpClient,
  ) {}

  public getAllPokemons (): Observable<GetPokemon.$200> {
    return this.http.get<GetPokemon.$200>(`${this.url}/pokemon`)
  }

  public postPokemon (
    data: PostPokemon.RequestBody,
  ): Observable<PostPokemon.$200> {
    return this.http.post<PostPokemon.$200>(`${this.url}/pokemon`, data)
  }

  public getPokemon (
    id: GetPokemon$Id.Parameters.Id,
  ): Observable<GetPokemon$Id.$200> {
    return this.http.get<GetPokemon$Id.$200>(`${this.url}/pokemon/${id}`)
  }

  public updatePokemon (
    id: PatchPokemon$Id.Parameters.Id,
    data: PatchPokemon$Id.RequestBody,
  ): Observable<PatchPokemon$Id.$200> {
    return this.http.patch<PatchPokemon$Id.$200>(
      `${this.url}/pokemon/${id}`,
      data,
    )
  }

  public deletePokemon (
    id: DeletePokemon$Id.Parameters.Id,
  ): Observable<undefined> {
    return this.http.delete<undefined>(`${this.url}/pokemon/${id}`)
  }

}
