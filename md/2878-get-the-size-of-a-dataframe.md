### Leetcode 2878 (Easy): Get the Size of a DataFrame [Practice](https://leetcode.com/problems/get-the-size-of-a-dataframe)

### Description  
You are given a pandas DataFrame called `players`, representing some tabular data (for example, it may contain player IDs, names, ages, etc). Write a function that returns a list with two integers: the number of rows and the number of columns of that DataFrame. For example, if the DataFrame has 5 rows and 3 columns, your function should return `[5, 3]`.

### Examples  

**Example 1:**  
Input: `players` contains  
```
player_id | name   | age
-------------------------
1         | Alice  | 23
2         | Bob    | 30
3         | Carol  | 27
```
Output: `[3, 3]`  
*Explanation: DataFrame has 3 rows and 3 columns.*

**Example 2:**  
Input: `players` contains  
```
player_id | name
----------------
4         | Dave
5         | Eva
```
Output: `[2, 2]`  
*Explanation: 2 rows, 2 columns.*

**Example 3:**  
Input: `players` is an empty DataFrame with headers only  
```
player_id | name | age
```
Output: `[0, 3]`  
*Explanation: 0 rows, 3 columns.*

### Thought Process (as if you’re the interviewee)  
The task asks for the dimensions of a pandas DataFrame.  
- The most direct way is to use the DataFrame's `.shape` attribute, which provides a tuple `(num_rows, num_cols)`.
- Since the problem expects a list, convert the tuple to a list before returning.
- For robustness, ensure the function always returns exactly two elements, even for empty DataFrames (e.g., 0 rows, but N columns).
- This is the optimal solution since `.shape` is a constant-time property lookup.

### Corner cases to consider  
- DataFrame has zero rows (empty, but columns exist).
- DataFrame has zero columns (all columns dropped, but could have rows).
- DataFrame is completely empty (no rows, no columns).
- DataFrame has only one row or one column.
- Columns with complex objects (should not affect output: only count).

### Solution

```python
# Function to return the number of rows and columns in a pandas DataFrame

def getDataframeSize(players):
    # The .shape property gives a tuple: (number of rows, number of columns)
    # Convert it to list for the required output
    return list(players.shape)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Accessing `.shape` on a pandas DataFrame is a metadata lookup, done in constant time.

- **Space Complexity:** O(1)  
  Only a small, fixed-size list is returned; no extra storage is used relative to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return the names of the columns as well?  
  *Hint: Try accessing the DataFrame’s `.columns` attribute.*

- How would you handle multi-index DataFrames?  
  *Hint: Examine the difference between `.shape` and `.index`.*

- How would you return the size for a NumPy array or a plain Python list of lists?  
  *Hint: Think about using `len()` for rows and columns in other data structures.*

### Summary
This is a direct metadata query pattern, commonly used with pandas DataFrames.
The main concept is accessing `.shape`.   
This is a simple example of using built-in data structure properties to efficiently obtain structural metadata, and the approach generalizes to other data containers (arrays, matrices, lists of lists) where size information is readily available.


### Flashcard
Use DataFrame.shape to get (rows, cols) and convert to a list for the DataFrame’s size.

### Tags

### Similar Problems
