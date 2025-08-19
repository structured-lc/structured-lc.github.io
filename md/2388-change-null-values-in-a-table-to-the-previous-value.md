### Leetcode 2388 (Medium): Change Null Values in a Table to the Previous Value [Practice](https://leetcode.com/problems/change-null-values-in-a-table-to-the-previous-value)

### Description  
Given a SQL table `CoffeeShop` with columns `id` (an int, not in order) and `drink` (nullable string), update (output) the table so that every `NULL` in the `drink` column is replaced with the most recent non-NULL `drink` above it when sorted by `id` ascending. If there is no previous value, the NULL stays as is. Return the table with updated values.

### Examples  

**Example 1:**  
Input:  
```
id   drink
9    'Rum and Coke'
6    NULL
7    NULL
3    'St Germain Spritz'
1    'Orange Margarita'
2    NULL
```
Output:  
```
id   drink
1    'Orange Margarita'
2    'Orange Margarita'
3    'St Germain Spritz'
6    'St Germain Spritz'
7    'St Germain Spritz'
9    'Rum and Coke'
```
*Explanation: Sort by id ascending; fill NULLs with most recent previous non-NULL drink. id=2 takes value from id=1, ids 6 and 7 take from id=3.*

**Example 2:**  
Input:  
```
id   drink
1    NULL
2    'Coffee'
3    NULL
4    NULL
5    'Tea'
```
Output:  
```
id   drink
1    NULL
2    'Coffee'
3    'Coffee'
4    'Coffee'
5    'Tea'
```
*Explanation: id=1 remains NULL (no previous non-NULL), id=3 and id=4 get drink from id=2. id=5 is non-NULL itself.*

**Example 3:**  
Input:  
```
id   drink
1    NULL
2    NULL
3    NULL
```
Output:  
```
id   drink
1    NULL
2    NULL
3    NULL
```
*Explanation: All values are NULL, so nothing changes.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** For each row, sort all rows by id, then for every NULL, scan backwards to find the most recent non-NULL drink. This is O(n²), inefficient.
- **Better Approach:** As we traverse the rows in order by id:
  - Maintain a variable `last_drink` initialized as None.
  - For each row:
    - If drink is non-NULL, set `last_drink` to its value.
    - If drink is NULL, set `drink` to last_drink if last_drink is not None.
- **Why this works:** Because for each row, we just need the most recent non-NULL value as we traverse in id order—this simulates a "fill down" operation as we go.
- **SQL Perspective:** In SQL, this is solved by using the `LAST_VALUE()` or `MAX()` window function (with filtering), or a recursive CTE to fill the nulls using the most recent previous value.

### Corner cases to consider  
- Table is empty.
- All drinks are non-NULL — nothing changes.
- All drinks are NULL — nothing changes.
- Early rows are NULL until a non-NULL is seen — early rows remain NULL.
- Multiple consecutive NULLs.
- Unordered IDs or missing IDs — must not assume contiguous order.

### Solution

```python
def fill_previous_nulls(rows):
    """
    Given a list of tuples (id, drink), return list sorted by id,
    with NULLs (None) in drink replaced with previous non-NULL value in id order.
    """
    # Sort rows by id ascending
    rows.sort(key=lambda x: x[0])
    
    last_drink = None
    result = []
    
    for row in rows:
        id, drink = row
        if drink is not None:
            last_drink = drink
            result.append((id, drink))
        else:
            if last_drink is not None:
                result.append((id, last_drink))
            else:
                result.append((id, None))
    return result

# Example usage:
rows = [
    (9, 'Rum and Coke'),
    (6, None),
    (7, None),
    (3, 'St Germain Spritz'),
    (1, 'Orange Margarita'),
    (2, None),
]
print(fill_previous_nulls(rows))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting by id. The subsequent pass is O(n).
- **Space Complexity:** O(n) extra for the result list. No recursion or extra data structures beyond output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you could not sort in memory (huge data)?
  *Hint: Stream through sorted data or process in-place with generators.*

- If drinks are grouped (e.g., by user id), how would you apply the fill only within each group?
  *Hint: Reset last_drink for each group id.*

- How would you do this in pure SQL if your RDBMS doesn't support window functions?
  *Hint: Use recursive CTE or correlated subquery.*

### Summary
This problem is a classic example of the "forward fill" (or "last observation carried forward") data cleaning pattern. The efficient solution involves a single pass after sorting, storing the most recent non-NULL value. The core coding pattern (tracking last relevant value across a sorted sequence) is widely used in data streaming, time series, and log parsing problems. Variations of this are common in SQL, Pandas, and ETL pipelines.

### Tags
Database(#database)

### Similar Problems
