### Leetcode 3615 (Hard): Longest Palindromic Path in Graph [Practice](https://leetcode.com/problems/longest-palindromic-path-in-graph)

### Description  
Given an undirected graph with n nodes (labeled from 0 to n-1), edges, and a string where the iᵗʰ character is the label of node i, find the maximum possible length of a **palindromic path**. A palindromic path is any path that visits a set of unique nodes (no repeats), such that the sequence of characters for these nodes forms a palindrome. The path can start from any node, and each node may be visited at most once.

### Examples  

**Example 1:**  
Input: `n = 3, edges = [[0,1],[1,2]], labels = "aba"`  
Output: `3`  
*Explanation: The path 0→1→2 forms "aba", which is a palindrome (length 3 is the maximum possible).*

**Example 2:**  
Input: `n = 4, edges = [[0,1],[1,2],[1,3]], labels = "bcbc"`  
Output: `3`  
*Explanation: Paths like 0→1→2 ("bcb") and 2→1→3 ("cbc") are both palindromic subsequences of length 3.*

**Example 3:**  
Input: `n = 2, edges = [], labels = "aa"`  
Output: `1`  
*Explanation: Only single-node paths are possible as there are no edges ("a" per node).*  

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to generate all simple (no repeated nodes) paths in the graph, collect their node labels in sequence, and check if each string is a palindrome, keeping track of the maximum length. For n ≤ 14 (small graphs), this is acceptable but not scalable for large n.

To optimize, notice:
- The problem reduces to finding the **longest simple path** in the graph whose node characters form a palindrome.
- We can use DFS starting from each node, maintaining a bitmask of visited nodes. For every path, on the fly, build the sequence of characters and check if it is a palindrome.
- To speed up palindrome checks, we could consider dynamic programming, but since n is small (≤ 14), bitmasking works efficiently ([3]).

Trade-offs: DFS with backtracking and bitmask optimization is chosen due to low n; for larger graphs, we'd need memoization.

### Corner cases to consider  
- Graph with no edges (all paths are of length 1).
- All node labels are the same (any path is palindromic).
- Paths with only two nodes (need to check both directions).
- Non-connected graphs (treat each connected component separately).
- Graph is a simple line, cycle, or star.

### Solution

```python
# For n ≤ 14, do DFS from every node; use bitmask for visited nodes and build path string.

def longest_palindromic_path(n, edges, labels):
    from collections import defaultdict
    
    # Build adjacency list
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    max_len = 1  # At least one node path is possible

    def is_palindrome(path):
        left, right = 0, len(path) - 1
        while left < right:
            if path[left] != path[right]:
                return False
            left += 1
            right -= 1
        return True

    def dfs(node, visited, path_chars):
        nonlocal max_len
        # Check current path
        if is_palindrome(path_chars):
            max_len = max(max_len, len(path_chars))
        for nei in graph[node]:
            if not (visited & (1 << nei)):
                dfs(nei, visited | (1 << nei), path_chars + labels[nei])
    
    for start in range(n):
        dfs(start, 1 << start, labels[start])
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 2ⁿ × n). There are n starting points; for each, in the worst case, 2ⁿ paths (all subsets of nodes, bitmask), and checking palindrome for each path takes up to O(n) time.
- **Space Complexity:** O(n + E + n) = O(n + E). O(n) for path_chars per DFS call, O(E) for adjacency list, and recursion depth up to n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize this if n is much larger (say n = 1000)?  
  *Hint: Dynamic programming with state compression, or limiting search to certain components.*

- Can you output the actual palindromic path (node indices), not just its length?  
  *Hint: Track the sequence of nodes along with characters in DFS.*

- How would you extend it if paths could re-use nodes?  
  *Hint: Would need to handle cycles, potentially infinite loops—think about a visited state tuple.*

### Summary
This problem uses standard DFS and backtracking with bitmask optimizations for small graphs. It combines character sequence construction (like word/path problems) with palindrome checking, and applies exhaustive search due to small constraints. This pattern—enumerating all simple paths and building/judging their properties on the fly—is a common approach in graph/DFS interview questions.


### Flashcard
Use DFS with bitmask to enumerate all simple paths; for each path, collect node labels and check if the resulting string is a palindrome; track maximum length.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Graph(#graph), Bitmask(#bitmask)

### Similar Problems
