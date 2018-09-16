export class Item {

    _itemNum: number;
    _itemName: string;
    _itemAmount: number;
    _itemInventoryCode: string;

    constructor(
       itemName: string,
       itemAmount: number,
       itemCode: string,
      ) 
      {
        this._itemAmount = itemAmount;
        this._itemName = itemName;
        this._itemInventoryCode = itemCode;

       }

      
  }