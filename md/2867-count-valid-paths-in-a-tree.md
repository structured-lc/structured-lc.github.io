### Leetcode 2867 (Hard): Count Valid Paths in a Tree [Practice](https://leetcode.com/problems/count-valid-paths-in-a-tree)

### Description  
Given an undirected tree with **n** nodes labeled 1 to n, and a list of edges, you are asked: *How many unique paths exist in this tree such that the path contains **exactly one** prime number label?*  
A valid path is any sequence of adjacent nodes (no repeated nodes, undirected), and the same path is not counted again in reverse order.

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[1,2],[1,3],[2,4],[2,5]]`  
Output: `6`  
*Explanation: Node labels are [1,2,3,4,5]. Prime numbers are 2,3,5.  
All valid paths with exactly one prime:  
[2], [3], [5] (single nodes)  
[1,2], [2,4], [2,5]

**Example 2:**  
Input: `n = 4, edges = [[1,2],[2,3],[3,4]]`  
Output: `3`  
*Explanation: Node labels: [1,2,3,4], primes: 2,3.  
Valid paths: [2], [3], [1,2], [2,3]. (but note [2,3] is not valid: has 2 primes)

**Example 3:**  
Input: `n = 3, edges = [[1,2],[1,3]]`  
Output: `2`  
*Explanation: Node labels: [1,2,3], primes: 2,3.  
Valid paths: [2], [1,2], [3], [1,3]. ([2,3] not a path since no edge connects them.)

### Thought Process (as if you’re the interviewee)  

- **Brute force approach:**  
  Try all possible paths between all node pairs, check if exactly one node in the path is prime.  
  This is inefficient (O(n²)) since the number of paths in a tree can be quadratic.

- **Observation:**  
  A path in a tree between u and v is unique, since trees are acyclic.  
  Path is valid if and only if, for the set of nodes in that path, exactly one node is labeled with a prime number.

- **Optimized approach:**  
  Use **DFS**.  
  Key insight: “A path is valid if it connects a prime node to a non-prime subtree that does NOT contain any additional primes.”  
  For each prime node,  
    - If we remove the prime node from the tree (i.e., treat it as the “split point”), then each subtree of a prime node is a set of non-prime nodes.  
    - The number of valid paths passing through a prime node p is:  
      For each pair of different subtrees (i.e., sets of non-prime descendants), count the size of those subtrees, and form all possible cross-pairs.  
    - Also, each edge from a prime node to a non-prime can be counted as a valid path (the edge, and the prime alone).

  So,  
    - For every prime node, run DFS to count the size of its direct non-prime subtrees.  
    - For all combinations of subtrees, number of paths = size₁ × size₂.  
    - Total valid paths = sum over all prime nodes.

- **Why does this approach work?**  
  It avoids double counting and only counts unique (unordered) paths with exactly one prime.

- **Trade-offs:**  
  DFS per node, or a single DFS for all subtrees, using parent-child relationships. Overall, O(n) complexity.

### Corner cases to consider  
- Only one node (n = 1).
- No prime-labeled nodes.
- All nodes are prime.
- Chain/tree is skewed (unbalanced, like a line).
- Subtrees with no non-primes (prime connects to only other primes).

### Solution

```python
def countPaths(n, edges):
    from collections import defaultdict

    # Sieve to check if a number is prime (up to n)
    def get_primes_up_to(num):
        is_prime = [True] * (num + 1)
        is_prime[0] = is_prime[1] = False
        for i in range(2, int(num ** 0.5) + 1):
            if is_prime[i]:
                for j in range(i*i, num+1, i):
                    is_prime[j] = False
        return is_prime

    is_prime = get_primes_up_to(n)
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    visited = [False] * (n + 1)
    answer = 0

    def dfs(node, parent):
        """Return the size of the current subtree if node is NOT prime.
        If node is prime, compute cross-pairs among its child subtrees."""
        nonlocal answer
        if is_prime[node]:
            sizes = []
            for child in adj[node]:
                if child != parent:
                    size = dfs(child, node)
                    sizes.append(size)
            # count all pairs across different subtrees (choose any 2 subtrees)
            total = sum(sizes)
            subtotal = 0
            for sz in sizes:
                answer += sz  # path from node (prime) to each node in subtree
                subtotal += sz * (total - sz)
            answer += subtotal // 2  # Each pair is counted twice
            return 0  # Prime nodes can't contribute to parents
        else:
            count = 1
            for child in adj[node]:
                if child != parent:
                    count += dfs(child, node)
            return count

    for node in range(1, n+1):
        if is_prime[node]:
            dfs(node, -1)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Each node and edge is visited only once via DFS.  
  - Sieve of Eratosthenes is O(n log log n), negligible for problem constraints.

- **Space Complexity:** O(n).  
  - For adjacency list, visited array, recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- If the labels were not consecutive [1, n] but arbitrary values up to 10⁹, how would you find primes efficiently?  
  *Hint: You can't use a sieve, need a fast primality test like Miller-Rabin.*

- What if instead of “exactly one” prime, you need “at least k” or “at most k” primes in the path?  
  *Hint: DP with prefix sums, or rerun DFS with counts up to k, more complex path counting.*

- Can you generalize the solution if labels are replaced by arbitrary properties (e.g., “even” nodes)?  
  *Hint: Technique is reusable if the property is closed under subtree and node removal logic.*

### Summary
The approach uses **tree-DFS** and combinatorics from each prime node's perspective to count unique valid paths.  
It's an example of **divide-and-conquer in trees**, and often reappears in problems related to counting paths or subtrees meeting global constraints, especially where properties are rare (e.g., node is “special” or “prime”). This “split at property nodes and combine subtrees” trick is very powerful in tree DP and tree counting problems.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Number Theory(#number-theory)

### Similar Problems
- Count Paths That Can Form a Palindrome in a Tree(count-paths-that-can-form-a-palindrome-in-a-tree) (Hard)