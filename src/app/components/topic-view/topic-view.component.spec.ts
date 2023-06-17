import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicViewComponent } from './topic-view.component';

describe('TopicViewComponent', () => {
  let component: TopicViewComponent;
  let fixture: ComponentFixture<TopicViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicViewComponent]
    });
    fixture = TestBed.createComponent(TopicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
