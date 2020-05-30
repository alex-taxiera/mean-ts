import {
  Component,
  OnInit,
  Input,
} from '@angular/core'
import { TypeService } from '@poke-app/ng-api-services'
import { Schemas } from '@poke-app/api'
import { Observable } from 'rxjs'

@Component({
  selector: 'pk-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: [ './type-detail.component.scss' ],
})
export class TypeDetailComponent implements OnInit {

  @Input() private readonly typeName!: string;

  public type$?: Observable<Schemas.TypeView>

  constructor (
    private readonly typeService: TypeService,
  ) { }

  ngOnInit (): void {
    if (this.typeName === undefined) {
      throw Error('typeName is required!')
    }

    this.type$ = this.typeService.getType(this.typeName)
  }

}
