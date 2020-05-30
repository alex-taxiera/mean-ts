import {
  Component,
  OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'pk-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: [ './type-details.component.scss' ],
})
export class TypeDetailsComponent implements OnInit {

  public readonly typeName: string

  constructor (
    private readonly route: ActivatedRoute,
  ) {
    this.typeName = this.route.snapshot.params.name
  }

  ngOnInit (): void {
  }

}
