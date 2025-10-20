### Leetcode 691 (Hard): Stickers to Spell Word [Practice](https://leetcode.com/problems/stickers-to-spell-word)

### Description  
Given a set of **stickers** where each sticker is a lowercase word, and a **target** string, determine the *minimum* number of stickers needed to spell out the target word.  
- You may use each sticker type **infinite** times.  
- You can use **any** letter from a sticker *any number of times* (even if not contiguous).  
- Return `-1` if it's **impossible** to spell the target.

### Examples  

**Example 1:**  
Input: `stickers=["with","example","science"], target="thehat"`  
Output: `3`  
*Explanation: Take "with" (t, h), "example" (e, a), and "science" (c, n), use their letters to form "thehat" with 3 stickers.*

**Example 2:**  
Input: `stickers=["notice","possible"], target="basic"`  
Output: `-1`  
*Explanation: Even using both stickers arbitrarily, cannot form all letters required for "basic".*

**Example 3:**  
Input: `stickers=["these","guess","about","garden","him"], target="atomher"`  
Output: `3`  
*Explanation: Combine letters from various stickers. For example, use "these" (t, h, e), "guess" (s, g, u), "about" (a, b, o, u, t), "garden" (g, a, r, d, e, n), "him" (h, i, m) as many times as needed. Minimum found is 3 stickers.*

### Thought Process (as if you’re the interviewee)  
- **Understand:**  
  Want minimum stickers to spell `target`; can cut any letter from any sticker, reuse stickers infinitely.
- **Initial (Brute-force):**  
  Try all combinations: For each possible set of stickers, see if it covers the target. This is exponential (very slow), as the search space is vast.
- **Recursive (DFS) with pruning:**  
  Starting from target, at each step, try using a sticker, subtract as many matching letters from target as possible, recurse for the rest.  
  Use **memoization** to cache already-computed target substrings for subproblems.
- **Optimizations:**  
  - Ignore stickers which offer *no* helpful letters for current target substring.
  - Preprocess stickers into counts (letter → count), and same for target.
  - Use state representation (string or tuple of letter counts) for memoization.
  - Prune impossible cases early.
- **Chosen approach:**  
  DFS + memoization. We try each sticker at every call (pick only stickers relevant to remaining target), recursively form new target substring based on leftover letters post-usage, cache/minimize result.  
  Trade-off: Elegant, avoids redundant work, but can be tricky with string state representation and recursion stack depth.

### Corner cases to consider  
- Empty `target`: should return `0`, since no stickers are needed.
- Impossible to form `target` with any combination of stickers: return `-1`.
- Some stickers have zero useful letters for `target`.
- Duplicate stickers.
- Target with repeated letters (e.g. "aaabbb").
- Target with letters not present in any sticker.

### Solution

```python
def minStickers(stickers, target):
    from collections import Counter

    # Preprocess: count frequency of each letter for stickers and target
    sticker_counts = [Counter(s) for s in stickers]
    memo = {}

    def dp(remain):
        # remain: string representing the remaining chars to build
        if remain == "":
            return 0  # done!
        if remain in memo:
            return memo[remain]

        remain_count = Counter(remain)
        res = float('inf')

        for sticker in sticker_counts:
            # Optimization: skip stickers not helping with first letter
            if remain[0] not in sticker:
                continue
            # Construct new target after using this sticker
            new_remain = []
            for ch in remain_count:
                cnt_left = remain_count[ch] - sticker.get(ch, 0)
                if cnt_left > 0:
                    new_remain.extend([ch] * cnt_left)
            s_new_remain = "".join(sorted(new_remain))
            if s_new_remain == remain:
                continue  # sticker didn't help
            tmp = dp(s_new_remain)
            if tmp != -1:
                res = min(res, 1 + tmp)
        memo[remain] = -1 if res == float('inf') else res
        return memo[remain]

    ans = dp("".join(sorted(target)))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Worst-case is O(26^T), where T = len(target), because at most each target substring (26 possible chars) can be explored recursively.  
  Memoization drastically prunes this, but it's worst-case exponential for hard cases.
- **Space Complexity:**  
  O(26^T) due to memoization storage for each possible substring of target, and recursion stack depth can be up to len(target).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to output the **actual stickers used** instead of just the count?  
  *Hint: Track sticker indices during recursion and backtrack.*

- How can we scale for long **targets** (e.g., length > 20)?  
  *Hint: Use more compact state representation, consider bitmasks for small alphabet targets, or use iterative DP if the state fits memory.*

- What if **stickers** can only be used once each?  
  *Hint: The problem becomes subset cover; can't reuse stickers, so use BFS/DP on sticker subsets.*

### Summary
This problem is a classic **"stateful recursion with memoization"** pattern: reduce the target bit by bit using available resources (stickers), recursively solve subproblems, cache results.  
It appears frequently in problems where you must minimize operations/resources for string formation or covering sets, such as Word Break (DP + recursion), Coin Change, and Set Cover problems.  
Efficiently handling state (string or tuple) and aggressive pruning are crucial for acceptable runtime.


### Flashcard
Use DFS with memoization; for each target state, try using each sticker to cover as many letters as possible, recurse for the rest, and minimize sticker count.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Memoization(#memoization), Bitmask(#bitmask)

### Similar Problems
- Ransom Note(ransom-note) (Easy)