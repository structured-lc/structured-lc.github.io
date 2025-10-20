### Leetcode 2159 (Medium): Order Two Columns Independently [Practice](https://leetcode.com/problems/order-two-columns-independently)

### Description  
You are given a database table called `Data` with two integer columns: `first_col` and `second_col`, which may include duplicate values.  
The task is to output a table where:
- `first_col` is sorted in **ascending order**,
- `second_col` is sorted in **descending order**,
- both rearrangements are done **independently** (i.e., the ordering of one column does not affect the other).

For each row, output the iᵗʰ-smallest value from `first_col` alongside the iᵗʰ-largest value from `second_col`.

### Examples  

**Example 1:**  
Input:  
```
first_col | second_col
----------|-----------
4         | 2
2         | 3
3         | 1
1         | 4
```  
Output:  
```
first_col | second_col
----------|-----------
1         | 4
2         | 3
3         | 2
4         | 1
```
*Explanation*:  
`first_col` sorted ascending: [1,2,3,4]  
`second_col` sorted descending: [4,3,2,1]  
Combine iᵗʰ element of each for the result.

**Example 2:**  
Input:  
```
first_col | second_col
----------|-----------
5         | 0
9         | -3
-1        | 8
8         | 8
```  
Output:  
```
first_col | second_col
----------|-----------
-1        | 8
5         | 8
8         | 0
9         | -3
```
*Explanation*:  
`first_col`: [-1,5,8,9], `second_col`: [8,8,0,-3]

**Example 3:**  
Input:  
```
first_col | second_col
----------|-----------
1         | 1
1         | 2
1         | 3
1         | 4
```  
Output:  
```
first_col | second_col
----------|-----------
1         | 4
1         | 3
1         | 2
1         | 1
```
*Explanation*:  
Duplicates are kept. `first_col` all 1's; `second_col` sorted as [4,3,2,1].

### Thought Process (as if you’re the interviewee)  
First, the brute-force way is to:
- Sort all values from `first_col` in ascending order.
- Sort all values from `second_col` in descending order.
- For each row, take the iᵗʰ value from the first sorted list and iᵗʰ from the second.

This guarantees both columns are sorted as required and independent.

In SQL, since we can't directly index the results, the common trick is to assign row numbers to both orderings and then "join" them on those row numbers to align in result.  
In Python, we'd:
- Extract all values into two arrays.
- Sort one ascending, one descending.
- Combine via zip() into the result.

This is optimal: both sorts are O(n log n), result construction is O(n).  
There’s no faster way as all values must be sorted.

### Corner cases to consider  
- Table with a single row (should return that row)
- Table with duplicate values in either/both columns
- All values the same
- Negative or zero values
- Empty table (may be specified as not allowed)
- Very large number of rows (efficiency)

### Solution

```python
def order_two_columns_independently(data):
    """
    data: List of [first_col, second_col]
    Returns: List of [first_col(sorted_asc), second_col(sorted_desc)]
    """
    n = len(data)
    if n == 0:
        return []
    
    # Extract columns
    first_col = [row[0] for row in data]
    second_col = [row[1] for row in data]
    
    # Sort columns independently
    first_col_sorted = sorted(first_col)
    second_col_sorted = sorted(second_col, reverse=True)
    
    # Pair corresponding ranks
    result = []
    for i in range(n):
        result.append([first_col_sorted[i], second_col_sorted[i]])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)
    - Both columns are sorted independently: O(n log n) each.
    - Zipping results is O(n).
    - Overall: O(n log n) for n rows.

- **Space Complexity:** O(n)
    - Each column is extracted and stored in an array: O(n) per column.
    - Result array takes O(n).
    - No recursion or extra stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it in SQL?
  *Hint: Row numbering with window functions can help pair sorted results.*

- How would you generalize to k columns, each with specified sort direction?
  *Hint: You’d need an ordering and re-pairing step for each.*

- What if you must do this on a stream of rows (can’t load all in memory)?
  *Hint: Full sorting is impossible; may need approximation or limited buffer.*

### Summary
- The approach splits into "extract, sort both columns independently, pair the ranks."
- This is an example of the **Rank/Row-Number** pattern, frequently used in SQL and analytical data scenarios.  
- This method generalizes easily to more columns and other sorting/pairing combinations.  
- A classic **sorting and pairing** problem with independent column treatment.


### Flashcard
Sort first_col ascending and second_col descending, then align by row number—in SQL, use ROW_NUMBER() and join on the row index.

### Tags
Database(#database)

### Similar Problems
