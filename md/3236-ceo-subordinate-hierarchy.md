### Leetcode 3236 (Hard): CEO Subordinate Hierarchy [Practice](https://leetcode.com/problems/ceo-subordinate-hierarchy)

### Description  
Given a table Employees (employee_id, employee_name, manager_id, salary), identify all **subordinates** of the CEO (direct and indirect), their subordinate level (where direct reports are level 1, their reports are level 2, etc.), and the salary difference versus the CEO. You need to output for each subordinate:
- subordinate_id
- subordinate_name
- hierarchy_level (distance from CEO, starting at 1)
- salary_difference (subordinate's salary minus CEO's salary)

Assume only one CEO exists, with manager_id NULL. Subordinates must be sorted first by hierarchy_level, then by employee_id.

### Examples  

**Example 1:**  
Input:  
Employees =  
```
[ [1, 'Alice', null, 150000],        # CEO
  [2, 'Bob', 1, 120000],
  [3, 'Charlie', 1, 110000],
  [4, 'David', 2, 105000],
  [5, 'Eve', 2, 100000],
  [6, 'Frank', 3, 95000],
  [7, 'Grace', 3, 98000],
  [8, 'Helen', 5, 90000] ]
```
Output:  
```
[ [2, 'Bob', 1, -30000],
  [3, 'Charlie', 1, -40000],
  [4, 'David', 2, -45000],
  [5, 'Eve', 2, -50000],
  [6, 'Frank', 2, -55000],
  [7, 'Grace', 2, -52000],
  [8, 'Helen', 3, -60000] ]
```
*Explanation: Alice is the CEO (id=1). Her direct reports (Bob, Charlie) are level 1. Their subordinates (David, Eve, Frank, Grace) are level 2. Helen is Eve's report, so level 3. Salary difference is subordinate's salary minus CEO's salary.*

**Example 2:**  
Input:  
Employees =  
```
[ [1, 'CEO', null, 200000],
  [2, 'VP', 1, 150000] ]
```
Output:  
```
[ [2, 'VP', 1, -50000] ]
```
*Explanation: VP directly reports to CEO. Level 1. Salary difference: 150000 - 200000 = -50000.*

**Example 3:**  
Input:  
Employees =  
```
[ [1, 'Alice', null, 150000] ]
```
Output:  
```
[ ]
```
*Explanation: Only CEO, no subordinates.*

### Thought Process (as if you’re the interviewee)  
First, I would look for the CEO (“manager_id is NULL”). I need to list all employees that are direct or indirect reports of the CEO, along with their level in the hierarchy.

A brute-force approach would involve traversing each employee and going upwards using manager_id to see if the chain leads to the CEO, keeping track of distance. This would be O(n^2).

A better solution is to build a manager-to-subordinate mapping (adjacency list). Then use **BFS** starting from the CEO to traverse the hierarchy, recording the level for each employee. For salary difference, we can record CEO’s salary at the start, and for each subordinate, output their required info.

This problem is similar to BFS/level-order traversal in tree/graph structures, except instead of a typical binary tree, this is a general tree (each node can have multiple children).

Tradeoffs:
- **DFS** could also work (pre-order or post-order), but BFS naturally captures the “level” (distance from root/CEO).
- Using a hash map/dictionary for fast lookup of the CEO, employees, manager-subordinate relationships.

### Corner cases to consider  
- Only the CEO exists; no subordinates (output should be empty).
- Some employees with no subordinates.
- Levels > 2 (nested subordinates).
- Multiple employees with the same salary.
- Employees listed in any order.
- Employees having the same name but different ids.

### Solution

```python
from collections import deque, defaultdict

def ceo_subordinate_hierarchy(employees):
    """
    employees: List[List] of [employee_id, employee_name, manager_id, salary]
    Returns: List[List] of [subordinate_id, subordinate_name, hierarchy_level, salary_difference]
    """
    # Build mapping: manager_id -> list of subordinates
    manager_to_subs = defaultdict(list)
    # Also, map employee_id -> (name, salary, manager_id)
    id_info = {}
    ceo_id = None
    ceo_salary = None

    for emp_id, name, mgr_id, salary in employees:
        id_info[emp_id] = (name, mgr_id, salary)
        if mgr_id is not None:
            manager_to_subs[mgr_id].append(emp_id)
        else:
            ceo_id = emp_id
            ceo_salary = salary

    # Edge case: no subordinates
    if not manager_to_subs.get(ceo_id):
        return []

    # BFS: (employee_id, current_level)
    queue = deque()
    res = []

    # Level 1: CEO's direct reports
    for sub_id in manager_to_subs.get(ceo_id, []):
        queue.append((sub_id, 1))

    while queue:
        emp_id, level = queue.popleft()
        name, mgr_id, salary = id_info[emp_id]
        salary_diff = salary - ceo_salary
        res.append([emp_id, name, level, salary_diff])
        for sub_id in manager_to_subs.get(emp_id, []):
            queue.append((sub_id, level + 1))

    # Output sorted by hierarchy_level, then subordinate_id
    res.sort(key=lambda x: (x[2], x[0]))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of employees. Building maps: O(n), BFS visits each subordinate once, and final sort is O(n log n) (since we sort by level and id).
- **Space Complexity:** O(n) for maps, queue, and result list; each stores up to n employees.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the company has multiple CEOs (manager_id is NULL for more than one employee)?  
  *Hint: How might this affect your base cases? Could you generalize to handle multiple disconnected trees?*

- How would you extend this to find the “longest chain” from CEO to leaf subordinate?  
  *Hint: DFS with depth tracking, update max depth when reaching the leaf.*

- Can you do this with SQL in a single query?  
  *Hint: Research recursive CTE (Common Table Expression) in SQL, starting from CEO and joining recursively.*

### Summary
This approach uses **BFS traversal** of a general tree (manager-subordinate hierarchy) to compute levels and gather information for each subordinate. This is a **rooted tree traversal** pattern, frequently applied in problems with organizational trees, file system hierarchies, and similar structures. The adjacency-list and BFS (or DFS for variations) pattern generalizes well to many hierarchical data problems.

### Tags
Database(#database)

### Similar Problems
