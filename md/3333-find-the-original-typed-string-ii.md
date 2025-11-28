### Leetcode 3333 (Hard): Find the Original Typed String II [Practice](https://leetcode.com/problems/find-the-original-typed-string-ii)

### Description  
Given a string representing what was typed on the screen (`word`), and an integer k, Alice originally meant to type a simpler string (original), but since she can accidentally "hold" any key, some letters may appear consecutively multiple times in `word`.  
Your task: **Count how many distinct "original" strings** Alice could have typed, where:
- Typing each character of original at least once (but possibly more, so that all runs of same char in word are explained).
- The original string has length ≥ k.
- Since the answer can be large, return result modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `word = "aabbcc", k = 3`  
Output: `8`  
*Explanation: There are 8 possible original strings: "abc", "aab", "abb", "ab", "aac", "bbc", "acc", "bcc", each with length ≥ 3. (Step-by-step: e.g. "abc" could make "aabbcc" if every letter is held down twice.)*

**Example 2:**  
Input: `word = "aaa", k = 1`  
Output: `3`  
*Explanation: Possible original strings: "a", "aa", "aaa". ("a" with key held for 3, "aa" with keys held for [2,1] etc.)*

**Example 3:**  
Input: `word = "aabbbc", k = 2`  
Output: `5`  
*Explanation: Possible "original"s: "abc", "abbc", "abbbc", "aabbc", "aabbbc" (all have len ≥ 2).*

### Thought Process (as if you’re the interviewee)  
To solve this, I reason:
- The **typed word** is a result of expanding the original by possibly "holding" a key: so each group of same consecutive letters in word maps to one occurrence in the original.
- Find all possible ways to assign the run-lengths to original: e.g. "aabbc" groups as ['aa', 'bb', 'c'], so original could be "abc" (1 from each group), or maybe "abbc" (split one group), etc.
- For each group, every way of splitting it into at least one, up to the run-length count, represents a choice.
- Let’s call the original length L. For each possible L in [k, n] (where n = group count), we want the number of ways to split all the groups so their total adds up to length L.
- I can use **dynamic programming**: dp[pos][len] = number of ways to use first `pos` groups to get an original string of length `len`.
- For each group, the run can be split 1..size[i] times, and grouped by all valid combinations.

Optimization/tweaks:
- Precompute group sizes with itertools.groupby.
- Use DP and prefix sums to avoid recomputing overlapping ranges for each group (speed up: O(n + k²)).
- Finally, sum all ways with length ≥ k.

### Corner cases to consider  
- String with only one character (`word = "aaa"`, k = 1,2,3).
- k equal to number of groups (minimum size).
- Large k > group count: should return 0.
- No possible way: e.g., k > length of `word`.
- All distinct letters: "abcdef", k=1 or k=6.
- All letters same: "aaaaa", k=1 to 5.

### Solution

```python
MOD = 10 ** 9 + 7

def find_original_typed_string(word: str, k: int) -> int:
    # Count consecutive groups: ex: aabbcc -> ['aa', 'bb', 'cc']
    groups = []
    prev = ''
    count = 0
    for c in word:
        if c == prev:
            count += 1
        else:
            if prev:
                groups.append(count)
            prev = c
            count = 1
    groups.append(count)
    n = len(groups)
    # dp[i][l]: ways to build original of length l from first i groups
    # Only need 2 rows for space: prev, curr
    dp_prev = [0] * (n + 2)
    dp_prev[0] = 1    # Zero groups, length 0: 1 way
    for size in groups:
        dp_curr = [0] * (n + 2)
        # For each possible previous length, expand group in 1..size splits
        prefix = [0] * (n + 3)
        for l in range(n + 1):
            prefix[l + 1] = (prefix[l] + dp_prev[l]) % MOD
        for l in range(1, n + 1):
            # For each split size in 1..min(size, l)
            min_part = max(0, l - size)
            dp_curr[l] = (prefix[l] - prefix[min_part]) % MOD
        dp_prev = dp_curr
    # Sum over all length ≥ k
    return sum(dp_prev[k:]) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k²)  
  - Grouping the string: O(n)
  - DP: For each group, for each possible length, use prefix sum so it's fast. In practice, for each position, inner sum is O(1) (thanks to prefix).  
  - Overall, O(n + k²).

- **Space Complexity:** O(n)  
  - Only need O(n) to store group split counts and DP arrays (two rows, length up to n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle extremely large input length/values for n, k?  
  *Hint: Can you improve/avoid extra DP passes, or only keep rolling arrays?*

- What if you are to reconstruct all possible original strings, not just count them?  
  *Hint: Try backtracking with memoization, but watch out for too many outputs.*

- If instead Alice could have *deleted* or *inserted* letters, how would you model the valid originals?  
  *Hint: Now you’re in edit-distance/sequence-alignment territory; DP is still key.*

### Summary
This problem is a classic example of **grouping + dynamic programming** for combinatorial string reconstruction. The main trick is modeling each group as a choice of split, and then layering DP with prefix sums to efficiently try all valid assignments, then summing for the desired lengths. The pattern applies to "split/merge/k-group" string/counting DP problems, and closely matches approaches in string decoding, text segmentation, and certain compressed data interpretations.


### Flashcard
Map typed word into runs of consecutive characters; for each run, enumerate all ways to split it (1 to run-length pieces); combine splits across all runs to generate all possible originals.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
- Keyboard Row(keyboard-row) (Easy)
- Faulty Keyboard(faulty-keyboard) (Easy)