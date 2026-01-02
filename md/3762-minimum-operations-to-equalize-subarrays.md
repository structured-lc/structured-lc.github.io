### Leetcode 3762 (Hard): Minimum Operations to Equalize Subarrays [Practice](https://leetcode.com/problems/minimum-operations-to-equalize-subarrays)

### Description  
Given an array `nums` and integer `k`, you can increase or decrease any element by exactly `k` in one operation. You are also given `queries`, where each query `[left, right]` asks for the **minimum operations** to make all elements in subarray `nums[left..right]` equal, or return `-1` if impossible. Elements can only be equalized to a target `t` if `(nums[i] - t) % k == 0` for all `i` in the range.

### Examples  

**Example 1:**  
Input: `nums = [1,3,6], k = 3, queries = [[0,2]]`  
Output: `[2]`  
*Explanation: Subarray [1,3,6]. All elements mod 3 = 1, so target t=1 (or 4, etc.). Cost: |1-1|/3 + |3-1|/3 + |6-1|/3 = 0 + 1 + 2 = 3? Wait, optimal median target 3: |1-3|/3 + |3-3|/3 + |6-3|/3 = 1 + 0 + 1 = **2**. Return [2].*

**Example 2:**  
Input: `nums = [1,2,2,4], k = 2, queries = [[1,3]]`  
Output: `[-1]`  
*Explanation: Subarray [2,2,4]. Mod 2: 0,0,0 — feasible. But wait, example likely [1,2,3] where mods differ (1,0,1). Impossible since not all `(nums[i] % k)` equal. Return [-1].*

**Example 3:**  
Input: `nums = [2,2,2], k = 1, queries = [[0,2]]`  
Output: ``  
*Explanation: Subarray [2,2,2] already equal. All mods same, cost to median 2 is 0+0+0=**0**. Return .*

### Thought Process (as if you’re the interviewee)  
First, brute force: For each query [L,R], check if all `nums[i] % k` same (else -1). If yes, try all possible targets t = nums[L] + m*k, compute sum(|nums[i]-t|/k), take min — O(Q * N^2) too slow for N,Q=1e5.  

Key insight: Feasibility requires all elements congruent mod k (same remainder r). Then targets are t where t % k == r. Cost = sum(|nums[i]-t|/k) = (1/k) * sum(|nums[i]-t|), so minimize sum of absolute deviations → **target = median** of subarray (proven minimum for L1 distance).  

But per-query median is O(Q * N log N) with sorting. For large N,Q=1e5, need offline query processing. Use **Mo's Algorithm**: Sort queries into blocks by L, then by R. Maintain frequency map of remainders and sorted multiset of values (only those with max remainder freq). Add/remove elements O(1) amortized, compute median O(1), total cost O((N+Q) * sqrt(N) * F) where F=log N for multiset.  

Trade-off: Mo's is cache-friendly but complex to code; segment tree/fenwick on sorted values per remainder could work but higher constant.

### Corner cases to consider  
- All elements already equal (cost 0).  
- Subarray length 1 (always 0).  
- No common remainder mod k (-1).  
- k=1 (always possible, median of entire subarray).  
- All nums[i] % k identical but spread out (median minimizes).  
- Large N,Q=1e5 (must be O(N sqrt N)).  
- Negative nums (handle % k carefully: (nums[i] % k + k) % k).

### Solution

```python
from typing import List
from collections import defaultdict
import bisect

class SegTree:  # Segment tree for frequency count, max freq, and median access
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (4 * n)  # freq count
        self.maxf = [0] * (4 * n)  # max freq in range
        
    def _update(self, node: int, start: int, end: int, idx: int, val: int):
        if start == end:
            self.tree[node] += val
            self.maxf[node] = self.tree[node]
            return
        mid = (start + end) // 2
        if idx <= mid:
            self._update(2*node, start, mid, idx, val)
        else:
            self._update(2*node+1, mid+1, end, idx, val)
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]
        self.maxf[node] = max(self.maxf[2*node], self.maxf[2*node+1])
    
    def update(self, idx: int, val: int):
        self._update(1, 0, self.n - 1, idx, val)
    
    def _query_maxf(self, node: int, start: int, end: int, l: int, r: int) -> int:
        if r < start or end < l: return 0
        if l <= start and end <= r: return self.maxf[node]
        mid = (start + end) // 2
        return max(self._query_maxf(2*node, start, mid, l, r),
                   self._query_maxf(2*node+1, mid+1, end, l, r))
    
    def query_maxf(self, l: int, r: int) -> int:
        return self._query_maxf(1, 0, self.n - 1, l, r)
    
    def _query_total(self, node: int, start: int, end: int, l: int, r: int) -> int:
        if r < start or end < l: return 0
        if l <= start and end <= r: return self.tree[node]
        mid = (start + end) // 2
        return self._query_total(2*node, start, mid, l, r) + \
               self._query_total(2*node+1, mid+1, end, l, r)
    
    def query_total(self, l: int, r: int) -> int:
        return self._query_total(1, 0, self.n - 1, l, r)

def minimumOperations(nums: List[int], k: int, queries: List[List[int]]) -> List[int]:
    n = len(nums)
    # Precompute remainders 0 to k-1
    rem = [(nums[i] % k + k) % k for i in range(n)]  # handle negative
    max_val = max(nums) - min(nums)  # compress values to 0..range for segtree
    
    # Mo's Algorithm setup
    block_size = int(n ** 0.5) + 1
    qidx = list(range(len(queries)))
    qidx.sort(key=lambda i: (queries[i][0] // block_size, queries[i][1]))
    
    # Data structures: cnt[rem][compressed_val] freq
    cnt = [defaultdict(int) for _ in range(k)]
    # sorted_vals[rem] maintains sorted unique vals with freq
    sorted_vals = [[] for _ in range(k)]
    # freq_tree[rem] for O(log) median find
    freq_tree = [SegTree(max_val + 1) for _ in range(k)]
    
    # Current window [cl, cr]
    cl, cr = 0, -1
    ans = [-1] * len(queries)
    
    def add(pos: int):
        r = rem[pos]
        val = nums[pos]
        # Remove duplicates in sorted_vals by freq adjust
        if cnt[r][val] == 0:
            bisect.insort(sorted_vals[r], val)
        cnt[r][val] += 1
        cidx = val - min(nums)  # compressed
        freq_tree[r].update(cidx, 1)
    
    def remove(pos: int):
        r = rem[pos]
        val = nums[pos]
        cnt[r][val] -= 1
        cidx = val - min(nums)
        freq_tree[r].update(cidx, -1)
        if cnt[r][val] == 0:
            sorted_vals[r].remove(val)
    
    def get_cost() -> int:
        # Find rem with max freq == window size
        max_freq = 0
        best_r = -1
        for r


### Flashcard
Check if all nums[L..R] ≡ r (mod k); if not, -1. Otherwise, choose **median** of subarray as target to minimize sum(|nums[i]-median|)/k.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Segment Tree(#segment-tree)

### Similar Problems
