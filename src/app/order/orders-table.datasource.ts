// orders-table.datasource.ts
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, merge, of } from 'rxjs';
import { Order } from './order';
import { OrderService } from './order.service';

export class OrdersTableDataSource extends DataSource<Order> {
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
    data!: Order[];

    constructor(private orderService: OrderService) {
        super();
    }
    connect(): Observable<Order[]> {
        if (this.paginator && this.sort) {
            // Combine everything that affects the rendered data into one update
            // stream for the data-table to consume.
            return merge(of(this.data), this.paginator.page, this.sort.sortChange)
                .pipe(mergeMap(() => {
                    return this.orderService.getOrders(
                        this.paginator!.pageIndex * this.paginator!.pageSize,
                        this.paginator!.pageSize,
                        this.sort!.active,
                        this.sort!.direction,
                    )
                }));
        } else {
            throw Error('Please set the paginator and sort on the data source before connecting.');
        }
    }
    disconnect(collectionViewer: CollectionViewer): void {

    }
}
