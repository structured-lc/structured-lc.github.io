### Leetcode 2311 (Medium): Longest Binary Subsequence Less Than or Equal to K [Practice](https://leetcode.com/problems/longest-binary-subsequence-less-than-or-equal-to-k)

### Description  
Given a binary string `s` and an integer `k`, find the length of the **longest subsequence** of `s` such that the subsequence, when interpreted as a binary number (leading zeros allowed), is less than or equal to `k`.  
- You may freely delete characters from `s` (preserving order) to form the subsequence.
- The empty subsequence is treated as the value 0.
- Leading zeros in the subsequence are permitted.

### Examples  

**Example 1:**  
Input: `s = "1001010", k = 5`  
Output: `5`  
*Explanation: One example is picking "00010" (positions 2, 3, 4, 6, 7). This is "00010" → value 2, which is ≤ 5, and length is 5 (maximum possible).*

**Example 2:**  
Input: `s = "00101001", k = 10`  
Output: `7`  
*Explanation: Pick "0010100" ("0" at index 0, "0" at 1, "1" at 2, "0" at 3, "1" at 4, "0" at 6, "0" at 7). The subsequence is "0010100", which as binary is 20, but "001010" is 10. Length 7 can be arranged to be the maximum with 10. See detailed walkthrough in code below.*

**Example 3:**  
Input: `s = "1", k = 1`  
Output: `1`  
*Explanation: Either you pick '' (value 0) or '1' (value 1), both ≤ 1. Output is 1 as that's the maximum length subsequence.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way is to check all 2ⁿ subsequences, convert each to its binary value, and select those ≤ k, then take the one with the max length. Clearly, this is not feasible for long strings.
- Next, let's observe:
   - **Zeros:** Since leading zeros are allowed and don't increase the numeric value, we can always add as many zeros as possible to the answer.
   - **Ones:** Each '1' at position i (from the right) contributes 2ˣ to the subsequence's value. We must ensure that picking any '1' does not blow up the value past k.
- The **optimal greedy plan:**  
  - Always pick all zeros.
  - Try to take as many ones as possible, scanning **from the right** (least significant bit), only if the total doesn't exceed k.
  - For each '1': keep a running value of the binary subsequence; if including the '1' (with its corresponding bit power) does not cause overflow, include it and update the value accordingly.
- This is efficient because:
   - There are at most `log₂(k)+1` bits (ones) we can take before exceeding k.  
   - We never have to try ones further left if they'd require bits beyond the bit-length of k.

### Corner cases to consider  
- String contains only `'1'`s and k is small (maybe can't take any ones).
- String contains only `'0'`s (answer is length of string).
- String is empty.
- k = 0 (can only pick zeros).
- The most significant bit (leftmost '1') causes overflow immediately.
- Very large k (possible to pick all ones).
- Leading zeros.

### Solution

```python
def longestSubsequence(s: str, k: int) -> int:
    # Count all zeros: they never increase the value
    zeros = s.count('0')
    n = len(s)
    # Track value and bit position
    value = 0
    length = 0
    power = 0  # rightmost bit is at power 0
    
    # From right to left: try including as many right-most bits as possible,
    # prioritizing all zeros, and as many ones as possible without going over k.
    for i in range(n - 1, -1, -1):
        if s[i] == '0':
            length += 1
        else:
            # If this '1' at power-th bit doesn't overflow k, include it
            if power < 64:  # to prevent integer overflow on big inputs
                # Try to include current 1
                if value + (1 << power) <= k:
                    value += (1 << power)
                    length += 1
            power += 1  # increase bit position

    return length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  (Count zeros and scan from right-to-left; visiting all characters once.)
- **Space Complexity:** O(1)  
  (Uses only a fixed number of variables, no extra arrays or recursion.)

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if the string contained digits beyond '0' and '1'?  
  *Hint: Think about base conversion and how to count their contributions.*

- Suppose k is extremely large (e.g., up to 10¹⁸), but the string is also huge (10⁶+ characters). Are there optimizations for such large cases?  
  *Hint: Are there limits on how many ones can be included, related to the bit-length of k?*

- What if you want the actual **subsequence** (string), not just the length?  
  *Hint: Track the choices as you go and reconstruct using indices.*

### Summary
This problem illustrates the **greedy** and **bit manipulation** patterns: always keep cost-free parts ('0's), and only add risky parts ('1's) when safe, proceeding from least to most significant position.  
It's a classic example of making locally optimal (greedy) choices to produce a globally optimal subsequence subject to a numeric constraint.  
This approach applies to other settings, such as selecting digits for maximum/minimum number under a base or value restriction.


### Flashcard
Maximize subsequence length by taking all '0's and as many '1's as possible without exceeding k when interpreted as binary.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Memoization(#memoization)

### Similar Problems
- Maximum Binary String After Change(maximum-binary-string-after-change) (Medium)