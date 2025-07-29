### Leetcode 139 (Medium): Word Break [Practice](https://leetcode.com/problems/word-break)

### Description  
You are given a string **s** and a list of words called **wordDict**. Determine if **s** can be split into a sequence of one or more words, *all* of which must exist in **wordDict**. Each word in the dictionary can be used *multiple times*.  
The challenge is to return `True` if this is possible, and `False` otherwise.

### Examples  

**Example 1:**  
Input: `s = "leetcode"`, `wordDict = ["leet", "code"]`  
Output: `True`  
*Explanation: We can split "leetcode" as "leet code". Both "leet" and "code" exist in the dictionary.*

**Example 2:**  
Input: `s = "applepenapple"`, `wordDict = ["apple", "pen"]`  
Output: `True`  
*Explanation: "applepenapple" can be segmented as "apple pen apple", using "apple" twice and "pen" once.*

**Example 3:**  
Input: `s = "catsandog"`, `wordDict = ["cats", "dog", "sand", "and", "cat"]`  
Output: `False`  
*Explanation: There is no possible way to split "catsandog" into dictionary words that covers the entire string; "og" cannot be matched by any word in the dictionary.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Consider every way to divide the input string into substrings, checking if each substring is in the dictionary.  
  This results in trying all possible split points — exponential time, much too slow for larger strings.

- **Optimization - Dynamic Programming:**  
  Define a boolean array **can_break** of length len(s)+1, where can_break[i] means the prefix s[:i] can be broken into words from the dictionary.  
  - Base case: can_break = True (the empty string can always be segmented).
  - For each position i, loop through all j < i and check if can_break[j] is True *and* s[j:i] is in the dictionary.  
  - If such a j exists, set can_break[i] to True.

- This approach tries to build up segmentation possibilities for the string from left to right, with fewer repeated computations compared to recursion.

- *Trade-offs*:  
  - Time complexity is much improved (polynomial) over brute force.  
  - Space complexity involves storing one boolean for each position in the string.

- The solution leverages set lookups for the dictionary (since set is O(1) average-case lookup), making the substring existence check fast.

### Corner cases to consider  
- **Empty string `s`**: should return True as no segmentation is needed.
- **Empty wordDict**: should return False unless `s` is also empty.
- **s contains characters not present in any dictionary word**.
- **Reuse of dictionary words**: e.g., "aaaaa" with ["a","aa"].
- **Single-word in wordDict that matches all of s**.
- **wordDict contains words not used in the segmentation**.

### Solution

```python
def wordBreak(s, wordDict):
    # Convert wordDict to a set for O(1) lookups
    word_set = set(wordDict)
    n = len(s)
    # can_break[i] means s[:i] can be segmented
    can_break = [False] * (n + 1)
    can_break[0] = True  # base case: empty string

    for i in range(1, n + 1):
        for j in range(i):
            # Check if s[j:i] is in dictionary and s[:j] can be segmented
            if can_break[j] and s[j:i] in word_set:
                can_break[i] = True
                break  # No need to check further if True

    return can_break[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the length of s.  
  For each index i, may check all possible j < i (up to n), and lookup each substring s[j:i] in the set is O(1).
- **Space Complexity:** O(n + m × k), where n is the length of s, m is number of words in wordDict, and k is average word length.  
  - O(n) for the can_break array.
  - O(m × k) for building the set from the dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to return *all possible* segmentations instead of just a boolean?  
  *Hint: Try backtracking, and consider returning a list of lists or strings representing the possible word splits.*

- Can this be solved with Breadth-First Search (BFS) instead of DP?
  *Hint: Think about queueing start/end indices as you find valid words.*

- How would the approach change if wordDict is extremely large or presented as a stream (not random-access)?
  *Hint: Trie might help for prefix matching and to avoid scanning the whole dictionary for each substring.*

### Summary
This problem uses the classic **dynamic programming** pattern, specifically "substring DP", where the state at position i in the string depends on solutions to earlier prefixes.  
It avoids redundant computation by storing results in can_break and efficiently checks word existence with a set.  
This pattern appears in other substring decomposition problems, sentence parsing, and even in some variations of number factoring and coin change.