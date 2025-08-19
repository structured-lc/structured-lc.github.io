### Leetcode 2213 (Hard): Longest Substring of One Repeating Character [Practice](https://leetcode.com/problems/longest-substring-of-one-repeating-character)

### Description  
You’re given a string `s`, and **k** queries. Each query consists of an index and a character, which means: replace the character at that index in `s` with the given character. After each query, return the length of the **longest substring where all characters are the same**.  

In simpler terms:  
- You must **update the string** step-by-step with each query.  
- After each update, **find the length of the longest contiguous block of a single character**.  
- Return an answer for _every_ query.

### Examples  

**Example 1:**  
Input:  
`s = "aabaa"`,  
`queryCharacters = "cc"`,  
`queryIndices = [1, 4]`  
Output:  
`[3, 2]`  
*Explanation:  
- First query: change s[1] = 'c' ⇒ s = "acbaa", longest substring is "aaa" (indices 2-4), so length 3.
- Second query: change s[4] = 'c' ⇒ s = "acbac", longest substring is "c" (single), so length 2 ("aa" at 2-3 or "cc" at 1,4).*

**Example 2:**  
Input:  
`s = "abbccc"`,  
`queryCharacters = "bb"`,  
`queryIndices = [1,2]`  
Output:  
`[3, 3]`  
*Explanation:  
- First query: change s[1] = 'b', no change (already b), longest block is "ccc" → length 3.
- Second query: change s[2] = 'b' ⇒ s = "abbbcc", now longest block is "bbb" → length 3.*

**Example 3:**  
Input:  
`s = "ababab"`,  
`queryCharacters = "bbbb"`,  
`queryIndices = [0,2,4,5]`  
Output:  
`[2,2,3,4]`  
*Explanation:  
1. s='b' ⇒ "bbabab", max: "bb" (2)  
2. s[2]='b' ⇒ "bbbab", max: "bbb" (3)  
3. s[4]='b' ⇒ "bbbbab", max: "bbbb" (4)  
4. s[5]='b' ⇒ "bbbbbb", max: "bbbbbb" (6)*

### Thought Process (as if you’re the interviewee)  
First, I’d describe the brute-force approach:  
- For each query, update the string.
- Scan the string left to right and find the length of every contiguous block.
- Take the maximum block length.
- This is O(k \* n) time, which is too slow for large cases.

To optimize:  
- Since each update is only at a **single index**, ideally we should only re-compute the block lengths locally rather than scanning the whole string every time.
- We can use a **Segment Tree**:  
  - Each segment stores: the max block, the prefix block (from start), and suffix block (from end), and the value at node.
  - Updates and queries can both be in O(log n).
- Alternative: Track runs using interval structures (e.g., balanced BST for runs), but this is more code intensive and less obvious than segment tree.

The trade-offs:  
- Segment Tree keeps the entire range query and point update efficient.
- Run-length encoding with set updates is trickier but possible if library support available.

Given these, segment tree is preferred for clarity and efficiency.

### Corner cases to consider  
- Empty string or no queries.
- Queries change a char to itself (should not change the result).
- Whole string is the same character.
- Updates that split or merge runs.
- Queries at the beginning or end of the string.

### Solution

```python
# Segment Tree approach for range queries and point updates

class Node:
    def __init__(self, l, r):
        self.l = l      # left index inclusive
        self.r = r      # right index inclusive
        self.left = None
        self.right = None
        self.prefix = (None, 0)  # (char, length) for block at left
        self.suffix = (None, 0)  # (char, length) for block at right
        self.max_len = 1         # maximum block length in this segment
    
    def set_leaf(self, char):
        self.prefix = (char, 1)
        self.suffix = (char, 1)
        self.max_len = 1

class Solution:
    def longestRepeating(self, s, qc, qi):
        n = len(s)
        s = list(s)
        
        def build(l, r):
            node = Node(l, r)
            if l == r:
                node.set_leaf(s[l])
                return node
            mid = (l + r) // 2
            node.left = build(l, mid)
            node.right = build(mid+1, r)
            update_node(node)
            return node
        
        def update_node(node):
            left = node.left
            right = node.right
            
            # Update prefix
            if left.prefix[0] == right.prefix[0] and left.prefix[1] == left.r - left.l + 1:
                node.prefix = (left.prefix[0], left.prefix[1] + right.prefix[1])
            else:
                node.prefix = left.prefix
            
            # Update suffix
            if right.suffix[0] == left.suffix[0] and right.suffix[1] == right.r - right.l + 1:
                node.suffix = (right.suffix[0], right.suffix[1] + left.suffix[1])
            else:
                node.suffix = right.suffix
            
            # Mid block
            mid_block = 0
            if left.suffix[0] == right.prefix[0]:
                mid_block = left.suffix[1] + right.prefix[1]
            node.max_len = max(left.max_len, right.max_len, mid_block)
        
        def update(node, idx, c):
            if node.l == node.r:
                s[idx] = c
                node.set_leaf(c)
                return
            if idx <= node.left.r:
                update(node.left, idx, c)
            else:
                update(node.right, idx, c)
            update_node(node)
        
        root = build(0, n-1)
        res = []
        for i, c in zip(qi, qc):
            if s[i] != c:
                update(root, i, c)
            res.append(root.max_len)
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + k) × log n)  
  - O(n) to build the tree.  
  - O(log n) per query for update.  
  - k queries, so total O(k × log n).
- **Space Complexity:** O(n)  
  - The segment tree holds O(4n) nodes (safe upper bound).
  - No extra lists or recursion stacks past that.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you do this if you had to support **undo** of queries?
  *Hint: Think about persistent segment trees or snapshots.*
  
- Can you optimize further if all queries are known up front?
  *Hint: Is there an offline way? Are there batch updates you can leverage?*
  
- What if queries were **range updates** (set all chars in interval [l, r])?
  *Hint: Lazy propagation in your segment tree for interval modifications.*

### Summary
This problem is a classic **range query with point update** pattern ideal for **segment trees** with custom node info (max block, prefix and suffix blocks).  
The same coding pattern is applied in problems like:
- Range Maximum Subarray
- Range Majority Queries with modifications
It’s efficient, scalable, and supports both queries and updates in logarithmic time—a common real-world interviews pattern.

### Tags
Array(#array), String(#string), Segment Tree(#segment-tree), Ordered Set(#ordered-set)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Longest Repeating Character Replacement(longest-repeating-character-replacement) (Medium)
- Consecutive Characters(consecutive-characters) (Easy)
- Create Sorted Array through Instructions(create-sorted-array-through-instructions) (Hard)
- Longest Increasing Subsequence II(longest-increasing-subsequence-ii) (Hard)