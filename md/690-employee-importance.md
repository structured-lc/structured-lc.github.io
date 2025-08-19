### Leetcode 690 (Medium): Employee Importance [Practice](https://leetcode.com/problems/employee-importance)

### Description  
Given a list of employees, where each employee has a unique id, an importance value, and a list of ids of their direct subordinates, calculate the total importance for a given employee.  
The total importance is defined as the sum of the importance of that employee and all of their direct and indirect subordinates.  
You must traverse the hierarchy (which may be a tree or a forest) to aggregate all importance values for the specified employee id.

### Examples  

**Example 1:**  
Input: `employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1`  
Output: `11`  
*Explanation: Employee 1 has importance 5 and subordinates 2, 3. Employee 2 and 3 each have importance 3 and no subordinates. Total = 5 + 3 + 3 = 11.*

Tree view:
```
   [1, 5]
   /    \
[2, 3] [3, 3]
```

**Example 2:**  
Input: `employees = [[1,10,[2]],[2,5,[3]],[3,2,[]]], id = 2`  
Output: `7`  
*Explanation: Employee 2 has importance 5; subordinate 3 has importance 2. Total = 5 + 2 = 7.*

Tree view:
```
   [1,10]
     |
   [2,5]
     |
   [3,2]
```

**Example 3:**  
Input: `employees = [[1,4,[]]], id = 1`  
Output: `4`  
*Explanation: Only one employee, with no subordinates. Total = 4.*

Tree view:
```
[1, 4]
```

### Thought Process (as if you’re the interviewee)  
- Brute-force would involve scanning the entire employees list for every subordinate search. If employees are deeply nested, this is inefficient.
- To optimize, first build a mapping from id → Employee object for O(1) access.
- Use Depth-First Search (DFS) recursively or with a stack. For each employee, add own importance and recursively sum up all subordinates' importance.
- Trade-offs: DFS provides a simple implementation, while BFS is also possible if you want to avoid recursion depth. HashMap is necessary for efficient lookups.

### Corner cases to consider  
- Single employee, no subordinates  
- Disconnected employees not reachable from the given id  
- Employees where subordinates list is empty  
- The given id does not exist in the employees list (should ideally handle gracefully)
- Cycles should not exist as per constraints, but if they do: would need cycle detection (not covered here)

### Solution

```python
# Definition for Employee.
class Employee:
    def __init__(self, id: int, importance: int, subordinates: list[int]):
        self.id = id
        self.importance = importance
        self.subordinates = subordinates

class Solution:
    def getImportance(self, employees: list[Employee], id: int) -> int:
        # Build id → Employee mapping for O(1) look-ups
        employee_map = {emp.id: emp for emp in employees}

        def dfs(emp_id):
            emp = employee_map[emp_id]
            total = emp.importance
            for sub_id in emp.subordinates:
                total += dfs(sub_id)
            return total

        return dfs(id)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of employees. Each employee is visited only once during DFS.
- **Space Complexity:** O(N), for the hashmap `employee_map` and the recursion stack (in the deepest case, recursion depth = number of employees in the longest management chain).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are cycles in the subordinate graph?  
  *Hint: Track visited nodes and detect cycles to avoid infinite recursion*

- How would you solve if employees come from a database/stream (not as a list)?  
  *Hint: Dynamically fetch subordinates, possibly using iterative methods*

- Can you do this iteratively instead of recursion?  
  *Hint: Simulate DFS with a stack or BFS with a queue*

### Summary
This problem is a classic example of hierarchical aggregation on a graph/tree using **DFS** (Depth-First Search). The use of a hashmap for quick lookups is a standard coding pattern when working with id-based object references. This approach generalizes well to organizational chart, tree sum, and transitive closure/aggregate in graphs where nodes refer to each other by id.

### Tags
Array(#array), Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Nested List Weight Sum(nested-list-weight-sum) (Medium)