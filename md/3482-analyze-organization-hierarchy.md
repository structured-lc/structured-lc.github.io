### Leetcode 3482 (Hard): Analyze Organization Hierarchy [Practice](https://leetcode.com/problems/analyze-organization-hierarchy)

### Description  
You are given an `Employees` table (not a programming structure but a SQL table), where each row records:
- `employee_id`: a unique ID for each employee,
- `employee_name`: the employee’s name,
- `manager_id`: the employee’s direct manager (null for the CEO),
- `salary`: their salary.

For each employee, produce a result with:
- Their `employee_id` and `employee_name`.
- Their `level` in the hierarchy (CEO is level 1, direct report is level 2, and so on).
- Their `team_size` (the count of all employees they manage, directly or indirectly).
- Their `budget` (their own salary plus the sum of salaries of all employees they manage, directly or indirectly).

The results should be sorted by `level` ascending, then by `budget` descending, and then by `employee_name` ascending.

### Examples  

**Example 1:**  
Input:  
Employees table:  

| employee_id | employee_name | manager_id | salary |
|-------------|--------------|------------|--------|
| 1           | Alice        | null       | 1000   |
| 2           | Bob          | 1          | 800    |
| 3           | Carol        | 1          | 700    |
| 4           | Dave         | 2          | 500    |
| 5           | Eve          | 2          | 500    |

Output:  
| employee_id | employee_name | level | team_size | budget |
|-------------|--------------|-------|-----------|--------|
| 1           | Alice        | 1     | 4         | 3500   |
| 2           | Bob          | 2     | 2         | 1800   |
| 3           | Carol        | 2     | 0         | 700    |
| 4           | Dave         | 3     | 0         | 500    |
| 5           | Eve          | 3     | 0         | 500    |

*Explanation:*
- Alice (CEO) is at level 1, has a team size of 4 (everyone else), and her budget is sum of all salaries.
- Bob & Carol are level 2 (reporting to Alice). Bob manages Dave & Eve, so team size=2, budget=Bob+Dave+Eve.
- Dave & Eve are both direct reports to Bob, so level=3, team_size=0, budget=own salary.

**Example 2:**  
Input:  
Employees table:  

| employee_id | employee_name | manager_id | salary |
|-------------|--------------|------------|--------|
| 1           | Adam         | null       | 2000   |

Output:  
| employee_id | employee_name | level | team_size | budget |
|-------------|--------------|-------|-----------|--------|
| 1           | Adam         | 1     | 0         | 2000   |

*Explanation:*
- Single CEO, no reports, team_size 0, budget = own salary.

**Example 3:**  
Input:  
Employees table:  

| employee_id | employee_name | manager_id | salary |
|-------------|--------------|------------|--------|
| 1           | Zee          | null       | 5000   |
| 2           | Yan          | 1          | 3000   |
| 3           | Xia          | 2          | 2000   |
| 4           | Wei          | 2          | 1500   |
| 5           | Ves          | 3          | 1200   |

Output:  
| employee_id | employee_name | level | team_size | budget |
|-------------|--------------|-------|-----------|--------|
| 1           | Zee          | 1     | 4         | 12700  |
| 2           | Yan          | 2     | 3         | 7700   |
| 3           | Xia          | 3     | 1         | 3200   |
| 4           | Wei          | 3     | 0         | 1500   |
| 5           | Ves          | 4     | 0         | 1200   |

*Explanation:*
- Each employee’s `level`, `team_size`, and `budget` are calculated by rolling up all subordinates (direct + indirect).

### Thought Process (as if you’re the interviewee)  
First, I’d recognize this is a *hierarchical aggregation problem*. For each employee, I need to traverse their subtree in the org-chart tree.

- **Brute-force approach:** For each employee, perform a DFS/BFS to count subordinates and sum salaries by traversing all nodes below them. For each node, repeat. This is O(n²), inefficient for large n but okay if n is small.
- **Optimized approach:** Since it’s a tree, post-order DFS can compute team size and budget in one traversal, memoizing results as we go up the tree.
    - Step 1: Build the tree by mapping each manager to their reports.
    - Step 2: Perform DFS from the CEO. For each node, compute team_size and budget from its children.
