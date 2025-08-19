### Leetcode 207 (Medium): Course Schedule [Practice](https://leetcode.com/problems/course-schedule)

### Description  
Given a total number of courses, labeled from 0 to n-1, and a list of prerequisite pairs, determine if you can finish all the courses. Each prerequisite pair [a, b] means that to take course a, you must first have completed course b. In effect, you're asked: *Is there a way to schedule the courses so that every prerequisite is satisfied?* The challenge is equivalent to checking whether the directed graph formed by these prerequisites has a cycle. If there’s a cycle, it’s impossible to finish all the courses. Otherwise, it is possible.

### Examples  

**Example 1:**  
Input: `numCourses = 2, prerequisites = [[1,0]]`  
Output: `True`  
Explanation: You can take course 0 first, and then course 1.

**Example 2:**  
Input: `numCourses = 2, prerequisites = [[1,0],[0,1]]`  
Output: `False`  
Explanation: Course 0 depends on 1 and 1 depends on 0 — this creates a cycle, making it impossible to complete both.

**Example 3:**  
Input: `numCourses = 5, prerequisites = [[1,4],[2,4],[3,1],[3,2]]`  
Output: `True`  
Explanation: A valid order would be: 4 → 1 → 2 → 3 (or 4 → 2 → 1 → 3, as 1 and 2 can be swapped before 3).

### Thought Process (as if you’re the interviewee)  
First, I identify that this is a **graph problem**, since each course is a node, and prerequisites are directed edges. The main issue is *cycle detection* — if there is a cycle, it's impossible to complete the courses.  
Brute force would involve trying all possible orders, but that's inefficient. A more optimal approach is to use either:
- **Depth-First Search (DFS)**: Use DFS to detect cycles in the prerequisite graph. Keep a "visiting" set (recursion stack) to check for back edges (cycles).
- **Topological Sort** (BFS/Kahn's Algorithm): If we can find a valid topological order of all nodes (courses), then it’s possible to finish all courses; if not, a cycle exists.

DFS is direct (good for cycle detection when recursion/stack is allowed). Kahn’s Algorithm is more iterative, but both work for this problem.

### Corner cases to consider  
- numCourses is 0 (no courses) — should return True (trivially possible to finish).
- No prerequisites (prerequisites list is empty) — possible to finish all.
- Self-dependency: prerequisites like [0,0] (course requires itself) — not possible.
- Disconnected graphs (several isolated subgraphs).
- Multiple independent cycles.

### Solution

```python
def canFinish(numCourses, prerequisites):
    # Build adjacency list for the course graph
    adj = [[] for _ in range(numCourses)]
    for dest, src in prerequisites:
        adj[src].append(dest)
    
    # 0 = unvisited, 1 = visiting, 2 = visited
    state = [0] * numCourses
    
    def dfs(course):
        if state[course] == 1:
            # Node currently in stack: cycle detected
            return False
        if state[course] == 2:
            # Already checked - no cycle from this node
            return True
        # Mark as visiting
        state[course] = 1
        for neighbor in adj[course]:
            if not dfs(neighbor):
                return False
        # Mark as visited
        state[course] = 2
        return True

    for course in range(numCourses):
        if not dfs(course):
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(V + E)  
  Each course (V) and each prerequisite (E) is visited at most once, as all edges and nodes are traversed during the DFS.
- **Space Complexity:** O(V + E)  
  - O(V) for the state array and recursion stack (worst-case depth is V).
  - O(E) for adjacency list storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return one valid order to finish the courses?  
  *Hint: Adapt DFS or use Kahn’s Algorithm for topological sort to build order.*

- What if the input size is very large (large number of courses and prerequisites)?  
  *Hint: Consider iterative approaches, and be mindful of recursion stack size in DFS.*

- Could multiple independent cycles exist — how would your code handle it?  
  *Hint: As written, DFS will detect cycles in any component since it checks every node.*

### Summary
This problem is a classic application of **cycle detection in a directed graph**. Using DFS with visited states (unvisited, visiting, visited) efficiently checks for cycles. It’s a prototypical problem for practicing **graph traversal** and especially **topological sort**; the same strategy often appears in project task scheduling, build pipeline ordering, and course planning scenarios.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Course Schedule II(course-schedule-ii) (Medium)
- Graph Valid Tree(graph-valid-tree) (Medium)
- Minimum Height Trees(minimum-height-trees) (Medium)
- Course Schedule III(course-schedule-iii) (Hard)
- Build a Matrix With Conditions(build-a-matrix-with-conditions) (Hard)