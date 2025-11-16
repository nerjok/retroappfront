import { Pipe, PipeTransform } from '@angular/core';
import { TopicStatus } from '../models/topic-status.enum';

@Pipe({
    name: 'topicStatus',
    standalone: true
})
export class TopicStatusPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    switch (value) {
      case TopicStatus.New:
        return 'new';
      case TopicStatus.InProgress:
        return 'in-progress';
      case TopicStatus.Blocked:
        return 'blocked';
      case TopicStatus.Deleted:
        return 'deleted';
      case TopicStatus.Finnished:
        return 'finished';
      default:
        break;
    }

    return null;
  }
}
