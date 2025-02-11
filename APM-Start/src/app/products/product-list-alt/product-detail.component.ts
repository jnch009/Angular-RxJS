import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, Subject } from 'rxjs';
import { Supplier } from 'src/app/suppliers/supplier';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  private errorMessageSubject = new Subject<string>();
  errorMessageSubject$ = this.errorMessageSubject.asObservable();
  productSuppliers: Supplier[] | null = null;

  constructor(private productService: ProductService) { }

  productDetail$ = this.productService.selectedProduct$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    }
  ));

}
