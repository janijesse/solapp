import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'solapp-balance-section',
  template: ` <section>
    @if (account()) {
      <div class="mb-2 top-4 left-4 flex justify-center items-center gap-2 ">
        <img [src]="account()?.info?.image" class="w-8 h-8" />
        <p>
          {{ account()?.balance | number }}
        </p>
      </div>
    }
  </section>`,
  standalone: true,
  imports: [DecimalPipe],
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: false },
  );
}
