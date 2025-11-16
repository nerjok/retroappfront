import { Component, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Pager, Topic, TopicsService } from 'src/app/services/topics.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { CreateTopicModalComponent } from 'src/app/create-topic-modal/create-topic-modal.component';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  standalone: false
})
export class TopicsComponent implements OnInit {
  topics$?: Observable<Pager<Topic>>
  paginator = viewChild(Paginator);
  faEdit = faEdit;
  faEye = faEye;
  constructor(private activatedRoute: ActivatedRoute, private topicsService: TopicsService, private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {
    this.fetchTopics();
  }

  fetchTopics(page = 0): void {
    this.topics$ = this.topicsService.topics(page);
  }

  addTopic(): void {
    // this.router.navigate(['create']);
    this.modalService.show(CreateTopicModalComponent, { modalDialogClass: 'modal-dialog-slideoutX modal-dialog-scrollable', scrollable: true }).subscribe((data) => {
      this.fetchTopics();
    });

  }

  editTopic(topic: Topic): void {
    this.modalService.show(EditModalComponent, { modalDialogClass: 'modal-dialog-slideoutX modal-dialog-scrollable', scrollable: true, data: topic }).subscribe((data) => {
      const paginator = this.paginator();
      const currentPage = paginator?.getPage();
      console.log(paginator, paginator?.currentPage(), currentPage);
      
      this.fetchTopics(currentPage || 0);
    })
    // this.router.navigate(['edit', topic.id], { state: topic});
  }

  viewTopic(topic: Topic): void {
    this.router.navigate(['view', topic.id], { relativeTo: this.activatedRoute });
  }

  onPageChange(event: any): void {
    console.log('[[ pageChange ]]', event);
    this.fetchTopics(event.page);
  }
}
