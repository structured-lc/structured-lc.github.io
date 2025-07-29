### Leetcode 368 (Medium): Largest Divisible Subset [Practice](https://leetcode.com/problems/largest-divisible-subset)

### Description  
Given a list of distinct positive integers, find the largest subset such that for every pair of elements in the subset, one divides the other (i.e., for every a and b in the subset, either a % b == 0 or b % a == 0). The subset does not need to be contiguous. Return any valid largest divisible subset.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `[1,2]`  
*Explanation: 1 divides 2, so [1,2] is valid. [1,3] is also valid. [2,3] is not valid, as neither divides the other. Return any subset of size 2.*

**Example 2:**  
Input: `nums = [1,2,4,8]`  
Output: `[1,2,4,8]`  
*Explanation: 1 divides 2, 2 divides 4, and 4 divides 8. All pairs are divisible, so the whole set is valid.*

**Example 3:**  
Input: `nums = [4,8,16]`  
Output: `[4,8,16]`  
*Explanation: 4 divides 8, and 8 divides 16. All pairs satisfy the divisibility condition. The full set is the answer.*

### Thought Process (as if you’re the interviewee)  
First, I’d try the brute-force approach by generating all subsets and checking for each if every pair fits the divisibility condition. However, with up to 1000 input numbers, this is extremely inefficient (\(2^n\) subsets).

To optimize, I notice the order of numbers matters. If I sort the array, for any pair where one divides the other, the smaller must come before the larger. This means I can try to build the solution similar to the Longest Increasing Subsequence (LIS) problem but with the "divides" condition instead of "<".

I’ll use dynamic programming:
- Sort nums.
- For each number, try to extend the largest divisible subset ending with any smaller number that divides it.
- Keep track of the previous index to reconstruct the actual subset.

Time complexity becomes much more reasonable at O(n²).

### Corner cases to consider  
- Empty array (though problem guarantee is 1 ≤ n).
- All numbers are equal (not possible with distinct constraint).
- Only one element.
- Large gaps between numbers, so subset size is 1.
- Multiple valid answers.

### Solution

```python
def largestDivisibleSubset(nums):
    # Sort the nums to build chains from small to large
    nums.sort()
    n = len(nums)
    # dp[i] will be the size of the largest subset ending with nums[i]
    dp = [1] * n
    # prev[i] helps us to reconstruct the subset
    prev = [-1] * n

    max_idx = 0  # end index of the largest subset found

    for i in range(n):
        for j in range(i):
            # If nums[i] is divisible by nums[j], try to extend the chain
            if nums[i] % nums[j] == 0:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    prev[i] = j
        if dp[i] > dp[max_idx]:
            max_idx = i

    # Reconstruct the largest divisible subset
    result = []
    while max_idx != -1:
        result.append(nums[max_idx])
        max_idx = prev[max_idx]

    result.reverse()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each element, we check all previous elements to see if we can extend the divisibility chain.
- **Space Complexity:** O(n), for the dp and prev arrays and the output subset.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where inputs are not distinct?
  *Hint: Would sorting and grouping help? How does repetition influence reachable subset size?*

- Can you modify this solution to actually return all possible largest subsets instead of just one?
  *Hint: Trace multiple parents or use a backtracking approach after DP table population.*

- How would you extend this to three-way divisibility (for every triplet, one divides another)?
  *Hint: Think carefully about tuple relationships and build accordingly—can you generalize your dp state?*

### Summary
This problem uses the **dynamic programming on sorted arrays** pattern, similar to Longest Increasing Subsequence. Sorting first lets smaller values be considered as potential divisors for larger ones, and the dp chain records “how long” a divisible subset can grow up to each index. Reconstruction is via tracked previous indices. This DP + backtracking pattern is a common approach in subsequence, chain, or divisibility-based subset problems.