import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomModalService } from './custom-modal.service';
import { CustomModalBaseComponent } from './custom-modal-base/custom-modal-base.component';
import { ModalBaseComponent } from './modal-base/modal-base.component';

const COMPONENTS = [ModalBaseComponent, CustomModalBaseComponent];
@NgModule({
  imports: [CommonModule],
  exports: [COMPONENTS],
  declarations: [COMPONENTS],
  providers: [CustomModalService],
})
export class ModalModule {}
