import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { TransferModalComponent } from './transfer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'solapp-balance-section',
  standalone: true,
  imports: [DecimalPipe, MatButton, MatCard],
  template: `
    <section class="text-center text-2xl px-24 py-32 bg-neutral bg-opacity-5">
      @if (account()) {
        <div class="mb-2 top-4 left-4 flex justify-center items-center gap-2 ">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p>
            {{ account()?.balance | number }}
          </p>
        </div>
        <button
          class="btn btn-xs sm:btn-md md:btn-md lg:btn-lg border-accent"
          (click)="onTransfer()"
        >
          Transfer
        </button>
      } @else {
        <p class="text-warning-content">Connect your wallet</p>
      }
    </section>
  `,
})
export class BalanceSectionComponent {
  private readonly _matDialog = inject(MatDialog);
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: false },
  );
  onTransfer() {
    this._matDialog.open(TransferModalComponent);
  }
}
