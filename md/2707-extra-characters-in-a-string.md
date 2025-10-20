### Leetcode 2707 (Medium): Extra Characters in a String [Practice](https://leetcode.com/problems/extra-characters-in-a-string)

### Description  
Given a string **s** and a list of words (**dictionary**), break **s** into one or more non-overlapping substrings such that every substring is present in the dictionary. Any character in **s** that can't be part of such substrings is considered **extra**. Your task is to minimize the number of extra characters by optimally breaking **s**.

### Examples  

**Example 1:**  
Input: `s = "leetscode", dictionary = ["leet", "code", "leetcode"]`  
Output: `1`  
*Explanation: The closest fit is "leet" + "scode" or "leetcode". The 's' is extra, minimum extra chars = 1.*

**Example 2:**  
Input: `s = "applepenapple", dictionary = ["apple", "pen"]`  
Output: `0`  
*Explanation: "apple" + "pen" + "apple" covers the whole string, so no extra characters.*

**Example 3:**  
Input: `s = "sayhelloworld", dictionary = ["hello", "world"]`  
Output: `3`  
*Explanation: 'say' are extra, the rest is "hello" + "world". 3 extra characters.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to try all possible ways to segment **s** into words from the dictionary and count the number of extra characters each way.
- Simple recursion without memoization causes exponential runtime since for every position in **s**, you may branch at every possible next split.
- To optimize, use **dynamic programming**:
  - Let `dp[i]` be the minimum extra characters for the substring `s[i:]` (from index *i* to end).
  - At each index *i*, either:
    - Skip the current character (count as extra): `dp[i] = 1 + dp[i+1]`
    - Try every possible end index `j` such that `s[i:j]` is in the dictionary, then set `dp[i] = min(dp[i], dp[j])`.
  - Preprocess dictionary as a set for O(1) substring lookup.

- Trade-offs:
  - Recursion with memoization is clean and easy to implement.
  - Bottom-up dynamic programming uses a 1D array and is generally more efficient (no recursion stack).

### Corner cases to consider  
- Empty string **s** → extra chars = 0.
- Empty dictionary → every character in **s** is extra.
- No matching dictionary words in **s** at all.
- All of **s** is a single dictionary word.
- Overlapping words in dictionary (e.g., both "a" and "ab").
- Long **s**, short dictionary words (frequent substrings).

### Solution

```python
def minExtraChar(s, dictionary):
    n = len(s)
    dict_set = set(dictionary)
    # dp[i] = min extra chars in s[i:]
    dp = [0] * (n + 1)
    # dp[n] = 0 since empty suffix means 0 extra chars

    # Traverse from right to left
    for i in range(n - 1, -1, -1):
        # Option 1: Skip current char as extra
        min_extra = 1 + dp[i + 1]
        # Option 2: Try all ends j where s[i:j] is in dict
        for j in range(i + 1, n + 1):
            if s[i:j] in dict_set:
                min_extra = min(min_extra, dp[j])
        dp[i] = min_extra
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), because for each position i in s, you may explore up to O(n) substrings s[i:j]. Checking presence in set is O(1).
- **Space Complexity:** O(n), for the dp array of size n+1. The dictionary set is O(D) where D is total word chars, but that's usually small in practice.

### Potential follow-up questions (as if you’re the interviewer)  

- If dictionary word lengths are bounded, can we optimize further?  
  *Hint: Only check substrings of lengths equal to any dictionary word length.*

- How would you build the solution if you cared about the actual segmentation, not just the count?  
  *Hint: Store the choice j at each i, reconstruct the splits backwards.*

- Can the dictionary be large (millions of words)?  
  *Hint: A Trie structure may speed up substring lookup for long/overlapping words.*

### Summary
This problem uses a **dynamic programming** pattern similar to word-break or segment string problems. Build a dp array from right to left, minimizing at each index the extra character count with or without taking dictionary words. The pattern is classic "string segmentation with dictionary" DP and appears in various leetcode problems, often whenever substrings can be matched from a dictionary with optimal cuts.


### Flashcard
Use dynamic programming where dp[i] is the minimum extra characters for s[i:], checking all dictionary matches at each position.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming), Trie(#trie)

### Similar Problems
- Word Break(word-break) (Medium)