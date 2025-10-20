### Leetcode 2881 (Easy): Create a New Column [Practice](https://leetcode.com/problems/create-a-new-column)

### Description  
Given a DataFrame named `employees` with columns `name` (employee's name) and `salary` (integer), write code to create a new column `bonus` that stores twice the value of each corresponding `salary`. Return the resulting DataFrame.

### Examples  

**Example 1:**  
Input:  
```
  name  salary
0  Amy    5000
1  Bob    6000
```
Output:  
```
  name  salary  bonus
0  Amy    5000  10000
1  Bob    6000  12000
```
*Explanation: Each bonus is salary × 2: 5000×2=10000 and 6000×2=12000.*

**Example 2:**  
Input:  
```
  name  salary
0  Carla   7000
```
Output:  
```
  name  salary  bonus
0  Carla   7000  14000
```
*Explanation: salary 7000 × 2 = 14000.*

**Example 3:**  
Input:  
```
Empty DataFrame (no rows)
```
Output:  
```
Empty DataFrame with columns: name, salary, bonus
```
*Explanation: No rows to process, so the output remains empty but with the extra column added.*

### Thought Process (as if you’re the interviewee)  
The task is to add a `bonus` column to a DataFrame, where each entry is double the `salary` in the same row.  
- Brute-force would be to loop through each row, calculate double the salary, and add it to a new column. This is inefficient and not idiomatic Pandas.
- Instead, Pandas operations are vectorized, so multiplying the `salary` column directly by `2` is efficient and concise.  
- Assign the result to a new column `bonus`. This leverages Pandas’ built-in performance and keeps code simple.  
- Final approach: Use a vectorized assignment `employees['bonus'] = employees['salary'] * 2` and return the DataFrame.

### Corner cases to consider  
- DataFrame is empty—should return empty DataFrame with `bonus` column.
- Salaries with zero—bonus will be zero.
- Very large salary values—double but maintain integer handling.
- Negative salaries—even if unlikely, bonus is simply double.
- DataFrame already has a `bonus` column—should overwrite.

### Solution

```python
def createBonusColumn(employees):
    # Add the 'bonus' column as double the 'salary' column for each row
    employees['bonus'] = employees['salary'] * 2
    return employees
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows. Each salary is accessed and multiplied once.
- **Space Complexity:** O(1) extra, since the DataFrame is updated in-place and no significant auxiliary storage is used (beyond the new column, which is required by the problem).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this for a variable bonus multiplier (not always ×2)?  
  *Hint: Accept a multiplier parameter in the function.*

- How can you handle missing or null values in the salary column?  
  *Hint: Use fillna or dropna to handle missing data before calculation or specifically address NaN.*

- What if you need to create multiple derived columns (e.g., 10% tax, final pay)?  
  *Hint: Use multiple assignments or vectorized calculations for each derived metric.*

### Summary
This problem showcases basic vectorized DataFrame manipulation—a common Pandas pattern. Operations like adding/transforming columns based on others are fundamental in data engineering and analytics, and can be applied for any computation across DataFrame columns (such as percent increases, normalizations, grouping-based calculations, etc.). The pattern of vectorized updates also appears in SQL data transformations.


### Flashcard
Create a new 'bonus' column by multiplying the 'salary' column by 2 using vectorized pandas operations.

### Tags

### Similar Problems
