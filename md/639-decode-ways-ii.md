### Leetcode 639 (Hard): Decode Ways II [Practice](https://leetcode.com/problems/decode-ways-ii)

### Description  
You are given an encoded string containing digits (`'0'`-`'9'`) and the wildcard character `'*'`. Each character or pair of characters can be mapped to a letter ('A'-'Z') using the mapping `'A'` → `1`, `'B'` → `2`, ..., `'Z'` → `26`. The `'*'` character can represent any digit from `'1'` to `'9'`.  
Return the number of different ways the message can be decoded.  
Since the answer can be very large, return it modulo \(10^9 + 7\).

### Examples  

**Example 1:**  
Input: `"*"`  
Output: `9`  
Explanation: *"*" can represent digits 1-9, mapping to "A"-"I" respectively.*

**Example 2:**  
Input: `"1*"`  
Output: `18`  
Explanation: *"1*" can be "11"-"19" (each maps both as one or two characters, e.g., "AA", "K"). Total: 9×2 = 18 ways.*

**Example 3:**  
Input: `"2*"`  
Output: `15`  
Explanation: *"2*" is "21"-"29". "21"-"26" may each be decoded two ways ("UA"/"U" etc.), while "27"-"29" only one way. 6×2 + 3×1 = 15.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Try every possible way to split the string by single or double character decoding, considering each `'*'` as digits '1'-'9'. Quickly, this approach becomes infeasible due to exponential growth.
- **Dynamic Programming:** Let dp[i] represent the number of ways to decode the substring up to index i−1. For each position:
  - Consider the single character s[i−1]:
    - If it is a digit 1-9, add dp[i−1] ways.
    - If it is a `'*'`, add `9 × dp[i−1]`.
  - Consider the pair s[i−2:i]:
    - If both are digits: if 10 ≤ int(s[i−2:i]) ≤ 26, add dp[i−2].
    - If s[i−2] or s[i−1] is `'*'`, compute how many pairs forming valid numbers (10–26) are possible.
- Take every result modulo \(10^9 + 7\).
- This efficiently computes the answer in linear time, without recursion depth or re-exploring subproblems, and scales to long strings.

### Corner cases to consider  
- Empty string (should return 1 by convention).
- String starting with '0' (invalid, returns 0).
- Standalone '0' (invalid unless part of '10', '20').
- Multiple adjacent `'*'` (explosion of possibilities).
- Strings with only digits, only `'*'`, or a mix.
- Long strings, high number of combinations (test modulo arithmetic).

### Solution

```python
def numDecodings(s: str) -> int:
    MOD = 10 ** 9 + 7
    n = len(s)
    if not s: return 1

    # dp[i]: number of ways to parse s[:i]
    a, b = 1, 0  # a = dp[i-2], b = dp[i-1]
    # Initialization for dp[1]
    if s[0] == '*':
        b = 9
    elif s[0] != '0':
        b = 1
    else:
        b = 0

    for i in range(1, n):
        c = 0
        # Single character
        if s[i] == '*':
            c = 9 * b
        elif s[i] != '0':
            c = b
        # Two character
        if s[i-1] == '*' and s[i] == '*':
            # '*' can be '1' or '2'
            c += 15 * a  # '11'-'19' (9) + '21'-'26' (6)
        elif s[i-1] == '*':
            # s[i-1] == '*', s[i] is a digit
            if '0' <= s[i] <= '6':
                c += 2 * a  # '1x' and '2x'
            elif '7' <= s[i] <= '9':
                c += a      # only '1x'
        elif s[i] == '*':
            if s[i-1] == '1':
                c += 9 * a  # '11'-'19'
            elif s[i-1] == '2':
                c += 6 * a  # '21'-'26'
        else:
            two = int(s[i-1:i+1])
            if 10 <= two <= 26:
                c += a
        c %= MOD
        a, b = b, c
    return b
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of s. Each position in the string is examined once.
- **Space Complexity:** O(1), because only constant space (previous two/dp values) is maintained, not full array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if we wanted to print all decodings, not just their count?  
  *Hint: Consider recursion/DFS with memorization. But runtime and space will be exponential for large n.*
- What if the mapping was to a variable-length alphabet (e.g. not just 1-26)?  
  *Hint: You'd need a lookup set/dictionary and adjust your window size when searching for valid codes.*
- How would you adjust your DP if instead of `'*'` as wildcard, you had multiple specific wildcards mapping to overlapping but distinct digit sets?  
  *Hint: Factor in the possible mappings for each new wildcard; generalize the single and double character checks accordingly.*

### Summary
This problem highlights a **dynamic programming** approach, using previous results to build up the solution and handling combinatorial cases due to the wildcard. The pattern is common in decoding/encoding, partition DP, and subsequence/substring problems (like other variants of Decode Ways and string segmentation). The main insights are: scan left-to-right, combine ways to decode both as a single char and two-char for each step, and deeply consider wildcard expansions.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Decode Ways(decode-ways) (Medium)
- Number of Ways to Separate Numbers(number-of-ways-to-separate-numbers) (Hard)
- Number of Ways to Divide a Long Corridor(number-of-ways-to-divide-a-long-corridor) (Hard)