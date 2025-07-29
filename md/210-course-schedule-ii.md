### Leetcode 210 (Medium): Course Schedule II [Practice](https://leetcode.com/problems/course-schedule-ii)

### Description  
The problem describes a **set of n courses**, labeled `0` to `n-1`, along with a list of **prerequisite pairs**. Each pair `[a, b]` indicates that course `a` requires you to complete course `b` first. Your task is to **find any valid ordering of courses** that respects all prerequisites (that is, for every `[a, b]` in prerequisites, `b` comes before `a` in the output). If there’s **no possible way** to finish all the courses (due to cyclic dependencies), return an **empty list**. The real-world analogy is: find a way to schedule your classes so every class is taken after its prerequisites.

### Examples  

**Example 1:**  
Input: `numCourses = 2, prerequisites = [[1,0]]`  
Output: `[0,1]`  
*Explanation: You have to take course `0` before `1`. So the valid order is [0, 1].*

**Example 2:**  
Input: `numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]`  
Output: `[0,1,2,3]` or `[0,2,1,3]`  
*Explanation: Take 0 first, then 1 and 2 (order doesn't matter, both require 0), and 3 requires both 1 and 2. Some valid orders: [0,1,2,3] or [0,2,1,3].*

**Example 3:**  
Input: `numCourses = 2, prerequisites = [[1,0],[0,1]]`  
Output: `[]`  
*Explanation: Can’t take any course first because each needs the other as a prerequisite — this forms a cycle, so output is empty.*


### Thought Process (as if you’re the interviewee)  

- The problem describes **courses as nodes** and **prerequisites as directed edges** in a graph. We need an **order such that for every edge, the source comes before the destination** — textbook definition of **topological sort**.
- **Brute-force**: Try every permutation. Infeasible; factorial time complexity for n up to 2000; prune this idea.
- **Detecting a cycle**: If the course plan forms a cycle, return an empty list. Otherwise, any topological ordering works.
- **Optimized approach**: Build the graph, do a **topological sort**:
  - Use **BFS with in-degree counting (Kahn’s Algorithm)** or
  - Use **DFS with cycle detection** and ordering.
- Both approaches are valid; BFS/Kahn’s is straightforward for producing the ordering and is less error-prone for cycle handling.
- Trade-offs: BFS explicitly builds the order and handles disconnected nodes smoothly; DFS can be slightly cleaner for recursion but needs careful bookkeeping.


### Corner cases to consider  
- No prerequisites: Any order is valid — output all courses in any sequence.
- Multiple independent chains/graphs — some courses are not connected.
- Single course with or without self-dependency.
- Prerequisite list that forms a cycle (e.g., [1,0],[0,1]).
- Disconnected subgraphs that are individually acyclic.
- Prerequisite list is empty or contains all possible directed edges.
- All courses require a specific course (hub/root node).
- Duplicate prerequisites (should not happen by constraints, but defensively handle if seen).


### Solution

```python
def findOrder(numCourses, prerequisites):
    # Build adjacency list and in-degree count for each course
    adj = [[] for _ in range(numCourses)]  # Each course points to courses that depend on it
    in_deg = [0] * numCourses

    for dest, src in prerequisites:
        adj[src].append(dest)
        in_deg[dest] += 1
    
    # Initialize queue with all nodes having in-degree 0 (can take these first)
    queue = [i for i in range(numCourses) if in_deg[i] == 0]
    order = []

    while queue:
        node = queue.pop(0)
        order.append(node)
        for neighbor in adj[node]:
            in_deg[neighbor] -= 1
            if in_deg[neighbor] == 0:
                queue.append(neighbor)
    
    # If we could schedule all courses, return the order
    if len(order) == numCourses:
        return order
    # If not, there was a cycle
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E + V), where E is the number of prerequisite pairs (edges) and V is the number of courses (nodes). Every edge and every node is processed once.
- **Space Complexity:** O(E + V) for adjacency list, in-degree array, queue, and output array (all proportional to the number of courses and prerequisites).


### Potential follow-up questions (as if you’re the interviewer)  

- If there are multiple valid orderings, how would you return **all** possible orders?  
  *Hint: Use backtracking on the zero in-degree nodes to enumerate all possible topological sorts.*

- How would you optimize for very large numCourses with very few prerequisites?  
  *Hint: Use sparse representations for the adjacency list to save memory, as most nodes will have degree zero.*

- Can this be solved with DFS instead of BFS?  
  *Hint: Topological sort via post-order DFS, but remember to check for cycles and reverse the order you collect nodes.*

### Summary
This problem is a classic example of the **topological sorting** pattern on a **directed acyclic graph (DAG)**. It’s commonly used for **dependency resolution** (courses, projects, build systems). The code leverages **Kahn’s Algorithm (BFS)**, which is especially clear for cycle detection and order production. Variations of this approach can be applied to **task scheduling, build order computation, compilation dependency resolution**, and everywhere dependencies form a directed acyclic structure.