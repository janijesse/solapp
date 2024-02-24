import { Component } from '@angular/core';
import {
  TransferFormComponent,
  TransferFormPayLoad,
} from './transfer-form.component';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
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
  private readonly _transactionSender = injectTransactionSender();

  onTransfer(payload: TransferFormPayLoad) {
    console.log('hola mundo', payload);

    this._transactionSender
      .send(({ publicKey }) =>
        createTransferInstructions({
          amount: payload.amount,
          mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
          receiverAddress: payload.receiverAddress,
          senderAddress: publicKey.toBase58(),
          fundReceiver: true,
          memo: payload.memo,
        }),
      )
      .subscribe({
        next: (signature) => console.log(`Firma: ${signature}`),
        error: (error) => console.error(error),
        complete: () => console.log('Transaction OK!'),
      });
  }
}
