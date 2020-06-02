import {
  Component,
  OnInit,
} from '@angular/core'
import { RouterQuery } from '@datorama/akita-ng-router-store'

@Component({
  selector: 'pk-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: [ './type-details.component.scss' ],
})
export class TypeDetailsComponent implements OnInit {

  public readonly typeName$ = this.routerQuery.selectParams('name');

  constructor (
    private readonly routerQuery: RouterQuery,
  ) {}

  public ngOnInit (): void {
  }

}
