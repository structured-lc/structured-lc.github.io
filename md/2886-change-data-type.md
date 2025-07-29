### Leetcode 2886 (Easy): Change Data Type [Practice](https://leetcode.com/problems/change-data-type)

### Description  
Given a DataFrame students with columns — student_id (int), name (object/string), age (int), and grade (float) — convert the data type of the grade column from float to integer, truncating any decimal part. Return the modified DataFrame.

### Examples  

**Example 1:**  
Input:  
```
student_id  name     age  grade
1           Alice    18   91.5
2           Bob      19   84.0
3           Charlie  20   89.9
```
Output:  
```
student_id  name     age  grade
1           Alice    18   91
2           Bob      19   84
3           Charlie  20   89
```
*Explanation: The grade column is converted from float to integer (decimal truncated).*

**Example 2:**  
Input:  
```
student_id  name  age  grade
10          Zoe   21   72.0
```
Output:  
```
student_id  name  age  grade
10          Zoe   21   72
```
*Explanation: grade 72.0 becomes 72 (int).*

**Example 3:**  
Input:  
```
(student_id  name   age   grade
 -)           --     --    --
```
Output:  
```
(student_id  name   age   grade
 -)           --     --    --
```
*Explanation: For an empty DataFrame, output remains empty, with grade now int type.*

### Thought Process (as if you’re the interviewee)  
The problem is asking for a type conversion for a specific column in a DataFrame, specifically from float to integer for grades.  
- **Naive/Brute-Force Approach:** Iterate over each row, convert the grade value to int, and build a new DataFrame — this is unnecessary with Pandas.  
- **Optimal Approach:** Use the DataFrame's built-in .astype() method, which efficiently casts the desired column to int. This is vectorized and O(n) where n is the number of rows.
- This is robust and handles empty DataFrames and preserves original data (except the grade’s decimal portion, which is truncated by int conversion).

### Corner cases to consider  
- Empty DataFrame (no rows)  
- DataFrame with only one row  
- Grades are all whole numbers already (e.g., 92.0)  
- Grades have negative values  
- Grades have extreme float values (e.g., 1e9)  
- Grades contain NaN (will raise error or result in NaN to int issue)

### Solution

```python
import pandas as pd

def changeDatatype(students: pd.DataFrame) -> pd.DataFrame:
    # Convert the 'grade' column data type to integer
    students['grade'] = students['grade'].astype(int)
    return students
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since .astype(int) applies the conversion over all n rows.
- **Space Complexity:** O(1) extra, as it modifies the column in place (ignoring DataFrame storage).

### Potential follow-up questions (as if you’re the interviewer)  

- What if some grades are NaN?
  *Hint: How does Pandas handle float NaN to int conversion? (You may need to fill NaNs or use nullable integer types.)*

- How would you convert multiple columns at once?
  *Hint: Can you pass a dictionary to .astype?*

- Can you preserve the original DataFrame and return a new one?
  *Hint: Use copy() or astype(returned DataFrame) without inplace modification.*

### Summary
This problem is a classic example of **data cleaning** using Pandas, specifically column type casting. The .astype() method is efficient and widely applicable for DataFrame data transformation. Knowing how to handle type conversions, missing values, and preserving data integrity is key to robust data processing. This approach is common anytime you load, preprocess, or aggregate tabular data for analysis or ML pipelines.