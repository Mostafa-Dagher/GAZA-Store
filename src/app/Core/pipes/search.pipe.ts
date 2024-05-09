import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
// export class SearchPipe implements PipeTransform {
//   transform(products: any[], searchterm: string): any[] {
//     return products.filter((product) => product.name && product.description.toLocaleLowerCase()
//     .includes(searchterm.toLocaleLowerCase()));
//   }
// }

export class SearchPipe implements PipeTransform {
  transform(products: any[], searchterm: string): any[] {
    if (!searchterm) return products; // If search term is empty, return all products

    searchterm = searchterm.toLocaleLowerCase(); // Convert search term to lowercase for case-insensitive comparison

    return products.filter(product =>
      product.name.toLocaleLowerCase().includes(searchterm) ||
      (product.description && product.description.toLocaleLowerCase().includes(searchterm))
    );
  }
}
