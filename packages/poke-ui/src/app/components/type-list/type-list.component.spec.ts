import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing'

import { TypeListComponent } from './type-list.component'

describe('TypeListComponent', () => {
  let component: TypeListComponent
  let fixture: ComponentFixture<TypeListComponent>

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ TypeListComponent ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    return expect(component).toBeTruthy()
  })
})
