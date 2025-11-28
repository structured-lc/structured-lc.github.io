### Leetcode 3057 (Hard): Employees Project Allocation [Practice](https://leetcode.com/problems/employees-project-allocation)

### Description  
Given two tables: `Project` (project_id, employee_id, workload) and `Employees` (employee_id, name, team):

- Each row in `Project` tells you which employee is working on which project, and their project workload.
- Each row in `Employees` tells you the employee's name and which team they belong to.
- **Task:** For every employee allocation to a project, return those where the workload for that allocation is *greater than the average workload* of all employees in that employee's team (across all their project allocations).
- **Return:** The employee_id, project_id, employee_name, and project_workload, ordered by employee_id and then project_id.

### Examples  

**Example 1:**  
Input:  
Project =  
```
| project_id | employee_id | workload |
|------------|-------------|----------|
|     1      |      1      |    45    |
|     1      |      2      |    90    |
|     2      |      3      |    12    |
|     2      |      4      |    68    |
```
Employees =  
```
| employee_id | name   | team |
|-------------|--------|------|
|     1       | Khaled |  A   |
|     2       | Ali    |  B   |
|     3       | John   |  B   |
|     4       | Doe    |  A   |
```
Output:  
```
| employee_id | project_id | employee_name | project_workload |
|-------------|------------|---------------|------------------|
|     2       |     1      |     Ali       |        90        |
|     4       |     2      |     Doe       |        68        |
```
*Explanation:*

- **Team A (Khaled, Doe):**  
  - Projects: Khaled (45), Doe (68)
  - Avg workload = (45 + 68)/2 = 56.5
  - Khaled's workload (45) ≤ avg → Not included  
  - Doe's workload (68) > avg → Included

- **Team B (Ali, John):**
  - Projects: Ali (90), John (12)
  - Avg workload = (90 + 12)/2 = 51
  - Ali's workload (90) > avg → Included  
  - John's workload (12) ≤ avg → Not included

**Example 2:**  
Input:  
Project = `[]`  
Employees = `[[1, "Eve", "Z"]]`  
Output: `[]`  
*Explanation: There are no projects, so nothing qualifies.*

**Example 3:**  
Input:  
Project = `[[1,1,80],[2,2,80],[3,3,60],[4,4,40]]`  
Employees = `[[1,"A","X"],[2,"B","X"],[3,"C","Y"],[4,"D","Y"]]`  
Output:  
```
| employee_id | project_id | employee_name | project_workload |
|-------------|------------|---------------|------------------|
|     1       |     1      |      A        |       80         |
|     2       |     2      |      B        |       80         |
```
*Explanation:*
- Team X: (A:80, B:80) — avg=80 (not strictly greater, so both are not included unless problem says "≥", but per description only workloads > avg)
- Team Y: (C:60, D:40) — avg=50. C's workload is 60 > 50 → included; D's 40 not included.

If the rule is strictly "workload > avg", then Teams X would not output A and B, only C (for 60). But to keep with description: strictly "greater than".

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For each employee, calculate their team average workload (by looking up team, then iterating over all employees in that team for all their projects).
  - For each of their project allocations, compare workload to this value.
  - If workload > avg, include in output.

- **Optimization:**  
  - Precompute the sum and count of workloads for each team (aggregate workloads by team), so you can compute average in constant time.
  - Use mapping: team → (total_workload, count).
  - For each project, lookup the employee’s team and compare project workload to the team's average.

- **Coding approach (without SQL/pandas):**  
  - Build lookup for employee_id → (name, team)
  - Collect project allocations into a data structure per employee and aggregate team workloads.
  - Use the computed averages to filter.

- **Trade-offs:**  
  - Need to process all projects and employees, so O(N) is optimal.  
  - Solution must be careful with teams of size 1 (then their own workload = avg; only > avg will include none).


### Corner cases to consider  
- No projects at all.
- All workloads in a team are equal.
- One project only per employee.
- Team with only one employee (so no employee's workload is greater than the average).
- Employee assigned to multiple projects.
- Projects with 0 workload.

### Solution

```python
def employeesProjectAllocation(project, employees):
    # employee_id → (name, team)
    emp_info = {}
    for emp_id, name, team in employees:
        emp_info[emp_id] = (name, team)

    # team → [workloads]
    team_workloads = {}
    # project allocations with resolved info
    allocations = []
    for proj_id, emp_id, workload in project:
        name, team = emp_info[emp_id]
        allocations.append((emp_id, proj_id, name, workload, team))
        if team not in team_workloads:
            team_workloads[team] = []
        team_workloads[team].append(workload)

    # compute avg for each team
    team_avg = {}
    for team, workloads in team_workloads.items():
        avg = sum(workloads) / len(workloads)
        team_avg[team] = avg

    # filter for allocations with workload > avg in team
    output = []
    for emp_id, proj_id, name, workload, team in allocations:
        if workload > team_avg[team]:
            output.append([emp_id, proj_id, name, workload])

    # sort by employee_id, then project_id
    output.sort(key=lambda x: (x[0], x[1]))
    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of project allocations.  
  - Building lookup tables, aggregating workloads, and filtering are all one pass through the data.
- **Space Complexity:** O(E + P), where E is the number of employees, P is the number of projects.  
  - For maps holding teams, allocations, and outputs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle changes over time (track when allocations start/end)?
  *Hint: Add allocation period & check current active projects only.*

- What if some teams change (employee switches teams mid-project)?
  *Hint: Need project/team history per allocation for correctness.*

- How can this be optimized for very large inputs (scaling to millions of rows)?
  *Hint: Use batching, external sorting, or distributed computation frameworks.*

### Summary
This problem is a **group by/aggregation with a join** pattern, common in database or data analysis questions. The core steps are mapping, grouping, aggregating averages, then filtering — this is widely applicable for analytics, reporting, and ETL pipelines. The coding involves building efficient lookups for per-team and per-employee data, and careful attention to details when there are edge cases with empty data, or teams of size one.


### Flashcard
Precompute team average workload, then for each employee, filter projects where workload exceeds their team's average.

### Tags
Database(#database)

### Similar Problems
