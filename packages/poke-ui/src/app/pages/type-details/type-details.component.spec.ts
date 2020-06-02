import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing'

import { TypeDetailsComponent } from './type-details.component'

describe('TypeDetailsComponent', () => {
  let component: TypeDetailsComponent
  let fixture: ComponentFixture<TypeDetailsComponent>

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ TypeDetailsComponent ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    return expect(component).toBeTruthy()
  })
})
