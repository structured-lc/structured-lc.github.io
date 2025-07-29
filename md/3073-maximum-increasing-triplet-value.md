### Leetcode 3073 (Medium): Maximum Increasing Triplet Value [Practice](https://leetcode.com/problems/maximum-increasing-triplet-value)

### Description  
Given an array of integers, find the maximum value of a triplet (i, j, k) where 0 ≤ i < j < k < n, such that nums[i] < nums[j] < nums[k]. The value of such a triplet is:
nums[i] - nums[j] + nums[k]
You must return the highest such value across all qualifying triplets in the array.

### Examples  

**Example 1:**  
Input: `nums = [5,6,9]`  
Output: `8`  
*Explanation: There’s only one valid triplet: (0,1,2), i.e., 5 < 6 < 9. Value = 5 - 6 + 9 = 8.*

**Example 2:**  
Input: `nums = [1,5,3,6]`  
Output: `4`  
*Explanation:  
Valid triplets:  
- (0,1,3): 1 < 5 < 6 → 1 - 5 + 6 = 2  
- (0,2,3): 1 < 3 < 6 → 1 - 3 + 6 = 4  
Maximum is 4.*

**Example 3:**  
Input: `nums = [2,1,3,4]`  
Output: `3`  
*Explanation:  
Valid triplets:  
- (0,2,3): 2 < 3 < 4 → 2 - 3 + 4 = 3  
- (1,2,3): 1 < 3 < 4 → 1 - 3 + 4 = 2  
Maximum is 3.*

### Thought Process (as if you’re the interviewee)  
First, I consider the brute-force approach: enumerate every possible i, j, k with 0 ≤ i < j < k < n, and check whether nums[i] < nums[j] < nums[k], then compute the value. Since n can be up to 10⁵, O(n³) would not be accepted.

Since the array is that large, we need to reduce to O(n²) or O(n \* log n) if possible. The core bottleneck is checking, for each (j), possible i < j and k > j to get the max nums[i] < nums[j] and max nums[k] > nums[j].

To do this efficiently:
- For each j (as the middle of the triplet), find the **max nums[i] < nums[j] for i < j** (let’s call it left_max).
- For each j, find the **max nums[k] > nums[j] for k > j** (right_max).
- Then, for each j, the best triplet including j is left_max - nums[j] + right_max.

We can process left to right to keep track of left_max, and right to left for right_max, using suitable data structures (e.g., segment trees, BST, or simple arrays if the constraints allow it). Since our value constraints are small (nums[i] ≤ 10⁹), but n can be up to 10⁵, we can try a two-pass approach:
- For left_max: scan left to right, maintain and update max values for numbers less than nums[j]. 
- For right_max: similarly, scan right to left.

But since finding max less than or greater than a number efficiently is hard without a segment tree or BST, and because of small n in many testing problems, O(n³) can be accepted for n ≤ 105. But for large n, proceed as above.

Here, let's code the O(n²) approach, and describe the O(n \* log n) method in comments if needed.

### Corner cases to consider  
- All elements are equal (no valid increasing triplets).
- Array strictly increasing (only one triplet possible).
- Array strictly decreasing (no valid triplet).
- Duplicate values (need strict increasing; duplicates don’t count).
- Minimum (n=3) and maximum input length.
- Negative values (verify if constraints allow negatives).

### Solution

```python
def maximumTripletValue(nums):
    n = len(nums)
    max_value = float('-inf')
    
    # For nums[i] < nums[j] < nums[k], enumerate all triplets
    for j in range(1, n - 1):
        left_max = float('-inf')
        for i in range(j):
            if nums[i] < nums[j]:
                left_max = max(left_max, nums[i])
        if left_max == float('-inf'):
            continue
        right_max = float('-inf')
        for k in range(j + 1, n):
            if nums[j] < nums[k]:
                right_max = max(right_max, nums[k])
        if right_max == float('-inf'):
            continue
        val = left_max - nums[j] + right_max
        max_value = max(max_value, val)
    return max_value
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  For each j, we check all i < j (O(n)), and all k > j (O(n)), so total is O(n²).
- **Space Complexity:** O(1) extra space (only a few variables used), aside from the input array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you improve this solution for very large arrays (e.g., n = 10⁵)?  
  *Hint: Maintain prefix maxima for i < j, and suffix maxima for k > j using segment trees or BST/maps for efficient max queries.*

- What if duplicates are allowed in the triplet (≤ instead of <)?  
  *Hint: Adjust the comparisons in the condition; ensure to check if duplicates affect max calculation.*

- Can you count all the increasing triplets, not just find the maximum value?  
  *Hint: Use dynamic programming or extension of LIS counting approach.*

### Summary
This problem fits the "triplet enumeration" pattern where we want the optimal value under a strict combinatorial constraint. The O(n²) solution is acceptable for smaller n; for larger n, prefix/suffix data structures (like trees or BIT/Fenwick Tree) enable O(n log n) solutions. This strategy—precomputing best options to the left and right and combining them—is a powerful pattern for similar triplet or subarray optimization problems.