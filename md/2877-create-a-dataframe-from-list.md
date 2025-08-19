### Leetcode 2877 (Easy): Create a DataFrame from List [Practice](https://leetcode.com/problems/create-a-dataframe-from-list)

### Description  
Given a 2D list called `student_data`, where each sub-list contains the student ID and age, create a pandas DataFrame from this data.  
The DataFrame should have two columns: `'student_id'` and `'age'`.  
Order of the rows must match the original list order.

### Examples  

**Example 1:**  
Input: `[[1, 20], [2, 22], [3, 19]]`  
Output:  
```
   student_id  age
0           1   20
1           2   22
2           3   19
```
*Explanation: Each sublist becomes a row, first value goes to 'student_id', second to 'age' column.*

**Example 2:**  
Input: `[[5, 25]]`  
Output:  
```
   student_id  age
0           5   25
```
*Explanation: Only one student, but follows the same structure.*

**Example 3:**  
Input: `[]`  
Output:  
```
Empty DataFrame
Columns: [student_id, age]
Index: []
```
*Explanation: No data, so DataFrame is empty but columns are preserved.*

### Thought Process (as if you’re the interviewee)  
- The task is to convert a 2D list into a tabular format, specifically a DataFrame, commonly used in data analysis.
- The direct approach is to use pandas’ DataFrame constructor: pass the list as rows, and set the columns to desired labels.
- Since we must keep original order, and each sublist always has exactly 2 elements (ID and age), there’s no restructuring required.
- Brute-force: iterate, add each pair as a row (could work without pandas, but constraints imply pandas).
- Best approach: use pandas.DataFrame directly for efficient, readable solution.  
- Trade-off: direct DataFrame creation is concise and leverages a standard data science library, with no need for manual parsing or iteration logic.

### Corner cases to consider  
- Input is an empty list (`[]`): should return an empty DataFrame with the required columns.
- All student ages are the same.
- Duplicated student IDs.
- Large inputs (many students).
- Sub-lists with unexpected sizes (per problem, not expected, but robust code may check length).
- Negative or zero ages (not specified, but possible in data).

### Solution

```python
import pandas as pd

def createDataframe(student_data):
    # Create a DataFrame from the list
    # Assign columns: 'student_id' for first value, 'age' for second
    return pd.DataFrame(student_data, columns=['student_id', 'age'])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of students (rows), since pandas constructs the DataFrame row-wise from the input list.
- **Space Complexity:** O(n), as a new DataFrame is created to store all input rows and columns.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a case where the sublists have varying length?  
  *Hint: Try validating the length of each sublist before loading.*

- Can you add validation for negative ages or invalid IDs?  
  *Hint: After DataFrame creation, use filtering or apply assertions.*

- What if the column names are dynamic, not always `'student_id'` and `'age'`?  
  *Hint: Accept columns as an additional parameter.*

### Summary
This problem demonstrates **basic data transformation using pandas**, a standard data analysis pattern. The approach uses direct DataFrame construction from a 2D list—a common technique for loading structured data. Such patterns are very applicable to scenarios like CSV ingest, data cleansing, and analytics pipelines, and highlight the importance of knowing how to bridge between raw data formats and structured representations.

### Tags

### Similar Problems
