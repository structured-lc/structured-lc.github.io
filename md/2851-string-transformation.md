### Leetcode 2851 (Hard): String Transformation [Practice](https://leetcode.com/problems/string-transformation)

### Description  
Given two strings **s** and **t** of length n, you may perform the following operation exactly **k** times:  
- Remove a non-empty suffix of s and move it to the front.  
Find the number of ways to transform s into t exactly in k operations, where each operation can use any non-empty suffix.  
Return the answer modulo 10⁹ + 7.  
This amounts to: In exactly k "rotations" (as described), how many different sequences of choices yield t?

### Examples  

**Example 1:**  
Input: `s = "ab"`, `t = "ba"`, `k = 2`  
Output: `1`  
*Explanation: After 1 rotation, s → "ba". After another, "ba" → "ab". So after 2 rotations, only one way to get t = "ba".*

**Example 2:**  
Input: `s = "aab"`, `t = "aba"`, `k = 1`  
Output: `1`  
*Explanation: If we take suffix "b", move to front: s becomes "baa". If we take "ab", s becomes "aba" (matches t). Only one way.*

**Example 3:**  
Input: `s = "abcd"`, `t = "abcd"`, `k = 0`  
Output: `1`  
*Explanation: Zero operations; initial s already matches t.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** Try every possible sequence of k suffix moves (exponential, clearly infeasible for n, k large).
- **Observation:** Each move is a *rotation*; moving the suffix of length L effectively rotates s by n-L positions.
- All possible strings we can get from s using repeated such moves are the *rotations* of s.
- If we enumerate all rotations, only those matching t can be targets. But, we need to count the number of ways to reach t in exactly k operations, possibly visiting intermediate rotations (with repeated choices).
- **Stateful DP:** Let dp[i][j] = number of ways to be at rotation j (of s) after i operations.
    - For each step, from any current rotation, we can move to any other rotation (since any suffix size is allowed at each move).
- **Optimization:** We only care about *periodicity* (since after n steps you cycle back to original). Track: after k steps, for how many ways will t be reached as one of these rotations?
- **Final approach:**  
    - Enumerate all positions where t is a rotation of s.
    - Model the number of ways to reach these positions after k operations using DP for a Markov process (cycle through rotations).

Trade-offs: Direct DP is O(k \* n), tight for problem constraints. Uses efficient pre-processing to recognize rotation positions.

### Corner cases to consider  
- s and t are equal, k very large: many possible operation sequences.
- k=0, s ≠ t: impossible to reach.
- Repeated characters, rotations may overlap.
- n = 1, strings are always equal.
- No way to reach t as a rotation of s: output 0.

### Solution

```python
MOD = 10**9 + 7

def stringTransformation(s: str, t: str, k: int) -> int:
    n = len(s)

    # Find all rotations of s that match t
    match_rotation = []
    long_s = s + s
    for rot in range(n):
        if long_s[rot:rot + n] == t:
            match_rotation.append(rot)

    # If t is never a rotation of s, 0 ways
    if not match_rotation:
        return 0

    # Markov transition: At each step, any rotation can become any other
    # dp[i][j]: # of ways to be in rotation j after i operations
    # But says: since transition is uniform, let's optimize to count
    dp_same = 1    # # of ways to be at initial rotation (s itself)
    dp_diff = 0    # # of ways to be at any of other (n-1) rotations

    for step in range(k):
        new_same = dp_diff      # Only way to come to "s" (0-rotation) is from "not s"
        new_diff = (dp_same + dp_diff * (n - 2)) % MOD
        dp_same, dp_diff = new_same % MOD, new_diff % MOD

    # After k operations, for each matching rotation, sum corresponding counts
    result = 0
    for rot in match_rotation:
        if rot == 0:
            result = (result + dp_same) % MOD
        else:
            result = (result + dp_diff) % MOD
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n + k). Finding all rotations is O(n). The DP loop is O(k). All other operations are constant time.
- **Space Complexity:**  
  O(n) for storing possible rotation matches. The DP is O(1), as only two variables are tracked per step.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if s and t are not guaranteed to be the same length?  
  *Hint: How does the rotation model change for mismatched lengths?*

- What if only certain suffix move lengths are allowed (not all possible lengths)?  
  *Hint: How would the transition model in DP be adjusted?*

- Can you compute not only the count, but also reconstruct one possible sequence of moves?  
  *Hint: Backtrack using the rotation positions and suffix sizes.*

### Summary
This problem uses a circular DP pattern over string rotations (a Markov chain over rotation states). The insight is that the transformation is equivalent to rotating the string, and moving suffixes maps directly to these rotations. By recognizing all occurrences of t as a rotation of s, and calculating the number of ways the Markov process lands at those positions after k steps, we avoid expensive enumeration and gain an efficient solution. This pattern also appears in string periodicity, KMP/Z-algorithm tasks, and modular DP cycles.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming), String Matching(#string-matching)

### Similar Problems
