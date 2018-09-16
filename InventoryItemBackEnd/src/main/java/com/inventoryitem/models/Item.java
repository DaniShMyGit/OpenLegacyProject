package com.inventoryitem.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "items")
@ApiModel(description = "Class representing an item in the inventory")
public class Item {

	@Id
	@Column(name = "ItemId")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ApiModelProperty(notes = "Unique identifier of the item. No two items can have the same number.The database generated it", example = "1")
	private Long _itemNum;

	@Column(name = "ItemName")
	@ApiModelProperty(notes = "Item's name.", example = "My Item")
	private String _itemName;

	@Min(0)
	@Column(name = "ItemAmount")
	@ApiModelProperty(notes = "Item's quantity in stock.Non-negative integer", example = "0")
	private Integer _itemAmount;

	@Column(name = "ItemInventoryCode")
	@ApiModelProperty(notes = "Item's code. Two or more item can have the same code", example = "E1")
	private String _itemInventoryCode;

	public Item() {

	}

	public Item(String itemName, Integer itemAmount, String itemInventoryCode) {
		this._itemName = itemName;
		this._itemAmount = itemAmount;
		this._itemInventoryCode = itemInventoryCode;
	}

	public Long get_itemNum() {
		return _itemNum;
	}

	public void set_itemNum(Long itemNum) {
		this._itemNum = itemNum;
	}

	public String get_itemName() {
		return _itemName;
	}

	public void set_itemName(String itemName) {
		this._itemName = itemName;
	}

	public Integer get_itemAmount() {
		return _itemAmount;
	}

	public void set_itemAmount(Integer itemAmount) {
		this._itemAmount = itemAmount;
	}

	public String get_itemInventoryCode() {
		return _itemInventoryCode;
	}

	public void set_itemInventoryCode(String itemInventoryCode) {
		this._itemInventoryCode = itemInventoryCode;
	}
}
