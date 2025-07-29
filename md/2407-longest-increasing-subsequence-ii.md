### Leetcode 2407 (Hard): Longest Increasing Subsequence II [Practice](https://leetcode.com/problems/longest-increasing-subsequence-ii)

### Description  
Given an array `nums` and an integer `k`, find the length of the **longest increasing subsequence** such that for every pair of adjacent elements in the subsequence, their difference is at most `k` (i.e., for every pair of consecutive picked indices `i, j`, `0 ≤ i < j < n`, require: `nums[j] > nums[i]` and `nums[j] - nums[i] ≤ k`).  
Return the maximum possible length of such a subsequence.

### Examples  

**Example 1:**  
Input: `nums = [1,5,3,4,2,6,7], k = 2`  
Output: `5`  
*Explanation: Possible LIS: [1,3,4,6,7]. Each consecutive difference ≤ 2.*

**Example 2:**  
Input: `nums = [4,2,1,4,3,4,5,8,15], k = 3`  
Output: `5`  
*Explanation: Possible LIS: [1,3,4,5,8]. Each consecutive difference ≤ 3.*

**Example 3:**  
Input: `nums = [7,4,5,1,8,12,4,7], k = 5`  
Output: `4`  
*Explanation: Possible LIS: [4,5,8,12]. Each consecutive difference ≤ 5.*


### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all subsequences, check if each consecutive pair satisfies the increasing and difference ≤ k constraints. This is exponential and not feasible.

- **Standard DP:**  
  For normal LIS: For each i, look at all j < i, if nums[j] < nums[i] consider dp[j] + 1. For this problem, also require nums[i] - nums[j] ≤ k.
  
  dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i] and nums[i] - nums[j] ≤ k.  
  But this is O(n²), which is not efficient enough.

- **Optimized DP using Range Query:**  
  Since nums[i] can be up to 10⁵, we can use a **Segment Tree** or **Binary Indexed Tree** (Fenwick Tree) to store DP values for fast max queries in the range [nums[i] - k, nums[i) (i.e., for all possible previous values eligible for an extension).
  
  For each value v in nums:  
    - Query for the max dp value in the range [v-k, v-1], let’s call this prev\_max.
    - Set the current dp[v] = prev\_max + 1.
    - Update the segment tree at v with dp[v].
  
  At the end, the answer is the max dp over all values.

- **Tradeoff:**  
  This reduces complexity to O(n log U), where U is the range of nums’ values.  
  Using a segment tree allows both query and update in log U time, making it suitable for large arrays.

### Corner cases to consider  
- Empty array: nums = [], should return 0.
- All elements equal: [5,5,5], k = 0 or k = any.
- Strictly decreasing array: [5,4,3,2,1].
- Large k: k large enough to allow any increasing step.
- One element case: .
- Gaps in numbers exceeding k (ensuring not all elements can be chained).
- Duplicate numbers appearing at non-consecutive positions.

### Solution

```python
# Segment Tree solution for range max queries and point updates

class SegmentTree:
    def __init__(self, size):
        self.N = size
        self.tree = [0] * (4 * size)

    def update(self, idx, val, node, l, r):
        if l == r:
            self.tree[node] = max(self.tree[node], val)
            return
        mid = (l + r) // 2
        if idx <= mid:
            self.update(idx, val, 2 * node, l, mid)
        else:
            self.update(idx, val, 2 * node + 1, mid + 1, r)
        self.tree[node] = max(self.tree[2 * node], self.tree[2 * node + 1])
    
    def query(self, ql, qr, node, l, r):
        if qr < l or ql > r:
            return 0
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        return max(self.query(ql, qr, 2 * node, l, mid),
                   self.query(ql, qr, 2 * node + 1, mid + 1, r))
        

def lengthOfLIS(nums, k):
    if not nums:
        return 0
    max_val = max(nums)
    seg = SegmentTree(max_val + 2)
    res = 0
    for v in nums:
        left = max(0, v - k)
        right = v - 1
        prev_max = seg.query(left, right, 1, 0, max_val + 1)
        curr_len = prev_max + 1
        seg.update(v, curr_len, 1, 0, max_val + 1)
        res = max(res, curr_len)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log U), where n = len(nums), U = range of nums’ possible values (max(nums)). For each number, both query and update run in log U.
- **Space Complexity:** O(U), for segment tree storage, where U = max(nums) + 2. Also O(1) extra per loop and no recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k = 0?  
  *Hint: Only strictly increasing, no gaps at all.*
  
- How would you recover the actual subsequence, not just length?  
  *Hint: Store parent pointers during DP — reconstruct by backtracking.*

- Could you solve this if nums has negative values?  
  *Hint: Map all values to positive indices for the segment tree using coordinate compression.*

### Summary
This is a **dynamic programming with efficient range queries** problem, using a **segment tree** to answer max-len queries for valid previous elements in log-time.  
It's an advanced form of the LIS pattern, especially for problems involving a maximum step/k constraint between elements.  
Segment or Binary Indexed Trees and DP arrays with coordinate compression are common for extending LIS for range-constrained or value-constrained variants of LIS.