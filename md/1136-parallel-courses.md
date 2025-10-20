### Leetcode 1136 (Medium): Parallel Courses [Practice](https://leetcode.com/problems/parallel-courses)

### Description  
You are given **n** courses labeled from 1 to n and a list of prerequisite relations, where `relations[i] = [prevCourse, nextCourse]` means you must take **prevCourse** before **nextCourse**.  
Each semester, you can take any number of courses as long as you have completed all their prerequisites in previous semesters.  
Find the **minimum number of semesters** required to complete all courses. If it's impossible due to cyclic dependencies, return **-1**.

### Examples  

**Example 1:**  
Input: `n = 3, relations = [[1,3],[2,3]]`  
Output: `2`  
*Explanation: In the first semester, you can take courses 1 and 2 (no prerequisites). In the second semester, take course 3 (prerequisites 1 and 2 completed).*

**Example 2:**  
Input: `n = 3, relations = [[1,2],[2,3],[3,1]]`  
Output: `-1`  
*Explanation: There is a cycle: 1→2→3→1. It is impossible to complete all courses.*

**Example 3:**  
Input: `n = 4, relations = [[2,1],[3,1],[1,4]]`  
Output: `3`  
*Explanation:  
- Semester 1: Take courses 2 and 3  
- Semester 2: Take course 1 (after 2 and 3)  
- Semester 3: Take course 4 (after 1).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible ways to take courses each semester—quickly becomes intractable due to the combinatorial explosion.

- **Observation:**  
  The dependencies form a **directed graph**, where an edge from A→B means A must be taken before B. The goal is to determine the **longest dependency chain** since you can take all “ready” courses each semester. The problem also asks for cycle detection: a cycle means it's impossible.

- **Optimization:**  
  Use **topological sort** (BFS with in-degree queue, or DFS for longest-path):  
  - At each semester, extract all courses without prerequisites (zero in-degree).
  - Remove them, then repeat for the next semester.
  - Count semesters until all courses are taken, or return -1 if a cycle is detected.
  - An alternative is DFS to find the maximum path length (number of semesters = longest path in the DAG)[1][3][4].

- **Trade-offs:**  
  BFS level traversal is more intuitive for “semester count.” DFS may be slightly faster if implemented with memoization and you need longest-path only.

### Corner cases to consider  
- No prerequisites (`relations` empty): take all courses in one semester.
- Cycle in prerequisites: impossible to finish, return -1.
- Multiple independent chains: still max over all chains—the answer is length of the longest path.
- Disconnected nodes (courses with no dependencies).
- Only 1 course.
- Relations given but n=0.

### Solution

```python
def minimumSemesters(n, relations):
    # Build the adjacency list and in-degree array
    from collections import defaultdict, deque

    graph = defaultdict(list)
    in_degree = [0] * (n + 1)  # Courses are 1-indexed

    for prev, nxt in relations:
        graph[prev].append(nxt)
        in_degree[nxt] += 1

    # Queue for courses with no prerequisites
    queue = deque([i for i in range(1, n + 1) if in_degree[i] == 0])

    semester = 0
    taken = 0

    while queue:
        # All courses you can take this semester
        for _ in range(len(queue)):
            course = queue.popleft()
            taken += 1
            for neighbor in graph[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        semester += 1

    return semester if taken == n else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)  
  - n = number of courses; m = number of relations.
  - Each edge and node is processed at most once.

- **Space Complexity:** O(n + m)  
  - For the adjacency list, in-degree array, and queue.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only up to k courses can be taken each semester?  
  *Hint: Change BFS so each round takes min(len(queue), k) courses.*

- What if you need to output one possible valid order of courses (not just the minimum semester count)?  
  *Hint: Use topological sort and record the order as you process nodes.*

- How would you handle dynamic prerequisites (prerequisites can be added mid-way)?  
  *Hint: You may need to re-validate the graph or restart scheduling after each addition, or use dynamic algorithms for cycle detection.*

### Summary
This problem uses the **topological sort** (level-order BFS) pattern to process dependencies and find the minimal number of rounds needed to complete all nodes in a DAG.  
It's a classic scheduling and dependency-resolution problem, commonly found in course scheduling, build systems, and parallel processing.  
The main coding pattern: **Kahn’s Algorithm** for topological order level-by-level, cueing semester rounds as BFS levels, with cycle detection by counting processed nodes.


### Flashcard
Use BFS/topological sort to find the longest path (max semesters); if a cycle is detected, return −1.

### Tags
Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Course Schedule II(course-schedule-ii) (Medium)
- Parallel Courses II(parallel-courses-ii) (Hard)
- Parallel Courses III(parallel-courses-iii) (Hard)