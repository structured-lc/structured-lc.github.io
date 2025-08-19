### Leetcode 3165 (Hard): Maximum Sum of Subsequence With Non-adjacent Elements [Practice](https://leetcode.com/problems/maximum-sum-of-subsequence-with-non-adjacent-elements)

### Description  
Given an integer array **nums** and a list of **queries**, each of which changes an element at a specific position to a new value, for every query you must return the **maximum sum possible by choosing a subsequence of nums such that no two elements chosen are adjacent**.  
- For each query, update the array, then compute the answer for the updated nums.  
The key is that **no two selected elements are adjacent** (standard House Robber pattern), and you need efficient handling due to large constraints.

### Examples  

**Example 1:**  
Input: `nums = [3, -2, 9], queries = [[1, -2], [0, -3]]`  
Output: `[12, 9]`  
*Explanation:  
After query 1: nums = [3, -2, 9], choose 3 and 9 ⇒ 3 + 9 = 12.  
After query 2: nums = [-3, -2, 9], best is just 9.*

**Example 2:**  
Input: `nums = [0, -1], queries = [[0, -5]]`  
Output: ``  
*Explanation:  
After query: nums = [-5, -1]. The best you can do: pick nothing or -1 or -5 (all ≤ 0), so 0.*

**Example 3:**  
Input: `nums = [2, 2, 8, 6], queries = [[2, 2], [1, 5]]`  
Output: `[10, 13]`  
*Explanation:  
After first query: nums = [2,2,2,6]. Pick 2 and 6 ⇒ 2 + 6 = 8; or pick 2,2, but not adjacent ⇒ max is 2 + 6 = 8.*  
(Sample is hypothetical to show logic applicable.)

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Enumerate all subsequences, check adjacency, take maximum sum. Too slow for \(n > 20\).
- **Classic DP ("House Robber"):** For static array, use DP:
    - dp[i] = max(dp[i-1], dp[i-2] + nums[i])  
    - This runs in O(n), but here nums changes per query.
- **Optimized:**  
    - Recompute DP for every query is too slow for larger n and multiple queries.
    - To support fast updates & queries, use **segment tree** where each node stores (max sum ending/not ending at that node), enabling log(n) updates/queries.
        - Each node keeps:  
            - s0: max sum in range, last not picked  
            - s1: max sum in range, last picked  
        - On updating a value, only O(log n) segment tree updates are required.
    - On each query: update the position, then get the global max between the two states at the root.

**Trade-offs:**  
- Segment tree is more code and more memory, but brings update/query to O(log n).

### Corner cases to consider  
- Empty nums: (Guaranteed by constraint: n ≥ 1)
- All elements negative: best sum is max(0, any element)
- Repeated updates to the same index
- Query changes value to itself (no change)
- One element array
- nums contains zeros

### Solution

```python
class SegmentTreeNode:
    def __init__(self, l, r):
        self.l = l  # left index
        self.r = r  # right index
        self.left = None
        self.right = None
        # State0: max sum if the last element not picked
        # State1: max sum if the last element picked
        self.s0 = 0
        self.s1 = 0

class SegmentTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.root = self.build(0, self.n - 1, nums)

    def build(self, l, r, nums):
        node = SegmentTreeNode(l, r)
        if l == r:
            node.s0 = 0  # If we don't pick
            node.s1 = max(nums[l], 0)  # If we pick (ignore if negative)
            return node
        mid = (l + r) // 2
        node.left = self.build(l, mid, nums)
        node.right = self.build(mid + 1, r, nums)
        self.pushup(node)
        return node

    def pushup(self, node):
        # Merge left and right intervals
        node.s0 = max(node.left.s0, node.left.s1) + max(node.right.s0, node.right.s1)
        node.s1 = max(node.left.s0 + node.right.s1, node.left.s1 + node.right.s0)
        # But for classic House Robber only adjacent matters, so this state merges
        # Fix: Actually only need two states per interval
        node.s0 = max(node.left.s0, node.left.s1) + max(node.right.s0, node.right.s1)
        node.s1 = max(node.left.s0 + node.right.s1, node.left.s1 + node.right.s0)

    def update(self, pos, val, node = None):
        if node is None:
            node = self.root
        if node.l == node.r:
            # Update the value at position pos
            node.s0 = 0
            node.s1 = max(val, 0)
            return
        if pos <= node.left.r:
            self.update(pos, val, node.left)
        else:
            self.update(pos, val, node.right)
        self.pushup(node)

    def query(self):
        # At any time, answer is max(root.s0, root.s1)
        return max(self.root.s0, self.root.s1)

def maximumSumQueries(nums, queries):
    st = SegmentTree(nums)
    res = []
    for pos, val in queries:
        st.update(pos, val)
        res.append(st.query())
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building segment tree: O(n)  
  - Each query (update): O(log n)  
  - Each query (get result): O(1)  
  - For q queries: O(n + q log n)

- **Space Complexity:**  
  - O(n) for segment tree nodes storing the states

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to allow range updates (update a range to a value) instead of a single position?  
  *Hint: Consider using "lazy propagation" in segment trees.*

- Can you support queries asking "maximum non-adjacent subsequence sum in a given subarray [l, r]"?  
  *Hint: You need to augment your segment tree states to return correct state per interval.*

- How would you adapt this approach if you could only use O(1) extra space per query (no segment tree)?  
  *Hint: Is there a way to do this if queries are offline, or if constraints are even smaller?*

### Summary
We used the classic **"House Robber"/DP with non-adjacent constraint** combined with a **segment tree** to efficiently handle dynamic value updates and fast queries.  
This "DP with range updates/merges" pattern is common in problems involving subsequence sums under constraints, and the segment tree state merge is a general dynamic programming pattern for range queries.  
Variants appear in Range Sum Queries, Dynamic Programming on intervals, and some DP optimizations.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Dynamic Programming(#dynamic-programming), Segment Tree(#segment-tree)

### Similar Problems
