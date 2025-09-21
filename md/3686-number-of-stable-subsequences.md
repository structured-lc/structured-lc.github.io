### Leetcode 3686 (Hard): Number of Stable Subsequences [Practice](https://leetcode.com/problems/number-of-stable-subsequences)

### Description  
You are given an array of integers, and you are to count the number of non-empty subsequences that are **stable**. A *subsequence* is considered **stable** if it does **not** contain three consecutive numbers that are all odd or all even.  
Formally, for any subsequence you pick, there cannot be any three consecutive elements that are all odd or all even. The result should be returned modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,5]`  
Output: `6`  
*Explanation: The stable subsequences are: [1], [2], [3], [5], [1,2], [2,3]. Subsequence [1,3,5] is not stable because it contains three consecutive odd numbers.*

**Example 2:**  
Input: `nums = [2,3,4,2]`  
Output: `8`  
*Explanation: Stable subsequences are: [2], [3], [4], [2], [2,3], [3,4], [4,2], [2,3,4], [3,4,2]. The only invalid ones contain three consecutive even or three consecutive odd numbers, e.g. none appear here. Total: 8.*

**Example 3:**  
Input: `nums = [1, 1, 2, 2, 1]`  
Output: `13`  
*Explanation: List all nonempty subsequences, count valid ones by no three consecutive even/odd.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force approach: generate all non-empty subsequences (O(2ⁿ) total), check each if no three consecutive numbers have identical parity (odd or even). This is clearly exponential and not feasible for large n.

**Optimized approach:**  
Notice that the forbidden pattern is three consecutive elements of the same parity. This suggests a dynamic programming solution:
- For every position, keep track of existing subsequences ending with up to two consecutive parities (so state = index, length of current parity streak, type of parity).
- For each new number, try to extend every valid previous state if the rule isn’t violated.
- Essentially, for each position, for every possible "last 0/1/2 consecutive parity" streak and parity-type, count how many stable subsequences (so far) can be extended to include nums[i].
- Add states where you start a new subsequence at nums[i] as base.
- Eventually sum all valid subsequences.

**Why use this DP structure:**
- The parity of the last two included numbers (at most) is all that matters for safety.
- There are only two parities, so possible DP states for each position are small.

### Corner cases to consider  
- Array of length 1 (just single element, always stable).
- All odd or all even numbers (watch for maximal streaks).
- Long streaks of mixed even/odd switches.
- Duplicate numbers (duplicates are fine, as property depends only on parity, not value).
- Empty array (should return 0).

### Solution

```python
MOD = 10**9 + 7

def numberOfStableSubsequences(nums):
    n = len(nums)
    # DP[i][len][p]: number of ways subsequences end at i,
    # with a streak of `len` consecutive numbers of parity p (p=0 for even, p=1 for odd)
    # Only need current and previous row for space optimization
    prev_dp = [[0, 0], [0, 0], [0, 0]]  # len: 0, 1, 2
    for i in range(n):
        p = nums[i] % 2
        curr_dp = [[0, 0], [0, 0], [0, 0]]
        # Start a new subsequence with nums[i]
        curr_dp[1][p] = (curr_dp[1][p] + 1) % MOD

        # Extend all previous subsequences
        for L in [1, 2]:
            for q in [0, 1]:
                if prev_dp[L][q] == 0:
                    continue
                if p == q:
                    if L == 2:
                        continue  # would make 3 consecutive, not allowed
                    # extend to streak of 2
                    curr_dp[2][p] = (curr_dp[2][p] + prev_dp[L][q]) % MOD
                else:
                    # different parity, streak resets to 1
                    curr_dp[1][p] = (curr_dp[1][p] + prev_dp[L][q]) % MOD
        # Also don't forget to start new from scratch at each position
        for L in [1, 2]:
            for q in [0, 1]:
                curr_dp[L][q] %= MOD
        prev_dp = curr_dp

    # Sum all non-zero-length subsequences
    ans = 0
    for L in [1, 2]:
        for p in [0, 1]:
            ans = (ans + prev_dp[L][p]) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  For each number, we consider only (2 streak lengths) × (2 parity types) = constant states.
- **Space Complexity:** O(1)  
  Only two small fixed-size DP tables are needed, independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if we must avoid k consecutive odds or evens for general k?
  *Hint: Generalize the DP to keep track of last k – 1 parities and their lengths*

- What if you had negative numbers or zeros?
  *Hint: Parity for zero is even, negatives are handled same as positives for even/odd.*

- Can you output the actual subsequences, not count?
  *Hint: Store and reconstruct, but exponential in output size!*

### Summary
This DP pattern falls into the family of **"counting restricted subsequences"** patterns, often seen in string or combinatorial subsequence problems where certain patterns must be avoided (motif-freeness). Similar techniques are used for problems about no more than k consecutive letters (runs), pattern avoidance, etc. The key is small state reduction: here, only the streak of parity matters, making the state space small and the DP efficient.

### Tags

### Similar Problems
