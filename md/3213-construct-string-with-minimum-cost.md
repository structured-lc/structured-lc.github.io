### Leetcode 3213 (Hard): Construct String with Minimum Cost [Practice](https://leetcode.com/problems/construct-string-with-minimum-cost)

### Description  
You are given a string **target**, an array of strings **words** and an integer array **costs** of the same length.  
You're asked to construct the string **target** starting with an empty string **s**.  
At every step, you can pick any word from **words** (using index `i`), append it to **s**, and pay the cost `costs[i]`.  
You can repeat this operation any number of times (including zero).  
Return the *minimum total cost* to construct **target** exactly. If impossible, return `-1`.  
(Key constraints: Each append is at **any** time and order, but you must build the target string strictly left to right.)

### Examples  

**Example 1:**  
Input: `target = "abcdef", words = ["abdef","abc","d","def","ef"], costs = [100,1,1,10,5]`  
Output: `7`  
*Explanation: Use "abc" (cost 1) for "abc", then "d" (cost 1) for "d", then "ef" (cost 5) for "ef". 1+1+5=7. No cheaper way builds all of "abcdef".*

**Example 2:**  
Input: `target = "cat", words = ["ca","a","t"], costs = [1,1,1]`  
Output: `2`  
*Explanation: "ca" (cost 1) covers "ca", then "t" (cost 1), total 2.*

**Example 3:**  
Input: `target = "dog", words = ["do","g","og"], costs = [2,1,3]`  
Output: `3`  
*Explanation: "do" (2) for "do", "g" (1) for "g", total 3. Or "og" (3) for "og", "d" is missing, so impossible with just "og".*

### Thought Process (as if you’re the interviewee)  

First, brute force would try all possible ways to build the target.  
- At each index `i`, try placing every possible word (from `words`) that matches **prefix** of `target[i:]`.  
- For every such word, recur and compute cost for remaining string.
- This is essentially *DP on string construction*, similar to "Word Break" or "Minimum Cost to Cut a String" patterns.

Let's formalize:
- Define `dp[i] = minimum cost to build target[i:]`
- Base case: `dp[len(target)] = 0` (built whole string)
- For every `i`, for each word in `words`, if `target[i:].startswith(words[j])`, try:
  - `dp[i] = min(dp[i], cost[j] + dp[i + len(words[j])])`
- If no such word matches, skip.
- The DP can be memoized for O(n × (sum of word lengths)) time.

Optimizations:
- Preprocessing: For fast prefix match at every index, (optional) build Trie of `words`. 
- With Trie, can search for all possible words that match each position.

Trade-off: Using Trie may help if words have overlap/prefixes, but direct string match is also efficient. Given target can be up to 1000 chars, and sum of words is manageable, recursion with memoization is acceptable.

### Corner cases to consider  
- **Impossible to cover:** No sequence of words can make the whole target; should return -1.
- **Words overlap:** Selects should not overlap in target.
- **Multiple ways, same cost:** Accept any minimal cost.
- **Repeated words/zero cost:** Possible words or zero cost.
- **Empty target:** Return 0 (no cost).
- **Single-letter target, multi-letter words.**
- **Word exactly matches target.**

### Solution

```python
def minimumCost(target, words, costs):
    n = len(target)
    from functools import lru_cache

    # Precompute for each index, what words can start at this index
    word_starts = [[] for _ in range(n)]
    for idx, w in enumerate(words):
        for i in range(n - len(w) + 1):
            if target[i:i+len(w)] == w:
                word_starts[i].append((len(w), costs[idx]))
    
    # dp[i] = min cost to build target[i:]
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # base case: done

    for i in range(n - 1, -1, -1):
        for length, cost in word_starts[i]:
            if i + length <= n:
                dp[i] = min(dp[i], cost + dp[i + length])

    return dp[0] if dp[0] != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k × L), where n = len(target), k = len(words), L = average word length. Precompute takes O(n \* k), DP is O(n \* avg choices per i).
- **Space Complexity:** O(n + n \* avg choices), for `dp` array and `word_starts` grid.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if **target** string is extremely large?
  *Hint: Can you avoid storing all word_starts? Can you stream the construction or index words efficiently?*

- What if words or costs can change dynamically?
  *Hint: Consider data structure for fast updates, e.g., dynamic Trie or segment trees?*

- Can you reconstruct the sequence (not just cost) of word placements?
  *Hint: Track back-pointers during DP to recover the actual choices.*

### Summary
This problem uses the classic **DP on string construction** pattern, much like "Word Break II" or "Word Break" but with minimal-cost selection.  
Building from the end (bottom-up), for each index, it explores all words that can be placed at that index, tracking the minimum cost.  
It's a reusable approach where dynamic programming and careful pre-processing (prefix matching, optional Trie) are crucial. This pattern frequently appears in **combinatorial string DP**, and can handle various constraints (e.g., minimum steps, path reconstruction, or constraints on repeat use).


### Flashcard
DP on string: dp[i] = minimum cost to build target[i:]; for each i, try all words matching target[i:] prefix and recurse.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming), Suffix Array(#suffix-array)

### Similar Problems
- Minimum Number of Valid Strings to Form Target II(minimum-number-of-valid-strings-to-form-target-ii) (Hard)
- Minimum Number of Valid Strings to Form Target I(minimum-number-of-valid-strings-to-form-target-i) (Medium)