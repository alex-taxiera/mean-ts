import {
  Component,
  OnInit,
} from '@angular/core'
import {
  TypeService,
} from 'src/app/state/type/type.service'
import { TypeQuery } from 'src/app/state/type/type.query'

@Component({
  selector: 'pk-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: [ './type-list.component.scss' ],
})
export class TypeListComponent implements OnInit {

  public readonly types$ = this.typeQuery.selectAll();

  constructor (
    private readonly typeService: TypeService,
    private readonly typeQuery: TypeQuery,
  ) { }

  public ngOnInit (): void {
    this.typeService.getAll().subscribe()
  }

}
