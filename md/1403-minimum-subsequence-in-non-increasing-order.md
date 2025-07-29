### Leetcode 1403 (Easy): Minimum Subsequence in Non-Increasing Order [Practice](https://leetcode.com/problems/minimum-subsequence-in-non-increasing-order)

### Description  
Given an array of integers `nums`, find the smallest subsequence (not necessarily contiguous, but must maintain original order) such that the sum of its elements is strictly greater than the sum of the remaining elements. Return the answer in non-increasing order. If there are multiple solutions, return the one with the largest elements first.

### Examples  

**Example 1:**  
Input: `nums = [4,3,10,9,8]`  
Output: `[10,9]`  
*Explanation: Select [10,9], its sum is 19, remaining sum is 15, and 19 > 15.*

**Example 2:**  
Input: `nums = [4,4,7,6,7]`  
Output: `[7,7,6]`  
*Explanation: Select [7,7,6], their sum is 20, remaining sum is 8, and 20 > 8.*

**Example 3:**  
Input: `nums = `  
Output: ``  
*Explanation: Only one element, so pick it.*

### Thought Process (as if you’re the interviewee)  
- To make the sum of the selected subsequence bigger than the rest with as few elements as possible, it's optimal to pick the largest available elements first.
- Sort the array in non-increasing order, keep adding elements to the result until the sum of the chosen elements is strictly greater than the sum of the rest.
- Simple simulation: keep a running total of the picked elements vs. the rest, and stop once the condition is satisfied.

### Corner cases to consider  
- All elements are equal.
- Array length = 1.
- Some zeros.
- Large and small numbers mixed.

### Solution

```python
def minSubsequence(nums):
    # Sort the numbers in non-increasing order
    nums.sort(reverse=True)
    total = sum(nums)
    res, curr_sum = [], 0
    for num in nums:
        curr_sum += num
        res.append(num)
        if curr_sum > total - curr_sum:
            break
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) — Sorting is the bottleneck.
- **Space Complexity:** O(n) — For storing the result subsequence.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the subsequence indices in the original array instead of values?  
  *Hint: Keep track of the original indices when sorting.*

- How would you do this in linear time if all numbers are known to be small?  
  *Hint: Use counting sort if you have value limits.*

- If ties are possible, how do you ensure the answer is lexicographically largest?  
  *Hint: Make sure when sorting, to prefer higher indices or values on ties.*

### Summary
This problem showcases a greedy selection pattern: maximize your picked sum fast with fewest largest elements, common in minimizing choices while maximizing impact. Sorting and accumulating is a classic approach for greedy sum problems of this type.