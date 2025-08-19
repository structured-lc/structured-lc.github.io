### Leetcode 91 (Medium): Decode Ways [Practice](https://leetcode.com/problems/decode-ways)

### Description  
Given a string of digits, determine in how many ways it can be decoded, assuming:
- '1' maps to 'A', '2' maps to 'B', …, '26' maps to 'Z'.
- Each single digit (except '0') can be a letter.
- Two consecutive digits can also form a letter if the number is between '10' and '26' (inclusive).
- Sequences that contain invalid '0's (not part of '10'-'26') are not decodable.

For example, "12" could be decoded as "AB" (1,2) or "L" (12).

### Examples  

**Example 1:**  
Input: `s = "12"`  
Output: `2`  
*Explanation: "12" → "AB" or "L".*

**Example 2:**  
Input: `s = "226"`  
Output: `3`  
*Explanation: "226" → "BZ" (2,26), "VF" (22,6), or "BBF" (2,2,6).*

**Example 3:**  
Input: `s = "06"`  
Output: `0`  
*Explanation: "06" starts with '0', which cannot be mapped, so there are no ways to decode.*

### Thought Process (as if you’re the interviewee)  
First, brute force:  
- Try all ways to partition the string into one- and two-digit segments as allowed, then recursively solve the rest.
- Exponential time since every character offers up to two choices.

Optimizing:
- Many subproblems are solved repeatedly; memoization or dynamic programming is a good fit.
- At each index, ways to decode up to \( i \) depends on:
  - If s[i] is not '0', add number of ways for substring up to i-1.
  - If s[i-1:i+1] forms a valid two-digit number (10 through 26), add number of ways for substring up to i-2.

Ideal implementation:
- Use a dp array: dp[i] = number of ways to decode s[:i].
- Or optimize to two variables (rolling window) since only last two results matter for transitions[1][3].

Trade-offs:
- Recursive with memoization is easy to code but has function call overhead.
- Bottom-up DP is efficient and clear, can use O(1) space.

### Corner cases to consider  
- Input contains '0', and not as part of '10' to '26'.
- Empty string: one way (decode as empty) or zero.
- Input starts with '0' (should return 0).
- Multiple consecutive zeros.
- All single-digits or all valid pairs, e.g., "1111".

### Solution

```python
def numDecodings(s: str) -> int:
    # Edge case: empty string
    if not s:
        return 0

    # dp[i] = number of ways to decode s[:i]
    # No need for full array, just prev2 (dp[i-2]) and prev1 (dp[i-1])
    prev2, prev1 = 1, 0  # dp[0]=1, dp[1]=?
    
    # First char: 1 way if not '0', else 0
    prev1 = 1 if s[0] != '0' else 0

    for i in range(1, len(s)):
        curr = 0
        # Single digit decode if not '0'
        if s[i] != '0':
            curr += prev1
        # Two digit decode if valid (10 to 26 inclusive)
        two_digit = int(s[i-1:i+1])
        if 10 <= two_digit <= 26:
            curr += prev2
        prev2, prev1 = prev1, curr

    return prev1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is len(s). Each character is considered once.
- **Space Complexity:** O(1), since only two variables are stored for rolling computation (no extra space per input size beyond constants).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the mapping was 'A' to '2', 'B' to '3', etc. (shifted)?
  *Hint: How does the valid range for one and two-digit substrings change?*

- How would you modify the solution to return all possible decodings, not just their count?
  *Hint: Use backtracking or BFS/DFS to build all combinations instead of just counting.*

- If numbers can be up to three digits (e.g., 1-999 maps to codes)?
  *Hint: Can you generalize the transition step to allow for three substrings, not just 1 or 2?*

### Summary
This is a classic dynamic programming problem, using either top-down memoization or bottom-up tabulation. The core pattern is similar to ways-to-climb-stairs, using only previous one and two results to compute the current total, and is a template for DP with restricted transitions (Fibonacci-like problems, variations on decoding strings, etc.).

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Decode Ways II(decode-ways-ii) (Hard)
- Number of Ways to Separate Numbers(number-of-ways-to-separate-numbers) (Hard)
- Count Number of Texts(count-number-of-texts) (Medium)