### Leetcode 2050 (Hard): Parallel Courses III [Practice](https://leetcode.com/problems/parallel-courses-iii)

### Description  
Given n courses labeled from 1 to n, each with a specific time needed to complete, and a list of prerequisite relationships (some courses must be completed before others), find the minimum number of months required to complete all courses.  
- Multiple courses can be taken at the same time if their prerequisites are satisfied.
- The prerequisite structure forms a Directed Acyclic Graph (DAG).

### Examples  

**Example 1:**  
Input: `n = 3, relations = [[1,3],[2,3]], time = [3,2,5]`  
Output: `8`  
*Explanation:  
You can start course 1 (3 months) and course 2 (2 months) at the same time.  
Course 3 (5 months) can only start after both are finished.*  
- Finish time for course 3: max(3, 2) + 5 = 8 months

**Example 2:**  
Input: `n = 5, relations = [[1,5],[2,5],[3,5],[3,4],[4,5]], time = [1,2,3,4,5]`  
Output: `12`  
*Explanation:  
- Take courses 1 (1), 2 (2), 3 (3) initially.  
- Course 4 (4) depends on 3, so starts after 3 and takes 4 months (starts at 3, ends at 7).  
- Course 5 depends on 1, 2, 4, 3; starts after all, so after course 4 at month 7, then 5 more = 12.*

**Example 3:**  
Input: `n = 2, relations = [], time = [4,2]`  
Output: `4`  
*Explanation:  
No dependencies; take both courses in parallel.  
Maximum time among all courses = 4.*

### Thought Process (as if you’re the interviewee)  
The core of the problem is a DAG with course dependencies, and we’re asked for the minimum time to complete all of them, knowing we can take any ready course concurrently.  
- **Brute-force** would be to simulate every schedule possibility (backtracking), but that's exponential in both time and memory, so not tractable for n up to 5×10⁴.
- **Optimization**:  
  - The completion time of a course is its own duration **plus** the maximum completion time among all its prerequisites.
  - Process courses in **topological order**: for each course, keep track of the longest path to it.
  - Techniques: Topological Sort (Kahn's algorithm) + Dynamic Programming.
  - For each course, store earliest finish time depending on all its prerequisites.
  - The answer is the max of all courses’ finish times.
- **Why this approach:**  
  - DAG + longest-path = classic topological sort DP.
  - Efficient: time is linear in number of courses + dependencies.

### Corner cases to consider  
- No dependencies at all (empty relations): all courses can be taken in parallel.
- Chain dependencies (course 1 → course 2 → ...): must be taken strictly sequentially.
- Multiple courses with same prerequisite.
- Cycle in prerequisites? (Not possible per constraints; always a DAG.)
- All times equal, or some courses with zero time.
- Very large input.

### Solution

```python
from collections import deque, defaultdict

def minimumTime(n, relations, time):
    # Build graph: next courses and in-degree (number of prerequisites)
    graph = defaultdict(list)
    indegree = [0] * n  # 0-based indexing
    for prev, nxt in relations:
        graph[prev - 1].append(nxt - 1)
        indegree[nxt - 1] += 1

    # f[i]: minimum months to finish course i
    finish = [0] * n

    # Queue for topological processing (courses with zero prerequisites)
    q = deque()
    for i in range(n):
        if indegree[i] == 0:
            finish[i] = time[i]
            q.append(i)

    # Process in topological order
    while q:
        curr = q.popleft()
        for nxt in graph[curr]:
            # For next course, the earliest finish is max of existing or after finishing curr + next's own time
            if finish[nxt] < finish[curr] + time[nxt]:
                finish[nxt] = finish[curr] + time[nxt]
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)

    # The answer is the max finish time of all courses
    return max(finish)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = number of courses, m = number of relations.  
  - Each course and edge is processed once (graph traversal and topological sort).
- **Space Complexity:** O(n + m)
  - For adjacency list, in-degree list, finish time array, and queue.

### Potential follow-up questions (as if you’re the interviewer)  

- If some courses can be repeated after completion, how would you change your approach?  
  *Hint: DP with cycles or modified graph processing.*

- What if courses had capacity constraints (only k courses at once per semester)?  
  *Hint: Layerwise BFS, schedule batching, maybe priority queues.*

- Suppose course durations could overlap only partially (start after some prerequisites finish, not all)?  
  *Hint: Earliest start time per prerequisite, variant of critical path.*

### Summary
This problem is a classic application of **longest path in a DAG** using **topological sort + dynamic programming**.  
It uses a common pattern for scheduling tasks with prerequisites and optimizing resource allocation.  
Similar techniques are applied in "Course Schedule", "Project Scheduling", and "Critical Path Method" (CPM) problems.