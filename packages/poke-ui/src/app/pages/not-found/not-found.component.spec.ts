import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing'

import { NotFoundComponent } from './not-found.component'

describe('NotFoundComponent', () => {
  let component: NotFoundComponent
  let fixture: ComponentFixture<NotFoundComponent>

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    return expect(component).toBeTruthy()
  })
})
