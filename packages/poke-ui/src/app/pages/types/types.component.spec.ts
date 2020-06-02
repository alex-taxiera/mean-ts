import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing'

import { TypesComponent } from './types.component'

describe('TypesComponent', () => {
  let component: TypesComponent
  let fixture: ComponentFixture<TypesComponent>

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ TypesComponent ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    return expect(component).toBeTruthy()
  })
})
