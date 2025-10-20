### Leetcode 1418 (Medium): Display Table of Food Orders in a Restaurant [Practice](https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant)

### Description  
Given a list of food orders at a restaurant, each order contains the customer name, table number, and a food item. Your task is to display a table where:
- Each row corresponds to a table number (as integer, sorted ascending).
- Each column after the first is a food item (sorted lexicographically).
- Each cell shows how many of that food was ordered at the table.

### Examples  
**Example 1:**  
Input: `orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]`
Output: `[
  ["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],
  ["3","0","2","1","0"],
  ["5","0","1","0","1"],
  ["10","1","0","0","0"]
]`
*Explanation: Food names sorted lex, tables sorted. Each food count per table filled.*

**Example 2:**  
Input: `[ ["James", "12", "Fried Chicken"] ]`
Output: `[["Table", "Fried Chicken"], ["12", "1"]]`

*Explanation: Single table and food output.*

**Example 3:**  
Input: `[]`
Output: `[["Table"]]`
*Explanation: No orders means only header row.*


### Thought Process (as if you’re the interviewee)  
- First, scan all orders to collect all food names and table numbers. 
- Sorting food names lexicographically gives us columns. Table numbers, when sorted numerically, are the rows.
- Use a mapping structure (dict of dicts) to accumulate counts: map[table][food] = count.
- Prepare the header row. Then, for each table (in order), output food counts in the sorted order for each column.
- Handle edge case: empty orders list (output header only).

### Corner cases to consider  
- No orders at all
- Multiple orders of the same food at the same table
- All tables have the same number or all foods are the same
- Non-consecutive table numbers
- Food names with special characters

### Solution

```python
from collections import defaultdict

def displayTable(orders):
    # Collect food names and table numbers
    food_set = set()
    table_set = set()
    count = defaultdict(lambda: defaultdict(int))
    for customer, table, food in orders:
        food_set.add(food)
        table_set.add(int(table))
        count[int(table)][food] += 1
    # Sort food names lex and table numbers ascending
    food_list = sorted(food_set)
    table_list = sorted(table_set)
    # Build header
    res = []
    header = ["Table"] + food_list
    res.append(header)
    # Fill counts per table
    for table in table_list:
        row = [str(table)]
        for food in food_list:
            row.append(str(count[table].get(food, 0)))
        res.append(row)
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N × F + T × F), where N is the number of orders, F is the number of unique foods, T is the number of unique tables. N to process all orders, F to sort foods, T × F to build the table.
- **Space Complexity:** O(F + T + T × F), for foods, tables and the table grid.

### Potential follow-up questions (as if you’re the interviewer)  
- How to handle very large numbers of orders efficiently?  
  *Hint: Can we process output iteratively or with streaming?*
- What if food names or table numbers aren't unique or have formatting issues?  
  *Hint: Should we sanitize or validate inputs?*
- Can we output only nonzero counts to save space?  
  *Hint: How to change data structure for sparse data?*

### Summary
The solution applies hashmap counting and two-level sorting to tabulate counts. The pattern of counting, sorting, and table output is common in interview questions involving data grouping and tabular summaries. This can be adapted for problems requiring group-by and count operations.


### Flashcard
Use a mapping structure to accumulate food counts per table, sorting food names lexicographically and table numbers numerically.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting), Ordered Set(#ordered-set)

### Similar Problems
