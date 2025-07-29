### Leetcode 3187 (Hard): Peaks in Array [Practice](https://leetcode.com/problems/peaks-in-array)

### Description  
Given an array of integers `nums` and a list of queries, handle two operations efficiently:
- **[1, l, r]**: Count the number of _peaks_ in the subarray `nums[l..r]`, where a *peak* is an element greater than both its previous and next element.
- **[2, index, val]**: Update `nums[index]` to the given `val`.
*Note*: The first and last elements of any subarray can never be a peak.

### Examples  

**Example 1:**  
Input: `nums = [3,1,4,2,5]`, `queries = [[2,3,4],[1,0,4]]`  
Output: `[1]`  
*Explanation: After the update, nums = [3,1,4,4,5].  
For the query [1,0,4], the only peak is at index 2 (value 4), since 4 > 1 and 4 > 4 is false, so there are no peaks. Original explanation stated 1 because it was for `[3,1,4,2,5]` where index 2: 4 > 1 and 4 > 2.*

**Example 2:**  
Input: `nums = [2,7,1,8,2]`, `queries = [[1,1,3],[2,2,10],[1,1,3]]`  
Output: `[1,1]`  
*Explanation:  
For [1,1,3]: In nums[1..3] = [7,1,8], peak is at index 1 (since 7 > 2 and 7 > 1) ⇒ 1 peak.  
After [2,2,10], nums = [2,7,10,8,2].  
For [1,1,3]: nums[1..3] = [7,10,8], peak at index 2: 10 > 7 and 10 > 8 ⇒ 1 peak.*

**Example 3:**  
Input: `nums = [5,4,3,2,1]`, `queries = [[1,1,3]]`  
Output: ``  
*Explanation:  
For [1,1,3]: subarray [4,3,2]. No element in the range (excluding edges) is greater than both neighbors, so count is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each query of type 1, iterate from l+1 to r-1 and check if nums[i] > nums[i-1] and nums[i] > nums[i+1]. Type 2 can be handled by direct update. Each query (type 1) is O(n), which is too slow for large input.

- **Optimization:**  
  Since queries are mixed (count within subrange, and updates), this is a classic case for a *segment tree* or *Fenwick tree (BIT)* but needs a bitmask representation to store "peak" flags.

  1. Precompute a "peak array" where peak[i] = 1 if i is a peak, else 0.
  2. Use a Fenwick Tree (or Segment Tree) to maintain prefix sums of this peak array.
  3. For query type 1: return prefix sum in peak array over l+1 to r-1 (since endpoints can't be peaks).
  4. For query type 2 (update): when nums[i] is updated, check peak status of i-1, i, and i+1, and update peak array & Fenwick Tree accordingly.

- **Reason for this Approach:**  
  - Range sum/precount—good for Fenwick or Segment Tree.
  - Only neighbors near update need to be checked/modified, so update time is fast (O(log n)).

### Corner cases to consider  
- subarrays of length < 3 (no peaks possible)
- updates on boundary indices (should not cause out-of-bounds errors)
- multiple consecutive updates affecting same indices
- all numbers equal, no peaks
- negative values or zeros

### Solution

```python
class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.bit = [0] * (n + 2)
        
    def update(self, i, delta):
        i += 1  # shift for one-based index
        while i < len(self.bit):
            self.bit[i] += delta
            i += i & -i
            
    def query(self, i):
        i += 1  # shift for one-based index
        res = 0
        while i > 0:
            res += self.bit[i]
            i -= i & -i
        return res
        
    def range_sum(self, l, r):
        return self.query(r) - self.query(l - 1)
    
def is_peak(nums, i):
    # Return whether position i is a peak (excluding endpoints)
    if i <= 0 or i >= len(nums) - 1:
        return 0
    return int(nums[i] > nums[i-1] and nums[i] > nums[i+1])

def peaks_in_array(nums, queries):
    n = len(nums)
    peak = [is_peak(nums, i) for i in range(n)]
    ft = FenwickTree(n)
    for i in range(n):
        if peak[i]:
            ft.update(i, 1)
    
    res = []
    for q in queries:
        if q[0] == 1:
            l, r = q[1], q[2]
            # peaks only at positions l+1 to r-1
            if r - l < 2:
                res.append(0)
            else:
                res.append(ft.range_sum(l+1, r-1))
        else:
            idx, val = q[1], q[2]
            nums[idx] = val
            # Only indices idx-1, idx, idx+1 can have changed peak status
            for j in (idx-1, idx, idx+1):
                if 0 < j < n-1:
                    new_peak = is_peak(nums, j)
                    if peak[j] != new_peak:
                        ft.update(j, new_peak - peak[j])
                        peak[j] = new_peak
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each query is O(log n) due to Fenwick Tree updates/queries, and at most 3 updates per type 2 query. For m queries: O(m log n).

- **Space Complexity:**  
  O(n) for the Fenwick Tree and peak array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if, instead of point updates, you have range updates?
  *Hint: Need more advanced data structures like a segment tree with lazy propagation.*

- What changes if the notion of peak is reversed (valley: less than neighbors)?
  *Hint: Check for nums[i] < nums[i-1] and nums[i] < nums[i+1] in is_peak.*

- How would you handle online queries with even larger constraints?
  *Hint: Explore more space/time efficient data structures or batch processing.*

### Summary
This problem uses the **range query + point update** pattern, efficiently managed by Fenwick Trees or Segment Trees. It’s closely related to problems involving range sums, prefix computation, or maintaining counts after dynamic updates. This approach can be generalized to similar peak/valley or interval-counting queries in mutable arrays.