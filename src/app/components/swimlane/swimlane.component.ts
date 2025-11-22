import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import moment from 'moment';
// import { Events, Item, NgxResourceTimelineComponent, NgxResourceTimelineModule, NgxResourceTimelineService, Period, Section } from 'ngx-resource-timeline';
import {
  Events,
  Item,
  NgxTimeSchedulerComponent,
  Period,
  Section,
  NgxTimeSchedulerModule,
  NgxTimeSchedulerService,
} from 'ngx-event-scheduler';

import { BehaviorSubject } from 'rxjs';
import { Topic, TopicsService } from 'src/app/services/topics.service';
import { TopicStatus } from 'src/app/shared/models/topic-status.enum';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ModalService } from 'src/app/shared/components/modal/modal.service';

@Component({
  selector: 'app-swimlane',
  imports: [NgxTimeSchedulerModule, AsyncPipe, JsonPipe],
  templateUrl: './swimlane.component.html',
  styleUrl: './swimlane.component.scss',
})
export class SwimlaneComponent implements OnInit {
  events: Events = new Events();
  periods: Period[] = [];
  sections: Section[] = [];
  items: Item[] = [];

  swimalane = viewChild(NgxTimeSchedulerComponent);
  // start = moment('2025-10-01').endOf('day');
  start = moment().startOf('month').endOf('day');

  topicService = inject(TopicsService);
  changeDetectoreRef = inject(ChangeDetectorRef);
  modalService = inject(ModalService);

  items$ = new BehaviorSubject<Item[]>([]);

  constructor(private service: NgxTimeSchedulerService) {}

  ngOnInit() {
    this.events.SectionClickEvent = (section) =>
      console.log('Section clicked:', section);
    this.events.ItemClicked = (item) => {
      console.log('Item clicked:', item);
      this.editTopic(item.metadata as Topic);
    };
    this.events.ItemDropped = (item) => console.log('Item dropped:', item);

    this.periods = [
      {
        name: '4 week',
        timeFrameHeaders: ['MMM YYYY', 'DD'],
        classes: '',
        timeFrameOverall: 1440 * 7 * 4,
        timeFramePeriod: 1440,
      },
      // {
      //   name: '3 days',
      //   timeFramePeriod: 60 * 3,
      //   timeFrameOverall: 60 * 24 * 3,
      //   timeFrameHeaders: ['Do MMM', 'HH'],
      //   classes: 'period-3day'
      // },
      {
        name: '1 week',
        // timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        timeFrameHeaders: ['MMM YYYY', 'DD'],
        classes: '',
        timeFrameOverall: 1440 * 7,
        timeFramePeriod: 1440,
      },
      {
        name: '2 week',
        timeFrameHeaders: ['MMM YYYY', 'DD'],
        classes: '',
        timeFrameOverall: 1440 * 14,
        timeFramePeriod: 1440,
      },
    ];

    this.sections = [
      { name: 'Events', id: 1 },
      // { name: 'B', id: 2 },
      // { name: 'C', id: 3 },
      // { name: 'D', id: 4 },
      // { name: 'E', id: 5 }
    ];

    this.events.PeriodChange = (start, end) => {
      this.onPeriodChange.bind(this)(start, end);
    };

    this.onPeriodChange(
      this.start.clone().utc().startOf('day'),
      this.start.clone().utc().add(4, 'weeks').endOf('day')
    );
  }

  onPeriodChange(start: moment.Moment, end: moment.Moment) {
    this.topicService.topics(0, start, end).subscribe((data) => {

      const items: Item[] = data.data.map((topic, index) => ({
        id: index,
        sectionID: 1,
        name: topic.name,
        start: moment(topic.addedDate).startOf('day'),
        end: moment(topic.dueDate).endOf('day'),
        classes:
          moment(topic.dueDate).isBefore(moment()) &&
          topic.status === TopicStatus.InProgress
            ? 'bg-red'
            : '',
        metadata: topic,
      }));
      this.items = items;
      this.changeDetectoreRef.markForCheck();
      this.changeDetectoreRef.detectChanges();


      this.items$.next(items);
    });
  }

  addItem() {
    this.service.itemPush({
      id: 4,
      sectionID: 5,
      name: 'Item 4',
      start: moment().startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: '',
    });
  }

  popItem() {
    this.service.itemPop();
  }

  removeItem() {
    this.service.itemRemove(4);
  }

  editTopic(topic: Topic): void {
    this.modalService.show(EditModalComponent, {
      modalDialogClass: 'modal-dialog-slideoutX modal-dialog-scrollable',
      scrollable: true,
      data: topic,
    });
  }
}
