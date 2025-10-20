### Leetcode 1223 (Hard): Dice Roll Simulation [Practice](https://leetcode.com/problems/dice-roll-simulation)

### Description  
A fair 6-sided die is rolled \( n \) times. Each number 1–6, when rolled, cannot appear more than a given limit (provided per value, as the list **rollMax[0..5]** for numbers 1–6) consecutively in a row.  
Given \( n \) and **rollMax**, return the number of **distinct valid sequences** that can be obtained. Two sequences are considered different if at least one result differs.  
Return the answer modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n = 2, rollMax = [1,1,2,2,2,3]`  
Output: `34`  
*Explanation: All 36 possible length-2 sequences except (1,1) and (2,2), because for 1 and 2, max is 1. So 36-2=34.*

**Example 2:**  
Input: `n = 3, rollMax = [1,1,1,2,2,3]`  
Output: `181`  
*Explanation: Sequences like (1,1,1), (2,2,2), (3,3,3) are forbidden (see rollMax), but (4,4,4), (5,5,5), (6,6,6) may be allowed depending on their rollMax.*

**Example 3:**  
Input: `n = 1, rollMax = [1,1,1,1,1,1]`  
Output: `6`  
*Explanation: All dice faces are available for just one roll; thus all six outcomes are valid.*

### Thought Process (as if you’re the interviewee)  

- Start with **brute-force**: List all possible sequences of length \( n \) and filter those violating the consecutive constraint for each number.  
  - Time grows exponentially (\( 6^n \)), so it's not feasible for large \( n \).
- Use **Dynamic Programming**, since the problem boils down to counting valid state transitions with history on the last face and how many times it has been consecutively rolled.
- Define **dp[i][last][cnt]**:
  - \( i \): number of rolls made so far
  - \( last \): last face rolled (\( 0..5 \))
  - \( cnt \): times last was seen consecutively
- For each state, try rolling any face: 
  - If face differs from last, cnt resets to 1.
  - If same, only proceed if cnt+1 ≤ rollMax[face].
- **Base case**: For length 1, all faces can be used once.
- Final answer: sum all ways to roll n times ending with any face and valid count.  
- **Trade-offs**: DP takes \( n×6×max(rollMax) \) time and space.  
- Memoization or tabulation both allowed. States are manageable as \( n \leq 5000 \) but rollMax ≤ 15 (so ~5000×6×15 states).

### Corner cases to consider  
- Smallest n (n = 1), should always return 6.
- rollMax entries = 1 (cannot repeat any number).
- rollMax entries greater than n (can repeat any face as many as needed).
- All rollMax = [1,1,1,1,1,1] and n = 6 (should be strict permutations).
- Large n with only one face allowed many times (e.g., rollMax = [n,1,1,1,1,1]).
- All rollMax equal, e.g., [2,2,2,2,2,2].

### Solution

```python
MOD = 10**9 + 7

def dieSimulator(n, rollMax):
    # dp[i][j][k]:
    # Number of sequences with i rolls,
    # ending with number j (0–5), that has appeared k times in a row
    kMax = max(rollMax)
    dp = [[[0] * (kMax + 1) for _ in range(6)] for _ in range(n + 1)]

    # Base: 1 roll, use any number once
    for num in range(6):
        dp[1][num][1] = 1

    for i in range(2, n + 1):
        for curr in range(6):
            for prev in range(6):
                for cnt in range(1, rollMax[prev] + 1):
                    if curr != prev:
                        # New face, start streak at 1
                        dp[i][curr][1] = (dp[i][curr][1] + dp[i-1][prev][cnt]) % MOD
                    elif cnt < rollMax[curr]:
                        # Same face, increment streak
                        dp[i][curr][cnt + 1] = (dp[i][curr][cnt + 1] + dp[i-1][curr][cnt]) % MOD

    res = 0
    for num in range(6):
        for cnt in range(1, rollMax[num] + 1):
            res = (res + dp[n][num][cnt]) % MOD
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 6 × 6 × k), where k = max(rollMax). For each roll (n), for every current face (6), for each previous face (6), for all possible consecutive counts up to k (≤15).
- **Space Complexity:** O(n × 6 × k), since we create a DP array for each roll, face, and streak length (k ≤ 15).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the dice had more than 6 faces or rollMax can vary in size?
  *Hint: Can your DP scale if faces=100? Do you need to compress DP states?*

- How would you optimize if n is up to 10⁶?
  *Hint: Notice k (rollMax) is small. Can you use prefix sums or sliding window optimizations?*

- Can you return the kᵗʰ valid sequence in lex order?
  *Hint: Build sequence with respect to valid transitions and count-based selection.*

### Summary

This is a **DP with multisized state variables** (face and streak count), classic for counting *non-consecutive-repetition* settings.  
Pattern is "count ways to build restricted sequences", which also applies to strings with forbidden substrings or passwords with no k-consecutive repeats. Skilled interviewers watch for state transition modeling and careful base case/DP filling.


### Flashcard
Use DP where dp[i][last][count] is the number of ways to roll i dice ending with 'last' face rolled 'count' times consecutively.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Find Missing Observations(find-missing-observations) (Medium)
- Number of Distinct Roll Sequences(number-of-distinct-roll-sequences) (Hard)