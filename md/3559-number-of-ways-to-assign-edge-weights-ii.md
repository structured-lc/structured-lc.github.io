### Leetcode 3559 (Hard): Number of Ways to Assign Edge Weights II [Practice](https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-ii)

### Description  
Given a tree (connected acyclic undirected graph) with n nodes, you need to assign each edge either weight 1 or 2. Then, you are given q queries, each asking for the parity (even or odd) of the sum of edge weights along the unique path between two nodes. The task is to return the **number of ways to assign edge weights to the tree** such that, for each query, the parity of the path sum between the corresponding pair is as desired.  
This problem requires you to efficiently compute the number of valid edge weight assignments satisfying all given parity constraints for potentially multiple queries over a tree.

### Examples  

**Example 1:**  
Input:  
`n = 3, edges = [[0,1],[1,2]], queries = [[0,2,0]]`  
Output: `2`  
*Explanation: There are 4 assigns possible:*
- (1,1): path sum 2 (even) ✔️
- (1,2): path sum 3 (odd)
- (2,1): path sum 3 (odd)
- (2,2): path sum 4 (even) ✔️

**Example 2:**  
Input:  
`n = 4, edges = [[0,1],[1,2],[1,3]], queries = [[0,2,1],[2,3,1]]`  
Output: `4`  
*Explanation: For each edge, weights {1,2} can be assigned. Constraints specify the parities. There are 4 ways to assign such that both path parities (between 0–2 and 2–3) are odd.*

**Example 3:**  
Input:  
`n = 2, edges = [[0,1]], queries = [[0,1,1],[1,0,1]]`  
Output: `0`  
*Explanation: The two queries ask opposite parity constraints, which is impossible.*

### Thought Process (as if you’re the interviewee)  

First, brute-force would be to try all 2ⁿ⁻¹ ways to assign weights (since each of n-1 edges gets weight 1 or 2), and for each, check all queries; this is clearly infeasible for large n.

Instead, we recognize that each edge’s assignment only affects parities along paths that include it. Assigning 1 or 2 translates to assigning an *even* or *odd* increment along the path—since 1 is odd and 2 is even. Think: for each query, the constraint is equivalent to: "the sum of the weights (mod 2) along the path between u and v equals to parity p".

This is equivalent to a system of linear equations in GF(2) (binary field). Each edge is a variable (set to 0 if weight=2, 1 if weight=1). For every query, sum variables along the path is fixed to the query's parity. Therefore, we can model the problem as a system of binary equations:
- Each edge is a variable xₑ ∈ {0,1}
- For each query, sum of xₑ on the unique path ≡ required parity (mod 2)

Once the system is built, the solution count is 2ᵏ where k = (number of edges) - (rank of the system), iff the system is consistent.

Overall approach: 
- Build the system of equations
- Reduce with Gaussian elimination
- If consistent, answer = 2^{number of edges - number of equations with new info}
- Else, answer = 0

This is a classic "counting assignments for a system of parity constraints on a tree"—an application of linear algebra and combinatorics.

### Corner cases to consider  
- Zero queries: All assignments are valid, so answer is 2ⁿ⁻¹
- Contradictory queries (e.g., same path required both even and odd): answer is 0
- Multiple queries on the same pair, all agreeing: only one constraint, not multiple
- n = 1 (no edges): always 1 way
- Large n, queries ≤ n-1: system still manageable since tree has no cycles

### Solution

```python
def numberOfWays(n, edges, queries):
    # Step 1: Build edge-to-index, adjacency list, and preprocess for LCA/path queries
    from collections import defaultdict, deque

    edge_id = {}
    adj = [[] for _ in range(n)]
    for idx, (u, v) in enumerate(edges):
        adj[u].append((v, idx))
        adj[v].append((u, idx))
        edge_id[frozenset((u, v))] = idx

    # Step 2: For each node, record path from root (0) as set of edge indices
    parent = [-1] * n
    depth = [0] * n
    path_to = [set() for _ in range(n)]

    queue = deque([0])
    while queue:
        u = queue.popleft()
        for v, eidx in adj[u]:
            if v != parent[u]:
                parent[v] = u
                depth[v] = depth[u] + 1
                path_to[v] = path_to[u].copy()
                path_to[v].add(eidx)
                queue.append(v)

    # Step 3: Build system of equations in GF(2)
    matrix = []
    rhs = []

    for u, v, parity in queries:
        # Path = symmetric difference of path_to[u] and path_to[v]
        path_edges = path_to[u] ^ path_to[v]
        equation = [0] * (n-1)
        for eidx in path_edges:
            equation[eidx] = 1
        matrix.append(equation)
        rhs.append(parity)

    # Step 4: Gaussian elimination modulo 2 (GF(2))
    def gauss_jordan(mat, res):
        m = len(mat)
        nvars = len(mat[0]) if mat else 0
        rank = 0
        for col in range(nvars):
            pivot = -1
            for i in range(rank, m):
                if mat[i][col]:
                    pivot = i
                    break
            if pivot == -1:
                continue
            mat[rank], mat[pivot] = mat[pivot], mat[rank]
            res[rank], res[pivot] = res[pivot], res[rank]
            for i in range(m):
                if i != rank and mat[i][col]:
                    # Eliminate
                    for j in range(col, nvars):
                        mat[i][j] ^= mat[rank][j]
                    res[i] ^= res[rank]
            rank += 1

        # Check for inconsistency: row all zero but RHS 1
        for i in range(rank, m):
            if any(mat[i]) == 0 and res[i]:
                return -1  # inconsistent
        return rank

    # Deep copy for safe elimination
    import copy
    matrix_cp = copy.deepcopy(matrix)
    rhs_cp = copy.deepcopy(rhs)
    rk = gauss_jordan(matrix_cp, rhs_cp)
    if rk == -1:
        return 0
    else:
        # (n-1) edges - rank free variables
        MOD = 10**9+7
        return pow(2, (n-1) - rk, MOD)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q): since tree traversal is O(n), and Gaussian elimination for at most q equations, each with n-1 variables, also fits O(q\*n). For q ≤ n, this is efficient.
- **Space Complexity:** O(n + q): adjacency, path tracking, and system matrix (up to q × n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if each edge can have more than two possible weights (say, 1, 2, or 3), and parities are modulo 3?
  *Hint: Can you generalize to GF(p) for prime p, and use similar elimination?*
  
- What if the graph is not a tree (but contains cycles)?
  *Hint: Cycles introduce dependencies, and the solution count may involve cycle basis of the graph.*
  
- How do you efficiently answer each query online, if edge assignments change?
  *Hint: Consider heavy-light decomposition + lazy propagation to maintain parities and quickly update edges.*

### Summary
This is a classical combinatorial linear algebra problem on trees: count valid assignments for parity system constraints. The coding pattern used is **Gaussian elimination in GF(2)** for solving constraints in binary, applied to trees via **unique path** properties and efficient path representation (rooted tree path XOR). This pattern is common in problems about **parity constraints**, **XOR basis**, and **counting assignments that satisfy independent linear (mod 2) constraints**, and can be similarly applied to puzzles, labeling problems, and some coding theory problems.


### Flashcard
Recognize that each query constraint is a parity equation on the path sum; use DFS to build a system of linear equations over GF(2) and count valid assignments via Gaussian elimination.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
