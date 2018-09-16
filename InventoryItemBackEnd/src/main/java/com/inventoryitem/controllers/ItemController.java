package com.inventoryitem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.inventoryitem.models.Item;
import com.inventoryitem.services.ItemService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;
import java.util.Optional;

/*
 * 'CrossOrigin' used to allow Cross-Origin Resource Sharing so 
 * that our angular application running on different server can consume these APIs from a browser
 * */
@CrossOrigin
@RestController
@RequestMapping("/items")
@Api(value = "onlineInventorymng", description = "Set of endpoints for Creating, Retrieving, Updating and Deleting items.")
public class ItemController {

	@Autowired
	private ItemService itemService;

	@PostMapping(path = { "/add" })
	@ApiOperation("Creates a new item.")
	public Item AddToStock(@ApiParam("Item information for a new item to be created.") @RequestBody Item item) {
		return itemService.addItemToStock(item);
	}

	@GetMapping(path = { "/find/{itemNum}" }, produces = "application/json")
	@ApiOperation("Returns a specific item by thier identifier.")
	public Optional<Item> findItem(
			@ApiParam("Unique identifier of the item to be obtained. Cannot be empty.") @PathVariable("itemNum") Long itemNum) {
		return itemService.findItemByNum(itemNum);
	}

	@GetMapping(produces = "application/json")
	@ApiOperation("Returns list of all items in the inventory.")
	public List<Item> findAllItems() {
		return itemService.getAllItems();
	}

	@DeleteMapping(path = { "/delete/{itemNum}" }, produces = "application/json")
	@ApiOperation("Deletes an item from the inventory.")
	public int removeItem(
			@ApiParam("Unique identifier of the item to be deleted. Cannot be empty.") @PathVariable("itemNum") Long itemNum) {
		return itemService.removeItemFromStock(itemNum);
	}

	@PutMapping(path = { "/edit/{itemNum}" }, produces = "application/json")
	@ApiOperation("Updates an item in the inventory.")
	public Item update(@PathVariable("itemNum") Long itemNum, @RequestBody Item item) {

		return itemService.updateItem(item);
	}

	@GetMapping(path = { "/edit/{itemNum}/withdraw/{itemAmount}" }, produces = "application/json")
	@ApiOperation("Withdraw quantity of a specific item from the inventory.")
	public Item withdrawItem(
			@ApiParam("Unique identifier of the item to be edited. Cannot be empty.") @PathVariable Long itemNum,
			@ApiParam("Quantity of the item to withdraw.") @PathVariable Integer itemAmount) {

		return itemService.withdrawItemAmount(itemNum, itemAmount);
	}

	@GetMapping(path = { "/edit/{itemNum}/deposit/{itemAmount}" }, produces = "application/json")
	@ApiOperation("Deposit quantity of a specific item in the inventory.")
	public Item DepositItem(
			@ApiParam("Unique identifier of the item to be edited. Cannot be empty.") @PathVariable Long itemNum,
			@ApiParam("Quantity of the item to deposit.") @PathVariable Integer itemAmount) {
		System.out.println("here: " + itemAmount);
		return itemService.depositItemAmount(itemNum, itemAmount);
	}

}
