### Leetcode 2581 (Hard): Count Number of Possible Root Nodes [Practice](https://leetcode.com/problems/count-number-of-possible-root-nodes)

### Description  
You are given a **tree** (an undirected connected acyclic graph) with `n` nodes (labeled `0` to `n-1`), described by `edges`. You are given a list of **guesses**—ordered pairs `(u, v)`—which represents someone’s guess that “if the tree is rooted at some node, then `u` is the parent of `v` in that rooted tree.” There is also an integer `k`.

For a node to be a **possible root**, it must be possible to root the tree at that node so that at least `k` of the pairs in `guesses` are correct (i.e., in the resulting rooted tree, `u` is indeed the parent of `v` in at least `k` pairs).

Return **the number of such possible root nodes**.

### Examples  

**Example 1:**  
Input:  
edges=`[[0,1],[1,2],[1,3]]`,  
guesses=`[[1,3],[0,1],[1,0]]`,  
k=`1`  
Output: `3`  
*Explanation: Each node can be a root with at least 1 guess being correct.  
- Root at 0: parent of 1 is 0 ⇒ guess (0,1) correct  
- Root at 1: parent of 3 is 1 ⇒ guess (1,3) correct  
- Root at 2: parent of 1 is 2 or 1, still at least one guess holds.*

**Example 2:**  
Input:  
edges=`[[0,1],[1,2],[2,3],[3,4]]`,  
guesses=`[[1,0],[3,4],[2,3],[0,1]]`,  
k=`2`  
Output: `3`  
*Explanation:  
- For root at 0: (0,1),(2,3) are correct  
- For root at 2: (2,3),(3,4) are correct  
- For root at 3: (3,4) correct, plus something else  
In total, 3 nodes possible.*

**Example 3:**  
Input:  
edges=`[[0,1],[1,2],[1,3],[3,4],[3,5]]`,  
guesses=`[[1,3],[0,1],[1,0],[3,5],[3,4]]`,  
k=`3`  
Output: `1`  
*Explanation: Only root at node 3 can achieve ≥3 correct guesses:
- (1,3): 1 is parent of 3 when rooted at 1 or 0—but not at other nodes  
- (3,5): 3 is parent of 5 if root is 3 or above  
- only root at 3 achieves 3.*

### Thought Process (as if you’re the interviewee)  
First, try the brute-force approach: for each node, root the tree at this node, determine the parent-child relationships, and count how many of the guesses are correct. However, this results in O(n²) time because, for each node, we would have to do a full traversal to build the parent table and then for each guess.

Can we optimize? The key is that “changing the root” in a tree is closely related to tree rerooting and DP on trees.
- First, root the tree at an arbitrary node (say, node 0). Do a DFS to record for every edge direction (parent to child) whether this guess exists, and count the number of correct guesses for root=0.
- To handle rerooting efficiently: If we move the root from parent to child, only the direct edge between them changes direction; all other relationships remain the same—so only a small number of guesses may change their status with each reroot.
- We can exploit this to compute the correct count for all rerootings in O(n) time, by propagating the "guess correct" count from one root to its children on the fly.
- Use a hash set for guesses and precompute initial “correct for root=0”, then DFS to “reroot” and efficiently update the correct guess count for each new root.

Final approach:  
- Build the tree as an adjacency list.
- Build a guess lookup (set or dictionary) for O(1) checks.
- DFS from node 0 to count initial guess corrects.
- Second DFS to reroot, propagate correct-guess count, and count candidate roots.

### Corner cases to consider  
- All guesses are completely wrong or impossible.
- k = 0 (all nodes always valid).
- Guesses covering nodes not present in the tree (should not happen per constraints).
- Large k, possibly unattainable (answer = 0).
- Only one possible root achieves k.
- Tree is just two nodes = minimal case.

### Solution

```python
def rootCount(edges, guesses, k):
    from collections import defaultdict

    n = len(edges) + 1
    g = [[] for _ in range(n)]
    for u, v in edges:
        g[u].append(v)
        g[v].append(u)

    # (parent, child) → True in guesses
    guess_set = set((u, v) for u, v in guesses)
    ans = 0
    initial_correct = 0

    # DFS 1: get parent, and count correct guesses for root=0
    def dfs1(u, par):
        nonlocal initial_correct
        for v in g[u]:
            if v == par:
                continue
            if (u, v) in guess_set:
                initial_correct += 1
            dfs1(v, u)
    dfs1(0, -1)

    # DFS 2: reroot, propagate correct count
    def dfs2(u, par, curr_correct):
        nonlocal ans
        if curr_correct >= k:
            ans += 1
        for v in g[u]:
            if v == par:
                continue
            # adjust "correct" if we reroot from u to v
            delta = 0
            if (u, v) in guess_set:
                delta -= 1
            if (v, u) in guess_set:
                delta += 1
            dfs2(v, u, curr_correct + delta)

    dfs2(0, -1, initial_correct)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m).  
  Building the adjacency list is O(n). Each DFS traverses all nodes and edges once (O(n)). Checking/adjusting guesses is O(1) per edge, total O(n + m) where m = guesses length.
- **Space Complexity:** O(n + m).  
  Adjacency list takes O(n), the guess set is O(m). Call stack O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if guesses are not unique or can have duplicates?  
  *Hint: How would you adjust your lookup and counting mechanism?*

- How would you support dynamic updates to guesses or the tree?  
  *Hint: Consider caching intermediate results or using data structures with efficient updates.*

- Can this method be extended to handle general graphs or only trees?  
  *Hint: Rerooting logic exploits tree properties—what breaks in a general graph?*

### Summary
This problem uses the "tree rerooting" dynamic programming pattern—efficiently calculating answers for all roots by propagating answers as we shift the root from parent to children. The O(n + m) method is key for handling large trees, and the trick is tracking parent-child relationships during reroot using DFS and a hash set for fast lookups.  
This rerooting + tree-DP approach also appears in problems such as calculating distances from all nodes to all others, or distributed computation in trees.


### Flashcard
Root tree arbitrarily, count correct guesses via DFS; use rerooting DP to efficiently compute answer for all possible roots in O(n).

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Closest Node to Path in Tree(closest-node-to-path-in-tree) (Hard)