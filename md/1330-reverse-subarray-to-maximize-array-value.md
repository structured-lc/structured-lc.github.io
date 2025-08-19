### Leetcode 1330 (Hard): Reverse Subarray To Maximize Array Value [Practice](https://leetcode.com/problems/reverse-subarray-to-maximize-array-value)

### Description  
You are given an integer array nums. The array's "value" is defined as the sum of |nums[i] − nums[i + 1]| for all consecutive indices 0 ≤ i < nums.length − 1. You can select any subarray (contiguous) and reverse it **once** to maximize the array value. Find the **maximum possible value** obtainable after such an operation.

### Examples  
**Example 1:**  
Input: `nums = [2,3,1,5,4]`  
Output: `10`  
*Explanation: Reverse subarray [3,1,5] (indices 1-3). The array becomes [2,5,1,3,4]. The value is |2-5|+|5-1|+|1-3|+|3-4| = 3+4+2+1=10.*

**Example 2:**  
Input: `nums = [2,4,9,24,2,1,10]`  
Output: `68`  
*Explanation: By carefully reversing a middle subarray, the gain is maximized. No step-by-step given.*

### Thought Process (as if you’re the interviewee)  
- First, compute the original sum S = sum of |nums[i] − nums[i+1]| for all 0 ≤ i < n-1.
- The naïve brute-force would be to try every possible subarray reversal, recalculate the value each time, and take the maximum. But this is O(n³), which is not feasible for n up to 3×10⁴.
- Because only the pairs on the boundary of the reversed region change, focus on optimizing these boundary contributions.
- For prefix/suffix reversals (subarrays starting or ending at array ends), try replacing the first or last element with every other.
- For middle subarray reversals, analyze the effect for each adjacent pair. The best improvement is obtained by minimizing the minimum and maximizing the maximum among adjacent pairs (math derivation can be found in advanced solutions.)
- The final answer is original sum + maximum gain obtainable from reversing any subarray.

### Corner cases to consider  
- Array of length 2 (no meaningful reversal, so answer is original sum).
- All elements equal (sum is 0; reversal will not change anything).
- Monotonic arrays (increasing or decreasing).
- Optimum reversal might use prefix or suffix rather than interior subarray.
- Large negative or positive elements (possible overflow, but constraints guarantee a 32-bit answer).

### Solution

```python
# Calculate original array value, then iterate to find best gain by considering the edge contributions when the subarray is reversed
from typing import List

def maxValueAfterReverse(nums: List[int]) -> int:
    n = len(nums)
    total = 0
    for i in range(n-1):
        total += abs(nums[i] - nums[i+1])
    
    gain = 0
    # Try reversing a prefix or suffix
    for i in range(1, n-1):
        gain = max(gain, abs(nums[0] - nums[i+1]) - abs(nums[i] - nums[i+1]))
        gain = max(gain, abs(nums[-1] - nums[i-1]) - abs(nums[i] - nums[i-1]))
    
    # Try reversing a middle subarray
    min2 = float('inf')
    max2 = float('-inf')
    for i in range(n-1):
        x, y = nums[i], nums[i+1]
        min2 = min(min2, max(x, y))
        max2 = max(max2, min(x, y))
    gain = max(gain, 2 * (max2 - min2))
    return total + gain
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).
  - One pass to compute original total |nums[i] − nums[i+1]| sum.
  - Another 1-2 passes to compute optimal gain.
- **Space Complexity:** O(1) extra (only variables; does not require additional arrays or data structures).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were allowed to reverse at most K subarrays?  
  *Hint: Try DP or greedy—think about local maximum improvements, but there may be overlapping intervals.*

- Can you return the indices of the subarray that should be reversed for the optimal answer?  
  *Hint: Track the positions where largest gain occurs.*

- How would you adapt the solution if the value were sum of squared differences instead of absolute differences?  
  *Hint: Analyze how a reversal changes boundary terms; squared terms behave differently than absolute.*

### Summary
This approach uses greedy analysis and local improvement by only checking how reversing a subarray affects the boundaries rather than recalculating the whole sum. The solution is a textbook application of the greedy optimization pattern, focusing on local modifications and their global effects. This pattern (focus on boundary contributions when subarrays are reversed) occurs in many interval and sequence manipulation problems.

### Tags
Array(#array), Math(#math), Greedy(#greedy)

### Similar Problems
