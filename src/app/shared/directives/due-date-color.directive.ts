import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import dayjs from 'dayjs';
import { TopicStatus } from '../models/topic-status.enum';

@Directive({
    selector: '[appDueDateColor]',
    standalone: false
})
export class DueDateColorDirective implements OnChanges {
  @Input() status!: TopicStatus;
  @Input() appDueDateColor: string | undefined;

  @HostBinding('class')
  elementClass = 'custom-theme';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.status > -1 && this.appDueDateColor) {
      this.highlight(this.appDueDateColor);
    }
  }

  private highlight(date: string) {
    if(this.status === TopicStatus.Finnished) {
      return;
    }
    const currentDate = dayjs();
    const receivedDate = dayjs(date);
    const datesDiff = receivedDate.diff(currentDate, 'days');

    const color = receivedDate.isAfter(currentDate)
      ? ''
      : datesDiff > -15
      ? 'gray-row'
      : 'red-row';
    this.elementClass = color;
    // this.el.nativeElement.style.backgroundColor = color;
  }
}
