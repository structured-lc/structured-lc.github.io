### Leetcode 1509 (Medium): Minimum Difference Between Largest and Smallest Value in Three Moves [Practice](https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves)

### Description  
Given an integer array nums, you can make at most 3 moves, where each move allows you to remove any value from the array. After up to 3 removals, return the smallest possible difference between the largest and smallest values left in the array.

### Examples  

**Example 1:**  
Input: `nums = [5,3,2,4]`  
Output: `0`  
*Explanation: Remove 2, 3, and 4, only 5 remains; difference = 0.*

**Example 2:**  
Input: `nums = [1,5,0,10,14]`  
Output: `1`  
*Explanation: Remove 14, 10, 5; left with [0,1], difference = 1.*

**Example 3:**  
Input: `nums = [6,6,0,1,1,4,6]`  
Output: `2`  
*Explanation: Remove three values to minimize the difference.*

### Thought Process (as if you’re the interviewee)  
- To minimize difference, remove largest or smallest elements (at most 3 in total).
- After 3 removals, key insight: result is min among these:
  1. Remove 3 largest (nums[-4] - nums)
  2. Remove 2 largest & 1 smallest (nums[-3] - nums[1])
  3. Remove 1 largest & 2 smallest (nums[-2] - nums[2])
  4. Remove 3 smallest (nums[-1] - nums[3])
- Sort the array, try all four, and return the minimum.

### Corner cases to consider  
- len(nums) ≤ 4: You can remove all but one or even all, so difference is 0
- Duplicates, negative numbers
- Already minimal difference

### Solution

```python
def minDifference(nums):
    n = len(nums)
    if n <= 4:
        return 0
    nums.sort()
    # Try the four scenarios
    diff1 = nums[-4] - nums[0]
    diff2 = nums[-3] - nums[1]
    diff3 = nums[-2] - nums[2]
    diff4 = nums[-1] - nums[3]
    return min(diff1, diff2, diff3, diff4)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting
- **Space Complexity:** O(1) extra space (after sorting in place)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could remove k (>3) elements instead?  
  *Hint: Generalize the 4-way comparison to (k+1) options.*

- How do you handle if array has millions of entries, where sort becomes a bottleneck?  
  *Hint: Use partial sorting or heaps for k smallest/largest.*

- Can you do it without modifying the input array?  
  *Hint: Use indices or extra arrays instead of sorting in place.*

### Summary
This is a **two-pointer/greedy** sorted difference minimization problem. It is widely applicable to scenarios where you have to restrict outliers or trim ends to optimize a range.