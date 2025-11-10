import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import moment from 'moment';
// import { Events, Item, NgxResourceTimelineComponent, NgxResourceTimelineModule, NgxResourceTimelineService, Period, Section } from 'ngx-resource-timeline';
import { Events, Item, NgxTimeSchedulerComponent, Period, Section, NgxTimeSchedulerModule, NgxTimeSchedulerService } from 'ngx-event-scheduler';

import { BehaviorSubject } from 'rxjs';
import { TopicsService } from 'src/app/services/topics.service';
import { TopicStatus } from 'src/app/shared/models/topic-status.enum';

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

  swimalane=viewChild(NgxTimeSchedulerComponent);
  // start = moment('2025-10-01').endOf('day');
    start = moment().startOf('month').endOf('day');

  topicService = inject(TopicsService);
  changeDetectoreRef = inject(ChangeDetectorRef);

  items$ = new BehaviorSubject<Item[]>([]);

  displaySwimlane = signal(true);
  constructor(private service: NgxTimeSchedulerService) { }

  ngOnInit() {
    this.events.SectionClickEvent = (section) => console.log('Section clicked:', section);
    this.events.ItemClicked = (item) => console.log('Item clicked:', item);
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
      }
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
      // console.log('Period changed:', start.format('YYYY-MM-DD'), 'to', end.format('YYYY-MM-DD'));
    }

    this.onPeriodChange(
      this.start.clone().utc().startOf('day'),
      this.start.clone().utc().add(4, 'weeks').endOf('day')
    );

  }

  onPeriodChange(start: moment.Moment, end: moment.Moment) {
    console.log('Period changed to:', start, end);
    this.topicService.topics(0, start, end ).subscribe((data) => {
      this.displaySwimlane.set(false);
      console.log('[ topics ]', data);
      const items: Item[] = data.data.map((topic, index) => ({
        id: index,
        sectionID: 1,
        name: topic.name,
        start: moment(topic.addedDate).startOf('day'),
        end: moment(topic.dueDate).endOf('day'),
        classes: moment(topic.dueDate).isBefore(moment()) && topic.status === TopicStatus.InProgress ? 'bg-red' : '',
        metadata: topic
      }));
      this.items = items;
      this.changeDetectoreRef.markForCheck();
      this.changeDetectoreRef.detectChanges();
      console.log('this.item', this.items, this.swimalane());
      // this.items$.next([]);
      this.items$.next(items);
      // const swimlane = this.swimalane();
      // swimlane!.changePeriod(swimlane?.currentPeriod!, false);
      // swimlane!.ngOnInit();
      // // swimlane!.refreshView();
      // // swimlane!.refresh();
      // // swimlane!.itemPush();
      // swimlane!.setItemsInSectionItems();
      // swimlane!.refreshView();
      // swimlane!['changeDetector'].markForCheck();
      // swimlane!['changeDetector'].detectChanges();
      this.displaySwimlane.set(true);
      // this.service.sectionRemove(1);
      // setTimeout(() => {
        
      //   this.service.sectionPush({ name: 'A', id: 1 });
      //   items.forEach(item => {
      //     this.service.itemPush(item);
      //   });
      // }, 100);
    });
  }

  addItem() {
    this.service.itemPush({
      id: 4,
      sectionID: 5,
      name: 'Item 4',
      start: moment().startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: ''
    });
  }

  popItem() {
    this.service.itemPop();
  }

  removeItem() {
    this.service.itemRemove(4);
  }
}
