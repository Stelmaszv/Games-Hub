import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPublishersComponent } from '../add-publishers/add-publishers.component';

describe('AddPublishersComponent', () => {
  let component: AddPublishersComponent;
  let fixture: ComponentFixture<AddPublishersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPublishersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
