### Leetcode 580 (Medium): Count Student Number in Departments [Practice](https://leetcode.com/problems/count-student-number-in-departments)

### Description  
Given two tables, **Department** and **Student**, return a report with each department name and the number of students in it. If a department has no students, it should still appear in the output with a count of 0. The output must be sorted by student count in descending order, and by department name in ascending order in the case of ties.

### Examples  

**Example 1:**  
Input:  
Department table:  
| dept_id | dept_name   |
|---------|-------------|
| 1       | Engineering |
| 2       | Science     |
| 3       | Law         |
| 4       | Business    |

Student table:  
| student_id | student_name | gender | dept_id |
|------------|--------------|--------|---------|
| 1          | Jack         | M      | 1       |
| 2          | Jane         | F      | 1       |
| 3          | Mark         | M      | 2       |

Output:  
| dept_name   | student_number |
|-------------|---------------|
| Engineering | 2             |
| Science     | 1             |
| Business    | 0             |
| Law         | 0             |

*Explanation: Engineering has 2 students, Science has 1. Business and Law have 0 students, but must appear with count 0. Sorted by student count desc, then name asc.*

**Example 2:**  
Input:  
Department table:  
| dept_id | dept_name |
|---------|-----------|
| 1       | Arts      |
| 2       | Math      |

Student table:  
| student_id | student_name | gender | dept_id |
|------------|--------------|--------|---------|
| (none)     |              |        |         |

Output:  
| dept_name | student_number |
|-----------|---------------|
| Arts      | 0             |
| Math      | 0             |

*Explanation: No students, so all departments listed with a count of 0.*

**Example 3:**  
Input:  
Department table:  
| dept_id | dept_name |
|---------|-----------|
| 1       | History   |
| 2       | Biology   |

Student table:  
| student_id | student_name | gender | dept_id |
|------------|--------------|--------|---------|
| 10         | Alice        | F      | 2       |
| 11         | Bob          | M      | 2       |

Output:  
| dept_name | student_number |
|-----------|---------------|
| Biology   | 2             |
| History   | 0             |

*Explanation: Biology has 2 students, History has no students. Output order is Biology first.*

### Thought Process (as if you’re the interviewee)  
- My brute-force idea is to count, for each department, how many students are assigned to it.  
- Problem is: If we only use an INNER JOIN (or join Student to Department, and count), departments with zero students would be missing.
- So, **I’d use a LEFT JOIN**: join Department to Student on dept_id, then group by department, and count number of students per department.  
- For departments with no students, count will be 0, because student_id will be NULL after the join.
- Finally, I need to sort by student count in descending order, then department name in ascending order in case of tie.

### Corner cases to consider  
- Departments with no students at all.
- No students in the table.
- Multiple departments with exactly the same number of students (tie; check lex order by name).
- Only one department.
- Departments with whitespace or unusual characters in name.
- Departments with the same name but different IDs (spec says group by name though).

### Solution

```sql
SELECT
    D.dept_name,
    COUNT(S.student_id) AS student_number
FROM
    department AS D
LEFT JOIN
    student AS S
    ON D.dept_id = S.dept_id
GROUP BY
    D.dept_name
ORDER BY
    student_number DESC,
    D.dept_name ASC
```

*Python-style explanation:* (not executed, just for reader clarity)

```python
# For each department, count how many rows in Student match dept_id.
# Use a LEFT JOIN so every department is included.
# GROUP BY department, COUNT students.
# If none, COUNT returns 0 for that department.
# Order as required.
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M + D log D) where N = number of students, M = number of departments; joining is O(N), grouping/sorting is O(D log D) for D departments.
- **Space Complexity:** O(D) for the output, where D = number of departments, since each department appears once in the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a department name is duplicated but with different dept_ids?  
  *Hint: Should you group by id or name?*

- How would you display the percentage of students per department?  
  *Hint: Need department-wise and total counts.*

- Can we do this in a single SQL statement without grouping?  
  *Hint: Try correlated subquery or window functions.*

### Summary
This problem uses the **aggregation and left join pattern**, which is common when you need counts including zero rows from one table. Knowing when to use LEFT JOIN vs. INNER JOIN is crucial for such business reporting requirements. Similar logic can be applied to sales/transactions per category, posts per user, etc.

### Tags
Database(#database)

### Similar Problems
