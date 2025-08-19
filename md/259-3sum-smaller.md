### Leetcode 259 (Medium): 3Sum Smaller [Practice](https://leetcode.com/problems/3sum-smaller)

### Description  
Given an integer array **nums** and an integer **target**, count the number of unique index triplets (**i, j, k** with 0 ≤ i < j < k < n) such that **nums[i] + nums[j] + nums[k] < target**.  
You need to return this count. The triplets must follow index order, not value uniqueness.

### Examples  

**Example 1:**  
Input: `nums = [-2, 0, 1, 3]`, `target = 2`  
Output: `2`  
*Explanation: There are two triplets: [-2,0,1] (sum= -1), and [-2,0,3] (sum=1). Both sums are less than 2.*

**Example 2:**  
Input: `nums = []`, `target = 0`  
Output: `0`  
*Explanation: No triplets possible in an empty array.*

**Example 3:**  
Input: `nums = [1, 2]`, `target = 4`  
Output: `0`  
*Explanation: Less than three elements, so no triplet can be formed.*

### Thought Process (as if you’re the interviewee)  
Start with brute force: try all triplets with three nested loops (i, j, k), checking if their sum < target, and increment a counter. This works but is O(n³) and won’t scale for large inputs.

Observation: If the array is sorted, we can use a two-pointer technique to achieve a better runtime.  
- Fix the first element with index i (0 ≤ i < n-2).
- Set j = i+1 (left pointer), k = n-1 (right pointer).
- While j < k:
    - Compute s = nums[i] + nums[j] + nums[k]
    - If s < target, then all combos between (j,k) are valid (since increasing k only increases s due to sorting); count (k - j) triplets, increment j.
    - Else, decrement k to reduce s.
- This reduces total complexity to O(n²), which is efficient enough for constraints (n ≤ 3500) [1][2][3].

I’ll code the O(n²) two-pointer solution after sorting, as it balances readability and efficiency.

### Corner cases to consider  
- Empty array (`nums = []`)
- Array length < 3
- All elements the same
- Negative numbers, mix of negatives and positives
- Very large or very small target
- Duplicates in array (indices must differ)

### Solution

```python
def threeSumSmaller(nums, target):
    # Sort the array for two-pointer technique
    nums.sort()
    n = len(nums)
    count = 0
    
    # Fix the first element
    for i in range(n - 2):
        j = i + 1        # Second element
        k = n - 1        # Third element
        
        while j < k:
            total = nums[i] + nums[j] + nums[k]
            if total < target:
                # All pairs (j, k), (j, k-1), ..., (j, j+1) are valid
                count += (k - j)
                j += 1   # Check for more pairs with next j
            else:
                k -= 1   # Try smaller pair to reduce sum
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
    - Sorting is O(n log n), outer loop over i is O(n), two-pointer inner loop is O(n); combined: O(n²).[1][2][3]
- **Space Complexity:** O(1) extra space (in-place sorting if allowed; otherwise O(n) if sort isn’t in-place). No recursion or extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify the algorithm to return all valid triplets instead of just the count?  
  *Hint: Instead of just incrementing count, collect triplets in a result list.*

- How would you handle the problem if duplicates (same triplet values) shouldn’t be counted?  
  *Hint: Skip over duplicates after sorting (like the classic 3Sum problem).*

- Could you solve this problem if the array is too large to fit in memory and you can only access it sequentially?  
  *Hint: Consider data streaming or windowed approaches, though they may not be optimal for counting all combinations.*

### Summary
This problem uses the **two-pointer pattern** on a sorted array, a classic trick for pair/triplet problems with sum constraints (see also: 3Sum, 2Sum, 3Sum Closest). The key leap is that, when a sum at (i, j, k) is small enough, so are all combos from j up to k. This dramatically reduces checks from O(n³) to O(n²) and is a common interview pattern for array-based combination problems.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- 3Sum(3sum) (Medium)
- 3Sum Closest(3sum-closest) (Medium)
- Valid Triangle Number(valid-triangle-number) (Medium)
- Two Sum Less Than K(two-sum-less-than-k) (Easy)
- Maximize Greatness of an Array(maximize-greatness-of-an-array) (Medium)
- Find Polygon With the Largest Perimeter(find-polygon-with-the-largest-perimeter) (Medium)