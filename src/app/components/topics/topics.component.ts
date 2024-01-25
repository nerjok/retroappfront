import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Pager, Topic, TopicsService } from 'src/app/services/topics.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { topicStatus } from 'src/app/shared/models/topic-status.enum';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit{
  topics$?: Observable<Pager<Topic>>

  faEdit = faEdit;
  faEye = faEye;
  constructor(private activatedRoute: ActivatedRoute, private topicsService: TopicsService, private router: Router, private modalService: ModalService) {}

  ngOnInit(): void {
    this.topics$ = this.topicsService.topics();    
  }

  addTopic(): void {
    this.router.navigate(['create']);
  }

  editTopic(topic: Topic):void {
    this.modalService.show(EditModalComponent, {modalDialogClass: 'modal-dialog-slideout', data: topic})
    // this.router.navigate(['edit', topic.id], { state: topic});
  }

  viewTopic(topic: Topic):void {
    this.router.navigate(['view', topic.id], { relativeTo: this.activatedRoute});
  }
}
