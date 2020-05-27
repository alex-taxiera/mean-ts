import { Component } from '@angular/core'

import { ConfigService } from '@poke-app/ng-config-service'
// import { Schemas } from '@poke-app/api'
import { TypeService } from '@poke-app/ng-api-services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {

  public title = 'poke-ui'
  public readonly test?: string

  constructor (
    private readonly configService: ConfigService,
    private readonly typeService: TypeService,
  ) {
    this.test = this.configService.get('apiUrl')
    this.typeService.getAllTypes().subscribe((t) => {
      console.log('t :>> ', t);
    })
  }

}
