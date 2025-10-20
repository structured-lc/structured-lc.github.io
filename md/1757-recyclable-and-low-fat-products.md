### Leetcode 1757 (Easy): Recyclable and Low Fat Products [Practice](https://leetcode.com/problems/recyclable-and-low-fat-products)

### Description  
Given a table `Products` with columns `product_id`, `low_fats`, and `recyclable`, both of which are strings with possible values 'Y' (yes) or 'N' (no), return the IDs of all products that are **both low fat** (`low_fats = 'Y'`) **and recyclable** (`recyclable = 'Y'`). The result order does not matter.

### Examples  

**Example 1:**  
Input:  
Products =  
| product_id | low_fats | recyclable |
|------------|----------|------------|
|     0      |    Y     |     N      |
|     1      |    Y     |     Y      |
|     2      |    N     |     Y      |
|     3      |    Y     |     Y      |
|     4      |    N     |     N      |

Output:  
| product_id |
|------------|
|     1      |
|     3      |

*Explanation: Products 1 and 3 are both low fat and recyclable. The order does not matter.*

**Example 2:**  
Input:  
Products =  
| product_id | low_fats | recyclable |
|------------|----------|------------|
|     10     |    Y     |     N      |
|     20     |    N     |     Y      |
|     30     |    N     |     N      |

Output:  
(no rows)

*Explanation: No product is both low fat and recyclable.*

**Example 3:**  
Input:  
Products =  
| product_id | low_fats | recyclable |
|------------|----------|------------|
|     5      |    Y     |     Y      |

Output:  
| product_id |
|------------|
|     5      |

*Explanation: The only product meets both criteria, so we return it.*

### Thought Process (as if you’re the interviewee)  
- First, I would review the schema: for each product, we know if it is low fat ('Y'/'N') and recyclable ('Y'/'N').
- The task is filtering rows where both `low_fats` is 'Y' **and** `recyclable` is 'Y'.
- A brute-force approach is to check each row and manually select those matching both conditions.
- In SQL, we efficiently express this with a `WHERE` clause checking both columns.
- There’s no optimization to do beyond this, as it’s a simple filter—this is O(n) in database terms, and can use indexes if present.
- The final approach is to select `product_id` from `Products` where `low_fats = 'Y'` and `recyclable = 'Y'`.

### Corner cases to consider  
- No rows in table: Should return empty result.
- All rows satisfy the condition: All IDs should be returned.
- No rows satisfy the condition: Return empty result.
- Single row in table: Works regardless of the row’s values.
- Unexpected enum values (should not happen per constraints): Data cleanliness.

### Solution

```python
# As this is a SQL problem, here's how you would approach it step-by-step in SQL:
# The equivalent Python idea would be to filter a list of dicts.

def recyclable_and_low_fat_products(products):
    """
    products: List of dicts, each like {'product_id': int, 'low_fats': str, 'recyclable': str}
    Returns: List of product_ids that are both low fat and recyclable
    """
    result = []
    for row in products:
        # Check both conditions
        if row['low_fats'] == 'Y' and row['recyclable'] == 'Y':
            result.append(row['product_id'])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in Products. Each row is checked once.
- **Space Complexity:** O(k), where k is the number of qualifying rows (for output storage). No extra space apart from the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the column values could be other than 'Y' or 'N'?  
  *Hint: Consider data validation or normalization.*

- How would you optimize this query if the table was huge?  
  *Hint: Indexes on low_fats and recyclable columns could help.*

- Can we return product_id in sorted order?  
  *Hint: Add an ORDER BY clause if required.*

### Summary
This problem is a straightforward example of **filtering rows based on multiple conditions**, applicable in almost any scenario where multiple boolean attributes dictate selection. The coding pattern is a standard database selection with `AND` filters, also mirrored in Python with simple list/dictionary iteration. This pattern is common in CRUD applications, data reporting, and anything involving attribute-based filtering.


### Flashcard
Filter rows where both low_fats and recyclable are 'Y'—simple SQL WHERE clause suffices.

### Tags
Database(#database)

### Similar Problems
