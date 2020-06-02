import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing'

import { HorizontalNavComponent } from './horizontal-nav.component'

describe('HorizontalNavComponent', () => {
  let component: HorizontalNavComponent
  let fixture: ComponentFixture<HorizontalNavComponent>

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ HorizontalNavComponent ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalNavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    return expect(component).toBeTruthy()
  })
})
