### Leetcode 399 (Medium): Evaluate Division [Practice](https://leetcode.com/problems/evaluate-division)

### Description  
You are given a set of equations such as `"a / b = 2.0"`, represented as pairs of variable strings and their result values. Given several queries like `"a / c"`, return the result of the division if possible. If the query is impossible (e.g., variables are unconnected or unknown), return `-1.0`. Each variable can be related to others transitively (for example: if `"a / b = 2.0"` and `"b / c = 3.0"`, then `"a / c = 6.0"`).  

### Examples  

**Example 1:**  
Input:  
```
equations = [["a","b"],["b","c"]], 
values = [2.0,3.0], 
queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
```
Output:  
```
[6.0,0.5,-1.0,1.0,-1.0]
```
Explanation:  
- `"a / c"`: a/b=2.0 , b/c=3.0 → a/c = 2.0\*3.0 = 6.0  
- `"b / a"`: reverse of a/b, so 1/2 = 0.5  
- `"a / e"`: e is unknown → -1.0  
- `"a / a"`: any variable divided by itself, if it exists, is 1.0  
- `"x / x"`: x is unknown → -1.0  

**Example 2:**  
Input:  
```
equations = [["x1","x2"],["x2","x3"],["x3","x4"],["x4","x5"]],
values = [3.0,4.0,5.0,6.0],
queries = [["x1","x5"],["x5","x2"],["x2","x4"],["x2","x2"],["x2","x9"],["x9","x9"]]
```
Output:  
```
[360.0,0.008333333333333333,20.0,1.0,-1.0,-1.0]
```
Explanation:  
- `"x1 / x5"`: Multiply all: 3\*4\*5\*6=360  
- `"x5 / x2"`: x5/x4\*x4/x3\*x3/x2 = (1/6)\*(1/5)\*(1/4)=1/120=0.008333...  
- `"x2 / x4"`: x2/x3\*x3/x4 = 4\*5=20  
- `"x2 / x2"`: 1.0  
- others infeasible, so -1.0  

**Example 3:**  
Input:  
```
equations = [["a","b"]], 
values = [0.5], 
queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
```
Output:  
```
[0.5,2.0,-1.0,-1.0]
```
Explanation:  
- `"a / b"`: given as 0.5  
- `"b / a"`: reverse, so 2.0  
- `"a / c"` and `"x / y"` cannot be determined.  


### Thought Process (as if you’re the interviewee)  
- At first glance, the problem is about understanding relationships between variables via equations, and then being able to chain such relationships to answer queries.
- Brute-force: For each query, check if a path exists from the numerator to the denominator, multiplying the ratios. But going brute-force per query could be inefficient.
- Optimal approach: Model this as a **graph** problem, where each variable is a node and each equation introduces two weighted edges: one for \(a/b = k\) (edge a→b weight k), another for \(b/a = 1/k\).
- For each query, perform a DFS (or BFS) starting from the source variable, multiplying the weights along the path until we find the target variable. If any variable isn't in the graph, return -1.0.
- Why this works well:  
  - Most data sizes are small so DFS/BFS per query is manageable.
  - Handles cycles, self-queries, and disconnected graphs cleanly.
- Other approaches (like Union-Find with weights) can help with speed if there are many equations/queries, but DFS is easy to implement and fits constraints.

### Corner cases to consider  
- Query uses a variable not seen in any equation → return -1.0
- Both variables are equal, and variable exists → return 1.0
- Both variables are equal, variable does NOT exist → return -1.0
- No path exists between queried variables → return -1.0
- Division-by-itself queries, especially for unknowns
- Multiple disconnected components in the graph  

### Solution

```python
from collections import defaultdict

def calcEquation(equations, values, queries):
    # Build the graph
    graph = defaultdict(dict)
    for (a, b), value in zip(equations, values):
        graph[a][b] = value
        graph[b][a] = 1 / value

    def dfs(curr, target, acc, visited):
        if curr == target:
            return acc
        visited.add(curr)
        for nei, val in graph[curr].items():
            if nei not in visited:
                res = dfs(nei, target, acc * val, visited)
                if res != -1:
                    return res
        return -1

    res = []
    for a, b in queries:
        if a not in graph or b not in graph:
            res.append(-1.0)
        elif a == b:
            res.append(1.0)
        else:
            visited = set()
            ans = dfs(a, b, 1.0, visited)
            res.append(ans if ans != -1 else -1.0)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Let \( n \) be the number of equations and \( q \) the number of queries.  
  - Building the graph: \( O(n) \).
  - Each DFS could visit up to all nodes; in the worst case, each query could be \( O(n) \).  
  - Total: \( O(n + q \cdot n) \) (for all queries, in the worst case).

- **Space Complexity:**  
  - Graph space: \( O(n) \) for the adjacency list.
  - Recursion stack for DFS: up to \( O(n) \).
  - Auxiliary visited set and result array: \( O(n + q) \).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updates to equations after the initial build?  
  *Hint: Consider dynamic graph or Union-Find with path compression.*

- If the number of queries vastly outnumbers equations, can you preprocess for faster answer?  
  *Hint: Precompute all connected components and shortest paths between all pairs.*

- What if equations or queries include negative, zero, or special values?  
  *Hint: Validate input and handle accordingly (but in current problem, only positive values expected).*

### Summary
We modeled the equation relationships as a **weighted bidirectional graph**, using **DFS** to search for a path between query variables and multiply weights along the path. This is a classic graph search pattern, often called "Evaluate Path Product" or "Connected Components with Weights", and can be used in currency conversion, chemical ratio networks, and relationship inference problems.


### Flashcard
Model equations as a weighted graph; use DFS or BFS to find product of weights along path for each query.

### Tags
Array(#array), String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph), Shortest Path(#shortest-path)

### Similar Problems
- Check for Contradictions in Equations(check-for-contradictions-in-equations) (Hard)
- Maximize Amount After Two Days of Conversions(maximize-amount-after-two-days-of-conversions) (Medium)