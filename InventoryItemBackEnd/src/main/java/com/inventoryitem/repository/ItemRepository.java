package com.inventoryitem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.inventoryitem.models.Item;

/**
 * JpaRepository interface provides CRUD functionality for the 'Item' entity
 * class that is being managed
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
