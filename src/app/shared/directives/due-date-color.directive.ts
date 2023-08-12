import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as dayjs from 'dayjs';
import { TopicStatus } from '../models/topic-status.enum';

@Directive({
  selector: '[appDueDateColor]',
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
    console.log('setColour', date, this.status);
    if(this.status === TopicStatus.Finnished) {
      return;
    }
    const currentDate = dayjs();
    const receivedDate = dayjs(date);
    const datesDiff = receivedDate.diff(currentDate, 'days');
    console.log('[datesDiff]', datesDiff);

    const color = receivedDate.isAfter(currentDate)
      ? ''
      : datesDiff > -15
      ? 'gray-row'
      : 'red-row';
    this.elementClass = color;
    // this.el.nativeElement.style.backgroundColor = color;
  }
}
