### Leetcode 990 (Medium): Satisfiability of Equality Equations [Practice](https://leetcode.com/problems/satisfiability-of-equality-equations)

### Description  
Given a list of equations in the form `"a==b"` or `"a!=b"`, where each variable is a single lowercase letter, determine if it’s possible to assign a value to each variable such that all equations are satisfied.  
- `"a==b"` means variable 'a' is equal to variable 'b'.  
- `"a!=b"` means variable 'a' is not equal to variable 'b'.  
You must decide if there exists an assignment such that all these constraints hold.

### Examples  

**Example 1:**  
Input: `["a==b", "b!=a"]`  
Output: `False`  
*Explanation: The first equation requires a and b to be equal, but the second requires them to be different, which is a contradiction.*

**Example 2:**  
Input: `["b==a", "a==b"]`  
Output: `True`  
*Explanation: Both equations are equivalent; both require a and b to be the same. No contradictions.*

**Example 3:**  
Input: `["a==b","b==c","a==c"]`  
Output: `True`  
*Explanation: All variables are chained together and equal, so assignment is possible.*

**Example 4:**  
Input: `["a==b","b!=c","c==a"]`  
Output: `False`  
*Explanation: a==b and c==a chain all three to be equal, but b!=c is a contradiction.*

**Example 5:**  
Input: `["c==c","b==d","x!=z"]`  
Output: `True`  
*Explanation: No contradictions appear in these constraints.*

### Thought Process (as if you’re the interviewee)  
To solve this, I'll treat each variable as a node and group together variables that are equal using union-find (disjoint set).  
- **Brute force:** Try all possible assignments, but that's exponential in number of variables — way too slow.  
- **Optimized:** Use **Union-Find**:  
  - First, union variables that are equal ("a==b").  
  - Then, for every "a!=b", check if a and b end up in the same connected group. If so, that's a contradiction.  
- This is efficient because both union and find operations can be made nearly constant time with path compression and rank (or just with path compression for this problem since the domain is small).  
- This approach works because all equalities must be satisfied first (so variables are merged together), and then we need to ensure no inequality contradicts those merges.

### Corner cases to consider  
- All equations require the same variables to be equal.
- A variable compared to itself with "!=" (e.g., "a!=a"): always false.
- Redundant equations, e.g., "a==a", "b==b" (should always be true).
- No variables overlap.
- Only inequalities.
- Empty input.

### Solution

```python
# Satisfiability of Equality Equations using Union-Find

def equationsPossible(equations):
    # Union-Find parent initialization for all 26 lowercase letters
    parent = [i for i in range(26)]

    def find(x):
        # Path compression
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        # Merge the sets containing x and y
        parent[find(x)] = find(y)

    # First, process all "==" equations and unite them
    for eq in equations:
        if eq[1:3] == "==":
            idx1 = ord(eq[0]) - ord('a')
            idx2 = ord(eq[3]) - ord('a')
            union(idx1, idx2)

    # Now, process all "!=" equations and check for contradictions
    for eq in equations:
        if eq[1:3] == "!=":
            idx1 = ord(eq[0]) - ord('a')
            idx2 = ord(eq[3]) - ord('a')
            # If two variables are found in the same connected set, contradiction
            if find(idx1) == find(idx2):
                return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of equations. Each union-find operation is nearly constant (amortized) because the variable set size is limited (≤26).
- **Space Complexity:** O(1), since the parent array is fixed in size (26 symbols), regardless of equations count.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the variables are not limited to single letters but could be arbitrary strings?
  *Hint: You’d need to use a hash map to encode each variable name to an integer id or parent pointer.*

- How could you extend this to handle "a > b" and "b > c" type inequalities as well?
  *Hint: You’d need to model inequality relations as a directed graph and detect cycles.*

- Can this approach handle equations containing more than two variables ("a==b==c")?
  *Hint: In this case, process them pairwise since equality is associative.*

### Summary
This solution uses the **Union-Find** (Disjoint Set Union, DSU) pattern, commonly used to resolve connectivity and equivalence problems efficiently, especially when relationships are transitive and can be modeled as sets. It’s a standard technique for problems involving grouping and checking for contradictions and is widely used in network connectivity, Kruskal’s MST, and other graph applications.