### Leetcode 2883 (Easy): Drop Missing Data [Practice](https://leetcode.com/problems/drop-missing-data)

### Description  
Given a table of students with columns student_id, name, and age, some students may have missing values in the name column. Remove all rows where the name is missing (either None or NaN). Return the resulting data without those incomplete rows.

### Examples  

**Example 1:**  
Input:  
```
| student_id | name  | age |
|------------|-------|-----|
| 32         | Piper | 5   |
| 217        | Grace | 19  |
| 779        | None  | 20  |
| 849        | None  | 14  |
```
Output:  
```
| student_id | name  | age |
|------------|-------|-----|
| 32         | Piper | 5   |
| 217        | Grace | 19  |
```
*Explanation: Rows with student_ids 779 and 849 have missing ('None') names, so they are dropped.*

**Example 2:**  
Input:  
```
| student_id | name   | age |
|------------|--------|-----|
| 101        | Anna   | 12  |
| 102        | None   | 11  |
| 103        | Carlo  | 10  |
```
Output:  
```
| student_id | name   | age |
|------------|--------|-----|
| 101        | Anna   | 12  |
| 103        | Carlo  | 10  |
```
*Explanation: Remove the row where the name is None.*

**Example 3:**  
Input:  
```
| student_id | name | age |
|------------|------|-----|
| 201        | Mia  | 13  |
```
Output:  
```
| student_id | name | age |
|------------|------|-----|
| 201        | Mia  | 13  |
```
*Explanation: No missing names; all rows remain.*

### Thought Process (as if you’re the interviewee)  
The core requirement is to remove rows where the 'name' value is missing.  
- First idea: Iterate through each row and only keep those with a non-missing name.
- In pandas, a missing name can be represented by None or NaN.
- To check for missing values, pandas offers functions like `notnull()` or `dropna()`.  
- Using `dropna()` with `subset=['name']` removes any rows where the name is missing. This is concise and efficient.
- Alternatively, use boolean indexing: keep only rows where `students['name'].notnull()` is True.
- Both methods are equivalent in their output; `dropna` is idiomatic and explicit about dropping based on missing data in a column.

### Corner cases to consider  
- All rows have missing names ⇒ Output should be an empty DataFrame.
- No rows have missing names ⇒ Output is the same as input.
- Only some rows have missing names.
- The DataFrame is completely empty.
- Some names are empty strings ("") but not None (problem focuses on None/NaN).
- Non-standard missing values (if present): only rows with missingness in 'name' column are dropped.

### Solution

```python
import pandas as pd

def dropMissingData(students: pd.DataFrame) -> pd.DataFrame:
    # Drop rows where the 'name' column is missing (None or NaN)
    return students.dropna(subset=['name'])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the DataFrame. Each row is checked for a missing value in the 'name' column once.
- **Space Complexity:** O(n), since dropna by default returns a new DataFrame unless inplace=True. The extra space is proportional to the number of rows retained.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle missing data in multiple columns?
  *Hint: Look at `subset` parameter in dropna; what if you need to drop rows where name or age is missing?*

- What if you wanted to fill missing names with a default value instead of dropping?
  *Hint: Use `fillna()` to replace missing values.*

- How would you drop columns (not rows) that have any missing data?
  *Hint: Use `dropna(axis=1)` to drop columns instead of rows.*

### Summary
The main coding pattern is **data filtering** based on missing values, a common data cleaning step. The problem leverages pandas' built-in functionality (`dropna` or boolean indexing with `notnull`). This approach generalizes to many real-world scenarios where incomplete data must be cleaned before analysis, and is foundational for data wrangling, ETL pipelines, and preprocessing in machine learning.