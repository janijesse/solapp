import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TransferFormComponent, TransferFormPayLoad } from './transfer-form.component';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';


@Component({
  standalone: true,
  imports: [TransferFormComponent],
  selector: 'solapp-transfer-modal',
  template: `<div class="px-8 py-16 pb-8 bg-neutral ">
    <h3>Transfer founds</h3>
    <solapp-transfer-form
      (submitForm)="onTransferForm($event)"
    ></solapp-transfer-form>
  </div>`,
})
export class TransferModalComponent {
  private readonly _TransactionSender = injectTransactionSender();
  onTransferForm(payload: TransferFormPayLoad) {
    console.log('hello world', payload);

    this._TransactionSender
      .send(({ publicKey }) =>
        createTransferInstructions({
          amount: payload.amount * 10 ** 9,
          mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
          receiverAddress: payload.receiverAddress,
          senderAddress: publicKey.toBase58(),
          fundReceiver: true,
          memo: payload.memo ?? undefined,
        }),
      )
      .subscribe({
        next: (signature) => console.log(`Signature: ${signature}`),
        error: (error) => console.error(error),
        complete: () => console.log('Transaction ready'),
      });
  }
}