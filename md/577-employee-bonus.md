### Leetcode 577 (Easy): Employee Bonus [Practice](https://leetcode.com/problems/employee-bonus)

### Description  
Given two tables, **Employee** and **Bonus**, list all employees’ names along with their bonus amounts **only if** the bonus is less than 1000, or if the employee does **not have a bonus at all**.  
- The Employee table contains: empId (unique), name, supervisor, salary.
- The Bonus table contains: empId (unique), bonus.

Return a result with each qualifying employee’s name and (if present) their bonus. If the employee has no bonus, show `null` for the bonus.

### Examples  

**Example 1:**  
Input:  
Employee =  
| empId | name   | supervisor | salary |
|-------|--------|------------|--------|
| 1     | John   | 3          | 1000   |
| 2     | Dan    | 3          | 2000   |
| 3     | Brad   | null       | 4000   |
| 4     | Thomas | 3          | 4000   |

Bonus =  
| empId | bonus |
|-------|-------|
| 2     | 500   |
| 4     | 2000  |

Output:  
| name | bonus |
|------|-------|
| John | null  |
| Dan  | 500   |
| Brad | null  |

*Explanation:  
- John and Brad don't have any entry in Bonus (so bonus is null).
- Dan has a bonus < 1000, so he appears with his amount.
- Thomas's bonus is 2000 (≥ 1000), so he is excluded.*

**Example 2:**  
Input:  
Employee =  
| empId | name    | supervisor | salary |
|-------|---------|------------|--------|
| 5     | Alice   | 2          | 2400   |

Bonus =  
(empty)

Output:  
| name | bonus |
|------|-------|
| Alice| null  |

*Explanation:  
- Alice has no bonus record, so she's listed with bonus=null.*

**Example 3:**  
Input:  
Employee =  
| empId | name    | supervisor | salary |
|-------|---------|------------|--------|
| 11    | Emma    | 10         | 3300   |
| 12    | Noah    | 10         | 2900   |

Bonus =  
| empId | bonus |
|-------|-------|
| 12    | 250   |

Output:  
| name | bonus |
|------|-------|
| Emma | null  |
| Noah | 250   |

*Explanation:  
- Noah gets bonus 250 (<1000), included.
- Emma has no bonus, included with null.*


### Thought Process (as if you’re the interviewee)  
First, since not every employee will have a bonus, we must use a **LEFT JOIN** to combine all Employee rows with matching Bonus records (if any).  
- If we use an INNER JOIN, we’d lose employees with no bonus record (excluded unintentionally).  
- After joining, we filter for only (bonus < 1000) or (bonus is null, meaning no bonus at all).

**Step-by-step:**
- LEFT JOIN Employee and Bonus ON empId.
- WHERE clause: (bonus < 1000 OR bonus IS NULL).
- SELECT name, bonus.

This way, all employees with no bonus or with a bonus below 1000 are returned, and employees with a bonus >= 1000 are excluded.


### Corner cases to consider  
- Employee table is empty → Should return empty result.
- Bonus table has no rows → All employees returned with bonus = null.
- Employees with bonus exactly 1000 → Excluded.
- Bonus has empIds that don’t match any Employee → Can ignore; LEFT JOIN ensures only valid Employee.
- Duplicate empId in Bonus (should not happen by definition, but check problem constraints).
- All employees have bonuses ≥ 1000 → No row returned.


### Solution

```python
# Assume we have two pandas DataFrames: employee and bonus (to simulate the SQL).
# Never rely on pandas shortcuts, so process as per logic.

def employee_bonus(employee, bonus):
    # employee: List[Dict] with ['empId', 'name', ...]
    # bonus: List[Dict] with ['empId', 'bonus']

    # 1. Build a map for bonus lookup by empId
    bonus_map = {b['empId']: b['bonus'] for b in bonus}
    result = []

    for e in employee:
        b = bonus_map.get(e['empId'])  # Will be None if not present

        # Check for bonus < 1000 OR missing bonus (None)
        if b is None or b < 1000:
            result.append({'name': e['name'], 'bonus': b})

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)  
  - n = number of employees, m = number of bonus records.
  - Bonus lookup map is built in O(m), employee scan is O(n).
- **Space Complexity:** O(m + l)  
  - Dictionary (bonus_map) uses O(m). Output list is O(l), l ≤ n = number of employees passing the filter.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple bonus entries per employee?
  *Hint: Try handling duplicates in the bonus table—should you sum, take max, or disallow?*
- How would you handle if we required the result sorted by name?
  *Hint: Add sorting step after filtering based on name lexicographical order.*
- What if salary must be included and we want only employees with salary > 2000?
  *Hint: Add another filter condition for salary milestone after joining tables.*

### Summary
This problem is a classic database query for **left join and filtering**—a pattern common in reporting and analytics whenever optional related data exists. The core logic—combine tables using LEFT JOIN, then apply conditional filtering—applies widely, such as:
- Finding customers without orders
- Students without test scores under a threshold
- Projects with missing milestone completions

The pattern: **LEFT JOIN + WHERE (related missing OR value < threshold)**.


### Flashcard
LEFT JOIN Employee and Bonus tables; select employees with bonus < 1000 or no bonus (NULL).

### Tags
Database(#database)

### Similar Problems
- Combine Two Tables(combine-two-tables) (Easy)