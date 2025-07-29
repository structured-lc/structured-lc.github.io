### Leetcode 2879 (Easy): Display the First Three Rows [Practice](https://leetcode.com/problems/display-the-first-three-rows)

### Description  
Given a DataFrame called `employees`, write a function to return only the first three rows of this DataFrame. The DataFrame represents employee records and may have any number of columns. Your goal is to extract and return the first three entries, preserving the column structure.

### Examples  

**Example 1:**  
Input:  
employees =  
| employee_id | name   | department  | salary |  
|-------------|--------|-------------|--------|  
| 1           | Alice  | Engineering | 70000  |  
| 2           | Bob    | Marketing   | 60000  |  
| 3           | Charlie| Sales       | 50000  |  
| 4           | Dana   | HR          | 80000  |  
| 5           | Eve    | Engineering | 90000  |  
Output:  
| employee_id | name   | department  | salary |  
|-------------|--------|-------------|--------|  
| 1           | Alice  | Engineering | 70000  |  
| 2           | Bob    | Marketing   | 60000  |  
| 3           | Charlie| Sales       | 50000  |  
*Explanation: Returns the first 3 rows of the DataFrame as required.*

**Example 2:**  
Input:  
employees =  
| id | name     | salary |  
|----|----------|--------|  
| 1  | John     | 50000  |  
| 2  | Jane     | 60000  |  
| 3  | Doe      | 70000  |  
Output:  
| id | name  | salary |  
|----|-------|--------|  
| 1  | John  | 50000  |  
| 2  | Jane  | 60000  |  
| 3  | Doe   | 70000  |  
*Explanation: Total rows = 3, so the output is the entire DataFrame.*

**Example 3:**  
Input:  
employees =  
| id | name     | salary |  
|----|----------|--------|  
| 1  | John     | 50000  |  
| 2  | Jane     | 60000  |  
Output:  
| id | name  | salary |  
|----|-------|--------|  
| 1  | John  | 50000  |  
| 2  | Jane  | 60000  |  
*Explanation: Only two rows available, so return the entire DataFrame as is.*

### Thought Process (as if you’re the interviewee)  
- The problem asks for the first 3 rows of a DataFrame.
- The brute-force approach would be to iterate through the DataFrame and collect the first 3 rows manually, but that's inefficient and unnecessary since pandas provides a built-in method.
- The optimal approach is to use the `.head(3)` method, which directly returns the first 3 rows.  
- `.head(3)` is efficient, concise, and handles edge cases (e.g., if there are fewer than 3 rows) since it returns as many rows as available, up to 3.
- This solution has no practical trade-offs here: readability and efficiency are both optimal.

### Corner cases to consider  
- The DataFrame has fewer than 3 rows (0, 1, or 2 rows): function should return all available rows without error.
- DataFrame has exactly 3 rows: whole DataFrame should be returned.
- DataFrame is empty: should return an empty DataFrame, preserving column headers.
- DataFrame with more than 3 rows: only first 3 should appear.
- DataFrame could have columns in any order or type.

### Solution

```python
import pandas as pd

def selectFirstRows(employees: pd.DataFrame) -> pd.DataFrame:
    # Return the first 3 rows, or as many as available if less than 3
    return employees.head(3)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  The method `.head(3)` is a constant-time operation on the DataFrame's representation; it does not require scanning or copying the entire DataFrame, just the first 3 rows.
- **Space Complexity:** O(1) auxiliary, O(k) output where k = min(3, n)  
  Only the first 3 rows' worth of data are returned; no additional storage is used beyond the required output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return the first n rows, where n is a user input?
  *Hint: Consider parameterizing the head() function argument.*

- How could you display the last three rows instead?
  *Hint: Check if pandas provides a function that gets last rows instead of first rows.*

- If the DataFrame is huge, how does this scale for distributed or chunked data?
  *Hint: Think about partitioned or streamed DataFrames in pandas or other ecosystems like Spark.*

### Summary
This problem is a straightforward use of the pandas `.head()` method to select the first k rows of a DataFrame. It's a fundamental operation in data exploration and preprocessing, and the same pattern is widely applicable for tasks like data sampling, previewing content, and batch processing in ETL pipelines.