import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Events, Item, NgxResourceTimelineModule, NgxResourceTimelineService, Period, Section } from 'ngx-resource-timeline';

@Component({
  selector: 'app-swimlane',
  imports: [NgxResourceTimelineModule],
  templateUrl: './swimlane.component.html',
  styleUrl: './swimlane.component.scss',

})
export class SwimlaneComponent implements OnInit {
  events: Events = new Events();
  periods: Period[] = [];
  sections: Section[] = [];
  items: Item[] = [];
  // start = moment('2025-10-01').endOf('day');
    start = moment().startOf('month').endOf('day');


  constructor(private service: NgxResourceTimelineService) { }

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
      { name: 'A', id: 1 },
      { name: 'B', id: 2 },
      { name: 'C', id: 3 },
      { name: 'D', id: 4 },
      { name: 'E', id: 5 }
    ];

    this.items = [
      {
        id: 1,
        sectionID: 1,
        name: 'Item 1',
        start: moment().startOf('day'),
        end: moment().add(5, 'days').endOf('day'),
        classes: ''
      },
      {
        id: 2,
        sectionID: 3,
        name: 'Item 2',
        start: moment().startOf('day'),
        end: moment().add(4, 'days').endOf('day'),
        classes: ''
      },
      {
        id: 3,
        sectionID: 1,
        name: 'Item 3',
        start: moment().add(1, 'days').startOf('day'),
        end: moment().add(3, 'days').endOf('day'),
        classes: ''
      }
    ];
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
