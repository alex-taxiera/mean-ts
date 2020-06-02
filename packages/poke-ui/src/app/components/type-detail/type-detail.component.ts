import {
  Component,
  OnInit,
  Input,
} from '@angular/core'
import { TypeQuery } from 'src/app/state/type/type.query'
import { Observable } from 'rxjs'
import { TypeState } from 'src/app/state/type/type.store';
import { TypeService } from 'src/app/state/type/type.service';

@Component({
  selector: 'pk-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: [ './type-detail.component.scss' ],
})
export class TypeDetailComponent implements OnInit {

  @Input() private readonly typeName!: string;

  public type$?: Observable<TypeState>

  constructor (
    private readonly typeService: TypeService,
    private readonly typeQuery: TypeQuery,
  ) { }

  public ngOnInit (): void {
    if (this.typeName === undefined) {
      throw Error('typeName is required!')
    }

    this.typeService.get(this.typeName).subscribe()
    this.type$ = this.typeQuery.selectEntity(this.typeName)
  }

}
