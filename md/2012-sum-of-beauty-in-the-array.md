### Leetcode 2012 (Medium): Sum of Beauty in the Array [Practice](https://leetcode.com/problems/sum-of-beauty-in-the-array)

### Description  
Given a 0-indexed integer array **nums**, calculate the "beauty" for **each element nums[i]** where 1 ≤ i ≤ n−2.  
The beauty of nums[i] is:
- **2** if nums[i] is larger than all nums[j] for 0 ≤ j < i AND less than all nums[k] for i < k < n.
- **1** if nums[i−1] < nums[i] < nums[i+1], but the previous condition is not satisfied.
- **0** if neither above condition holds.

Return the sum of beauty for all such nums[i].

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `2`  
*Explanation: Only one candidate, i=1; 1 (nums) < 2 < 3 (nums[2]), and it's greater than all before and less than all after. So beauty = 2.*

**Example 2:**  
Input: `nums = [2,4,6,4]`  
Output: `1`  
*Explanation:  
i=1: 2 < 4 < 6, but 4 is not less than all to the right (since 4 at position 3 is not less than). So beauty=1.  
i=2: 4 < 6 > 4, so beauty=0.*

**Example 3:**  
Input: `nums = [3,2,1]`  
Output: `0`  
*Explanation: Only for i=1; 3 > 2 < 1 does not satisfy any criteria, so beauty=0.*

### Thought Process (as if you’re the interviewee)  
First, we need to process the array for each i (excluding first and last elements) and categorize the beauty for each.

**Brute-force approach:**  
For each i from 1 to n-2:
- Check whether all nums[j] (j < i) < nums[i] and all nums[k] (k > i) > nums[i], which takes O(n) for every i. This results in O(n²) time.

**Optimized approach:**  
Precompute prefix max and suffix min arrays:
- For each index, prefix_max[i] = max(nums ... nums[i-1])
- For each index, suffix_min[i] = min(nums[i+1] ... nums[n-1])
- Now, for any i, we can check if nums[i] > prefix_max[i] and nums[i] < suffix_min[i] in O(1).  
This brings time complexity to O(n).

If condition (1) fails, check if nums[i-1] < nums[i] < nums[i+1] for beauty 1.

This approach avoids unnecessary repeated scans.

### Corner cases to consider  
- Array of length 3 (minimum allowed).
- Duplicate elements.
- Increasing or decreasing order.
- Equal adjacent elements.
- Large numbers at edges.

### Solution

```python
def sumOfBeauties(nums):
    n = len(nums)
    beauty = 0

    # prefix_max[i]: max value in nums[0] to nums[i-1]
    prefix_max = [0] * n
    prefix_max[0] = nums[0]
    for i in range(1, n):
        prefix_max[i] = max(prefix_max[i-1], nums[i])

    # suffix_min[i]: min value in nums[i+1] to nums[n-1]
    suffix_min = [0] * n
    suffix_min[-1] = nums[-1]
    for i in range(n-2, -1, -1):
        suffix_min[i] = min(suffix_min[i+1], nums[i])

    # For i in 1 to n-2
    for i in range(1, n-1):
        # beauty 2 check
        if nums[i] > prefix_max[i-1] and nums[i] < suffix_min[i+1]:
            beauty += 2
        # beauty 1 check
        elif nums[i-1] < nums[i] < nums[i+1]:
            beauty += 1
        # else beauty += 0 (do nothing)
    return beauty
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Computing prefix_max and suffix_min takes O(n) each.
  - Single traversal at the end is also O(n).

- **Space Complexity:** O(n).  
  - Two extra arrays of size n (prefix_max and suffix_min).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it in O(1) extra space?
  *Hint: Try to keep only running max and min instead of arrays if possible, or scan in real-time.*

- What changes if we want to generalize for strictly decreasing arrays?
  *Hint: Try the logic with min and max order switched.*

- How would you handle a dynamic stream where values might be changed?
  *Hint: Explore segment trees or other range statistic data structures.*

### Summary
This problem demonstrates a common pattern of precomputing prefix/suffix statistics (max, min) to enable O(1) range queries during an O(n) pass, avoiding repeated work. This template is useful in many range-based problems, such as trapping rain water, subarray statistics, and sliding window maximum.


### Flashcard
Calculate the beauty of an array by precomputing prefix max and suffix min arrays to efficiently identify local maxima.

### Tags
Array(#array)

### Similar Problems
- Best Time to Buy and Sell Stock(best-time-to-buy-and-sell-stock) (Easy)
- Partition Array into Disjoint Intervals(partition-array-into-disjoint-intervals) (Medium)
- Maximum Value of an Ordered Triplet II(maximum-value-of-an-ordered-triplet-ii) (Medium)