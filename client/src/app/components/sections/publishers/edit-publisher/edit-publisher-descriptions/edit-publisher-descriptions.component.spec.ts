import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublisherDescriptionsComponent } from './edit-publisher-descriptions.component';

describe('EditPublisherDescriptionsComponent', () => {
  let component: EditPublisherDescriptionsComponent;
  let fixture: ComponentFixture<EditPublisherDescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPublisherDescriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPublisherDescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
