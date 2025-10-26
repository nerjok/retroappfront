import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Topic, TopicsService } from 'src/app/services/topics.service';
import { MODAL_DATA } from 'src/app/shared/components/modal/modal.model';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
    standalone: false
})
export class EditModalComponent implements OnInit {

  topic = signal<Topic>(null as any);

  addComentVisible = signal(true);

  get topicId() {
    return this.modalData.id;
  }

  topicService = inject(TopicsService);

  constructor(public activeModal: NgbActiveModal,@Inject(MODAL_DATA) public modalData: any) {}
  ngOnInit(): void {
    this.fetchTopic();
  }

  fetchTopic(): void {
    this.topicService.getTopic(this.modalData.id).subscribe(topic => {
      console.log('Fetched topic:', topic);
      this.topic.set(topic);
    });
  }

  onUpdate() {
    console.log('[[ onUpdate ]]');
    
    // this.activeModal.close();
    this.fetchTopic();
  }
  onCommentAdded(): void {
    this.addComentVisible.set(true);
    this.fetchTopic();
  }

  onAddComment(): void {
    this.addComentVisible.set(this.addComentVisible() ? false : true);
  }
}
