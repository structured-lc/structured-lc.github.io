### Leetcode 2370 (Medium): Longest Ideal Subsequence [Practice](https://leetcode.com/problems/longest-ideal-subsequence)

### Description  
Given a string of lowercase English letters `s` and an integer `k`, return the length of the **longest ideal subsequence** of `s`.  
A subsequence is ideal if, for every adjacent pair of letters in the subsequence, the absolute difference between their alphabetical positions is ≤ k.   
A subsequence is formed by deleting some (or no) characters from `s` without reordering the rest.

For example, with k = 2, both "ab" and "bd" are allowed in the same ideal subsequence (difference ≤ 2). The difference between 'a' and 'z' is 25, not 1, so the alphabet is not cyclic.

### Examples  

**Example 1:**  
Input: `s = "acfgbd", k = 2`  
Output: `4`  
*Explanation: The longest ideal subsequence is "acbd". Each consecutive pair in "acbd" differs by at most 2 in the alphabet (`|a-c|=2`, `|c-b|=1`, `|b-d|=2`).*  

**Example 2:**  
Input: `s = "abcd", k = 3`  
Output: `4`  
*Explanation: The whole string "abcd" is an ideal subsequence since the difference between any adjacent pair is 1 ≤ 3.*

**Example 3:**  
Input: `s = "xyz", k = 0`  
Output: `1`  
*Explanation: Any longer subsequence requires adjacent different letters (difference > 0). So the answer is any one letter.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible subsequences and, for each, check that every pair of adjacent letters differs by at most k. The number of subsequences is exponential (2ⁿ), so this is too slow for n up to 10⁵.
- **Dynamic Programming (DP):**  
  - For each index and character, keep track of the length of the longest ideal subsequence ending with that character.
  - Use a DP array where `dp[ch]` represents the longest ideal subsequence ending with the letter corresponding to `ch` (where `ch` is 0 for 'a', 1 for 'b', ..., 25 for 'z').
  - For each letter in the string, consider extending from all letters whose alphabet index is within ±k of the current letter. For each position, we take the maximum among those fits and add 1.
  - This allows processing in O(n·k) time, but since k ≤ 25 (constant), total complexity is O(n).
- **Why optimal:**  
  - More efficient than recreating subsequences.  
  - DP with 26 entries (for each possible letter a-z) is space efficient (uses constant space).

### Corner cases to consider  
- Empty string: Output should be 0.
- k = 0: Only subsequences of repeated letters are allowed.
- All distinct letters, small k: Only single-letter subsequences.
- k ≥ 25: Any subsequence allowed.
- String with all identical letters.
- Very large string length (n up to 10⁵).

### Solution

```python
def longestIdealString(s: str, k: int) -> int:
    # dp[c] = longest ideal subsequence ending with character chr(ord('a')+c)
    dp = [0] * 26
    
    for ch in s:
        idx = ord(ch) - ord('a')
        # Check all possible previous last characters within k of current
        left = max(0, idx - k)
        right = min(25, idx + k)
        max_prev = 0
        for prev in range(left, right + 1):
            max_prev = max(max_prev, dp[prev])
        dp[idx] = max(dp[idx], max_prev + 1)
    
    # Final answer: maximum value across all dp
    return max(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n·k)  
  n is the length of s, k is at most 25, so effectively O(n). Each letter checks at most 2k+1 options (constant).
- **Space Complexity:** O(1)  
  We use a fixed array of size 26 (for each letter of the alphabet). The input string is not modified or copied.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet was not just lowercase English letters but included Unicode?  
  *Hint: How would you generalize the DP table?*

- How would you return the subsequence itself, not just its length?  
  *Hint: Backtrack or store previous pointers along with DP.*

- How can you modify your approach if k is very large or dynamic?  
  *Hint: Can you use segment trees or data structures for faster range queries?*

### Summary
This is a classic **dynamic programming** problem, with state representing the best answer for all subsequences ending with each letter.  
It uses a one-dimensional DP array indexed by character, with transitions based only on nearby entries (by at most k positions). This “DP on letters” pattern is seen in many substring/subsequence optimization problems, especially when adjacency is restricted by a mathematical condition.  
The pattern applies to problems like the longest increasing/decreasing subsequence with constraints, or problems limiting jumps based on alphabet/index differences.

### Tags
Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)