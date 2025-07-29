### Leetcode 3472 (Medium): Longest Palindromic Subsequence After at Most K Operations [Practice](https://leetcode.com/problems/longest-palindromic-subsequence-after-at-most-k-operations)

### Description  
Given a string s and an integer k, you can change at most k characters in s. Each time, you can change any character to its next or previous letter in the alphabet (with wrap-around: after 'z' comes 'a' and before 'a' comes 'z'). Your goal is to find the length of the longest palindromic subsequence you can get after performing up to k such operations, where a subsequence is any sequence of characters in s (not necessarily contiguous) and a palindrome reads the same forwards and backwards.

### Examples  

**Example 1:**  
Input: `s = "abc", k = 1`  
Output: `2`  
Explanation: You can change 'b' to 'a' or 'c' (cost 1), so subsequence "aa" or "cc" are palindromic of length 2. No way to get length 3 with ≤1 change.

**Example 2:**  
Input: `s = "abced", k = 2`  
Output: `3`  
Explanation: "aba", "cec", "ede", etc. can be formed by changing at most two letters; so possible palindromic subsequence of length 3.

**Example 3:**  
Input: `s = "racecar", k = 0`  
Output: `7`  
Explanation: Already a palindrome—full string remains unchanged.

### Thought Process (as if you’re the interviewee)  
Start with the classic longest palindromic subsequence (LPS) problem, which uses dynamic programming. Traditional LPS doesn’t allow character changes.

With k operations, for s[i] and s[j] (where i < j):
- If they’re equal, extend palindromic subsequence by 2 and solve subproblem s[i+1..j-1] without using any operation.
- If not equal, you either:
  - Change s[i] or s[j] to make them match (costs 1 operation, k > 0), then add 2 to the length and solve inner subproblem with k-1.
  - Or, skip one of them (classic LPS approach), solve for [i+1, j] and [i, j-1] with same k.

To get optimal answer:
- For every subproblem LPS(i, j, k_remain), try all 3: skip left, skip right, or fix both with an operation if k > 0 and s[i] ≠ s[j].
- Memoization is needed: state is (i, j, k_left).
- Base cases: i > j → 0, i == j → 1.

Avoidable brute force: Trying all possible letter replacements explodes exponentially. DP + memoization keeps within feasible bounds because for each substring, there are only O(n^2 * k) states.

### Corner cases to consider  
- Empty string: LPS is 0.
- k ≥ length of s: Can always make it a full palindrome.
- Already a palindrome: Need to check that changing characters isn’t necessary if k=0.
- All letters same: Should output full length, any k.
- Single character: Should return 1.
- k = 0: Falls back to standard LPS.

### Solution

```python
def longestPalindromeSubseq(s: str, k: int) -> int:
    from functools import lru_cache
    
    n = len(s)

    @lru_cache(maxsize=None)
    def dp(i, j, k_left):
        # Base cases
        if i > j:
            return 0
        if i == j:
            return 1
        
        # If current characters match, use 0 operation here
        if s[i] == s[j]:
            return dp(i+1, j-1, k_left) + 2
        
        res = 0
        # Option 1: Skip left character
        res = max(res, dp(i+1, j, k_left))
        # Option 2: Skip right character
        res = max(res, dp(i, j-1, k_left))
        # Option 3: Use an operation to align s[i] and s[j]
        if k_left > 0:
            res = max(res, dp(i+1, j-1, k_left-1) + 2)
        return res

    return dp(0, n-1, k)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k)
  - There are O(n² × k) unique DP states because for each i, j, and k_left you memoize once.
- **Space Complexity:** O(n² × k)
  - For memoization cache, plus recursion stack O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can change each character to any other (not just next/prev)?
  *Hint: Think about cost function; would k operations suffice for arbitrary change?*

- How to find the actual longest palindromic subsequence (not just its length)?
  *Hint: Augment DP with a way to reconstruct chosen characters.*

- What if the alphabet is not cyclic (no wrap-around)?
  *Hint: Adjust allowed character changes in the DP state transitions.*

### Summary
This problem is a variant of dynamic programming on strings, extending the classic Longest Palindromic Subsequence pattern by adding at-most-k change operations (with limited change capability: next/prev letter, wrap-around). The approach uses a standard memoized top-down DP strategy with an extra dimension for remaining operations—a commonly used technique when dealing with operations constraints in optimal substructure problems. Variants of this technique occur frequently in problems with “at most k edits/changes/swaps” and string transformations.