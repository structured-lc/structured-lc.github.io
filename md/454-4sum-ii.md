### Leetcode 454 (Medium): 4Sum II [Practice](https://leetcode.com/problems/4sum-ii)

### Description  
Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that: 0 ≤ i, j, k, l < n and nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]`  
Output: `2`  
*Explanation: The two tuples are:*
*1. (0, 0, 0, 1) → nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0*
*2. (1, 1, 0, 0) → nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0*

**Example 2:**  
Input: `nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]`  
Output: `1`  
*Explanation: Only one tuple (0, 0, 0, 0) gives sum 0.*


### Thought Process (as if you're the interviewee)  
This is a variation of the classic 4Sum problem, but simpler because we have four separate arrays instead of finding 4 elements from the same array.

**Brute Force Approach:**
Try all possible combinations (i, j, k, l) and check if the sum equals 0.
Time complexity: O(n⁴), Space: O(1)
This is too slow for the given constraints.

**Optimized Approach with Hash Map:**
We can split this into two parts:
1. Calculate all possible sums from nums1[i] + nums2[j] and store frequency in a hash map
2. For each combination of nums3[k] + nums4[l], check if -(nums3[k] + nums4[l]) exists in the hash map

This reduces the problem from O(n⁴) to O(n²).

**Why this works:**
If nums1[i] + nums2[j] + nums3[k] + nums4[l] = 0, then:
nums1[i] + nums2[j] = -(nums3[k] + nums4[l])

So we pre-compute all sums from the first two arrays, then for each sum from the last two arrays, we look for its negative counterpart.


### Corner cases to consider  
- All arrays have only one element each: Simple case to verify  
- Arrays with all zeros: Should return 1  
- Large negative and positive numbers that might cause overflow  
- Arrays where no valid tuples exist: Should return 0  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def fourSumCount(nums1, nums2, nums3, nums4):
    # Hash map to store frequency of sums from first two arrays
    sum_count = {}
    
    # Step 1: Calculate all possible sums from nums1 and nums2
    for num1 in nums1:
        for num2 in nums2:
            sum_12 = num1 + num2
            sum_count[sum_12] = sum_count.get(sum_12, 0) + 1
    
    # Step 2: For each sum from nums3 and nums4, 
    # check if negative exists in sum_count
    result = 0
    for num3 in nums3:
        for num4 in nums4:
            sum_34 = num3 + num4
            target = -sum_34  # We need sum_12 + sum_34 = 0, so sum_12 = -sum_34
            
            if target in sum_count:
                result += sum_count[target]
    
    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) - We iterate through all combinations of nums1 and nums2 once (n² operations), then iterate through all combinations of nums3 and nums4 once (another n² operations). Hash map lookups are O(1) on average.
- **Space Complexity:** O(n²) - In the worst case, the hash map stores all possible sums from nums1 and nums2, which could be up to n² different values if all sums are unique.


### Potential follow-up questions (as if you're the interviewer)  

- How would you solve this if you had k arrays instead of 4?  
  *Hint: You could generalize by splitting into two groups of k/2 arrays each, or use recursive divide-and-conquer approach*

- What if you needed to return the actual tuples instead of just the count?  
  *Hint: Store the indices along with the sums in the hash map, then reconstruct tuples when matches are found*

- How would you optimize for memory if n is very large?  
  *Hint: Consider which pair of arrays to use for the hash map - choose the pair that produces fewer unique sums*

### Summary
This problem demonstrates the classic "meet in the middle" technique for reducing complexity from O(n⁴) to O(n²). By splitting the problem into two halves and using a hash map to store intermediate results, we can efficiently find all valid combinations. This pattern is commonly used in problems involving combinations or subsets where the search space is too large for brute force approaches.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- 4Sum(4sum) (Medium)