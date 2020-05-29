import { Component, OnInit } from '@angular/core';
import { TypeService } from '@poke-app/ng-api-services';
import { Schemas } from '@poke-app/api';

@Component({
  selector: 'pk-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit {

  public types?: Array<Schemas.TypeView>

  constructor(
    private readonly typeService: TypeService,
  ) { }

  ngOnInit(): void {
    this.typeService.getAllTypes().subscribe((types) => {
      this.types = types
    })
  }

}