- Why this approach: It’s clean, efficient (O(n)), and scales for large organizations.

Trade-offs:
- Brute-force is simpler, but slow.
- DFS with memoization minimizes redundant work, and gives all answers in a single pass.

### Corner cases to consider  
- Empty table (no employees).
- Only one employee (CEO, no managers).
- Employees with no reports.
- Cyclic relationships (invalid input, but should ideally be mentioned).
- Employees with same salary.
- Multiple employees with same name (names not primary key).
- Deep hierarchy (test stack/recursion limit).
- Disconnected employees (should not happen per typical org structure).

### Solution

```python
# Given: List[Dict] with keys: "employee_id", "employee_name", "manager_id", "salary"
# Output: List[Dict] with the specified columns.

def analyze_organization_hierarchy(employees):
    # Build id to employee mapping for fast lookup
    id_to_emp = {e["employee_id"]: e for e in employees}

    # Build manager -> list of reports adjacency list
    from collections import defaultdict

    mgr_to_reports = defaultdict(list)
    for emp in employees:
        if emp["manager_id"] is not None:
            mgr_to_reports[emp["manager_id"]].append(emp["employee_id"])

    # Find the root (CEO): manager_id is None
    roots = [emp["employee_id"] for emp in employees if emp["manager_id"] is None]
    if not roots:
        return []

    # Prepare data storage
    results = {}
    # Helper dfs to calculate team_size and budget
    def dfs(emp_id):
        emp = id_to_emp[emp_id]
        team_size = 0
        budget = 0

        for child_id in mgr_to_reports.get(emp_id, []):
            c_team, c_budget = dfs(child_id)
            team_size += 1 + c_team
            budget += c_budget

        budget += emp["salary"]
        results[emp_id] = {
            "employee_id": emp["employee_id"],
            "employee_name": emp["employee_name"],
            # level will be assigned later
            "salary": emp["salary"],
            "team_size": team_size,
            "budget": budget
        }
        return team_size, budget

    # Compute levels (BFS)
    from collections import deque

    level_map = {}
    queue = deque()
    for root in roots:
        queue.append((root, 1))  # root is level 1

    while queue:
        emp_id, lvl = queue.popleft()
        level_map[emp_id] = lvl
        for child_id in mgr_to_reports.get(emp_id, []):
            queue.append((child_id, lvl + 1))

    # Run traversal from each root (for genericity)
    for root in roots:
        dfs(root)

    # Construct final output
    output = []
    for emp_id in results:
        output.append({
            "employee_id": results[emp_id]["employee_id"],
            "employee_name": results[emp_id]["employee_name"],
            "level": level_map[emp_id],
            "team_size": results[emp_id]["team_size"],
            "budget": results[emp_id]["budget"]
        })

    # Sort by level ascending, then budget descending, then employee_name ascending
    output.sort(key=lambda x: (x["level"], -x["budget"], x["employee_name"]))

    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each employee is visited once for DFS/postorder subtree calculations, and once for BFS level labeling and for final sorting. Sorting is O(n log n), which dominates for large n but, typically, n is not huge for orgs.
- **Space Complexity:** O(n). Storage for id mappings, child lists, results, and the recursion stack (max depth is hierarchy depth, ≤ n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cycles in the input data?  
  *Hint: Before DFS, perform a visited-set check to detect cycles.*

- How can you support incremental updates efficiently (e.g., salary/change, addition/removal)?  
  *Hint: Store parent/child pointers and memoize subtree info for dynamic updates.*

- How would you parallelize the subtree aggregates in a distributed system?  
  *Hint: Partition the tree, aggregate bottom-up, and merge partial results from subtrees.*

### Summary
This problem is an example of *tree dynamic programming/traversal*, especially post-order DFS for root-to-leaf aggregations common in org-chart, file-system, or company structure problems. The efficient solution leverages parent/child mapping and tree traversal patterns, which are very common in directory-size, role-based access, and dependency graph analyses.


### Flashcard
Use post-order DFS to compute subordinate count and total salary for each employee's subtree in a single traversal.

### Tags
Database(#database)

### Similar Problems
