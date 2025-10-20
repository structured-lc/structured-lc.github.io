### Leetcode 474 (Medium): Ones and Zeroes [Practice](https://leetcode.com/problems/ones-and-zeroes)

### Description  
Given an array of binary strings, **strs**, and two integers, **m** and **n**, find the **size of the largest subset** of strs such that:
- The total number of `'0'`s used in the subset is at most **m**.
- The total number of `'1'`s used is at most **n**.

Each string can be used at most once, and a subset must contain only strings from the original input array. The task is to maximize the number of strings selected under these constraints.  
This is similar to a **2D 0-1 Knapsack Problem**, where each string has a 2-dimensional "weight": the number of 0s and the number of 1s.

### Examples  

**Example 1:**  
Input: `strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3`  
Output: `4`  
*Explanation: Pick {"10", "0001", "1", "0"}. Total: 5 zeros and 3 ones, subset size is 4.*

**Example 2:**  
Input: `strs = ["10", "0", "1"], m = 1, n = 1`  
Output: `2`  
*Explanation: Pick {"0", "1"}. Uses 1 zero and 1 one, subset size is 2.*

**Example 3:**  
Input: `strs = ["10","11","00"], m = 1, n = 2`  
Output: `1`  
*Explanation: You can only pick one string within constraints, so max subset size is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute force approach:**  
  Try all possible subsets. For each, sum the zeros and ones, and check if the totals are ≤ m and ≤ n. Keep track of the largest valid subset.

  - For k strings, there are 2ᵏ possible subsets, which is not feasible for k up to 600.

- **Optimized approach – Dynamic Programming:**  
  This is a classic variation of the **0-1 knapsack problem with two capacity dimensions** (zeros and ones instead of just weight).
  
  - **State:**  
    dp[i][j]: The maximum subset size you can get using at most i zeros and j ones.

  - **Transition:**  
    For each string, count `zeros` and `ones`. For all dp[z][o] with z ≥ zeros and o ≥ ones:
    - dp[z][o] = max(dp[z][o], dp[z - zeros][o - ones] + 1)
    - **Important:** Loop z and o from high to low to ensure each string is only considered once per state.

  - **Base case:**  
    dp = 0 (when no zeros or ones used, subset size is 0).

- **Why DP is suitable here:**  
  Each string can either be used once or not used at all (0-1 choice), and there are two resources being consumed: zeros and ones.

- **Trade-offs:**  
  Space complexity is O(m×n), which is acceptable for m, n ≤ 100.

### Corner cases to consider  
- strs is empty → subset size is 0
- m or n is 0 (no zeros or ones can be used) → only strings using no zeros or no ones can be picked
- strs contains only "0" or only "1" strings
- All strings require more zeros or ones than m or n
- Each string has length 1
- Large inputs where strings are long but m and n are small

### Solution

```python
def findMaxForm(strs, m, n):
    # dp[i][j]: max subset size using at most i zeros and j ones
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for s in strs:
        zeros = s.count('0')
        ones = s.count('1')
        # Traverse backwards so we do not reuse the same string more than once
        for z in range(m, zeros - 1, -1):
            for o in range(n, ones - 1, -1):
                dp[z][o] = max(
                    dp[z][o],
                    dp[z - zeros][o - ones] + 1
                )
    return dp[m][n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L × m × n), where L is the number of strings. For each string, we iterate through all m × n dp states.
- **Space Complexity:** O(m × n), as we keep only a 2D dp table with m+1 rows and n+1 columns (extra storage dominates input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to **output the subset**, not just its size?  
  *Hint: Track choice by storing back-pointers.*

- How do you solve the problem if **one or both constraints (m or n) are very large**?  
  *Hint: Discuss space/speed trade-offs; consider optimization/memoization.*

- What if some strings are **used unlimited times** (unbounded knapsack)?  
  *Hint: Update dp in increasing order when considering each string.*

### Summary
This problem is a canonical example of the **multi-dimensional (2D) 0-1 knapsack problem** — an essential dynamic programming pattern. The key trick is how to update the dp table in reverse to avoid double-counting. This approach (iterative DP with resource tracking) is broadly useful for resource-constrained packing, scheduling, or selection problems with multiple resource limits.


### Flashcard
Use 2D dynamic programming (dp[zeros][ones]) to solve a 0-1 knapsack with two constraints (zeros and ones) for maximum subset size.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Count Subarrays With More Ones Than Zeros(count-subarrays-with-more-ones-than-zeros) (Medium)
- Non-negative Integers without Consecutive Ones(non-negative-integers-without-consecutive-ones) (Hard)
- All Divisions With the Highest Score of a Binary Array(all-divisions-with-the-highest-score-of-a-binary-array) (Medium)