### Leetcode 3405 (Hard): Count the Number of Arrays with K Matching Adjacent Elements [Practice](https://leetcode.com/problems/count-the-number-of-arrays-with-k-matching-adjacent-elements)

### Description  
Given three integers **n**, **m**, and **k**:  
- Return the number of different arrays `arr` of length **n** where:  
  - Each element is in the range 1 to **m** (inclusive)
  - Exactly **k** indices **i** (where 1 ≤ i < n) satisfy arr[i] == arr[i-1]  
The answer should be returned modulo 10⁹+7.

In short: **Count the ways to build an array of length n with values 1...m and exactly k pairs of equal adjacent elements.**

---

### Examples  

**Example 1:**  
Input: `n=3`, `m=2`, `k=1`  
Output: `4`  
Explanation:  
Arrays: `[1,1,2]`, `[1,2,2]`, `[2,1,1]`, `[2,2,1]`—each has exactly **1** adjacent pair of matching values.

**Example 2:**  
Input: `n=3`, `m=3`, `k=2`  
Output: `6`  
Explanation:  
Arrays: `[1,1,1]`, `[2,2,2]`, `[3,3,3]`, `[1,1,1]`, `[2,2,2]`, `[3,3,3]` (actually only one unique array per value; but with 3 values we have 3 possibilities, and since k=2 there must be two matches, so only arrays with all elements same are valid: `[1,1,1]`, `[2,2,2]`, `[3,3,3]`). *Note: Input/Output here reflects the structure; in actual, for n=3, m=3, k=2, arrays where all 3 values are the same for each value ('[x,x,x]') will have exactly 2 adjacent matching pairs.*

**Example 3:**  
Input: `n=4`, `m=2`, `k=2`  
Output: `4`  
Explanation:  
Possible arrays: `[1,1,2,2]`, `[1,2,2,2]`, `[2,2,1,1]`, `[2,1,1,1]`. Each has exactly two adjacent matches.

---

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  Try all mⁿ possible arrays and count those with exactly k adjacent matches.  
  This is extremely slow and not feasible for large **n**.

- **Observation:**  
  The constraint is on the number of adjacent pairs with equal values.
  So, we can move left-to-right, making a choice at each step:
  - Start with any value (m choices).
  - For each of next n-1 elements,  
    - Can be made **equal to previous** (so a new match),  
    - Or **different** from previous (so no match).

- **DP Approach:**  
  Use DP where:
    - dp[i][j]: Ways to build an array of **length i** with **j matches** so far, with any value at the end.
    - For each position, we can:
      - Match with previous (if matches used < k): 1 choice (pick same as before).
      - Pick a different value (if possible): m-1 choices (pick any of the other values).

  So:
  - dp[1] = m (first element can be anything, no matches possible yet)
  - For i in 2 to n, for j in 0 to k:
    - dp[i][j] += dp[i-1][j-1] × 1  (if match, exactly one way: same value as prev)
    - dp[i][j] += dp[i-1][j] × (m-1) (no match, pick any value except prev)

  Final answer is dp[n][k].

- **Optimization:**  
  We can use only 2 rows (previous, current) since dp[i] depends only on dp[i-1].

---

### Corner cases to consider  
- n = 1: Only one element, so k must be 0.  
- m = 1: Only one value, all adjacents will match. Only k = n-1 is possible.  
- k = 0: No adjacent matches allowed, must alternate values at every index.  
- k = n-1: Every adjacent matches (all elements the same).  
- k > n-1: Impossible.

---

### Solution

```python
MOD = 10**9 + 7

def countGoodArrays(n, m, k):
    # dp[i][j] = #ways to have i-length array with j matching pairs
    # Only need last row
    prev = [0] * (k+2)  # +2 just in case indexing
    prev[0] = m  # Any of m values to start
    
    for i in range(2, n+1):
        curr = [0] * (k+2)
        for j in range(0, min(i, k+1)):  # Can't have more matches than i-1
            # Add a matching pair: (previous must have j-1 matches)
            if j-1 >= 0:
                curr[j] += prev[j-1] * 1
                curr[j] %= MOD
            # Add a non-matching pair: (prev value != current), m-1 choices
            curr[j] += prev[j] * (m-1)
            curr[j] %= MOD
        prev = curr
    
    return prev[k] % MOD
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k) — For each of n positions, we consider up to k possible numbers of matches.
- **Space Complexity:** O(k) — We only keep two arrays of size up to k+2 for DP.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of exactly k matches, you wanted at most k matches?
  *Hint: Think about DP summation across 0…k in last row.*

- How would you build one such valid array (not just count)?
  *Hint: Trace DP, reconstruct backwards, or do DFS with pruning.*

- Can you solve the problem if the constraint is that no two equal numbers are adjacent?
  *Hint: k = 0 case. Use (m × (m-1)^(n-1)).*

---

### Summary

This problem uses a **Dynamic Programming** and **state compression** approach: DP[i][j] encodes information about partial solutions, considering matches and state transitions (next can match or differ with previous). The pattern is classical: "count the number of ways to build a sequence with restricted transitions," and is seen commonly in combinatorics, coloring problems, and sequence construction (such as counting strings with no repeated consecutive letters, or similar sequence problems).


### Flashcard
Use DP where dp[i][j] = number of arrays of length i with exactly j adjacent matches; at each step, choose to match (1 way) or differ (m − 1 ways) from the previous element.

### Tags
Math(#math), Combinatorics(#combinatorics)

### Similar Problems
- Count Good Numbers(count-good-numbers) (Medium)