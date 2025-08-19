### Leetcode 3476 (Medium): Maximize Profit from Task Assignment [Practice](https://leetcode.com/problems/maximize-profit-from-task-assignment)

### Description  
Given a list of **workers** (workers[i] is the skill level of the iᵗʰ worker), and a list of **tasks** (tasks[j] is the required skill for the jᵗʰ task, and tasks[j][1] the profit for completing that task), assign tasks so as to **maximize the total profit**.  
- Each worker can take at most one task, and **only if their skill matches the task's requirement exactly**.
- There is **one extra "universal" worker** who can take any remaining unassigned task (regardless of skill).  
Return the **maximum total profit** possible under these rules.

### Examples  

**Example 1:**  
Input: `workers = [1,2,3]`, `tasks = [[2,100],[2,10],[1,50],[3,100]]`  
Output: `250`  
*Explanation:*
- Assign worker with skill 1 → task [1,50] (profit +50).
- Assign worker with skill 2 → task [2,100] (profit +100).
- Assign worker with skill 3 → task [3,100] (profit +100).
- No tasks left for universal worker.
- Total = 50 + 100 + 100 = 250.

**Example 2:**  
Input: `workers = [1,1]`, `tasks = [[1,1],[1,2],[2,100]]`  
Output: `103`  
*Explanation:*
- Two workers with skill 1 choose tasks [1,2] and [1,1] (profit +2, +1).
- Task [2,100] can’t be assigned to any worker, so universal worker takes it (+100).
- Total = 2 + 1 + 100 = 103.

**Example 3:**  
Input: `workers = [1,2]`, `tasks = [[1,5],[1,10],[2,1],[3,50]]`  
Output: `65`  
*Explanation:*
- Worker with skill 1 takes highest-paying [1,10] (profit +10).
- Worker with skill 2 takes [2,1] (+1).
- Only one task [1,5] remains for skill 1, but no skill 1 workers left.
- Universal worker picks highest-paying left task: [3,50] (+50).
- Total = 10 + 1 + 50 = 61.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try every permutation to match workers and tasks, then assign leftovers to the universal worker. This is exponential in complexity (O(n!)), so it is not feasible.

- **Optimize by grouping:**  
  1. *Group tasks by skill requirement.* For each skill, maintain a max-heap (priority queue, descending by profit) so we assign the most profitable task of that skill first.
  2. For each worker, if there’s a task matching their skill, assign them the highest-profit available, and remove that task from the group.
  3. After all workers have been assigned, the universal worker can take any one remaining (unassigned) task, so pick the one with the **max profit** among all leftover tasks.
  4. Add up all profits earned to get the result.

- **Why this approach?**
  - Each specific worker should maximize their own skill’s benefit.
  - The universal worker should not “waste” their power on a low-value task when a regular worker could cover it.
  - Using hash tables and heaps ensures O(n log k) efficiency, where n is number of tasks and k is number of skill levels.

### Corner cases to consider  
- No workers.
- No tasks.
- More workers than tasks, or vice versa.
- Tasks with duplicate skill and profit.
- All workers have skill not matching any available task.
- Multiple tasks with same skill, but fewer workers for that skill.
- Only universal worker assigned any task (if worker list is empty).

### Solution

```python
import heapq
from collections import defaultdict

def maximize_profit(workers, tasks):
    # Group tasks by skill, use max-heaps for each skill (store as negative profit for max-heap via heapq)
    skill_to_tasks = defaultdict(list)
    for req_skill, profit in tasks:
        heapq.heappush(skill_to_tasks[req_skill], -profit)
    
    total_profit = 0
    used_tasks = set()   # To avoid double assigning the same task

    # Assign tasks to workers
    for w in workers:
        if skill_to_tasks[w]:
            # Assign the most profitable task for this skill
            p = -heapq.heappop(skill_to_tasks[w])
            total_profit += p

    # After all regular workers, universal worker can pick the highest-profit leftover task.
    remaining_candidates = []
    for task_list in skill_to_tasks.values():
        for profit in task_list:
            heapq.heappush(remaining_candidates, profit)  # store negative profits
    
    if remaining_candidates:
        # pick the highest (which is the smallest negative value)
        total_profit += -heapq.heappop(remaining_candidates)
    
    return total_profit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k + m log t)  
  - Grouping all tasks: O(n log k) (heap operations for k skills, n tasks).
  - Assigning workers: O(m log k) (looking up per worker).
  - Scanning leftovers: O(n log n) for the universal worker.
  - All together, still linearithmic in number of tasks/workers.

- **Space Complexity:** O(n)
  - For storing task groupings and heaps. Each task is stored once.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if each worker can take up to k tasks?
  *Hint: Process assignments in rounds, track tasks assigned per worker.*

- What if a worker can take any task as long as their skill ≥ required skill?
  *Hint: Consider sorting skills and greedy assignment, similar to "Most Profit Assigning Work".*

- How would your solution change if there were multiple universal workers?
  *Hint: After normal assignments, sort leftover tasks by profit; for each universal worker, pick the max remaining.*

### Summary
This is a classic **Greedy Matching** problem using hash tables and priority queues, optimizing per group before picking the global maximum for the special case (universal worker).  
It’s a pattern seen in greedy resource assignment and task scheduling problems, particularly where partial matching and a final “joker”/universal case exists (e.g., multi-stage assignment, hospital-resident matching, advanced allocation problems).

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
