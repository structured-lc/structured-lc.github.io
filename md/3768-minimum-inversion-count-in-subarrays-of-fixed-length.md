### Leetcode 3768 (Hard): Minimum Inversion Count in Subarrays of Fixed Length [Practice](https://leetcode.com/problems/minimum-inversion-count-in-subarrays-of-fixed-length)

### Description  
Given an array nums of length n and an integer k, find the minimum number of inversions across all subarrays of fixed length k.  
An inversion is a pair of indices (i, j) where i < j and nums[i] > nums[j] within the subarray.

### Examples  

**Example 1:**  
Input: `nums = [3,1,5,2], k = 3`  
Output: `1`  
*Explanation: Subarrays are [3,1,5] (inversions: (3,1)), [1,5,2] (inversions: (5,2)). Minimum is 1.*

**Example 2:**  
Input: `nums = [3,1,2,4], k = 3`  
Output: `0`  
*Explanation: Subarrays are [3,1,2] (inversions: (3,1),(3,2)), [1,2,4] (inversions: none). Minimum is 0.*

**Example 3:**  
Input: `nums = [1], k = 1`  
Output: `0`  
*Explanation: Single-element subarray has no inversions.*

### Thought Process (as if you’re the interviewee)  
Brute force: For each of the n-k+1 subarrays, count inversions using nested loops (O(k²) per subarray), total O((n-k+1)×k²) = O(nk²), too slow for n,k≤10⁵.  
Optimize: Use sliding window with Fenwick Tree (Binary Indexed Tree) for dynamic inversion counting. Compress coordinates to ranks (O(n log n)), maintain current window inversions by adding/removing elements in O(log n).  
Track min across valid windows. Trade-off: O(n log n) time, O(n) space vs brute's quadratic time; Fenwick handles updates/queries efficiently.

### Corner cases to consider  
- n = k: Single subarray, compute its inversion count.  
- k = 1: All subarrays have 0 inversions (no pairs).  
- Array with duplicates: Inversions require strict > (equals don't count).  
- Sorted array: Minimum is 0.  
- Reverse sorted: Maximum inversions in windows.

### Solution

```python
class FenwickTree:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 1)
    
    def update(self, index, delta):
        # Add delta to index (1-based)
        while index <= self.size:
            self.tree[index] += delta
            index += self.lowbit(index)
    
    def query(self, index):
        # Sum from 1 to index
        res = 0
        while index > 0:
            res += self.tree[index]
            index -= self.lowbit(index)
        return res
    
    def lowbit(self, x):
        return x & -x

def minimumInversionCount(nums, k):
    n = len(nums)
    if k == 1:
        return 0
    
    # Coordinate compression: map values to ranks (1 to n)
    sorted_unique = sorted(set(nums))
    rank = {val: i + 1 for i, val in enumerate(sorted_unique)}  # 1-based
    max_rank = len(sorted_unique)
    
    # Fenwick Tree for ranks
    ft = FenwickTree(max_rank)
    
    # Initial window [0, k-1]
    current_inv = 0
    for i in range(k):
        # Inversions ending at i: count of ranks > current rank
        r = rank[nums[i]]
        current_inv += ft.size - ft.query(r)  # Strictly greater
        ft.update(r, 1)
    
    min_inv = current_inv
    
    # Slide window
    for r in range(k, n):
        # Add nums[r]
        r_rank = rank[nums[r]]
        current_inv += ft.size - ft.query(r_rank)
        ft.update(r_rank, 1)
        
        # Remove nums[r - k]
        l_rank = rank[nums[r - k]]
        current_inv -= ft.query(l_rank)  # Inversions starting at l_rank
        ft.update(l_rank, -1)
        
        min_inv = min(min_inv, current_inv)
    
    return min_inv
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n). Coordinate compression O(n log n), each of n additions/removals is O(log n) via Fenwick updates/queries.
- **Space Complexity:** O(n). Fenwick Tree O(n), rank map O(n), sorting O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if k > n?  
  *Hint: Invalid, but per constraints 1 ≤ k ≤ n; return inversion count of full array or clarify.*

- Modify to return minimum for every possible k?  
  *Hint: Precompute prefix inversions or adapt sliding for multiple k.*

- Handle updates to nums; find min after each?  
  *Hint: Segment tree over Fenwick for dynamic ranges, or rebuild periodically.*

### Summary
Sliding window with Fenwick Tree (BIT) for O(log n) inversion updates/removals after coordinate compression. Common pattern in dynamic inversion counting (e.g., subarray queries); applies to range queries with order statistics.

### Flashcard
Use coordinate compression + Fenwick Tree on sliding window: add element by querying larger ranks ahead, remove by querying smaller ranks before; track min inversions in O(n log n).

### Tags
Array(#array), Segment Tree(#segment-tree), Sliding Window(#sliding-window)

### Similar Problems
