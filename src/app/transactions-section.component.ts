import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'solapp-transactions-section',
  imports: [MatTableModule, MatCardModule],
  standalone: true,
  template: `
    @if (transactions()) {
      <div class="container mx-auto p-2">
        <h2 class="text-center mb-4 ">Transactions History</h2>

        <div class="overflow-x-auto">
          <mat-card>
            <table class="table table-xs"mat-table [dataSource]="transactions() ?? []">
              <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef>
                  Timestamp
                </th>
                <td mat-cell *matCellDef="let element">
                  {{ element.timestamp }}
                </td>
              </ng-container>

              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let element">
                  {{ element.type }}
                </td>
              </ng-container>

              <ng-container matColumnDef="fee">
                <th mat-header-cell *matHeaderCellDef>Fee</th>
                <td mat-cell *matCellDef="let element">
                  {{ element.fee }}
                </td>
              </ng-container>

              <ng-container matColumnDef="signatures">
                <th mat-header-cell *matHeaderCellDef>
                  Signatures
                </th>
                <td mat-cell *matCellDef="let element">
                  {{ element.signatures }}
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </mat-card>
        </div>
      </div>
    }
    @else{
      <p class="text-primary">Connect your wallet</p>
    }
  `,
})
export class TransactionsSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly transactions = computedAsync(() =>
    this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
  );

  displayedColumns: string[] = ['timestamp', 'type', 'fee', 'signatures'];
}
