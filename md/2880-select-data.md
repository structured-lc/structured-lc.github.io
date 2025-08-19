### Leetcode 2880 (Easy): Select Data [Practice](https://leetcode.com/problems/select-data)

### Description  
Given a DataFrame `students` with columns `student_id`, `name`, and `age`, extract the **name** and **age** columns for the row where `student_id` is 101.  
Return a DataFrame with only these columns and only the matching row.

### Examples  

**Example 1:**  
Input: `students = [[101, "Alice", 23], [102, "Bob", 19]]`  
Output:  
```
  name   age
0 Alice  23
```
*Explanation: Only the student with student_id=101 is selected; we return "name" and "age" columns for Alice.*

**Example 2:**  
Input: `students = [[105, "Tom", 27], [101, "Jerry", 21], [106, "Anna", 18]]`  
Output:  
```
   name   age
0 Jerry  21
```
*Explanation: Jerry's student_id matches 101, so only his name and age are included.*

**Example 3:**  
Input: `students = [[103, "Sam", 22]]`  
Output:  
```
Empty DataFrame
Columns: [name, age]
Index: []
```
*Explanation: No student with id=101, so an empty DataFrame with "name" and "age" columns is returned.*

### Thought Process (as if you’re the interviewee)  
The core of this problem is a simple **filtering and projection** task, analogous to an SQL query:  
`SELECT name, age FROM students WHERE student_id = 101`

**Brute-force idea:**  
- Iterate through each row.
- If `student_id == 101`, extract "name" and "age".

However, in pandas, this is elegantly handled by:
- **Filtering:** `students['student_id'] == 101` gives a boolean mask.
- **Projection:** Specify columns: `[['name', 'age']]`.

Combining both:  
- Index first by rows (filter mask), then by columns—done in a single line.

This approach is very readable, idiomatic, and *O(n)*, with *n* the number of rows.

### Corner cases to consider  
- **No student with id 101:** Should return empty DataFrame with "name" and "age" columns.
- **Multiple entries with id 101:** Should include all of them.
- **Columns in different order in DataFrame:** Always select `[name, age]`.
- **Empty DataFrame:** Still return correct structure (empty).
- **DataFrame already only with one row and columns:** Still must use proper selection logic.
- **Input DataFrame missing required columns:** Problem statement assumes columns always exist.

### Solution

```python
import pandas as pd

def selectData(students: pd.DataFrame) -> pd.DataFrame:
    # Filter to only those rows where 'student_id' is 101
    mask = students['student_id'] == 101
    # Select only the 'name' and 'age' columns for these rows
    result = students.loc[mask, ['name', 'age']]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each row is checked once for filtering. Selecting two columns is O(1) per row.

- **Space Complexity:** O(k)  
  Where k is the number of rows with student_id=101. We only keep the filtered rows and selected columns as output. No extra space is used otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- If the DataFrame is very large, how can you optimize for performance?  
  *Hint: Think about DataFrame indices and chunked reading.*

- How would you generalize to selecting all students in a list of IDs?  
  *Hint: Use `.isin()` for filtering.*

- What if column names are dynamic, or unknown in advance?  
  *Hint: Check DataFrame columns using `students.columns` before selecting.*

### Summary
This problem demonstrates the classic "filter and project" pattern in data manipulation, directly analogous to SQL's selection and projection.  
It is a fundamental pandas/dataframe operation, appearing everywhere data is queried by value and specific columns are needed—such as filtering user logs, extracting features, or preparing datasets for modeling.

### Tags

### Similar Problems
