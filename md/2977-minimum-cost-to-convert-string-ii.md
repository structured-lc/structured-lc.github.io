### Leetcode 2977 (Hard): Minimum Cost to Convert String II [Practice](https://leetcode.com/problems/minimum-cost-to-convert-string-ii)

### Description  
Given two strings **source** and **target** of length `n`, and a list of transformations given as three arrays:  
- `original` (source substring)
- `changed` (target substring)
- `cost` (the cost to convert original[i] → changed[i])  

You can replace any substring of **source** with one of the same length in **changed**, at the specified cost, if the substring matches `original[i]`.  
Operations **must not overlap** unless they are the same substring.  
Your goal is to obtain **target** from **source** in the minimum cost (sum of step costs). If impossible, return -1.

### Examples  

**Example 1:**  
Input:  
source=`"abc"`, target=`"def"`,  
original=`["a","b","c"]`, changed=`["d","e","f"]`, cost=`[1,1,1]`  
Output: `3`  
Explanation:  
Replace 'a'→'d' (cost 1), 'b'→'e' (cost 1), 'c'→'f' (cost 1).

**Example 2:**  
Input:  
source=`"abcd"`, target=`"cccc"`,  
original=`["ab","bc"]`, changed=`["cc","cc"]`, cost=`[1,3]`  
Output: `-1`  
Explanation:  
There’s no way to transform both 'a' and 'd' into 'c' with these rules.

**Example 3:**  
Input:  
source=`"ababa"`, target=`"acaca"`,  
original=`["ab","ba","c"]`, changed=`["ac","ca","a"]`, cost=`[2,2,1]`  
Output: `4`  
Explanation:  
Replace at index 0: "ab"→"ac" (cost 2), at index 2: "ba"→"ca" (cost 2). The string is now "acaca".


### Thought Process (as if you’re the interviewee)  
First thought:  
- Try all possible combinations of transformations (brute force, exponential). For each substring, check if a rule can be applied and recursively try all options.  
- But for length up to 100 and multiple transformations, this is not tractable.

Optimize:  
- Since replacements cannot overlap, we can use **dynamic programming (DP)**: dp[i] = minimum cost to convert source[i:] to target[i:].  
- For each position, try all possible operations whose `original` matches source[i:i+L] and `changed` matches target[i:i+L], and pick the best (including doing nothing).
- Need a fast way to lookup all applicable rules for every substring starting at position i.  
- Since original and changed are up to length source, preprocessing can help.

Extra Optimization:  
- Some transformation rules could themselves be chained (e.g., 'a'->'b', 'b'->'c' means 'a'->'c' should be possible at total cost). So, we need **Floyd-Warshall** (all-pairs shortest paths) to precompute minimal indirect transformation costs for every substring pair.

Final approach:  
- **Trie** for `original` substring matching in source, and precompute minimal cost between any original/changed substring (with Floyd-Warshall).
- **DP** for minimal cost, trying all rule applications at each index.


### Corner cases to consider  
- No possible transformation (must return -1).
- Transforming with empty rules (no operations allowed).
- Source already equals target (should cost 0).
- Rules that overlap, or substrings that are ambiguous.
- Operations that can be chained or reused.

### Solution

```python
def minimumCost(source, target, original, changed, cost):
    # Helper: collect all unique 'words' (substrings) from original and changed for mapping
    import sys
    from collections import defaultdict, deque

    words = set(original) | set(changed)
    word2idx = {w: i for i, w in enumerate(words)}
    INF = sys.maxsize
    m = len(word2idx)

    # Floyd-Warshall all-pairs shortest path on the dictionary
    mincost = [[INF] * m for _ in range(m)]
    for i in range(m):
        mincost[i][i] = 0

    for o, c, v in zip(original, changed, cost):
        i = word2idx[o]
        j = word2idx[c]
        mincost[i][j] = min(mincost[i][j], v)

    # Apply Floyd-Warshall to get min cost for any chain of transformations
    for k in range(m):
        for i in range(m):
            for j in range(m):
                if mincost[i][k] < INF and mincost[k][j] < INF:
                    mincost[i][j] = min(mincost[i][j], mincost[i][k] + mincost[k][j])

    n = len(source)
    dp = [INF] * (n + 1)
    dp[n] = 0  # empty string, cost 0

    wordlens = set(len(w) for w in words)
    # For every position, try replacing each substring length
    for i in range(n-1, -1, -1):
        # Only do something if possible to match target
        for L in wordlens:
            if i + L > n:
                continue
            s_sub = source[i:i+L]
            t_sub = target[i:i+L]
            if s_sub in word2idx and t_sub in word2idx:
                c = mincost[word2idx[s_sub]][word2idx[t_sub]]
                if c < INF:
                    dp[i] = min(dp[i], c + dp[i+L])
        # Also allow not doing any transformation if the current chars already match
        if source[i] == target[i]:
            dp[i] = min(dp[i], dp[i+1])

    return dp[0] if dp[0] < INF else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(k³ + n × k), where k = number of unique substrings (for Floyd-Warshall and word lookup), and n = length of source/target.  
  - Floyd-Warshall: O(k³) for all substring mincosts.  
  - DP: O(n × k) (for each position, try all L substring options).  

- **Space Complexity:**  
  O(k² + n), for the mincost table and the dp array.


### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle ambiguous or conflicting rules?  
  *Hint: Use the minimal cost for each conversion by updating with min() in the cost table*

- What if the replacement rules can also operate on single characters efficiently?  
  *Hint: Precompute all single-character transformations, use as optimization in DP pass*

- If the transformations could overlap, how would the approach change?  
  *Hint: Would require stateful DP (interval DP) or graph traversal with overlapping intervals*


### Summary
This problem combines ideas from **all-pairs shortest path (Floyd-Warshall)** for chaining substring-to-substring transformations and **dynamic programming** to greedily apply the best conversion at each position. The transformation step is similar to word ladder/graph-of-words problems, while the DP breaking at substring positions is like jump game or string partition DP. This pattern is applicable in substring editing, advanced string transformations, and interval DP.


### Flashcard
Use DP where dp[i] = minimum cost to convert source[i:] to target[i:]. At each position, either match characters (cost 0) or try applying each transformation rule if the substring matches, then recurse. Use memoization to avoid recomputation.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming), Graph(#graph), Trie(#trie), Shortest Path(#shortest-path)

### Similar Problems
- Can Convert String in K Moves(can-convert-string-in-k-moves) (Medium)
- Minimum Moves to Convert String(minimum-moves-to-convert-string) (Easy)
- Minimum Number of Valid Strings to Form Target II(minimum-number-of-valid-strings-to-form-target-ii) (Hard)
- Minimum Number of Valid Strings to Form Target I(minimum-number-of-valid-strings-to-form-target-i) (Medium)