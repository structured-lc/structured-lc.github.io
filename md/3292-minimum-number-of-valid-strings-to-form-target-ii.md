### Leetcode 3292 (Hard): Minimum Number of Valid Strings to Form Target II [Practice](https://leetcode.com/problems/minimum-number-of-valid-strings-to-form-target-ii)

### Description  
Given a list of strings **words** and a string **target**, a string **x** is called *valid* if it is a prefix of any of the strings in **words**. Return the **minimum number of valid strings** whose concatenation forms **target**. If it is impossible, return -1.

*In other words:*  
- You can use any prefix of any string in **words** as many times as needed (not the whole word, just prefixes, any length \(\geq 1\)).
- Find the fewest such prefix pieces to exactly build **target** (in order).

### Examples  

**Example 1:**  
Input: `words = ["abc", "aaaaa", "bcdef"]`, `target = "aabcdabc"`  
Output: `3`  
Explanation:  
- "aa" (prefix of "aaaaa") + "bcd" (prefix of "bcdef") + "abc" (prefix of "abc") forms "aabcdabc".
- Any way requiring fewer than 3 valid prefixes is impossible.

**Example 2:**  
Input: `words = ["a","b","ab","bc","abc"]`, `target = "abcabc"`  
Output: `2`  
Explanation:  
- "abc" (prefix of "abc") + "abc" (prefix of "abc") forms "abcabc".

**Example 3:**  
Input: `words = ["xyz","xy","yz"]`, `target = "xxyz"`  
Output: `-1`  
Explanation:  
- No way to concatenate prefixes from **words** to make "xxyz".


### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to try **every possible way** to split **target** into **valid** prefixes and count the minimum number of splits, but that's exponential.

Let’s reduce with Dynamic Programming, since for every index, our subproblem is:  
- *What’s the minimum pieces needed to cover target[i:]*?

Define `dp[i]` = minimum number of valid prefixes to cover `target[i:]`. Initialize all `dp[i]` as infinity, except `dp[n] = 0`.

**For each position i:**  
- For every prefix length (up to the end), see if `target[i: j+1]` is a prefix of any word in **words**.  
- If yes, set `dp[i] = min(dp[i], 1 + dp[j+1])`.

Optimization:  
- Preprocess all valid prefixes from all words into a **set** for O(1) checks.
- Use memoization or bottom-up DP for efficiency.

This approach works because we're always breaking target as soon as possible using valid prefix pieces, which is an overlapping subproblem. There’s no greedy shortcut since some paths might use fewer, longer pieces, but the only way to be sure is DP.

Trade-off:  
- **Time/space:** We process O(n²) substrings of target, but lookups are fast.  
- A trie data structure can make checking valid prefixes more efficient if needed.

### Corner cases to consider  
- **target is empty:** Output 0.
- **no words:** Output -1 if target is not empty.
- **words contains duplicates:** Should not affect correctness.
- **words with empty strings:** Can be ignored, as prefix must have length ≥1.
- **target cannot be formed at all:** Return -1.
- **target can be covered in only 1 way or by only 1 word.**

### Solution

```python
def min_num_valid_strings(words, target):
    # Precompute all possible valid prefixes from all words
    valid_prefixes = set()
    for w in words:
        for l in range(1, len(w)+1):
            valid_prefixes.add(w[:l])
    
    n = len(target)
    # dp[i]: min pieces needed to cover target[i:]
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # base case: empty string
    
    for i in range(n-1, -1, -1):
        # Try every possible prefix starting at position i
        for j in range(i+1, n+1):
            candidate = target[i:j]
            if candidate in valid_prefixes:
                if dp[j] + 1 < dp[i]:
                    dp[i] = dp[j] + 1
    return dp[0] if dp[0] != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × L), where n = len(target), L = average length of words, due to exploring all target substrings and checking in the set of valid prefixes.
- **Space Complexity:** O(Total valid prefix count + n), because we store all valid prefixes, plus the DP table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words contain millions of strings?  
  *Hint: Consider prefix trees (tries) for faster prefix checking.*

- What if you can only use each word (not prefix) at most once?  
  *Hint: Classic "Word Break II" + backtracking with usage state.*

- Can you return the actual sequence of prefixes used, not just the count?  
  *Hint: Store reconstruction path in DP state.*

### Summary
This problem uses the **DP on strings + prefix hash/preprocessing** pattern, similar to "Word Break" and edit distance variants. The core insight is to precompute all possible valid pieces and DP through all splitting choices. The same approach can solve problems involving minimal segments or decompositions, and is a classic pattern for interview string decomposition and sequence formation problems.


### Flashcard
Use DP where dp[i] = minimum pieces to cover target[i:]; at each position, try all valid prefixes (from words) and take the minimum of 1 + dp[next_index].

### Tags
Array(#array), String(#string), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Segment Tree(#segment-tree), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Minimum Cost to Convert String II(minimum-cost-to-convert-string-ii) (Hard)
- Construct String with Minimum Cost(construct-string-with-minimum-cost) (Hard)