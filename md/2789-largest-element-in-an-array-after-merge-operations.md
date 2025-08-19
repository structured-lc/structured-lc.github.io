### Leetcode 2789 (Medium): Largest Element in an Array after Merge Operations [Practice](https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations)

### Description  
You are given a 0-indexed array of positive integers called **nums**. At any time, you may choose an index **i** (0 ≤ i < len(nums) - 1) such that nums[i] ≤ nums[i + 1]. You merge nums[i] into nums[i + 1] by replacing nums[i + 1] with nums[i] + nums[i + 1], and removing nums[i] from the array.  
You can repeat this operation any number of times (or not at all).  
Return the maximum possible value of any element left in the final array after performing such merge operations.

### Examples  

**Example 1:**  
Input: `nums = [2,3,7,9,3]`  
Output: `21`  
*Explanation:  
- Choose i=0: [2+3,7,9,3] → [5,7,9,3]  
- Choose i=1: [5,7+9,3] → [5,16,3]  
- Choose i=0: [5+16,3] → [21,3]  
- Maximum value in final array is **21**.*

**Example 2:**  
Input: `nums = [5,3,3]`  
Output: `11`  
*Explanation:  
- Choose i=1: [5,3+3] → [5,6]  
- Choose i=0: [5+6] →   
- Only element left is **11**.*

**Example 3:**  
Input: `nums = [1,2,3,4]`  
Output: `10`  
*Explanation:  
- i=0: [1+2,3,4] → [3,3,4]  
- i=0: [3+3,4] → [6,4]  
- i=0: [6+4] →   
- Final maximum is **10**.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try every possible merge sequence. This quickly explodes combinatorially, since after every merge the array changes, so it may not finish in reasonable time for larger inputs.

- **Observation:**  
  Merges only allowed when nums[i] ≤ nums[i+1], and you sum adjacent numbers by merging left into right.  
  Notice that merging later from the right maximizes the sum you can push toward the end.  
  If you start thinking **backwards** and always "push" left blocks forward (accumulate sums), you can combine as much as possible as long as the left is ≤ right.

- **Greedy/Optimal approach:**  
  Iterate from right to left, keep a running sum, and "merge" whenever nums[i] ≤ current_sum; otherwise, start a new running sum at nums[i]. This guarantees you never skip a merge opportunity.

  This greedy process is optimal because whenever you can merge left into right, you should do it to accumulate larger groups and maximize the sum possible at any spot in the final array.

  The answer is the **maximum** accumulated value seen during this iteration.

### Corner cases to consider  
- Single element array (no merges possible)
- Arrays where all elements are equal
- Strictly decreasing arrays (no merges possible)
- Strictly increasing arrays (all merges possible)
- Large numbers (to check integer overflow or handling)
- Array ending with a small number

### Solution

```python
def maxArrayValue(nums):
    # Initialize running sum to the last element (rightmost)
    curr = nums[-1]
    max_val = curr

    # Traverse from right to left (second-last to first)
    for i in range(len(nums) - 2, -1, -1):
        # If current left element ≤ accumulated sum,
        # merge it in (add to curr), else start new group
        if nums[i] <= curr:
            curr += nums[i]
        else:
            curr = nums[i]  # can't merge, reset sum

        # Update max_val if a new maximum is achieved
        if curr > max_val:
            max_val = curr

    return max_val
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Single pass from right to left, where n is the length of nums.

- **Space Complexity:** O(1).  
  Only variables for running sum and max value; no extra data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if merges were allowed for nums[i] ≥ nums[i+1] (non-increasing), instead?
  *Hint: Would your direction for traversal change?*

- How would you output the actual sequence of merges, not just the value?
  *Hint: Can you keep pointers or reconstruct from the sums?*

- What if you could merge any pair, not just adjacent ones?
  *Hint: This will likely require a very different, possibly DP-based, approach.*

### Summary
This problem uses a *greedy* right-to-left accumulation pattern—maximize the sum by always merging any group of left elements into right if allowed by the operation condition. The pattern is related to prefix accumulation but applied backwards and is a variant of optimal substructure, where the optimal action combines clusters as soon as the operation allows. This can be applied in problems involving greedy merging or collapse of subarrays/subsequences under a condition, such as certain compression, reduction, or dynamic grouping tasks.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Jump Game(jump-game) (Medium)
- House Robber(house-robber) (Medium)
- Get Maximum in Generated Array(get-maximum-in-generated-array) (Easy)