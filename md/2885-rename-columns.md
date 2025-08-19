### Leetcode 2885 (Easy): Rename Columns [Practice](https://leetcode.com/problems/rename-columns)

### Description  
Given a DataFrame called `students` with columns:  
- `id`: integer
- `first`: string (first name)
- `last`: string (last name)
- `age`: integer  

Rename the columns as follows:  
- `id` → `student_id`
- `first` → `first_name`
- `last` → `last_name`
- `age` → `age_in_years`

The data (rows) should remain unchanged — only the column headers are renamed. Return the updated DataFrame.

### Examples  

**Example 1:**  
Input:  
```plaintext
id  first   last   age
1   Mason   King   6
2   Ava     Wright 7
3   Taylor  Hall   16
4   Georgia Thompson 18
5   Thomas  Moore  10
```
Output:  
```plaintext
student_id  first_name  last_name  age_in_years
1           Mason       King       6
2           Ava         Wright     7
3           Taylor      Hall       16
4           Georgia     Thompson   18
5           Thomas      Moore      10
```
*Explanation: Each column is renamed according to the provided mapping. Data stays the same.*

**Example 2:**  
Input:  
```plaintext
id  first  last  age
1   John   Doe   12
```
Output:  
```plaintext
student_id  first_name  last_name  age_in_years
1           John        Doe        12
```
*Explanation: Single row, columns renamed as required.*

**Example 3:**  
Input:  
```plaintext
id  first  last  age
(empty DataFrame)
```
Output:  
```plaintext
student_id  first_name  last_name  age_in_years
(empty DataFrame)
```
*Explanation: Even if there are no rows, columns must be renamed for compliance.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Manually loop through column names and replace each with the new name; but Pandas provides built-in methods for renaming columns which are safer and faster.
- **Optimized:**  
  Use the `rename` method in Pandas.  
  - Pass a dictionary to the `columns` parameter mapping old names to new.
  - Use `inplace=True` to overwrite the DataFrame columns, or return a new DataFrame if needed.
- **Why this approach:**  
  - No need to modify data; only columns.
  - Direct, safe, fast.
  - No data size or row count affects the O(1) time for column renaming.
  - Readable and maintainable.
  - Minimizes risk of typos or missing columns with an explicit mapping.

### Corner cases to consider  
- DataFrame has no rows (empty table).
- DataFrame has only one row.
- DataFrame already has the required column names (should still work, but nothing changes).
- Extra columns are present (they should be left unchanged).
- One or more expected columns are missing (should raise an error or skip, depending on requirements; but in LeetCode, all columns are present by guarantee).

### Solution

```python
import pandas as pd

def renameColumns(students: pd.DataFrame) -> pd.DataFrame:
    # Define the mapping from old column names to new column names
    column_mapping = {
        'id': 'student_id',
        'first': 'first_name',
        'last': 'last_name',
        'age': 'age_in_years'
    }
    # Use DataFrame.rename to return a new DataFrame with renamed columns
    return students.rename(columns=column_mapping)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Column renaming only updates metadata, not the data itself. It does not depend on the number of rows.
- **Space Complexity:** O(1)  
  Returns a new DataFrame view with same underlying data; only header names are changed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you also need to reorder the columns or drop some?
  *Hint: Consider combining `rename()` with column slicing or `drop()`.*

- How would you handle missing columns or unknown/extra columns safely?
  *Hint: Check presence before renaming, or use `errors='ignore'` if available (not in pandas' rename).*

- How to generalize this for any arbitrary mapping or to multiple DataFrames at once?
  *Hint: Make the mapping a function parameter, or create a helper utility for batch processing.*

### Summary
This problem uses the classic **column renaming pattern** in pandas, an essential data manipulation operation. The approach is direct and leverages built-in library functions, emphasizing data schema transformations over data content changes. This is highly reusable for any schema migration, data cleaning, or ETL process in real-world data engineering tasks.

### Tags

### Similar Problems
