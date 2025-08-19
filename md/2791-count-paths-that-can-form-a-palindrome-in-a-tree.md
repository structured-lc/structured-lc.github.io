### Leetcode 2791 (Hard): Count Paths That Can Form a Palindrome in a Tree [Practice](https://leetcode.com/problems/count-paths-that-can-form-a-palindrome-in-a-tree)

### Description  
You are given a rooted tree with `n` nodes, represented by a parent array where `parent[i]` is the parent of node `i` (the root has parent `-1`). Each edge from parent to child `i` is assigned a lowercase letter, given by string `s` where `s[i]` is the label for the edge `parent[i]`–`i`.  
Your task: Count the number of **distinct pairs of nodes** `(u, v)` such that `u < v`, and the multiset of letters along the path from `u` to `v` **can be rearranged to form a palindrome**.  
Recall: A string can form a palindrome if at most one letter occurs an odd number of times.

### Examples  

**Example 1:**  
Input: `parent = [-1,0,0,1,1,2], s = "abaedc"`  
Output: `6`  
*Explanation: Example tree:*
```
        0
      /   \
     1     2
    / \     \
   3   4     5
```
- Paths: (1,3), (1,4), (1,2), (0,3), (0,2), (2,5) all can be rearranged to palindromes.

**Example 2:**  
Input: `parent = [-1,0,0,1,2,2], s = "aazzaz"`  
Output: `5`  
*Explanation: Different character combinations. There are 5 valid (u, v) pairs whose path can be rearranged into a palindrome.*

**Example 3:**  
Input: `parent = [-1,0,0,0], s = "abcd"`  
Output: `0`  
*Explanation: All edge labels are distinct, so no path forms a palindrome unless all character counts except one are even, which doesn't happen here.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  - For every pair of nodes `(u, v)`, collect the path between them and count the letters. Check if at most one character has an odd count.  
  - This approach is **O(n² × path length)** -- too slow for large `n`.

- **Optimization**:  
  - Notice: For any node, the multiset of letters from root to that node can be represented by an array (or a bitmask for parity).  
  - For two nodes `u`, `v`, the letter parity on the path from root to `u` XOR that from root to `v` produces the parity for the path from `u` to `v`.  
  - If the XOR result has **at most one bit set**, then the count can be rearranged into a palindrome.

- **Efficient Approach**:  
  - Use DFS to traverse tree and keep track of the bitmask representing letter parities along the root-to-current path.
  - At each node, count:
    - How many previous nodes have the **same** mask (`0` odd counts)?
    - How many previous nodes differ by **exactly one bit** (`1` odd count)?
  - Use a counter (hashmap) to store how many times each mask appears during traversal.
  - Total time: **O(n × 26)**; space: O(n).

### Corner cases to consider  
- Empty tree
- Tree with one node (no edges)
- All edge characters the same
- All edge characters unique
- Deep (highly unbalanced) tree
- All valid paths (e.g., single character repeated)
- No valid path

### Solution

```python
def countPalindromePaths(parent, s):
    from collections import defaultdict

    n = len(parent)
    tree = [[] for _ in range(n)]
    for i in range(1, n):
        tree[parent[i]].append(i)

    # mask_counter maps bitmask to frequency
    mask_counter = defaultdict(int)
    mask_counter[0] = 1  # root path mask

    def dfs(node, mask):
        result = 0
        # Update mask with current character
        c = ord(s[node]) - ord('a')
        mask ^= 1 << c

        # Count paths with the same mask (no odd count)
        result += mask_counter[mask]
        # Count paths with only one bit difference (one odd count)
        for k in range(26):
            result += mask_counter[mask ^ (1 << k)]

        mask_counter[mask] += 1
        for child in tree[node]:
            result += dfs(child, mask)
        mask_counter[mask] -= 1  # backtrack

        return result

    return dfs(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 26)  
  For each node, you check 26 bitmasks; with n nodes, this is O(n).
- **Space Complexity:** O(n)  
  For the tree and hashmap, plus recursion stack (at most n in degenerate cases).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this problem if the labels were not lowercase English letters?
  *Hint: Consider how the bitmask size and lookups would change.*

- How to report the actual valid (u, v) pairs, not just count?
  *Hint: You would need to store the path/indices along with the mask.*

- What if the constraints for `n` are much larger (e.g., 10⁸ nodes)?
  *Hint: Can you do better in space or in a distributed way?*

### Summary
This utilizes **bitmasking** and **DFS** for efficient palindromic property detection in paths. The key observation is that a path can form a palindrome if at most one letter has an odd count—testable by masking. The pattern is a clever application of bitwise operations and prefix state hashing, a common motif for path, parity, or frequency constraints in tree and string problems.

### Tags
Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Tree(#tree), Depth-First Search(#depth-first-search), Bitmask(#bitmask)

### Similar Problems
- Count Valid Paths in a Tree(count-valid-paths-in-a-tree) (Hard)