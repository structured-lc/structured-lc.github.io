### Leetcode 2884 (Easy): Modify Columns [Practice](https://leetcode.com/problems/modify-columns)

### Description  
Given a DataFrame `employees` with columns `name` and `salary`, you are asked to *give all employees a pay rise by doubling their salary*. Your task is to modify the DataFrame so every value in the `salary` column is multiplied by 2, and then return the updated DataFrame.

### Examples  

**Example 1:**  
Input:  
```
name      salary
Jack      19666
Piper     74754
Mia       62509
Ulysses   54866
```
Output:  
```
name      salary
Jack      39332
Piper     149508
Mia       125018
Ulysses   109732
```
*Explanation: Each salary is doubled: 19666×2=39332, 74754×2=149508, etc.*

**Example 2:**  
Input:  
```
name    salary
Ravi    1000
Mira    0
```
Output:  
```
name    salary
Ravi    2000
Mira    0
```
*Explanation: 1000×2=2000, 0×2=0.*

**Example 3:**  
Input:  
```
name    salary
Ann     1
```
Output:  
```
name    salary
Ann     2
```
*Explanation: 1×2=2.*

### Thought Process (as if you’re the interviewee)  
- The brute-force solution would be to iterate over every row and update each salary separately.
- However, since we are using pandas, column assignments are vectorized and very efficient.
- We can directly multiply the `salary` column by 2 in a single line: `employees['salary'] = employees['salary'] * 2`.
- This approach is concise, fast, and scales well for large DataFrames.
- Modifying the column in place is acceptable unless stated otherwise; if not, we could return a copy.
- Chose this method due to clarity, performance, and idiomatic pandas use.

### Corner cases to consider  
- The DataFrame is empty (no employees): should return the same empty DataFrame.
- All `salary` values are zero.
- There is only one employee in the DataFrame.
- All salaries are negative (edge case, not typical, but possible).
- Very large salary numbers (be aware of integer overflow, though pandas typically uses Python's arbitrary precision).

### Solution

```python
import pandas as pd

def modifySalaryColumn(employees: pd.DataFrame) -> pd.DataFrame:
    # Double all entries in 'salary' column
    employees['salary'] = employees['salary'] * 2
    return employees
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Where n is the number of rows in the DataFrame, as each salary is accessed and modified once.

- **Space Complexity:** O(1) (in-place)  
  We do not create a new DataFrame or data structure; we modify the existing one.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we didn't want to mutate the original DataFrame?
  *Hint: Return a new DataFrame with updated salaries.*

- How would you implement an arbitrary raise percentage instead of strictly doubling?
  *Hint: Multiply by a given parameter instead of fixed 2.*

- Can you handle string type or missing values in the salary column?
  *Hint: Use `pd.to_numeric` with `errors='coerce'` and fill NaN for non-integers or missing entries.*

### Summary
This problem demonstrates the classic *vectorized operation* pattern for data manipulation with pandas, where a column can be transformed with a single assignment. This pattern is not limited to doubling values—it generalizes to any column-wise math, and is fundamental in data preprocessing for analytics, modeling, or ETL work.