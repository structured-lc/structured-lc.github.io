### Leetcode 2466 (Medium): Count Ways To Build Good Strings [Practice](https://leetcode.com/problems/count-ways-to-build-good-strings)

### Description  
Given four integers, **zero**, **one**, **low**, and **high**, you can build a string by:
- Starting from an empty string,
- At each operation, either append `'0'` exactly **zero** times, or append `'1'` exactly **one** times,
- You can perform operations in any order and any number of times (including mixing zeros and ones),
- A string is called **good** if its length is in \[low, high\] (inclusive).

Return the total number of distinct good strings you can build this way. Since the answer can be very large, return it modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `low=3, high=3, zero=1, one=1`  
Output: `8`  
*Explanation: All binary strings of length 3 are possible: “000”, “001”, “010”, “011”, “100”, “101”, “110”, “111”. Each can be formed by a sequence of ‘0’ and ‘1’ operations.*

**Example 2:**  
Input: `low=2, high=3, zero=1, one=2`  
Output: `5`  
*Explanation: Good strings:  
- Length 2: “00”, “11” (built as: “00” and “11”)  
- Length 3: “000”, “011”, “110” (built as: “00” + ‘0’, “0” + “11”, “11” + ‘0’)*

**Example 3:**  
Input: `low=5, high=5, zero=2, one=3`  
Output: `2`  
*Explanation: Only two good strings are possible:  
- "00011" (2×‘0’, 1×‘1’)  
- "11000" (1×‘1’, 2×‘0’)*


### Thought Process (as if you’re the interviewee)  
- Brute force: Try all possible strings of each length in [low, high], recursively generate every possibility.  
  - This is too slow as the number of possible strings grows exponentially with the length.
- Optimization: The only choices are adding a “block” of **zero** zeros or **one** ones at each step.  
- For any length **i**, the number of ways to build a string of length **i** = (ways to build length **i-zero**) + (ways to build length **i-one**).
- This is a classic DP where the state is the string length.  
- We use dp[i]: number of ways to build a string of length i.
- Base case: dp = 1 (empty string).
- For each i in [1, high],  
    - If i≥zero: dp[i] += dp[i-zero]  
    - If i≥one: dp[i] += dp[i-one]
- Our answer is sum of dp[low] to dp[high] inclusive.
- This works efficiently even for high up to 10^5.

### Corner cases to consider  
- If zero or one are greater than high, no characters can be added to reach desired length.
- If low==0, the empty string counts as good.
- low > high (nonsensical as per constraints, but good to check code robustness).
- Large values for zero and one (must not overflow indexes).

### Solution

```python
def countGoodStrings(low: int, high: int, zero: int, one: int) -> int:
    MOD = 10 ** 9 + 7
    # dp[i]: number of ways to build a string of length i
    dp = [0] * (high + 1)
    dp[0] = 1  # there is 1 way to build empty string

    for length in range(1, high + 1):
        # If we can append zero '0's
        if length >= zero:
            dp[length] = (dp[length] + dp[length - zero]) % MOD
        # If we can append one '1's
        if length >= one:
            dp[length] = (dp[length] + dp[length - one]) % MOD

    # Sum up all good strings of length low to high
    result = sum(dp[low:high + 1]) % MOD
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(high)  
  We compute dp values for all lengths up to high, each in O(1) time (just two additions).  
- **Space Complexity:** O(high)  
  We maintain a DP array of length (high+1). No recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if instead of always adding blocks of exactly zero or one length, you could choose variable lengths from a list?
  *Hint: Try to generalize your DP to support lists of step sizes.*

- What if you needed to generate and print all the actual good strings, not just count them?
  *Hint: Use recursion/backtracking, careful with performance/space for large cases.*

- Could you reduce the space usage further?
  *Hint: Since dp[i] only depends on previous values, can you save memory? Compare with rolling-window DP.*

### Summary
This is a classic **unbounded knapsack DP** problem (with only two item sizes: zero and one).  
The solution uses bottom-up DP to count ways to build up all possible string lengths, summing up the counts for all needed output lengths.  
This DP pattern appears in many problems: coin change, tiling, staircase, and integer compositions.  
Understanding the recurrence and base cases is critical for these types of combinatorics/build problems.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Climbing Stairs(climbing-stairs) (Easy)