import { PipeTransform, Pipe } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
    name: 'itemFilter'
})

export class itemFilterPipe implements PipeTransform {
    transform(items: Item[], searchcontent: string) : Item[] {
        //If there are no appropriate results or the search input is empty - just show us all existing items
        if(!items || !searchcontent) {
            return items;
        }

        //Filter by item number
        return items.filter(item => 
            item._itemNum.toString().indexOf(searchcontent) != -1);

    }
}