import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft.api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { DecimalPipe } from '@angular/common';
import { MatAnchor} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    MatAnchor,
    HdWalletMultiButtonComponent,
    
  ],
  selector: 'solapp-root',
  template: `
    <header class="py-8 relative">
        <h1 class="text-5xl text-center mb-4">Solapp</h1>
        <div class="flex justify-center mb-4">
          <hd-wallet-multi-button></hd-wallet-multi-button>
        </div>

        <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>
          <li>
            <a [routerLink]="['balance']" mat-raised-button>Balance</a>
          </li>
        </ul>
      </nav>
        @if (account()){
          <p>Conected</p>
          <div class="absolute top-4 left-4 flex justify-center items-center gap-2 ">
            
            <img [src]="account()?.info?.image" class="w-8 h-8">
            <p class="text-xl font-bold">
              {{ account()?.balance }}</p>
          </div>
          
        } 
   
    </header>
     <main>
      <router-outlet></router-outlet>
     </main>
    `,
})
export class AppComponent {
 private readonly _shyftApiService = inject(ShyftApiService);
 private readonly _walletStore = inject(WalletStore);
 private readonly _publicKey = toSignal(this._walletStore.publicKey$);

 readonly account = computedAsync(
  () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  { requireSync: true },
 );
  


}




