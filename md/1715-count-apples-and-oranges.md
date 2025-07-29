### Leetcode 1715 (Medium): Count Apples and Oranges [Practice](https://leetcode.com/problems/count-apples-and-oranges)

### Description  
Given two database tables:  
- **Boxes:** Each box may contain some apples and oranges, and may be associated to a chest.
- **Chests:** Each chest may contain some apples and oranges.

Each box may directly contain fruit *and/or* be linked to a chest that also contains fruit.  
For each box, you should sum its own fruit, plus its chest’s fruit (if any).  
Compute the **total number of apples and oranges** across all boxes, counting chests only if a box is linked to them.

### Examples  

**Example 1:**  
Input:  
Tables:  
Boxes  
| box_id | chest_id | apple_count | orange_count |  
|--------|----------|-------------|--------------|  
| 1      |   1      |     5       |     3        |  
| 2      |  null    |     2       |     5        |  

Chests  
| chest_id | apple_count | orange_count |  
|----------|-------------|--------------|  
| 1        |     2       |      4       |  

Output: `apple_count = 9, orange_count = 12`  
*Explanation:  
Box 1: 5 apples + 2 from Chest 1 = 7 apples; 3 oranges + 4 = 7 oranges  
Box 2: 2 apples, 5 oranges (no chest)  
Total: Apples = 7 + 2 = 9, Oranges = 7 + 5 = 12*

**Example 2:**  
Input:  
Boxes  
| box_id | chest_id | apple_count | orange_count |  
|--------|----------|-------------|--------------|  
| 3      |   2      |     1       |    0         |  
| 4      |  null    |     6       |    2         |  

Chests  
| chest_id | apple_count | orange_count |  
|----------|-------------|--------------|  
| 2        |     4       |     9        |  

Output: `apple_count = 11, orange_count = 11`  
*Explanation:  
Box 3: 1 + 4 = 5 apples; 0 + 9 = 9 oranges  
Box 4: 6 apples, 2 oranges  
Total: 5 + 6 = 11 apples, 9 + 2 = 11 oranges*

**Example 3:**  
Input:  
Boxes  
| box_id | chest_id | apple_count | orange_count |  
|--------|----------|-------------|--------------|  
| 5      |  null    |    10       |    3         |  

Chests  
(empty table)

Output: `apple_count = 10, orange_count = 3`  
*Explanation:  
Only one box, no chest linked, so total is box’s own fruit.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify the schema:  
- Each box can have apples and oranges on its own and optionally link to a chest by chest_id.
- The chest may also contain apples and oranges.

A brute-force approach is, for each box:
- Sum its own apple and orange counts.
- If it links to a chest, add the chest’s fruit as well.

SQL-wise, we can achieve this using a LEFT JOIN (so boxes without chests aren't lost), then sum:
- apple_count becomes box.apple_count + chest.apple_count (if any, else 0)
- same for oranges.

Final step: Sum these over all boxes.  
This approach handles boxes with and without chests, and deals with missing values using IFNULL or COALESCE.

### Corner cases to consider  
- A box without a chest (chest_id is null).
- A box with chest_id not matching any row in the chest table.
- Chest table is empty.
- Box table is empty (should return 0,0).
- Chest contains 0 fruit.
- Box contains 0 fruit but has a chest with fruit.

### Solution

```python
# This problem is SQL-only on LeetCode. 
# But here’s a step-by-step logic outline simulating the SQL join:

def count_apples_and_oranges(boxes, chests):
    # boxes: list of dicts, each with keys: box_id, chest_id, apple_count, orange_count
    # chests: dict mapping chest_id to {'apple_count': x, 'orange_count': y}
    chest_dict = {}
    for c in chests:
        chest_dict[c['chest_id']] = {'apple_count': c['apple_count'], 'orange_count': c['orange_count']}
    
    total_apples = 0
    total_oranges = 0

    for box in boxes:
        apples = box['apple_count']
        oranges = box['orange_count']
        chest_id = box['chest_id']
        # add chest's fruit if chest_id matches
        if chest_id is not None and chest_id in chest_dict:
            apples += chest_dict[chest_id]['apple_count']
            oranges += chest_dict[chest_id]['orange_count']
        total_apples += apples
        total_oranges += oranges

    return total_apples, total_oranges

# Example usage:
boxes = [
    {'box_id': 1, 'chest_id': 1, 'apple_count': 5, 'orange_count': 3},
    {'box_id': 2, 'chest_id': None, 'apple_count': 2, 'orange_count': 5}
]
chests = [
    {'chest_id': 1, 'apple_count': 2, 'orange_count': 4}
]
print(count_apples_and_oranges(boxes, chests)) # Output: (9, 12)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = number of boxes, m = number of chests.  
  We build a chest lookup dict in O(m), then process all boxes in O(n).  
- **Space Complexity:** O(m) for the chest dictionary used for fast lookup. No extra space needed for output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if one box can be linked to multiple chests, or vice versa?  
  *Hint: Consider many-to-many relationships and join tables.*

- How would you handle counting only unique fruit if a chest is linked by multiple boxes?  
  *Hint: Use sets or track which chests are counted per box.*

- The tables grow very large (millions of rows). How to improve efficiency?  
  *Hint: Indexing on chest_id, denormalization, or MapReduce/distributed approaches.*

### Summary  
This solution uses the classic **left join** and aggregation pattern, a common relational data pattern in SQL and in-memory joins in Python.  
It’s a generic "sum over parent + optional child" pattern, useful in accounting, resource aggregation, and any case with *optional hierarchical linked totals*.  
Understanding joins and aggregation is essential for data-oriented questions.