### Leetcode 1911 (Medium): Maximum Alternating Subsequence Sum [Practice](https://leetcode.com/problems/maximum-alternating-subsequence-sum)

### Description  
Given an array of positive integers, find the *maximum alternating subsequence sum*.  
For any subsequence, reindex it from 0. The alternating sum is defined as the sum of elements at even indices minus the sum of elements at odd indices.  
In other words, for subsequence a₀, a₁, ..., aₖ the alternating sum is a₀ − a₁ + a₂ − a₃ + ...  
You may choose any subsequence (you can skip elements and do not need to be contiguous). Return the maximum possible alternating sum among all possible subsequences.

### Examples  

**Example 1:**  
Input: `nums = [4,2,5,3]`  
Output: `7`  
*Explanation: optimal subsequence is [4,2,5]: alternating sum = 4 - 2 + 5 = 7.  
We can also pick [4,5,3] → 4 - 5 + 3 = 2 (smaller). Other choices give ≤ 7.*

**Example 2:**  
Input: `nums = [5,6,7,8]`  
Output: `8`  
*Explanation: The optimal choice is  by itself, as alternating sum = 8. [5,7] gives 5 - 7 = -2.*

**Example 3:**  
Input: `nums = [6,2,1,2,4,5]`  
Output: `10`  
*Explanation: optimal subsequence is [6,1,5], alternating sum = 6 - 1 + 5 = 10.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible non-contiguous subsequences and compute their alternating sum. That is, for every subset of `nums`, compute its alternating sum after reindexing. The total subsequence count is 2ⁿ, which is exponential and not feasible for n up to 10⁵.

- **Dynamic Programming**:  
  Let's use DP to optimize.  
  - Define two variables:
    - **even**: The max alternating sum if the last selected element is at an even index of the subsequence.
    - **odd**: The max alternating sum if the last selected element is at an odd index.
  - For each `num` in `nums`:
    - We can pick it as an even-indexed element (counting from 0): update `even = max(even, odd + num)`
    - Or as an odd-indexed element: update `odd = max(odd, even - num)`
  - Iterate through `nums`, updating `even` and `odd`.  
  - **Why does this work?** At each step, we're deciding to "continue" or "skip" adding this number as even or odd in the build-up. We're effectively considering every possible subsequence in a DP fashion, but in linear time.

- **Space Optimization**:  
  Since we only need the last values (even, odd), this is O(1) space.

- **Summary of Approach**: DP, with state tracked as two variables, scanned in one pass.

### Corner cases to consider  
- nums has length 1 (should return that number).
- nums is strictly increasing or decreasing.
- All elements are equal.
- nums contains only two elements.
- Large input (to test O(n) time).
- Optimal subsequence skips many elements, not just one.

### Solution

```python
def maxAlternatingSum(nums):
    # 'even' holds the max alternating sum ending in an even index
    # 'odd' holds the max alternating sum ending in an odd index
    even = 0
    odd = 0
    for num in nums:
        # For even: either keep previous 'even', or (take this as new even) by doing odd + num
        even_new = max(even, odd + num)
        # For odd: either keep previous 'odd', or (take this as new odd) by doing even - num
        odd_new = max(odd, even - num)
        even, odd = even_new, odd_new
    return even
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums.  
  We perform a constant number of operations per element.
- **Space Complexity:** O(1), as we only use two variables (`even`, `odd`) for tracking state, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual subsequence that produces this maximum alternating sum?  
  *Hint: You would need to track how you update `even` and `odd` at each step and backtrack to build the subsequence.*

- What if negative numbers are allowed in the input array?  
  *Hint: You'd need to carefully consider when to skip selecting negative numbers, as they could sometimes be optimal in an alternating pattern.*

- Can you generalize the alternating sum to allow for alternating factors other than +1 and -1 (e.g., any integer pattern)?  
  *Hint: Think about proper DP state definition and how to carry alternating multipliers.*

### Summary
This problem uses the classic DP "pick or skip" pattern for subsequences, with state compression to O(1) space. The idea generalizes to other maximum subsequence sum problems (e.g., maximum sum/subarray/subsequence).  
Similar state tracking patterns appear in problems like "House Robber" and "Stock Buy and Sell" where decisions for next step depend on past choices and alternate patterns.  
The linear time DP approach is efficient and optimal for large input sizes.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Alternating Subarray Sum(maximum-alternating-subarray-sum) (Medium)
- Maximum Element-Sum of a Complete Subset of Indices(maximum-element-sum-of-a-complete-subset-of-indices) (Hard)
- Maximum Product of Subsequences With an Alternating Sum Equal to K(maximum-product-of-subsequences-with-an-alternating-sum-equal-to-k) (Hard)