import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TopicsService } from './services/topics.service';

export const topicResolveFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => inject(TopicsService).getTopic(route.paramMap.get('id')!);
