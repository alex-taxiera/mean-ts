import {
  Injectable,
  APP_INITIALIZER,
  Provider,
  InjectionToken,
  Inject,
  Optional,
} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http'

const defaultFilePath = 'assets/config/config.json'

export const CONFIG_URL_TOKEN = new InjectionToken<string>('config path')

export interface Settings { [key: string]: unknown }

/**
 * A configuration service class that uses HttpClient to load configuration settings.
 *
 * To use it, first call the `load()` method to load the configuration.
 * Then use the `get()` method to get a value for a specific key.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  private settings?: Settings

  constructor (
    private readonly http: HttpClient,
    @Optional()
    @Inject(CONFIG_URL_TOKEN)
    private readonly url?: string,
  ) {}

  /**
   * Load the configuration settings using HttpClient get method.
   *
   * @returns A function that returns a Promise.
   * The function is used by the factory method in defining `APP_INITIALIZER` provide.
   */
  public load (): () => Promise<void> {
    return (): Promise<void> => {
      return this.http
        .get<Settings>(this.url ?? defaultFilePath)
        .toPromise()
        .then((data) => {
          this.settings = data
        })
        .catch((error: HttpErrorResponse) => {
          throw new Error(
            `ConfigService failed to load ${
              this.url ?? defaultFilePath
            }. Error: ${
              error.message || (
                error.error ? (error.error as Error).message : 'undefined'
              )
            }`,
          )
        })
    }
  }

  /**
   * Get the configuration value for the specified key.
   *
   * @param key The key of the configuration value.
   * @returns The value of the specified configuration key.
   */
  public get<T = unknown> (key: string): T | undefined {
    let result: unknown | undefined

    if (this.settings) {
      result = this.settings[key]
    }

    return result as T ?? undefined
  }

}

/**
 * Called by a `APP_INITIALIZER` provider factory to load configuration and return a promise.
 * The AOT requires a function, not an expression (arrow function or funciton expression)
 * @ignore
 */
export function initializeService (config: ConfigService): () => Promise<void> {
  return config.load()
}

/**
 * Initialize the `APP_INITIALIZER` provider.
 * It should be added to the `providers` property in AppModule definition.
 */
export const bootConfigServiceProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeService,
  multi: true,
  deps: [ ConfigService ],
}
