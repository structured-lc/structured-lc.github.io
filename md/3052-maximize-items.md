### Leetcode 3052 (Hard): Maximize Items [Practice](https://leetcode.com/problems/maximize-items)

### Description  
You are managing a warehouse with a capacity of 500,000 square feet. Each item in the warehouse is classified as either **prime_eligible** or **not_prime**. Given a table `Inventory` containing items, their `item_type`, and the `square_footage` they occupy, determine how to maximize the number of items that can be stored:
- First, fill the warehouse with as many **prime_eligible** items as possible (using all available such items per cycle).
- Then, use the remaining space for as many **not_prime** items as will fit using all their instances per cycle.
Return the number of items of each type that can be stored, with output rows for `'prime_eligible'` first, then `'not_prime'`. Counts must be integers; if not_prime can't fit, its count is 0.

### Examples  

**Example 1:**  
Input:  
Inventory =  
| item_id | item_type      | item_category | square_footage |  
|---------|---------------|--------------|----------------|  
|   1     | prime_eligible| electronics  |     2000       |  
|   2     | prime_eligible| books        |     3000       |  
|   3     | not_prime     | clothes      |     5000       |  
|   4     | not_prime     | shoes        |     7000       |  
Output:  
| item_type      | item_count |  
|----------------|------------|  
| prime_eligible |      166   |  
| not_prime      |       28   |  
Explanation.  
- Total square footage for prime_eligible: 2000 + 3000 = 5000  
- Fill as many full sets of both primes as possible: ⌊500,000 / 5000⌋ = 100 cycles  
- Each cycle uses 2 prime_eligible items, so total: 2 × 100 = 200  
- Space used: 100 × 5000 = 500,000  
- No space remains, so not_prime items: 0

**Example 2:**  
Input:  
Inventory =  
| item_id | item_type      | item_category | square_footage |  
|---------|---------------|--------------|----------------|  
|   1     | prime_eligible| toys         |     4000       |  
|   2     | not_prime     | decor        |     6000       |  
Output:  
| item_type      | item_count |  
|----------------|------------|  
| prime_eligible |     125    |  
| not_prime      |      20    |  
Explanation.  
- Prime total area: 4000, so ⌊500,000 / 4000⌋ = 125 cycles  
- Space used: 125 × 4000 = 500,000  
- No leftover, not_prime: 0

**Example 3:**  
Input:  
Inventory =  
| item_id | item_type      | item_category | square_footage |  
|---------|---------------|--------------|----------------|  
|   1     | prime_eligible| electronics  |     12000      |  
|   2     | not_prime     | clothes      |     5000       |  
Output:  
| item_type      | item_count |  
|----------------|------------|  
| prime_eligible |     41     |  
| not_prime      |     8      |  
Explanation.  
- Prime cycles: ⌊500,000 / 12,000⌋ = 41 cycles  
- Used: 492,000  
- Left: 8,000  
- Each not_prime uses 5,000, so ⌊8,000 / 5,000⌋ = 1  
- Items: 41 prime_eligible, 1 not_prime

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible number of prime_eligible combinations, and for each, try every count of not_prime. This is O(warehouse_size / min(square_footage)), which is infeasible.
- **Optimization:** Since we must maximize prime_eligible first, fill with as many prime_eligible sets as possible.  
  - For prime_eligible: Calculate total square footage for all such items.  
  - Determine cycles: ⌊500,000 / total_prime_sqft⌋  
  - Used_space = cycles × total_prime_sqft  
  - Remaining space = 500,000 - used_space  
  - For not_prime: Using remaining space, calculate total square footage required for one set, and fit as many as possible cycles: ⌊remaining / total_notprime_sqft⌋  
  - Multiply by item count for each type and return.
- **Trade-offs:** This is essentially a greedy approach because the requirement is to maximize prime_eligible first. Afterward, greedily fit not_prime.  
- **Why chosen:** Greedy here is optimal because you cannot swap a prime_eligible for a not_prime and get more total items, per the rules.

### Corner cases to consider  
- No prime_eligible or no not_prime items  
- Only 1 type present  
- Square footage for an item is 0 or very large  
- The sum of prime_eligible exceeds warehouse  
- The remaining space after filling all prime_eligible is 0  
- Inventory is empty  
- Multiple items but only one category present

### Solution

```python
def maximize_items(inventory):
    WAREHOUSE_SIZE = 500_000

    prime_items = [row for row in inventory if row['item_type'] == 'prime_eligible']
    notprime_items = [row for row in inventory if row['item_type'] == 'not_prime']

    def get_total_sqft_and_count(items):
        return sum(item['square_footage'] for item in items), len(items)

    prime_sqft, prime_count = get_total_sqft_and_count(prime_items)
    notprime_sqft, notprime_count = get_total_sqft_and_count(notprime_items)

    # Maximum sets of all prime_eligible
    prime_sets = (WAREHOUSE_SIZE // prime_sqft) if prime_sqft else 0
    used_space = prime_sets * prime_sqft

    # Prime items stored = sets × number of prime items
    total_prime_items = prime_sets * prime_count

    # For not_prime, with the remaining space
    remain_space = WAREHOUSE_SIZE - used_space

    notprime_sets = (remain_space // notprime_sqft) if notprime_sqft else 0
    total_notprime_items = notprime_sets * notprime_count

    result = [
        {"item_type": "prime_eligible", "item_count": total_prime_items},
        {"item_type": "not_prime", "item_count": total_notprime_items}
    ]
    return result

# Example usage:
# inventory = [
#     {"item_id": 1, "item_type": "prime_eligible", "item_category": "electronics", "square_footage": 2000},
#     {"item_id": 2, "item_type": "prime_eligible", "item_category": "books", "square_footage": 3000},
#     {"item_id": 3, "item_type": "not_prime", "item_category": "clothes", "square_footage": 5000},
#     {"item_id": 4, "item_type": "not_prime", "item_category": "shoes", "square_footage": 7000},
# ]
# maximize_items(inventory)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of items in the inventory. This is because we only process the list twice to sum areas and count items.
- **Space Complexity:** O(1) extra (aside from input), since we only store a few variables and lists by type, but no extra data proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could mix-and-match individual items, not just sets?  
  *Hint: Now you need a variant of the knapsack problem, which is NP-hard.*

- What if the warehouse size changes frequently — how to optimize repeated queries?  
  *Hint: Pre-process by item type; use prefix sums for fast queries.*

- If item square_footage can be fractional/decimal, what precision issues arise?  
  *Hint: Watch for floating-point errors. Consider integer arithmetic or scaling up by a power of 10.*

### Summary
This problem is a **structured greedy allocation** with grouping constraint: maximize prime_eligible in sets, then fill with sets of not_prime. It’s not a classic knapsack; the grouping makes simple math and set-based counting optimal. The pattern shows up in warehouse loading, container shipping, and resource allocation with batch priorities. More complex variants (mixing types, picking any quantity per item) move to true knapsack/dynamic programming.


### Flashcard
Maximize prime_eligible items first: calculate cycles = ⌊500,000 / total_prime_sqft⌋; fill remaining space with not_prime items.

### Tags
Database(#database)

### Similar Problems
