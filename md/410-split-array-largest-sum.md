### Leetcode 410 (Hard): Split Array Largest Sum [Practice](https://leetcode.com/problems/split-array-largest-sum)

### Description  
Given an array of positive integers, **nums**, and an integer, **k**, split the array into **k** non-empty contiguous subarrays such that the largest sum of any subarray is minimized.  
Your task is to figure out the minimum possible value of the largest sum among these k subarrays. The splits must preserve the order in the original array, and every subarray must be non-empty.

For example, for nums = [10, 5, 30, 20], k = 2, a valid split could be [10, 5] and [30, 20] with sums 15 and 50, so the largest is 50. But a better split [10, 5, 30] and  gives max sum 45. The goal is to minimize this largest subarray sum[1][2].

### Examples  

**Example 1:**  
Input: `nums = [7,2,5,10,8]`, `k = 2`  
Output: `18`  
*Explanation: Splitting as [7,2,5] and [10,8] results in max sums 14 and 18. The largest is 18, which is the minimum possible.*

**Example 2:**  
Input: `nums = [1,2,3,4,5]`, `k = 2`  
Output: `9`  
*Explanation: One optimal split is [1,2,3,4] and [5], with sums 10 and 5, so max is 10. But splitting as [1,2,3] and [4,5] gives 6 and 9; the largest sum is now 9, which is optimal.*

**Example 3:**  
Input: `nums = [2,16,1,10,8,7]`, `k = 3`  
Output: `16`  
*Explanation: Splitting as [2,16], [1,10], [8,7] gives sums 18, 11, 15; max is 18. You get a better result with [2,16], [1,10,8],  which gives sums 18, 19, 7. But splitting as [2,16], [1], [10,8,7] gives 18, 1, 25. But splitting as [2], [16,1,10], [8,7] gives 2, 27, 15. After all possibilities, minimal largest sum you can achieve is 16.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible way to split the array into k parts and compute the maximum sum for each. Track the minimum among these.  
  **Downside**: Checking every possible partition is exponential and not feasible for n up to 10³.

- **Optimize: Binary Search on Answer:**  
  We know the largest subarray sum must be at least as large as the largest element and at most as large as the total sum.
  Define a function `can_split(max_sum)` that checks: "Can I split the array into k or fewer parts so that no part sums to more than max_sum?"  
  Use **binary search** between [max(nums), sum(nums)] to find the minimum value for which `can_split` returns True[2].
  
  For each mid in binary search:
    - Scan the array, greedily split when `subarray_sum + nums[i] > mid`, count splits.
    - If splits > k, mid is too small; else, try smaller.
  **Trade-off**: This is highly efficient (O(n log(sum))), easy to code, and robust.

- **Dynamic programming:**  
  DP[i][k]: minimum largest sum for splitting first i numbers into k parts.  
  However, DP has higher time/space costs and is not needed if binary search is faster and easier for this problem.

### Corner cases to consider  
- nums has only one element (should return that element).
- k is 1 (should return sum(nums)).
- k equals len(nums) (should return max(nums)), since each number becomes its own part.
- nums consists of all equal elements.
- Large numbers or array size at upper bound.

### Solution

```python
def splitArray(nums, k):
    # Helper to determine if we can split nums into ≤k subarrays with sums ≤max_sum
    def can_split(max_sum):
        count = 1
        total = 0
        for num in nums:
            total += num
            if total > max_sum:
                # Need an extra subarray
                count += 1
                total = num
                if count > k:
                    return False
        return True

    left, right = max(nums), sum(nums)
    while left < right:
        mid = (left + right) // 2
        if can_split(mid):
            right = mid
        else:
            left = mid + 1
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(S)), where n is the length of nums and S = sum(nums) − max(nums).  
  Each binary search step traverses nums (O(n)) and search range is O(log(sum(nums))).
- **Space Complexity:** O(1) extra space, since only fixed variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return **the actual partitioning** along with the minimized largest sum?  
  *Hint: Trace back the splits using a second pass when can_split==True, or store split points during DP.*

- Can this be solved **efficiently if k is very large** (close to the length of nums)?  
  *Hint: Edge case; each number gets its own part, so max(nums).*

- How would the approach change if **subarrays didn't have to be contiguous**?  
  *Hint: Problem reduces to multi-way partitioning or subset-sum, which is NP-hard.*

### Summary
This problem is a classic application of **binary search on the answer** combined with greedy checking for partitioning feasibility. The pattern is useful whenever you need to split elements into "buckets" to minimize the largest bucket size—such as book allocation, job assignment, or bandwidth throttling scenarios.


### Flashcard
Binary search on answer range [max element, total sum], for each candidate use greedy check if array can split into ≤k subarrays without exceeding candidate.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Prefix Sum(#prefix-sum)

### Similar Problems
- Capacity To Ship Packages Within D Days(capacity-to-ship-packages-within-d-days) (Medium)
- Divide Chocolate(divide-chocolate) (Hard)
- Fair Distribution of Cookies(fair-distribution-of-cookies) (Medium)
- Subsequence of Size K With the Largest Even Sum(subsequence-of-size-k-with-the-largest-even-sum) (Medium)
- Maximum Total Beauty of the Gardens(maximum-total-beauty-of-the-gardens) (Hard)
- Number of Ways to Split Array(number-of-ways-to-split-array) (Medium)
- Minimum Cost to Split an Array(minimum-cost-to-split-an-array) (Hard)
- Distribute Elements Into Two Arrays I(distribute-elements-into-two-arrays-i) (Easy)
- Distribute Elements Into Two Arrays II(distribute-elements-into-two-arrays-ii) (Hard)