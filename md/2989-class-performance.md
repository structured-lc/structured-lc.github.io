### Leetcode 2989 (Medium): Class Performance [Practice](https://leetcode.com/problems/class-performance)

### Description  
Given a table of students’ scores in three assignments, you need to find the difference between the highest total score and the lowest total score among all students. Each student's total score is the sum of their three assignment scores.

### Examples  

**Example 1:**  
Input:  
```
student_id | assignment1 | assignment2 | assignment3
309        | 88          | 47          | 87
321        | 98          | 95          | 37
338        | 100         | 64          | 43
423        | 60          | 44          | 47
896        | 32          | 37          | 50
235        | 31          | 53          | 69
```  
Output: `111`  
*Explanation: Total scores are 222, 230, 207, 151, 119, 153. Highest is 230, lowest is 119, difference = 230 - 119 = 111.*

**Example 2:**  
Input:  
```
student_id | assignment1 | assignment2 | assignment3
1          | 100         | 100         | 100
2          | 90          | 90          | 90
3          | 80          | 80          | 80
```  
Output: `60`  
*Explanation: Totals are 300, 270, 240; difference = 300 - 240 = 60.*

**Example 3:**  
Input:  
```
student_id | assignment1 | assignment2 | assignment3
1          | 50          | 50          | 50
```  
Output: `0`  
*Explanation: Only one student, so difference = 0.*

### Thought Process (as if you’re the interviewee)  
- First, consider calculating total scores per student by summing the three assignments for each student.  
- A brute-force way: compute total score for each student, then find max and min total scores, finally subtract min from max.  
- This is straightforward and efficient since only a single pass to calculate totals and track min, max is needed.  
- If implemented in SQL, use a CTE (Common Table Expression) or a subquery to compute totals first, then get `MAX(total_score) - MIN(total_score)`.  
- No complicated data structures are needed because the problem only asks for difference of extremes in totals.  
- The final approach is optimal as the problem size is generally manageable, with direct aggregation queries or simple loops.

### Corner cases to consider  
- Only one student (difference should be 0).  
- All students have the same total score (difference should be 0).  
- Large number of students (ensure efficient aggregation).  
- Scores can be zero or very high (check integer overflow if language applicable).  
- Missing or null scores (assuming inputs are valid as per problem statement, else handle accordingly).  

### Solution

```python
def class_performance(scores):
    # scores: List of tuples/lists like [(assignment1, assignment2, assignment3), ...]

    # Initialize min and max total score with extreme values
    min_score = float('inf')
    max_score = float('-inf')

    # Iterate over each student's scores
    for a1, a2, a3 in scores:
        total = a1 + a2 + a3  # sum of 3 assignments for student
        if total < min_score:
            min_score = total
        if total > max_score:
            max_score = total

    # Difference between max and min total scores
    return max_score - min_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of students since we compute each student’s total score once and track min/max.  
- **Space Complexity:** O(1), only a few variables for tracking minimum and maximum totals are used; no extra space that scales with input size.  

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if scores could be missing or null for some assignments?  
  *Hint: Consider data validation and how to treat null or missing values in summation.*  

- If we wanted to find the top k differences, or differences per group (e.g., by class), how would you modify your solution?  
  *Hint: Think about grouping data and using sorting or data structures like heaps.*  

- How might you optimize if the dataset is extremely large and cannot fit into memory?  
  *Hint: Consider streaming, partial aggregation, or database-level aggregation.*  

### Summary  
The problem involves calculating the difference between the highest and lowest total scores among students, which is a straightforward aggregation pattern. The core is to sum row values and find min and max efficiently. This pattern applies broadly in SQL or array processing where aggregation is required over rows. The key technique is to reduce multiple values through simple operations (sum, min, max) without unnecessary complexity.

### Tags
Database(#database)

### Similar Problems
