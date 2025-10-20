### Leetcode 2060 (Hard): Check if an Original String Exists Given Two Encoded Strings [Practice](https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings)

### Description  
Given two encoded strings consisting of lowercase letters and digits (`1-9`), determine if there exists an original string (all lowercase letters) that could be encoded to both. Each encoded string can be formed by splitting the original string into non-empty substrings, and replacing any piece by its length (as digits), then concatenating all. The encoding process is flexible: numbers may capture any possible subdivision lengths, so the digits can be interpreted in all possible ways (e.g., "12" could be 12 or 1 then 2).

Your task: check if *any* original string could produce both inputs as its possible encodings.

### Examples  

**Example 1:**  
Input: `s1 = "l123e"`, `s2 = "44"`  
Output: `true`  
*Explanation: "leetcode" encoded as ["l","1","2","3","e"] → "l123e", or ["leet","code"] → "44".*

**Example 2:**  
Input: `s1 = "a5b"`, `s2 = "c5b"`  
Output: `false`  
*Explanation: The encodings force different starting letters ("a" vs "c"), so no original string can match both.*

**Example 3:**  
Input: `s1 = "112s"`, `s2 = "10s"`  
Output: `true`  
*Explanation: "sssssssssss" (11 's') could be encoded as ["1","1","2","s"] = "112s", or ["10","s"] = "10s".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible ways of converting the digit segments in both strings into possible substring lengths, then try to reconstruct and compare all possible original strings. But the number of ways splits can be done grows exponentially, which is not feasible.

- **Optimized (DFS + Memoization):**  
  View the problem as a recursion:  
  - At each step, both s1 and s2 can be at a character or at a digit (meaning: skip that many letters in the original).
  - Keep track of offsets: how many more characters each side needs to skip to catch up with the other ("diff").
  - For efficiency, memoize calls by (i, j, diff) where i and j are indices in s1, s2, and diff is the remaining offset between unmatched letters built so far.
  - When digits are found, try all valid parses (e.g., up to 3 digits in a row for numbers), try all possibilities, because both s1 and s2 could be splitting/encoding differently.

- **Why this approach:**  
  It avoids combinatorial explosion by pruning using memoization--when two pointers with a given diff (offset) have already been considered, we stop recomputation. It is effective because the state space is manageable.


### Corner cases to consider  
- Both s1 and s2 contain only digits (need to match total skipped length).
- Letters mismatch at the same position.
- Digits at different positions: must expand all split options.
- Leading zeros do not appear (digits are 1-9, but multiple digits can form numbers).
- Cases where one string is exhausted but the other still has skip-offset to process.
- Empty strings; strings made entirely of digits or letters.


### Solution

```python
def possibly_equals(s1: str, s2: str) -> bool:
    from functools import lru_cache

    # Try to parse numbers (could be 1-3 digits) starting at idx. Yield (num, next_index).
    def get_nums(s, idx):
        res = []
        val = 0
        for i in range(idx, min(idx + 3, len(s))):
            if not s[i].isdigit():
                break
            val = val * 10 + int(s[i])
            res.append((val, i + 1))
        return res

    # Memoize by (i, j, diff)
    @lru_cache(maxsize=None)
    def dfs(i, j, diff):
        # diff = chars skipped in s1 - chars skipped in s2
        if i == len(s1) and j == len(s2):
            return diff == 0
        # s1 can provide digit(s): try them all
        if i < len(s1) and s1[i].isdigit():
            for num, ni in get_nums(s1, i):
                # Apply the extra skips to diff
                if dfs(ni, j, diff + num):
                    return True
        # s2 can provide digit(s): try them all
        if j < len(s2) and s2[j].isdigit():
            for num, nj in get_nums(s2, j):
                if dfs(i, nj, diff - num):
                    return True
        # If both (maybe after skips) at a letter, sync letters
        if diff == 0:
            if i < len(s1) and j < len(s2) and s1[i] == s2[j]:
                if dfs(i + 1, j + 1, 0):
                    return True
        elif diff > 0:  # s1 has skipped more, so consume a letter from s2
            if j < len(s2) and not s2[j].isdigit():
                if dfs(i, j + 1, diff - 1):
                    return True
        elif diff < 0:  # s2 has skipped more, so consume a letter from s1
            if i < len(s1) and not s1[i].isdigit():
                if dfs(i + 1, j, diff + 1):
                    return True
        return False

    return dfs(0, 0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  At most O(N³ × M³ × (N+M)) because each of the N and M indices has up to 3 ways to parse digits, and `diff` can be up to N+M in magnitude. Memoization ensures no repeated subproblems. In practice, much faster due to pruning.

- **Space Complexity:**  
  O(N × M × (N+M)) for memoization storage and recursion stack, given by the size of cache states.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you return *all possible* original strings instead of just whether one exists?  
  *Hint: Modify the memoized DFS to track construction paths.*

- How would you change this for uppercase/lowercase, or for other character sets?  
  *Hint: Extend the parsing and matching section accordingly.*

- What about very large inputs — how can you reduce recursion or space?  
  *Hint: Consider iterative DP or explicit stack for DFS, compressing memoization.*


### Summary
This problem is a classic **DFS with state compression** and **backtracking** with memoization, handling ambiguous numeric encodings. The general pattern arises anywhere two differently compressed representations need to be matched (e.g., wildcard pattern matching, run-length encoding comparison, sequence alignment). Such approaches are broadly useful wherever enumeration of mutually consistent decodings is required.


### Flashcard
Use DFS with memoization to reconstruct possible original strings from encoded strings.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Valid Word Abbreviation(valid-word-abbreviation) (Easy)
- Check If Two String Arrays are Equivalent(check-if-two-string-arrays-are-equivalent) (Easy)