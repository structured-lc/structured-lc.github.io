### Leetcode 1484 (Easy): Group Sold Products By The Date [Practice](https://leetcode.com/problems/group-sold-products-by-the-date)

### Description  
Given a table of product sales activities, each record includes a date, a product name, and possibly other information. For every unique date, you must find:
- The number of unique products sold on that date ('num_sold').
- The sorted list of the unique products sold on that date ('products').

Return the result as one row per date, with these columns: `sell_date`, `num_sold`, `products` (an array of product names).

### Examples  

**Example 1:**  
Input: `Activities = [["2020-05-30", "Headphone"], ["2020-06-01", "Pencil"], ["2020-06-02", "Mask"], ["2020-05-30", "Basketball"], ["2020-06-01", "Bible"], ["2020-06-02", "Mask"]]`  
Output:  
```
[
 ["2020-05-30", 2, ["Basketball", "Headphone"]],
 ["2020-06-01", 2, ["Bible", "Pencil"]],
 ["2020-06-02", 1, ["Mask"]]
]
```  
*Explanation: 
- 2020-05-30: Sold Basketball, Headphone (2 products)
- 2020-06-01: Sold Bible, Pencil (2 products)
- 2020-06-02: Only Mask sold (1 product)*

**Example 2:**  
Input: `Activities = [["2021-01-01", "Book"], ["2021-01-01", "Pen"], ["2021-01-01", "Book"]]`  
Output:  
```
[
 ["2021-01-01", 2, ["Book", "Pen"]]
]
```
*Explanation: Unique products are Book and Pen, in sorted order.*

**Example 3:**  
Input: `Activities = [["2022-10-10", "Laptop"]]`  
Output:  
```
[
 ["2022-10-10", 1, ["Laptop"]]
]
```
*Explanation: Only one product was sold on that date.*

### Thought Process (as if you’re the interviewee)  
- First, note we need to group rows by date.
- For each date, gather a set (to eliminate duplicates) of product names.
- Count the number of unique products for that date ('num_sold').
- Sort the product names to meet the required output format.
- Output one row per date.
  
For SQL, this is a classic GROUP BY date. To get the products, use GROUP_CONCAT (MySQL) or equivalent array aggregation, sorting, and DISTINCT inside aggregation.

### Corner cases to consider  
- Repeated product names for the same date (should not be double counted).
- Single entry in Activities.
- All sales on one day.
- Product names with identical spelling but different case (depends on whether case-sensitive).
- Empty Activities table (should return empty result).

### Solution

```python
# Solution assumes input as a list of [sell_date, product] pairs
from collections import defaultdict

def group_sold_products_by_date(activities):
    # Dictionary: date -> set of products
    date_to_products = defaultdict(set)
    
    # Build mapping from date to set of unique products
    for sell_date, product in activities:
        date_to_products[sell_date].add(product)

    # Prepare result list in order by date
    result = []
    for sell_date in sorted(date_to_products.keys()):
        products = sorted(date_to_products[sell_date])
        num_sold = len(products)
        result.append([sell_date, num_sold, products])
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N × log K), where N = number of input rows and K = max number of products sold on a day. Inserting is O(1), iterating over each date and sorting the set for each date contributes log K per date.
- **Space Complexity:** O(N), as all input activities and product name groupings are stored in memory.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you scale this for millions of activity records?  
  *Hint: Use database aggregation functions and appropriate indexes on date.*
- How would you handle case-sensitive vs. case-insensitive product names?  
  *Hint: Normalize names before grouping, or use COLLATE in SQL.*
- How do you write this query in SQL?  
  *Hint: GROUP BY, COUNT(DISTINCT product), use GROUP_CONCAT or ARRAY_AGG.*

### Summary
This is a classic "group by and aggregate" pattern. The key is to group records by the target attribute (here, sell date), collect unique values, and emit aggregate outputs per group. This SQL/data-table aggregation problem is common and applies to analytics, dashboards, and reporting use-cases.


### Flashcard
Group by date, collect unique product names per date (set or SQL GROUP_CONCAT/DISTINCT), count them, and sort product names for output.

### Tags
Database(#database)

### Similar Problems
- Finding the Topic of Each Post(finding-the-topic-of-each-post) (Hard)