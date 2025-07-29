### Leetcode 3563 (Hard): Lexicographically Smallest String After Adjacent Removals [Practice](https://leetcode.com/problems/lexicographically-smallest-string-after-adjacent-removals)

### Description  
Given a string s, you can repeatedly remove any two **adjacent characters that are consecutive in the alphabet** (i.e., they differ by exactly 1, considering the alphabet as circular: 'a' and 'z' are also consecutive). The gap left is filled by shifting remaining characters left. After any number of such removals, output the **lexicographically smallest string** you can get.

Think of this as: On each step, you can pick any adjacent pair (s[i], s[i+1]) such that abs(ord(s[i]) - ord(s[i+1])) == 1 or they are ('a','z')/('z','a'). Remove both, shift string, repeat. Return the smallest possible string in lex order.

### Examples  

**Example 1:**  
Input: `"bac"`  
Output: `"a"`  
*Explanation: Remove 'b' and 'a' (adjacent and consecutive) to get `"c"`, then `"c"` and `"a"` are not consecutive. Since 'a' < 'c', it's optimal to instead remove 'a' and 'c' to get `"b"` then remove 'a' and 'b' to get `"c"`. But actually, removing 'b' and 'c' gives `"a"` which is smallest. Multiple orders, but output is 'a'.*

**Example 2:**  
Input: `"abc"`  
Output: `"a"`  
*Explanation: Remove 'a' and 'b' to get `"c"`, then remove 'b' and 'c' to get `"a"`. 'a' is the smallest possible.*

**Example 3:**  
Input: `"acbd"`  
Output: `"a"`  
*Explanation: Remove 'c' and 'b' to get `"ad"`, then remove 'a' and 'd' (since a and d not consecutive) so can't. So 'ad' remains. But alternate removals: remove 'b' and 'd' is not allowed, but 'a' and 'c' not allowed, so 'ad' is the answer. But 'a' < 'ad', so output: a.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every way of removing adjacent consecutive character pairs. For each step, branch on all valid pair removals, and recursively do this for remaining string. At every leaf, keep track of string. Return minimal string across all paths.
  - This is **exponential** due to massive branching for each choice.

- **Optimization:**  
  - Realize that for each substring, try all *removal choices* and keep only the minimal string for each unique state.  
  - Use a **memoization (DP + bitmask)** approach:  
    - State: which indices remain in the string (represented as a bitmask).
    - For current mask, try all removable adjacent pairs, recursively compute minimal string, and return smallest seen.
    - Each state is a subset of characters (could be up to 2ⁿ), but pruning with memo helps.
    - For each 'mask', try all i where both i and i+1 are in mask and are consecutive in alphabet (including 'a'/'z').

- **Why this approach?**  
  - Because **brute force** is too slow, and there's repeat work for substrings.
  - DP over bitmask is good when n ≤ 16-20 (since up to 2²⁰ states is feasible), and here it's manageable.

- **Trade-off:**  
  This solution is feasible for up to n ≈ 16-18, not for much larger.  
  The challenge is encoding state transitions efficiently.

### Corner cases to consider  
- Empty string (`""`): should return `""`.
- Length 1 string (`"b"`): already minimal, no removals possible.
- Repeated characters with no consecutive (`"gggg"`): no removals possible.
- Pairs at ends that wrap around alphabetically, e.g., `"az"`.
- Strings where removing one pair opens up further removal of others: `"bacab"`.

### Solution

```python
def lex_smallest_after_adjacent_removals(s: str) -> str:
    # Memoization: key = mask (bitmask for remaining chars), value = min string for this state
    from functools import lru_cache

    n = len(s)

    @lru_cache(None)
    def dp(mask):
        # mask encodes which chars remain, left to right; example: 0b1011 for n=4 means 0,1,3 remain
        arr = [s[i] for i in range(n) if (mask & (1 << i))]
        # Base: if nothing or only one char left, just return that
        if len(arr) <= 1:
            return ''.join(arr)

        ans = None
        # Find all adjacent pairs in mask that are consecutive in alphabet
        idxs = [i for i in range(n) if (mask & (1 << i))]
        for j in range(len(idxs)-1):
            i1, i2 = idxs[j], idxs[j+1]
            c1, c2 = s[i1], s[i2]
            # Check if c1 and c2 are consecutive (wrap allowed)
            if abs(ord(c1) - ord(c2)) == 1 or (c1, c2) in [('a','z'),('z','a')]:
                # Remove both i1 and i2: make new mask
                new_mask = mask & ~(1 << i1) & ~(1 << i2)
                cur = dp(new_mask)
                if (ans is None) or (cur < ans):
                    ans = cur
        # If couldn't make any removal, just return the remaining string
        if ans is None:
            return ''.join(arr)
        return ans

    # Initial mask: all n bits set
    mask = (1 << n) - 1
    return dp(mask)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(2ⁿ × n²): There are up to 2ⁿ masks. For each mask, scan up to n pairs for possible removals, and string building costs O(n).  
  In practice, the subtree rarely needs to check all O(2ⁿ) because dead ends prune early.

- **Space Complexity:**  
  O(2ⁿ × n): DP memo for every mask, each holding a string up to length n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string is very long (n > 20)?  
  *Hint: Can you greedy before branching? Any monotonicity to exploit?*

- How would you output **all possible** distinct minimal strings, not just the lexicographically smallest?  
  *Hint: Memoize a set of solutions per state, not just one.*

- What if we only allow removals *from the ends* (not any adjacent pair)?  
  *Hint: This becomes similar to two pointers or greedy simulation.*

### Summary
This problem leverages **DP over bitmask state** with recursion/memoization—a pattern common in *"removal games"* and *optimal outcome/lexicographically minimal subsequence* challenges. The approach memorizes the minimal result per subset of characters, pruning redundant work.  
Such techniques appear in other substring removal, zero-sum games, and character elimination variants, and wherever "try all orders" but prune repeated computation by caching state.