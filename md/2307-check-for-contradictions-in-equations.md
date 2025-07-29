### Leetcode 2307 (Hard): Check for Contradictions in Equations [Practice](https://leetcode.com/problems/check-for-contradictions-in-equations)

### Description  
Given a list of equations of the form `[A, B]` and a list of real numbers `values` representing the equations `A / B = values[i]`, determine if a contradiction exists among the equations. That is, return `True` if the equations imply conflicting results, and `False` otherwise. For example, if equations imply both `A / B = 2` and `A / B = 3`, that's a contradiction. Precision is handled such that two values are considered equal if their difference is less than 1e-5.

### Examples  

**Example 1:**  
Input: `equations = [["a","b"],["b","c"],["a","c"]]`, `values = [3,0.5,1.5]`  
Output: `False`  
Explanation:  
The equations are:  
- a / b = 3  
- b / c = 0.5  
- a / c = 1.5  
There's no contradiction since a possible assignment is a = 3, b = 1, c = 2.

**Example 2:**  
Input: `equations = [["le","et"],["le","code"],["code","et"]]`, `values = [2,5,0.5]`  
Output: `True`  
Explanation:  
The equations are:  
- le / et = 2  
- le / code = 5  
- code / et = 0.5  
First two imply: code / et = (le / et) / (le / code) = 2 / 5 = 0.4,  
But the third equation says code / et = 0.5.  
Difference is 0.1 > 1e-5, which is a contradiction.

**Example 3:**  
Input: `equations = [["a","b"]]`, `values = [2.0]`  
Output: `False`  
Explanation:  
Only one equation, so no possibility of contradiction.

### Thought Process (as if you’re the interviewee)  
At first glance, this is similar to evaluating division equations, but with the twist of detecting inconsistencies.  
A brute force method would be to check all pairwise implied ratios, but that's not feasible for larger graphs.

A much better approach is to use a **Union-Find (Disjoint Set Union) with weighted edges**, sometimes known as "Union by Ratio".  
- Each variable is a node.  
- When united, keep track of the ratio between the parent and the child.  
- When merging, check if new equations produce a different ratio for an existing relationship (contradiction).  

This is preferred over DFS/BFS because Union-Find can efficiently merge sets and track weights (ratios) with path compression.  
Trade-off: the approach is easy to code, fast (nearly linear), and robust. Precision is handled by floating-point arithmetic with tolerance.

### Corner cases to consider  
- Only one equation (trivially consistent).
- Self relations (x / x).
- Chains that loop back and check for cycle contradicting ratios.
- Repeated equations with same/different values.
- Equation ratios that are very close but not exactly equal (\< 1e-5).
- Disconnected groups of variables.

### Solution

```python
def checkContradictions(equations, values):
    # Map each variable to an integer id
    var_id = {}
    id_counter = 0
    for a, b in equations:
        for v in (a, b):
            if v not in var_id:
                var_id[v] = id_counter
                id_counter += 1

    parent = [i for i in range(id_counter)]
    weight = [1.0 for _ in range(id_counter)]  # weight[i]: ratio up to its parent

    def find(x):
        if parent[x] != x:
            orig_parent = parent[x]
            parent[x] = find(parent[x])
            weight[x] *= weight[orig_parent]  # update weight to the new parent
        return parent[x]

    def union(x, y, value):
        px, py = find(x), find(y)
        if px == py:
            # Check for contradiction, check implied ratio
            implied = weight[y] * value / weight[x]
            return abs(implied - 1.0) > 1e-5
        # Merge py into px, update weight
        parent[py] = px
        weight[py] = weight[x] / (weight[y] * value)
        return False

    for (a, b), v in zip(equations, values):
        ida, idb = var_id[a], var_id[b]
        if union(ida, idb, v):
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × α(N)), where N is the number of variables plus equations, α is inverse Ackermann. Each find/union is almost constant time. Each equation is processed once.
- **Space Complexity:** O(N) for parent and weight arrays plus map from variable names to ids.

### Potential follow-up questions (as if you’re the interviewer)  

- What if precision tolerance is even tighter?
  *Hint: Consider using Decimal or rational arithmetic to avoid floating-point error.*

- How would you handle updates to the equation set over time (dynamic queries)?
  *Hint: Think about fully dynamic Union-Find or persistent DSU structures.*

- Can you return a minimal subset of contradictory equations, if a contradiction exists?
  *Hint: You'd need to track, during union operations, extra information about the generating path/cycle.*

### Summary
This problem used the **Union-Find with weights** (similar to evaluating division equations) to efficiently detect inconsistencies among ratio equations. This is a classic application of Disjoint Set data structures with multiplicative relations ("Union by Ratio"). The pattern appears in problems involving equivalence classes and weighted graph traversals with constraints, such as currency exchange, graph cycles with non-additive weights, or advanced constraint satisfaction.