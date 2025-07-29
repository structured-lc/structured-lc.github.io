### Leetcode 2888 (Easy): Reshape Data: Concatenate [Practice](https://leetcode.com/problems/reshape-data-concatenate)

### Description  
Given two DataFrames `df1` and `df2` with the same columns, concatenate them vertically so that the resulting DataFrame has all the rows from `df1` followed by all the rows from `df2`. You must preserve the original order of rows and columns.

### Examples  

**Example 1:**  
Input:  
```
df1 =
+----+-----+
| id | val |
+----+-----+
|  1 |  2  |
|  3 |  4  |
+----+-----+

df2 =
+----+-----+
| id | val |
+----+-----+
|  5 |  6  |
|  7 |  8  |
+----+-----+
```
Output:  
```
+----+-----+
| id | val |
+----+-----+
|  1 |  2  |
|  3 |  4  |
|  5 |  6  |
|  7 |  8  |
+----+-----+
```
*Explanation: Vertically concatenate the two tables, one after the other, rows from df2 directly below rows from df1.*

**Example 2:**  
Input:  
```
df1 =
+----+-----+
| id | val |
+----+-----+
| 11 | 12  |
+----+-----+

df2 =
+----+-----+
| id | val |
+----+-----+
| 13 | 14  |
+----+-----+
```
Output:  
```
+----+-----+
| id | val |
+----+-----+
| 11 | 12  |
| 13 | 14  |
+----+-----+
```
*Explanation: The single row from df2 is appended after the single row from df1.*

**Example 3:**  
Input:  
```
df1 =
+----+-----+
| id | val |
+----+-----+
(empty)

df2 =
+----+-----+
| id | val |
+----+-----+
| 21 | 22  |
| 23 | 24  |
+----+-----+
```
Output:  
```
+----+-----+
| id | val |
+----+-----+
| 21 | 22  |
| 23 | 24  |
+----+-----+
```
*Explanation: Only rows from df2 appear, since df1 has no rows.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Copy all rows from df1, then all rows from df2 into a new DataFrame, column order preserved.
- Both DataFrames are guaranteed to have exact same columns (by problem description), so vertical stacking is straightforward.
- No need to sort or process columns—just maintain order.
- The concatenation should preserve the original index only if specified; often the result resets the index for cleanliness unless otherwise required.
- This solution is efficient since DataFrame concatenation (row-wise) is an O(m+n) operation, where m and n are the number of rows in df1 and df2.

### Corner cases to consider  
- Either `df1` or `df2` is empty (but not both).
- Both `df1` and `df2` are empty.
- DataFrames have only one row.
- DataFrames have very many rows (stress large input).
- Columns are present in different order (should never occur if constraint holds).

### Solution

```python
def concatenateTables(df1, df2):
    # Assuming df1 and df2 are lists of dicts, like [{col1: val1, col2: val2}, ...]
    # Create a new result list
    result = []
    
    # Add each row from df1 to the result
    for row in df1:
        result.append(row)
    
    # Add each row from df2 to the result
    for row in df2:
        result.append(row)
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m is the number of rows in df1 and n in df2. Each row is visited once and appended to the output.
- **Space Complexity:** O(m + n), since the output DataFrame/list will have m + n rows, plus minimal extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you concatenate if the columns are not in the same order?
  *Hint: Find a common set of columns, re-align column order, then concatenate.*

- How would you handle duplicate rows during concatenation?
  *Hint: Consider using a set or dictionary to filter out repeated rows.*

- Can you concatenate more than two DataFrames efficiently?
  *Hint: Consider generalizing the function to handle a list of DataFrames.*

### Summary
This problem uses a straightforward *data concatenation* pattern: appending one collection to another. It's a common routine in data preprocessing, merging log sources, or vertically stacking tabular data. The emphasis is on preserving input order and column alignment, and the solution can be generalized for any number of compatible tables.