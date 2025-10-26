import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ModalBaseComponent } from '../shared/components/modal/modal-base/modal-base.component';
import { Topic } from '../services/topics.service';
import { TopicFormComponent } from '../components/topic-form/topic-form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-topic-modal',
    imports: [CommonModule, ModalBaseComponent, TopicFormComponent],
    templateUrl: './create-topic-modal.component.html',
    styleUrl: './create-topic-modal.component.scss',
    standalone: true
})
export class CreateTopicModalComponent {
  topic = signal<Topic | null>(null);

  activeModal = inject(NgbActiveModal);

  onTopicAdded() {
    console.log('[[ modalClose ]]');
    
    this.activeModal.close();
  }
}
