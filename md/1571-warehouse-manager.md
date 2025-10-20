### Leetcode 1571 (Easy): Warehouse Manager [Practice](https://leetcode.com/problems/warehouse-manager)

### Description  
This problem models a warehouse management system. You're given a set of operations to manage products: add stock, reduce stock for orders, and query for current inventory. Each operation changes or retrieves data for specific product IDs, and your task is to efficiently process a sequence of such operations, ensuring quick updates and queries (like single or bulk add/reduce, and inventory lookup). The challenge is to choose and implement a data structure that handles all these operations efficiently, considering both correctness and performance.

### Examples  

**Example 1:**  
Input: `add(101, 10), add(102, 20), sell(101, 5), get(101)`  
Output: `5`  
*Explanation: Product ID 101 had 10 units, after selling 5, 5 remain. Query returns 5.*

**Example 2:**  
Input: `add(201, 50), sell(201, 50), get(201)`  
Output: `0`  
*Explanation: All stock of product 201 is sold, so query returns 0.*

**Example 3:**  
Input: `add(111, 100), add(112, 150), sell(111, 30), get(112)`  
Output: `150`  
*Explanation: Product 112 was only stocked, never sold, so query returns full quantity.*


### Thought Process (as if you’re the interviewee)  
First, identify that fast update and query per product ID is core. The brute-force approach would be to scan all products for every query, which is clearly inefficient. A hash map (dictionary) structure allows constant average time complexity for add, sell, and get. Since inventories must never go negative, we ensure sells cap at available stock. For a bulk of operations, this provides optimal performance. If queries like maximum or minimum stock were included, we might need more complex structures, but for core get/add/sell, a simple hash map offers the best trade-off.


### Corner cases to consider  
- Selling more than available stock for a product
- Querying a product that was never added (should return 0)
- Adding zero inventory
- Multiple operations for same product
- No products at all


### Solution

```python
class WarehouseManager:
    def __init__(self):
        # product_id → quantity
        self.inventory = {}

    def add(self, product_id: int, amount: int) -> None:
        # add to inventory, default to 0 if not exists
        self.inventory[product_id] = self.inventory.get(product_id, 0) + amount

    def sell(self, product_id: int, amount: int) -> None:
        # only sell up to available quantity
        current = self.inventory.get(product_id, 0)
        self.inventory[product_id] = max(0, current - amount)

    def get(self, product_id: int) -> int:
        # return current inventory, or 0 if not found
        return self.inventory.get(product_id, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per operation (average) for add, sell, get—hashing allows direct access.
- **Space Complexity:** O(n), where n is the number of unique product IDs stored; all data in the inventory dict.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle querying the product with the highest stock?
  *Hint: Consider augmenting the structure with a heap or tracking max as you update.*

- What if you must support rolling back a sequence of operations?
  *Hint: Think about storing operation history or using a stack/undo-log.*

- If you needed to scale for millions of products and support concurrent operations?
  *Hint: Explore sharding, locks or thread-safe collections.*

### Summary
This problem demonstrates a classic **hash map** (dictionary) pattern for stateful updates and queries keyed by a unique identifier. The approach is common for caching, inventory systems, and any scenario requiring fast update and lookup by ID. The solution is simple, scalable, and robust for the basic variant, with lots of room to explore more advanced data structures as requirements grow.


### Flashcard
Use hash map for O(1) inventory operations per product; cap sells at available stock to prevent negatives; queries answered in constant time.

### Tags
Database(#database)

### Similar Problems
