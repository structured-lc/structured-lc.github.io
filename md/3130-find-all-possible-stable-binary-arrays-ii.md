### Leetcode 3130 (Hard): Find All Possible Stable Binary Arrays II [Practice](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii)

### Description  
You are given three integers: **zero**, **one**, and **limit**.  
You want to build binary arrays (arrays only containing 0’s and 1’s) using exactly `zero` number of 0’s and `one` number of 1’s.

An array is **stable** if for every subarray with length strictly greater than `limit`, that subarray contains both 0 and 1 (i.e., **there are no subarrays of length > limit that are all 0’s or all 1’s**).

Return the total number of such stable arrays. Since the result may be very large, return it modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `zero=1, one=1, limit=2`  
Output: `2`  
*Explanation: Arrays [0,1] and [1,0] both have 1 zero and 1 one. Every subarray of length >2 must contain both 0 and 1. Since the array itself is only length 2, this is automatically satisfied.*

**Example 2:**  
Input: `zero=1, one=2, limit=1`  
Output: `1`  
*Explanation: Possible arrays are [0,1,1], [1,0,1], [1,1,0]. [1,0,1] is valid because no subarray of length>1 is all 0’s or all 1’s. [0,1,1] and [1,1,0] both have subarrays [1,1] of length 2 (which is >1) that violate the condition. So only [1,0,1] is valid.*

**Example 3:**  
Input: `zero=2, one=2, limit=2`  
Output: `6`  
*Explanation: All binary arrays of length 4 with two 0’s and two 1’s (as orderings) except those with three 0’s or three 1’s in a row (i.e., no three consecutive same digits). There are 6 such valid arrays.*


### Thought Process (as if you’re the interviewee)  
- At first glance, the brute-force way is to generate all arrays with the required number of 0’s and 1’s, then check for each whether every subarray of length >limit contains both 0 and 1.  
  - This is exponential and won’t scale for larger zero/one values.

- To optimize, notice the problem asks for permutations with restrictions on consecutive counts.
  - At each part of the array, we can add up to **limit** consecutive 0’s, and up to **limit** consecutive 1’s, but not more.

- This suggests **DP with state:**
  - How many 0's left
  - How many 1's left
  - How many consecutive current digit have we placed (k)
  - What is the last digit placed (0 or 1)

- Recurrence:  
  - For each recursive call, try to place either more of the same last element (if we aren’t at the limit), or switch to the other element.
  - Base case is when both zeros and ones are depleted.

- Memoization will save repeated states.
- Time complexity is O(zero × one × limit × 2) for the DP state.
- This construction ensures that you never build a subarray of more than limit identical elements, so any subarray of length > limit must contain both 0 and 1 by construction.

### Corner cases to consider  
- zero = 0 or one = 0 (arrays are all 1’s or all 0’s: only allowed if total length ≤ limit)
- limit ≥ zero + one (arrays automatically valid, as no subarray has length > limit)
- limit = 0 (should only allow alternating bits)
- Very large zero or one (must check if DP handles memory/time)
- zero = one = 1 (trivial case, both [0,1] and [1,0])

### Solution

```python
MOD = 10 ** 9 + 7

def countStableArrays(zero: int, one: int, limit: int) -> int:
    # Memoize state: zeros left, ones left, streak, last
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(zeros, ones, streak, last):
        # If all elements are used up, this is a valid sequence
        if zeros == 0 and ones == 0:
            return 1
        res = 0
        if last == 0:
            # Continue with more 0 if streak < limit
            if zeros > 0 and streak < limit:
                res += dp(zeros - 1, ones, streak + 1, 0)
                res %= MOD
            # Or switch to 1, reset streak
            if ones > 0:
                res += dp(zeros, ones - 1, 1, 1)
                res %= MOD
        else: # last == 1
            # Continue with more 1 if streak < limit
            if ones > 0 and streak < limit:
                res += dp(zeros, ones - 1, streak + 1, 1)
                res %= MOD
            # Or switch to 0, reset streak
            if zeros > 0:
                res += dp(zeros - 1, ones, 1, 0)
                res %= MOD
        return res

    # Try both starting with 0 or 1, as long as available
    ans = 0
    if zero > 0:
        ans += dp(zero - 1, one, 1, 0)
        ans %= MOD
    if one > 0:
        ans += dp(zero, one - 1, 1, 1)
        ans %= MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - The DP has (zero+1) × (one+1) × limit × 2 possible states.  
  - Each call does constant work, so time is O(zero × one × limit).

- **Space Complexity:**  
  - Space is O(zero × one × limit × 2) for memoization.

### Potential follow-up questions (as if you’re the interviewer)  

- If arrays can start with either 0 or 1 or must always start with 1?
  *Hint: How would you change the initial condition?*

- What if there’s a different limit for consecutive 0’s and consecutive 1’s?
  *Hint: Could you generalize the dp state and transition?*

- Can you generate all possible arrays too, not just count them?
  *Hint: Store path for each recursive call, and output when valid.*

### Summary
This problem is a variation of **DP with forbidden consecutive patterns**: you count valid permutations under run-length (consecutive) constraints.  
The key is to carefully define your DP state: (remaining 0’s, remaining 1’s, current streak length, last digit used).  
Classic in problems with "no k consecutive X", "run length encoded words", etc.; similar structures appear in *tiling*, *word formation*, and *constrained string* combinatorics.