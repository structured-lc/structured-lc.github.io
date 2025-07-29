### Leetcode 1889 (Hard): Minimum Space Wasted From Packaging [Practice](https://leetcode.com/problems/minimum-space-wasted-from-packaging)

### Description  
Given n packages, each with a certain size, and m suppliers, each providing boxes of different sizes (with unlimited supply), the goal is to assign each package to a box (from the same supplier) such that:
- Each package fits into a box (package size ≤ box size).
- You must use boxes from only one supplier.
- The **wasted space** for a package is (box size - package size). The total wasted space is the sum for all packages.
Find the minimum total wasted space among suppliers. If it's impossible to pack all packages with any supplier, return -1. Otherwise, return the result modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `packages = [2,3,5]`, `boxes = [[4,8],[2,8]]`  
Output: `6`  
*Explanation:  
Choosing the first supplier:  
Assign packages 2 and 3 to box size 4 (waste: 4-2=2, 4-3=1), package 5 to box size 8 (waste: 8-5=3).  
Total waste = 2+1+3 = 6.*

**Example 2:**  
Input: `packages = [2,3,5]`, `boxes = [[1,4],[2,3,8]]`  
Output: `6`  
*Explanation:  
First supplier can't fit package 5 (max box is 4), so skip.  
Second supplier:  
2→2 (0 waste), 3→3 (0 waste), 5→8 (3 waste).  
Total waste = 0+0+3 = 3.*

**Example 3:**  
Input: `packages = [3,5,8]`, `boxes = [[2,8],[2,6]]`  
Output: `-1`  
*Explanation:  
First supplier: box size 8 can fit 3, 5, 8, but only one box. (If boxes are reusable: all fit in 8, waste=5+3+0=8)  
If only one supplier can fit all packages, but for each package there must be a box at least as large as package. Here, it's impossible for the second supplier (biggest box is 6).*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try every supplier, for each, assign every package to every possible box, summing the wastes. For n packages and up to m suppliers and k box sizes, that's O(m \* n \* k) – too slow.
- **Optimization:**  
  First, sort `packages` and every supplier's `boxes`.  
  For each supplier:  
    - If their largest box < largest package, skip (can't pack all).
    - For each box size, find all packages with size ≤ box, and assign them (binary search helps find the right segment).
    - Cumulatively sum waste: for each segment, waste = box size \* #packages in segment - sum of package sizes.
    - Store the minimum waste across all suppliers.
- **Why this method:**  
  Sorting and prefix sums on `packages` make segment computations fast. Binary search on sorted lists fits well for this scenario.

### Corner cases to consider  
- No supplier can pack all packages (return -1).
- Multiple suppliers give the same minimum waste.
- Duplicate box sizes or package sizes.
- All boxes are smaller than at least one package.
- Only one package or one supplier.
- Empty `packages` or `boxes` (shouldn't arise per constraints).

### Solution

```python
def minWastedSpace(packages, boxes):
    MOD = 10**9 + 7
    packages.sort()
    n = len(packages)
    pre_sum = [0] * (n + 1)
    for i in range(n):
        pre_sum[i + 1] = pre_sum[i] + packages[i]
        
    res = float('inf')
    for supplier_boxes in boxes:
        supplier_boxes.sort()
        if supplier_boxes[-1] < packages[-1]:
            continue  # Can't fit largest package
        
        total = 0
        i = 0
        for box in supplier_boxes:
            # Find the rightmost package that can fit in 'box'
            j = i
            while j < n and packages[j] <= box:
                j += 1
            # Now, packages[i:j] can be packed in box of this size
            count = j - i
            if count > 0:
                # total waste: (box * count) - total size of those packages
                total += box * count - (pre_sum[j] - pre_sum[i])
                i = j
            if i == n:
                break
        if i == n:
            res = min(res, total)
    
    return res % MOD if res != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m \* (k log k + n log n)).  
  - Sort `packages`: O(n log n).
  - For each supplier (m), sort `boxes` (k log k), then for each box, scan packages (advanced version uses binary search instead of scanning).  
  - With optimization, O(m \* (k log k + n log k)), since we only traverse the sorted packages once per supplier.

- **Space Complexity:** O(n) for prefix sums + in-place sort.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the approach change if you could use boxes from multiple suppliers?  
  *Hint: Think of dynamic programming, or partitioning packages for minimum total waste.*

- If each supplier had a limited number of boxes, how would you pack?  
  *Hint: Consider bin-packing or greedy algorithms with capacity tracking.*

- Can you optimize the solution for online queries, where boxes or packages are added over time?  
  *Hint: Binary search structures, balanced trees, or segment trees for efficient updates and queries.*

### Summary
This problem uses the **prefix sum** and **two-pointer/binary search** pattern on sorted arrays to identify package allocation efficiently for each supplier, minimizing space waste. Patterns like sorting, prefix sum for segment queries, and binary search allocation are common in problems involving ranges, intervals, or assignments. The underlying idea can be applied to other resource allocation and bin-packing style problems.