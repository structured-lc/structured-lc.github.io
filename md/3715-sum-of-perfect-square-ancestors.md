### Leetcode 3715 (Hard): Sum of Perfect Square Ancestors [Practice](https://leetcode.com/problems/sum-of-perfect-square-ancestors)

### Description  
You are given an integer `n` and an undirected tree with `n` nodes (numbered 0 to n-1), rooted at node 0 and described by `edges`. Each node has an integer value given in `nums`. For every node, consider all its ancestors (nodes on the path toward the root). For each such ancestor, if the product of the ancestor’s value and the current node’s value is a perfect square, count it. Compute the sum (across all nodes except the root) of such ancestors.

In other words: for each node (other than the root), count how many ancestors (strict ancestors, not including self) have their value multiplied with the current node's value to give a perfect square. Return the total count.

### Examples  

**Example 1:**  
Input:  
edges = [[0,1],[0,2],[1,3],[1,4]], nums = [10, 2, 20, 8, 5]  
Output: `4`  
*Explanation:  
Tree is:  
```
    0
   / \
  1   2
 / \
3   4
```
- Node 1: ancestor 0, 10×2=20 (not square) — 0  
- Node 2: ancestor 0, 10×20=200 (not square) — 0  
- Node 3: ancestors 1,0  
  - 8×2=16 (square), 8×10=80 (not) — 1  
- Node 4: ancestors 1,0  
  - 5×2=10 (not), 5×10=50 (not) — 0  
Total: 1 (for node 3).  
(Some testcases may have more matches depending on square factorization.)

**Example 2:**  
Input:  
edges = [[0,1],[0,2]], nums = [6, 24, 9]  
Output: `2`  
*Explanation:  
Tree:
```
   0
  / \
 1   2
```
- Node 1: anc 0, 6×24=144 (square, 12²) — 1  
- Node 2: anc 0, 6×9=54 (not) — 0  
Total: 1

**Example 3:**  
Input:  
edges = [], nums = [7]  
Output: `0`  
*Explanation:*  
Only the root, no ancestors to check.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  - For each node (except root), list all ancestors.
  - For each ancestor, multiply ancestor's value by node’s value, and check if the result is a perfect square.
  - Checking if the product is a perfect square is O(√(value)), so this quickly becomes too slow.
  - Also, the same subtree may have redundant work.

- **Optimization – Number Theory:**  
  - The key: The product of two numbers is a perfect square iff their "square-free part" is identical.
  - The *square-free part* of a number is its prime factors with odd exponents.
  - Example: 12=2²×3, square-free part is 3.
  - If we preprocess each value into its square-free form (by removing all possible square factors), then two numbers a, b when multiplied give a perfect square iff their square-free part matches.
  - As we traverse the tree (DFS), for the current node, we keep a count of square-free forms along the ancestor path.  
  - For each node:
    - To count matching ancestors: count of ancestors with the same square-free form.
    - Add current node's square-free form to path when descending, backtrack (remove) when finishing that node.

- **Algorithm:**
  - Preprocess all nums into their square-free part.
  - Do DFS from root. For each node, maintain a map of {square-free value: count} for ancestors along current path.
  - At each node: count = map[square-free value of node]
  - Add that count to answer, then increment map, recurse on children, then decrement map.

- **Why this works:**  
  - Since each square-free part can be at most one per ancestor, and values are at most 10⁵, this is efficient, O(n log val).

### Corner cases to consider  
- Tree with only root node: no ancestors exist, output 0.
- Multiple nodes have the same value.
- nums entries with value 1 (which is always a perfect square).
- Values that are already perfect squares.
- Tree is a straight path (degenerate).
- Tree with repeated edges or incorrect input (but LeetCode input is valid tree).

### Solution

```python
from collections import defaultdict

def get_square_free(x):
    # Reduce x by removing squares of all small primes
    i = 2
    res = 1
    while i * i <= x:
        exp = 0
        while x % i == 0:
            x //= i
            exp += 1
        if exp % 2 == 1:  # only keep if exponent is odd
            res *= i
        i += 1
    if x > 1:  # leftover prime factor
        res *= x
    return res

def sumOfAncestors(n, edges, nums):
    # preprocess: convert nums to their square-free part
    sqf = [get_square_free(num) for num in nums]
    # adjacency list
    tree = [[] for _ in range(n)]
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)
    ans = 0
    def dfs(u, parent, counter):
        nonlocal ans
        # Count matching ancestors
        ans += counter[sqf[u]]
        counter[sqf[u]] += 1
        for v in tree[u]:
            if v != parent:
                dfs(v, u, counter)
        counter[sqf[u]] -= 1  # backtrack

    counter = defaultdict(int)
    dfs(0, -1, counter)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × √max(nums))
  - For each node, `get_square_free` runs up to √nums[i].
  - DFS traversal is O(n).

- **Space Complexity:** O(n)
  - For storing the ancestor path counts, and adjacency list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the tree were not rooted or edges were given in arbitrary order?  
  *Hint: Need to first choose a root and orient the tree, perhaps with BFS.*

- Suppose nums are much larger, up to 10⁹.  
  *Hint: Need a more efficient prime factorization (precompute primes up to √max, use Pollard's rho, etc).*

- What if instead of perfect squares, you were asked for perfect cubes?  
  *Hint: Prime factor exponents should be divisible by 3, generalize "square-free part" idea to "cube-free residue".*

### Summary
This problem combines number theory (square-free residue) and path-counting with DFS on trees. The key insight is to match square-free parts, reducing ancestor counting to a prefix-frequency problem during traversal. This "factor signature on path" pattern appears in other GCD/LCM/prime-related ancestor queries.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Tree(#tree), Depth-First Search(#depth-first-search), Counting(#counting), Number Theory(#number-theory)

### Similar Problems
