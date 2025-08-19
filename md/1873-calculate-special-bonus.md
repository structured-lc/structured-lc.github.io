### Leetcode 1873 (Easy): Calculate Special Bonus [Practice](https://leetcode.com/problems/calculate-special-bonus)

### Description  
Given a table of employees, calculate each employee's **special bonus**.  
- If the employee's **ID** is an odd number **and** their name does **not** begin with 'M', their bonus is **100% of their salary**.  
- Otherwise, their bonus is **0**.  
Return the list with `employee_id` and their computed bonus.

### Examples  

**Example 1:**  
Input:  
Employees =  
| employee_id | name     | salary |
|-------------|----------|--------|
| 2           | Meir     | 3000   |
| 3           | Michael  | 3800   |
| 7           | Addilyn  | 7400   |
| 8           | Juan     | 6100   |
| 9           | Kannon   | 7700   |
  
Output:  
| employee_id | bonus |
|-------------|-------|
| 2           | 0     |
| 3           | 0     |
| 7           | 7400  |
| 8           | 0     |
| 9           | 7700  |

*Explanation:*
- ID=2: even → bonus=0
- ID=3: name starts with 'M' → bonus=0
- ID=7: odd and doesn't start with 'M' → bonus=7400
- ID=8: even → bonus=0
- ID=9: odd and doesn't start with 'M' → bonus=7700

**Example 2:**  
Input:  
Employees =  
| employee_id | name    | salary |
|-------------|---------|--------|
| 1           | Alice   | 5000   |
| 4           | Mark    | 7000   |
| 5           | John    | 2300   |

Output:  
| employee_id | bonus |
|-------------|-------|
| 1           | 5000  |
| 4           | 0     |
| 5           | 2300  |

*Explanation:*
- 1: odd, not starting with 'M' → 5000
- 4: even → 0
- 5: odd, name not 'M' → 2300

**Example 3:**  
Input:  
Employees =  
| employee_id | name | salary |
|-------------|------|--------|
| 6           | Max  | 1000   |

Output:  
| employee_id | bonus |
|-------------|-------|
| 6           | 0     |

*Explanation:*
- 6: even → 0

### Thought Process (as if you’re the interviewee)  
First, clarify the two requirements: the ID must be odd (ID % 2 == 1), and the name must not start with 'M'.  
For each employee, check both conditions:
- If both pass, set bonus to salary; otherwise, bonus is 0.

Brute-force approach: iterate through all employees; for each, compute bonus according to the rules—simple O(n).

There's no need for pre-sorting or lookups, as conditions are checked directly.

Trade-offs:
- Simple loop is fastest for this scenario. No meaningful optimization exists since each element must be checked.

### Corner cases to consider  
- Empty input (no employees).
- All IDs are even.
- All names start with 'M' (case sensitivity? Problem specifies only 'M', not 'm'.)
- Single employee in list.
- Non-ASCII names.
- Name is just 'M'.

### Solution

```python
def calculateSpecialBonus(employees):
    # Result array to store [employee_id, bonus]
    result = []
    for emp in employees:
        emp_id, name, salary = emp["employee_id"], emp["name"], emp["salary"]
        # Check if ID is odd and name does not start with 'M'
        if emp_id % 2 == 1 and not name.startswith("M"):
            bonus = salary
        else:
            bonus = 0
        result.append({"employee_id": emp_id, "bonus": bonus})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — must evaluate each employee once.
- **Space Complexity:** O(n) — output result list of size n; no extra storage besides this.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the database is huge and doesn't fit in memory?  
  *Hint: Can you process data in streaming batches?*

- How would you handle names that begin with lower-case 'm'?  
  *Hint: Consider case-insensitive startswith check.*

- Could this logic be implemented directly in a SQL query?  
  *Hint: Use CASE and string filtering in SQL.*

### Summary
A straightforward filtering problem using condition checking per record. The design pattern here is: **scan and filter**, which is common in both algorithms and SQL.  
This pattern applies widely: fraud detection, scoring systems, or any rules-based row evaluation.

### Tags
Database(#database)

### Similar Problems
