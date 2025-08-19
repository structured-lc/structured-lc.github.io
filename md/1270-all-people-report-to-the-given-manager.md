### Leetcode 1270 (Medium): All People Report to the Given Manager [Practice](https://leetcode.com/problems/all-people-report-to-the-given-manager)

### Description  
Given an **Employees** table with `employee_id`, `employee_name`, and `manager_id`, find all employees (direct or indirect) who report to a given manager (often the head, with ID = 1). An employee reports **directly** if their `manager_id` is the head. They report **indirectly** if their manager ultimately reports up to the head employee. Exclude the head’s own ID in the result.

### Examples  

**Example 1:**  
Input: 
```
Employees = [
  {employee_id: 1, employee_name: 'Alice', manager_id: null},
  {employee_id: 2, employee_name: 'Bob', manager_id: 1},
  {employee_id: 3, employee_name: 'Cathy', manager_id: 2},
  {employee_id: 4, employee_name: 'Dan', manager_id: 1}
]
Given manager: 1
```
Output: `[2, 3, 4]`
*Explanation: 2 and 4 report directly to 1; 3 reports to 2, thus indirectly to 1.*

**Example 2:**  
Input: 
```
Employees = [
  {employee_id: 10, employee_name: 'X', manager_id: null},
  {employee_id: 20, employee_name: 'Y', manager_id: 10},
  {employee_id: 30, employee_name: 'Z', manager_id: 20}
]
Given manager: 10
```
Output: `[20, 30]`
*Explanation: 20 reports directly to 10, 30 indirectly via 20.*

**Example 3:**  
Input: 
```
Employees = [
  {employee_id: 1, ..., manager_id: null },
  {employee_id: 2, ..., manager_id: 1 },
  {employee_id: 3, ..., manager_id: 5 },
  {employee_id: 4, ..., manager_id: 2 }
]
Given manager: 1
```
Output: `[2, 4]`
*Explanation: 2 and 4 report (directly or indirectly) to 1; 3 does not.*


### Thought Process (as if you’re the interviewee)  
First, I’d start by considering all employees who have the given manager as their direct manager. Then, I’d need to find employees who report to those employees, recursively, as this forms a tree. The brute-force approach would be to repeatedly scan the whole table for every manager—a poor choice.

Instead, I’d build a mapping from manager_id → [employee_ids], then use BFS or DFS from the root manager to collect all subordinates. In SQL, we can use a recursive CTE or join the table multiple times (if relation is at most 3 levels deep), to collect all direct and indirect reports. This avoids repeated, inefficient scanning.

Tradeoff: Recursive CTE is scalable for variable depth, but fixed-depth solution can work if company is small.


### Corner cases to consider  
- The manager is the only employee (no subordinates).
- Cycles (shouldn’t exist, but worth checking for infinite loops).
- Employees with no manager (e.g., multiple heads).
- Subordinates nested ≥3 levels deep.
- Exclude the given manager’s own ID from output.
- Duplicate employee IDs in result (should not happen).


### Solution

```python
# Assume employees is a list of dicts as in the examples
# Find all employees who (directly or indirectly) report to manager_id

def find_all_reports(employees, manager_id):
    # Build manager → [employees] map
    manager_map = {}
    for entry in employees:
        mgr = entry['manager_id']
        emp = entry['employee_id']
        if mgr not in manager_map:
            manager_map[mgr] = []
        manager_map[mgr].append(emp)

    result = set()
    stack = []
    # Start DFS from given manager
    if manager_id in manager_map:
        stack.extend(manager_map[manager_id])

    while stack:
        emp = stack.pop()
        if emp not in result:
            result.add(emp)
            # Add direct reports to the stack
            if emp in manager_map:
                stack.extend(manager_map[emp])

    return list(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of employees. Each employee visited once in DFS/BFS.
- **Space Complexity:** O(N), for result set and manager map, plus stack (up to tree depth).


### Potential follow-up questions (as if you’re the interviewer)  

- What if the management tree is extremely deep (i.e., thousands of layers)?  
  *Hint: Use highly efficient recursion or iterative traversal—avoid call stack overflows.*

- How would you prevent cycles or infinite loops in this reporting structure?  
  *Hint: Keep a visited set for cycle detection.*

- Can this logic be done efficiently in SQL?  
  *Hint: Use recursive common table expressions (CTE) in modern SQL.*

### Summary
We solve this problem using a tree traversal approach (BFS/DFS), mapping manager relationships to efficiently find all reports. This is a classic *organizational hierarchy* pattern—common for employee management, folder/file systems, and any structure modeled as a directed acyclic graph (tree).

### Tags
Database(#database)

### Similar Problems
