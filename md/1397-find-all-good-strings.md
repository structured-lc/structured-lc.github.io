### Leetcode 1397 (Hard): Find All Good Strings [Practice](https://leetcode.com/problems/find-all-good-strings)

### Description  
Given two strings **s1** and **s2** of length *n* and an additional string **evil**, return the number of strings of length *n* that are:
- Greater than or equal to **s1** (lexicographically)
- Less than or equal to **s2** (lexicographically)
- Do **not** contain the substring **evil** anywhere inside them

The result can be large, so return it modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `n = 2, s1 = "aa", s2 = "da", evil = "b"`  
Output: `51`  
*Explanation: All 2-letter strings >= "aa" and <= "da" not containing "b". These include all options starting with 'a', 'c', and 'd', but skip any with 'b'.*

**Example 2:**  
Input: `n = 2, s1 = "le", s2 = "le", evil = "leet"`  
Output: `0`  
*Explanation: All valid strings must be exactly "le", but its length is too short to even contain "leet". So answer is 1 if 'evil' can't fit, otherwise 0. (Here zero because no valid string in range that could fit 'evil').*

**Example 3:**  
Input: `n = 8, s1 = "leetcode", s2 = "leetcode", evil = "leet"`  
Output: `0`  
*Explanation: All candidates = ["leetcode"], but it contains "leet" as a prefix. So zero good strings.*

### Thought Process (as if you’re the interviewee)  
- Brute-force is to generate every string in [**s1**, **s2**], check if it contains **evil**. But range may be (26ⁿ), way too large for n up to 500.
- Need to **avoid generating and scanning every string**, so dynamic programming idea: For each position, keep track of: 
    - Index in the string (i)
    - Current length of prefix matched with **evil**
    - Whether the string can take any character [or must stay bounded by **s1** and **s2**]
- Use **KMP failure function** (LPS array) or automaton for efficient substring search while building the string. This allows to track if adding a new character would extend or break the ongoing partial match with **evil**.
- For DP parameters: index, matched_evil_prefix, tight_low (are we still ==s1?), tight_high (==s2?)
- Use memoization to store state (i, evil_match_len, tight_low, tight_high) → answer, to avoid recomputation.
- At every step, choose allowed characters (possibly constrained to s1[i]..s2[i] depending on tight limits).

### Corner cases to consider  
- evil longer than n (can't appear as substring)
- s1 == s2 and s1 contains (or not) evil
- All letters in s1, s2, or evil are the same
- evil is empty string
- n is 1 (single-letter strings)
- Overlapping matches of evil

### Solution

```python
MOD = 10**9 + 7

def findGoodStrings(n, s1, s2, evil):
    from functools import lru_cache

    L = len(evil)
    # Build KMP failure table for evil
    def build_lps(pattern):
        lps = [0] * L
        length = 0
        for i in range(1, L):
            while length > 0 and pattern[i] != pattern[length]:
                length = lps[length-1]
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
        return lps

    lps = build_lps(evil)
    
    @lru_cache(maxsize=None)
    def dp(i, evil_matched, is_prefix_s1, is_prefix_s2):
        # Base: if we've matched evil, prune path
        if evil_matched == L:
            return 0
        # If position full, it's a good string
        if i == n:
            return 1
        # Figure out limits for this character
        lo = s1[i] if is_prefix_s1 else 'a'
        hi = s2[i] if is_prefix_s2 else 'z'
        res = 0
        for c in range(ord(lo), ord(hi) + 1):
            ch = chr(c)
            # update evil_matched (KMP automaton)
            next_evil = evil_matched
            while next_evil > 0 and evil[next_evil] != ch:
                next_evil = lps[next_evil - 1]
            if evil[next_evil] == ch:
                next_evil += 1
            # Update tight flags
            next_prefix_s1 = is_prefix_s1 and (ch == lo)
            next_prefix_s2 = is_prefix_s2 and (ch == hi)
            res = (res + dp(i+1, next_evil, next_prefix_s1, next_prefix_s2)) % MOD
        return res
    return dp(0, 0, True, True)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L × 4 × 26), where L = len(evil). For each of n positions, evil matching state (up to L), and 2² tight flags. 26 possible next characters. So overall O(n × L × 4 × 26).
- **Space Complexity:** O(n × L × 4), for memoization table.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet is not 'a'-'z', but a custom set?  
  *Hint: Replace 26 with size of actual alphabet.*

- How would you count strings that contains evil exactly once?  
  *Hint: Add new DP state for number of evil found so far.*

- Can you return all good strings up to some limit rather than count?  
  *Hint: Track and backtrack with path array instead of count.*

### Summary
Dynamic programming with memorized state for each position, prefix match of evil, and whether we're at the bounds. KMP prefix automaton is used for substring matching. This is a **digit DP** with anti-substring constraint, a classic advanced string DP technique.