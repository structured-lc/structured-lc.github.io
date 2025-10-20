### Leetcode 2072 (Easy): The Winner University [Practice](https://leetcode.com/problems/the-winner-university)

### Description  
Given two database tables, **NewYork** and **California**, each representing exam scores for students from New York University and California University.  
Each table has a primary key `student_id` and an integer `score`.  
A student is considered **excellent** if their `score` is at least 90.  
You are to compare the number of excellent students in each university:  
- If New York University has more excellent students, return `"New York University"`.
- If California University has more, return `"California University"`.
- If they have the same number of excellent students, return `"No Winner"`.  

### Examples  

**Example 1:**  
Input:  
NewYork table:  
| student_id | score |
|------------|-------|
| 1          | 90    |
| 2          | 87    |

California table:  
| student_id | score |
|------------|-------|
| 2          | 89    |
| 3          | 88    |

Output:`New York University`  
*Explanation: Only one New York student scored ≥90, and none from California did.*

**Example 2:**  
Input:  
NewYork table:  
| student_id | score |
|------------|-------|
| 1          | 88    |
| 2          | 78    |

California table:  
| student_id | score |
|------------|-------|
| 1          | 92    |
| 2          | 90    |

Output:`California University`  
*Explanation: California has two excellent students (92, 90), New York has none.*

**Example 3:**  
Input:  
NewYork table:  
| student_id | score |
|------------|-------|
| 4          | 96    |
| 5          | 80    |
| 6          | 93    |

California table:  
| student_id | score |
|------------|-------|
| 8          | 93    |
| 7          | 96    |
| 9          | 80    |

Output:`No Winner`  
*Explanation: Two students from each university are excellent (≥90).*

### Thought Process (as if you’re the interviewee)  
First, my brute-force approach is to  
- Count the number of students in each table with a score ≥90.  
- Compare the two counts.  
- Return the appropriate string according to which has more excellent students, or "No Winner" if tied.

This is straightforward since the problem is really about counting filtered rows in each table.  
For optimization, since each table may be large, get only the counts directly using aggregation.  
In actual SQL:  
- Use COUNT to count students with score ≥90 in each table.
- Then compare the two counts in a CASE statement.
- Output the correct string as required.

No need for any joins because comparison is university-wise, and all students are counted independently.

### Corner cases to consider  
- Both tables are empty: count is zero for both, so "No Winner".
- No excellent students in either table: should also return "No Winner".
- One or both tables with only one student.
- Multiple students with the same excellent score.
- student_id values overlap or are disjoint between tables (doesn’t matter, scores are per university).
- Some students with a score exactly 90 (should be considered excellent).

### Solution

```python
# Since this is a SQL problem, here's the equivalent Python to show the logic:

def winner_university(newyork_scores, california_scores):
    # Count the number of excellent students (score ≥ 90) in each university

    ny_excellent = 0
    for s in newyork_scores:
        if s['score'] >= 90:
            ny_excellent += 1

    ca_excellent = 0
    for s in california_scores:
        if s['score'] >= 90:
            ca_excellent += 1

    if ny_excellent > ca_excellent:
        return "New York University"
    elif ny_excellent < ca_excellent:
        return "California University"
    else:
        return "No Winner"

# Example usage:
# winner_university([{'student_id':1,'score':90},{'student_id':2,'score':87}],
#                   [{'student_id':2,'score':89},{'student_id':3,'score':88}])
# Output: "New York University"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N and M are the number of students in each university's table (scan both tables to count).
- **Space Complexity:** O(1), since only counters are used (no extra storage, just two numbers).

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if you needed to return the names of the excellent students?
  *Hint: Instead of just counting, collect the student_ids or another column of excellent students.*

- What if the score threshold for excellence was variable for each university?
  *Hint: Pass/extract different thresholds for each table and filter accordingly.*

- Suppose there are ties and you have to output both winner names (if tied at max), how would the output schema change?
  *Hint: Instead of single-string output, output an array or pipe-separated string based on tie conditions.*

### Summary
This is a classical **aggregation and comparison** problem, requiring counting elements meeting a condition and comparing counts.  
The coding pattern is straightforward: filtering, counting, and then using conditional selection.  
Such patterns occur frequently in leaderboard, statistics, voting, and winner-determination problems across datasets.  
No extra data structures beyond counters are needed, and the approach is both simple and efficient for large input.


### Flashcard
Compare counts of excellent students in each table using aggregation.

### Tags
Database(#database)

### Similar Problems
- The Number of Rich Customers(the-number-of-rich-customers) (Easy)