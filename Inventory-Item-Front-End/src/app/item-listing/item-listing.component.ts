import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';



@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.css']
})
export class ItemListingComponent implements OnInit {

  //Template Ref types 
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  //The selected row with the item's details
  selectedItem: Item;

  //Item row which holds the origin values of an edited item
  tmpItem: Item;

  //Indicates if the edited row is for a new item
  isNewRecord: boolean;

  //Showing error/success messages to the user after CRUD operations 
  statusMessage: string;

  //List of all the items in the DB
  items: Array<Item>;

  //Search input for searching item in the list of items (search by item number)
  searchcontent: string;

  //The color of the statusMessage variable ( red - for error, blue - for success)
  msgColor: string;

  //Total items in the DB
  totalRec: number;

  //The first page of items is shown to the user
  page: number = 1;


  constructor(
    private http: Http,
    private itemService: ItemsService
  ) {
    this.items = new Array<Item>();
  }

  ngOnInit() {

    this.loadItems();
  }

  //Get all item from the DB on page load
  loadItems() {

    this.itemService.getAllItems()
      .subscribe(
        data => { this.items = data; this.totalRec = this.items.length; },
        error => {
          this.msgColor = "red";

          this.statusMessage = 'Error has occured while trying to retrieve list of items from the server';
        }

      );
  }

  //Add Item row to the table
  addItemRow() {

    if (!this.isNewRecord) {
      this.statusMessage = "";

      this.selectedItem = new Item("", 0, "");

      //Push the template item row to the items list
      this.items = [this.selectedItem, ...this.items];

      this.totalRec = this.items.length;

      this.page = 1;

      this.searchcontent = "";

      this.isNewRecord = true;
    }
  }

  //Change the Item row to edit mode
  editItemRow(item: Item) {

    if (this.isNewRecord) {

      this.items.shift();

      this.totalRec = this.items.length;
    }

    this.selectedItem = item;

    this.isNewRecord = false;

    this.tmpItem = new Item(item._itemName, item._itemAmount, item._itemInventoryCode);

    this.tmpItem._itemNum = item._itemNum;

    this.statusMessage = "";
  }

  //Deposit number of items of the same kind to the DB
  depositeQuantity(item: Item, updatedQuantity: number) {

    // Checking if the number ,which typed by the user, to deposit is valid
    if (!isNaN(updatedQuantity) && updatedQuantity > 0) {

      if (confirm("Are you sure you want to deposit " + updatedQuantity + " items?")) {

        this.statusMessage = "";

        let index: number = this.items.indexOf(item);

        this.itemService.depositQuantity(item._itemNum, updatedQuantity).subscribe(data => {

          this.items[index] = data;

          this.msgColor = "blue";

          this.statusMessage = "Item's quantity Updated Successfully.";
        },
          error => {
            this.msgColor = "red";

            this.statusMessage = 'Error has occured while trying to deposite';

          }
        )
      }
      else {
        this.statusMessage = "";
      }
    }
    else {
      this.msgColor = "red";

      this.statusMessage = "You can only enter a number which greater than zero";
    }
  }

  //Withdraw number of items of the same kind from the DB
  withdrawQuantity(item: Item, updatedQuantity: number) {

    // Checking if the number ,which typed by the user, to withdraw is valid
    if (!isNaN(updatedQuantity) &&
      item._itemAmount >= updatedQuantity &&
      updatedQuantity > 0) {

      this.statusMessage = "";

      if (confirm("Are you sure you want to withdraw " + updatedQuantity + " items?")) {

        let index: number = this.items.indexOf(item);

        this.itemService.withdrawQuantity(item._itemNum, updatedQuantity).subscribe(data => {

          this.items[index] = data;

          this.msgColor = "blue";

          this.statusMessage = "Item's quantity Updated Successfully.";

        },
          error => {
            this.msgColor = "red";

            this.statusMessage = 'Error has occured while trying to withdraw';

          }
        )
      }
      else {
        this.statusMessage = "";
      }
    }
    else {
      this.msgColor = "red";

      this.statusMessage = "You can only enter a number which greater than zero and smaller then the item's current quantity";
    }
  }

  //Load either Read-Only Template or EditTemplate
  loadTemplate(item: Item) {

    //Checking if the user is on editing mode
    if (this.selectedItem &&
      this.selectedItem._itemNum === item._itemNum) {

      return this.editTemplate;

    }
    else {

      return this.readOnlyTemplate;
    }
  }

  //Save New Item to the DB
  saveItem() {

    // Checking if the number which represent the item's quantitiy, is valid
    if (!isNaN(this.selectedItem._itemAmount) && this.selectedItem._itemAmount != null &&
      this.selectedItem._itemAmount >= 0) {

      if (confirm("Are you sure you want to save the changes?")) {

        this.statusMessage = "";

        if (this.isNewRecord) {

          //pop the template item row
          this.items.shift();

          this.totalRec = this.items.length;

          this.page = 1;

          //add a new Item
          this.itemService.addItem(this.selectedItem).subscribe(data => {

            this.msgColor = "blue";

            this.statusMessage = 'Item Added Successfully.';

            //Pushes the saved item to the list of items
            this.items = [data, ...this.items];

            //Updating the number of items which can be viewed on the table
            this.totalRec = this.items.length;

          },
            error => {

              this.msgColor = "red";

              this.statusMessage = 'Error has occured while trying to add new item';
            }
          );

          this.isNewRecord = false;

        } else {

          //Saving the item's changes to the db
          this.itemService.updateItem(this.selectedItem).subscribe(data => {

            this.msgColor = "blue";

            this.statusMessage = 'Item Updated Successfully.';

            let index: number = this.items.indexOf(this.selectedItem);

            this.items[index] = data;
          },
            error => {
              this.msgColor = "red";

              this.statusMessage = 'Error has occured while tring to update the item';
            }
          );
        }
        this.selectedItem = null;
      }
      else {
        this.statusMessage = "";
      }
    }
    else {
      this.msgColor = "red";

      this.statusMessage = "You can only enter numbers greater or equal to zero";
    }
  }

  //Exit from edit row mode
  cancel() {
    //Exit from Creating new item 
    if (this.isNewRecord) {

      //pop the unsaved new item 
      this.items.shift();

      this.totalRec = this.items.length;

      this.page = 1;

      this.isNewRecord = false;
    }
    //Exit from editing existing item
    else {
      let index: number = this.items.indexOf(this.selectedItem);

      //Restore the item's details
      this.items[index] = this.tmpItem;

    }

    //Init the templates Items
    this.selectedItem = null;

    this.tmpItem = null;
  }

  //Delete Item from the db
  deleteItem(item: Item) {

    if (confirm("Are you sure you want to delete item: " + item._itemNum)) {

      this.statusMessage = "";

      let index: number = this.items.indexOf(item);

      this.itemService.deleteItem(item._itemNum).subscribe(data => {

        this.msgColor = "blue";

        this.statusMessage = 'Item Deleted Successfully.';

        this.items.splice(index, 1);

        this.totalRec = this.items.length;
      },
        error => {
          this.msgColor = "red";

          this.statusMessage = 'Error has occured while trying to delete the item from stock';
        });
    }
    else {
      this.statusMessage = "";
    }
  }
}
