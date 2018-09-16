package com.inventoryitem.services;

import java.util.List;
import java.util.Optional;

import com.inventoryitem.models.Item;


/**
 * ItemService interface provides more sophisticated CRUD functionality for the 'Item' entity
 * class
 */ 
public interface ItemService {

	//Find item by number (present the item ID)
    Optional<Item> findItemByNum(Long itemNum);

    //Update the item's quantity correspondingly to the number of items to be withdraw
    Item withdrawItemAmount(Long itemNum, Integer amountToWithdraw);

    //Update the item's quantity correspondingly to the number of items to be deposit
    Item depositItemAmount(Long itemNum, Integer amountToDeposit);

    //Add new item to the DB
    Item addItemToStock(Item item);

    //Update existing item
    Item updateItem(Item item);

    //Retrieve all the items in the DB
    List<Item> getAllItems();
    
    //Remove item from the DB
    int removeItemFromStock(Long itemId);
}
