### Leetcode 1767 (Hard): Find the Subtasks That Did Not Execute [Practice](https://leetcode.com/problems/find-the-subtasks-that-did-not-execute)

### Description  
Given two tables, **Tasks** and **Executed**, where each task can have multiple subtasks numbered from 1 up to a given count, find all *subtasks* that have **not** been executed. You are to return (task\_id, subtask\_id) pairs for all subtasks that have not yet been executed.  
- The **Tasks** table tells you the id and how many subtasks belong to each task.  
- The **Executed** table lists which (task\_id, subtask\_id) pairs were actually executed.  
- Return all pairs that *could exist* per Tasks but do *not* exist in Executed.

### Examples  

**Example 1:**  
Input:  
Tasks =  
|task\_id|subtasks\_count|  
|---|---|  
|1|3|  
|2|2|  
|3|4|  

Executed =  
|task\_id|subtask\_id|  
|---|---|  
|1|2|  
|3|1|  
|3|2|  
|3|3|  
|3|4|  

Output:  
|task\_id|subtask\_id|  
|---|---|  
|1|1|  
|1|3|  
|2|1|  
|2|2|  
Explanation.  
- Task 1 has subtasks 1, 2, 3: only subtask 2 executed, so return 1 and 3.
- Task 2 has subtasks 1, 2: none executed, so return 1 and 2.
- Task 3 has subtasks 1, 2, 3, 4: all executed, so return nothing for task 3.

**Example 2:**  
Input:  
Tasks =  
|task\_id|subtasks\_count|  
|---|---|  
|5|1|  

Executed =  
|task\_id|subtask\_id|  
|---|---|  
|5|1|  

Output:  
(no rows)  
Explanation.  
- The only task's only subtask executed, so nothing to return.

**Example 3:**  
Input:  
Tasks =  
|task\_id|subtasks\_count|  
|---|---|  
|7|2|  

Executed =  
|task\_id|subtask\_id|  
|---|---|  
(no rows)  

Output:  
|task\_id|subtask\_id|  
|---|---|  
|7|1|  
|7|2|  
Explanation.  
- No subtasks executed, so return all that could exist for task 7.

### Thought Process (as if you’re the interviewee)  

- **Understand requirements:** We must generate all possible (task\_id, subtask\_id) pairs from Tasks, and exclude those present in Executed.
- **Brute-force idea:** For each task, loop from subtask 1 to subtasks\_count and for each, check whether that pair appears in the Executed list. Collect those not found.
- **Database/Set version:** Basically, this is a set difference between all possible (task\_id, subtask\_id) pairs and the Executed table.
- **Optimal approach:**  
    - Generate all possible (task\_id, subtask\_id) pairs.
    - Use a set (or efficient lookup) to check whether a subtask has been executed.
    - Only output pairs where no execution exists.
- **Trade-offs:** Generating all possible (task\_id, subtask\_id) can be expensive if task and subtask counts are huge. But it is precise and direct. Lookup in a set/dictionary is very fast, so overall performance should be acceptable.

### Corner cases to consider  
- Tasks table is empty.
- Subtask count is 0 (even though not stated, should handle, or skip).
- Tasks where no subtasks are executed.
- Tasks where all subtasks are executed.
- Executed contains subtasks for tasks not in Tasks (should not happen per description).
- Repeated entries in Executed (should only consider unique pairs).
- Large number of tasks or subtasks.

### Solution

```python
# Given:
# Tasks: List of dicts: [{'task_id': int, 'subtasks_count': int}, ...]
# Executed: List of dicts: [{'task_id': int, 'subtask_id': int}, ...]
# Return: List of [task_id, subtask_id] pairs, representing unexecuted subtasks

def find_unexecuted_subtasks(tasks, executed):
    # Step 1: Create a set of all executed (task_id, subtask_id) pairs for fast lookup
    executed_set = set()
    for row in executed:
        executed_set.add((row['task_id'], row['subtask_id']))
    
    result = []
    # Step 2: For each task, check all possible subtask ids 1..subtasks_count
    for task in tasks:
        task_id = task['task_id']
        n_subtasks = task['subtasks_count']
        for sub_id in range(1, n_subtasks + 1):
            if (task_id, sub_id) not in executed_set:
                result.append([task_id, sub_id])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(T + E + N),  
    - T = number of tasks,  
    - E = number of Executed rows,  
    - N = sum of all subtasks (i.e., ∑ subtasks\_count over all tasks),  
    since we must visit every executed, every task, and generate/check every possible subtask id.
- **Space Complexity:** O(E + N),  
    - E for storing executed pairs in a set,  
    - up to N for storing the result list (N = total possible subtasks).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if some tasks had 10⁶ subtasks?  
  *Hint: Would memory or performance become a concern?*

- If Executed table is very large, how would you store or index it to keep lookups fast?  
  *Hint: Consider using database indexes or python sets.*

- How would you modify the solution to return only the tasks where *all* subtasks failed to execute?  
  *Hint: Track count of executed per task or compare counts.*

### Summary
This problem uses the **set difference** pattern: produce all possible combinations, then subtract the *existing* (executed) ones. The core technique is **efficient lookups** (set/dict) and systematic enumeration of possible outputs. This pattern is broadly common in SQL (left join, anti-join) and also in coding: it can apply to diff-ing tables, missing values, and more.