### Leetcode 3310 (Medium): Remove Methods From Project [Practice](https://leetcode.com/problems/remove-methods-from-project)

### Description  
Given a set of project methods, some of which call others (forming a directed graph of invocations), and given a specific method `k` that has a bug, remove all methods that depend on or are depended upon by `k`. In other words, a method must be removed if it can reach (calls, directly or transitively) `k` or can be reached by `k`. Return the list of methods that **can stay in the project safely**, i.e., those that are completely disconnected from `k` in both directions.

### Examples  

**Example 1:**  
Input: `n = 5`, `k = 2`, `invocations = [[0,1],[1,2],[2,3],[3,4]]`  
Output: ``  
*Explanation: Method `2` is bugged. The call chain is: 0→1→2→3→4.  
- Starting from 2, methods 2,3,4 are affected (reachable from 2).  
- From any method calling 2, work backwards: 1 (calls 2), and 0 (calls 1), so 1 is reaching 2 directly and 0 is not involved with `k` transitively (cannot reach to `k`).  
- Only method `0` is completely safe.*

**Example 2:**  
Input: `n = 4`, `k = 0`, `invocations = [[0,1],[1,2],[2,3]]`  
Output: `[]`  
*Explanation: Method `0` is bugged and is the root; every method is on a path to or from `0`, so none are safe.*

**Example 3:**  
Input: `n = 4`, `k = 3`, `invocations = [[0,1],[2,3]]`  
Output: `[0,1,2]`  
*Explanation: Only invocation is 2→3.  
- Methods 2 and 3 are linked.  
- Remove 3 and any method that calls or is called by 3 (just 2).  
- 0 and 1 are not involved, so return them.*


### Thought Process (as if you’re the interviewee)  
First, I recognized that the problem is about **dependency graphs**: methods as nodes, edges from `a` to `b` if `a` calls `b`.

Our goal is to **remove all methods directly or indirectly “contaminated”** by the bugged method `k`.  
This includes:
- Any method that can reach `k` (ancestors in the graph).
- Any method that can be reached from `k` (descendants in the graph).

**Brute-force idea:**  
For each method, see if there is a path to or from `k` (using BFS/DFS from every method), marking those for removal. This results in O(n²) time.

**Optimize:**
- Do one DFS/BFS from `k` (on the original graph) to mark all descendants (methods that `k` can reach).
- Do one DFS/BFS from `k` (on the reversed graph: edges point towards callers) to find all ancestors (methods that can reach `k`).
- The union of these two sets, plus `k` itself, must be removed.
- All other methods are safe to keep.

This is efficient (O(n+m)), where m is the number of invocations, as each node/edge is visited at most twice.

### Corner cases to consider  
- Empty invocation list (no dependencies).
- `k` is isolated (no calls; nothing else is affected).
- Fully connected graph (every method calls every other; all are unsafe).
- Cycles or self-loops (method calls itself or forms a loop; must not revisit already seen methods).
- When n=1 (only one method, which is also k).
- Multiple disconnected components.


### Solution

```python
def removeMethods(n, k, invocations):
    # Build the graph (adjacency list) for direct calls: a -> b means a calls b
    from collections import defaultdict, deque
    
    graph = defaultdict(list)
    reverse_graph = defaultdict(list)
    for a, b in invocations:
        graph[a].append(b)
        reverse_graph[b].append(a)
    
    # Find all descendants of k: methods that can be reached from k
    descendants = set()
    queue = deque([k])
    while queue:
        curr = queue.popleft()
        for nei in graph[curr]:
            if nei not in descendants:
                descendants.add(nei)
                queue.append(nei)
    
    # Find all ancestors: methods that can reach k (reverse graph)
    ancestors = set()
    queue = deque([k])
    while queue:
        curr = queue.popleft()
        for nei in reverse_graph[curr]:
            if nei not in ancestors:
                ancestors.add(nei)
                queue.append(nei)
    
    # Methods to remove: k itself, all ancestors, all descendants
    to_remove = ancestors | descendants | {k}
    
    # Remaining methods
    return [i for i in range(n) if i not in to_remove]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = number of methods, m = number of invocations. Each node and edge is traversed at most twice (BFS from k in both original and reverse direction).
- **Space Complexity:** O(n + m): we store the forward and reverse graphs (adjacency lists), plus sets of ancestors and descendants, and the queue for BFS (all proportional to inputs).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle dynamic addition/removal of invocations in real-time projects?  
  *Hint: Consider maintaining the graph as a dynamic structure, and updating ancestors/descendants on each change efficiently.*

- What if you needed to report **all call chains** that include the bugged method?  
  *Hint: Use DFS to record all paths from any node to k or from k to any node.*

- Can the solution be made parallel if the method graph is extremely large?  
  *Hint: BFS/DFS traversals from k (or towards k) can be parallelized across disconnected components.*

### Summary
This problem uses standard **graph traversal techniques**: BFS/DFS both from a node and towards a node (by reversing edges), often seen in dependency resolution and impact analysis in software engineering. The pattern is useful for **detecting influence zones, component analysis, and transitive closure**. Efficient in O(n+m), it can be further generalized to broader dependency analysis problems.


### Flashcard
Model as directed graph (methods → calls); find all nodes reachable from k and all nodes that can reach k using BFS/DFS; remove their union.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
