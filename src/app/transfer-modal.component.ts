import { Component } from '@angular/core';
import {
  TransferFormComponent,
  TransferFormPayLoad,
} from './transfer-form.component';

@Component({
  selector: 'solapp-transfer-modal',
  template: `
    <div class="px-8 py-16 pb-8">
      <h2 class="text-2xl">Send funds</h2>
      <solapp-transfer-form
        (submitForm)="onTransfer($event)"
      ></solapp-transfer-form>
    </div>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent {
  onTransfer(payload: TransferFormPayLoad) {
    console.log('hola mundo', payload);
  }
}
