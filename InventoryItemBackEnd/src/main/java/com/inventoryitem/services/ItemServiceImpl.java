package com.inventoryitem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.inventoryitem.models.Item;
import com.inventoryitem.repository.ItemRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	// Using simple CRUD methods of the JpaRepository
	private ItemRepository itemRepo;

	private Optional<Item> item;

	private Integer itemCurrQuantity;

	// Find item by number (present the item ID)
	@Override
	public Optional<Item> findItemByNum(Long itemNum) {

		return itemRepo.findById(itemNum);
	}

	// Update the item's quantity correspondingly to the number of items to be
	// withdraw
	@Override
	public Item withdrawItemAmount(Long itemNum, Integer amountToWithdraw) {

		item = findItemByNum(itemNum);

		if (item != null) {

			itemCurrQuantity = item.get().get_itemAmount();

			// Checking if there is enough items to withdraw
			if (itemCurrQuantity >= amountToWithdraw) {

				item.get().set_itemAmount(itemCurrQuantity - amountToWithdraw);

				itemRepo.save(item.get());

			}

			return item.get();
		}

		return null;

	}

	// Update the item's quantity correspondingly to the number of items to be
	// deposit
	@Override
	public Item depositItemAmount(Long itemId, Integer amountToDeposit) {

		item = findItemByNum(itemId);

		if (item != null) {

			itemCurrQuantity = item.get().get_itemAmount();

			item.get().set_itemAmount(itemCurrQuantity + amountToDeposit);

			itemRepo.save(item.get());

			return item.get();
		}
		
		return null;

	}

	// Add new item to the DB
	@Override
	public Item addItemToStock(Item item) {
		return itemRepo.save(item);
	}

	// Update existing item
	@Override
	public Item updateItem(Item item) {
		return itemRepo.save(item);
	}

	// Retrieve all the items in the DB
	@Override
	public List<Item> getAllItems() {

		List<Item> items = new ArrayList<>();

		if (items != null) {

			itemRepo.findAll().forEach(items::add);
			items = Lists.reverse(items);
		}

		return items;
	}

	// Remove item from the DB
	@Override
	public int removeItemFromStock(Long itemId) {

		item = findItemByNum(itemId);

		if (item != null) {

			itemRepo.delete(item.get());

		}

		return 0;

	}
}
