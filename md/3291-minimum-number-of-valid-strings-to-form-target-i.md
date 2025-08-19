### Leetcode 3291 (Medium): Minimum Number of Valid Strings to Form Target I [Practice](https://leetcode.com/problems/minimum-number-of-valid-strings-to-form-target-i)

### Description  
You are given a list of strings **words** and a string **target**.  
A string **x** is called **valid** if it is a **prefix** of any string in **words**.  
Find the **minimum number** of valid strings that can be concatenated to form **target**.  
- You can use the same prefix multiple times.
- If you **cannot** form target, return **-1**.

### Examples  

**Example 1:**  
Input: `words = ["abc","aaaaa","bcdef"], target = "aabcdabc"`  
Output: `3`  
*Explanation: "aa" (prefix of "aaaaa") + "bcd" (prefix of "bcdef") + "abc" (prefix of "abc") ⟶ "aabcdabc" (2+3+3=8 chars, matches target).*

**Example 2:**  
Input: `words = ["a","b","c"], target = "abcd"`  
Output: `-1`  
*Explanation: The prefix "d" is not a prefix of any word in words, so it is impossible.*

**Example 3:**  
Input: `words = ["leet","code"], target = "leetcode"`  
Output: `2`  
*Explanation: "leet" (from "leet") + "code" (from "code") → "leetcode".*

### Thought Process (as if you’re the interviewee)  
First, try to break the **target** into the **minimal number of substrings**, where each substring is a **prefix** of some string in **words**.  
- **Brute-force** approach: For each split position in target, repeatedly check each prefix. Try all possible partitions recursively—this is highly inefficient (∼exponential).
- **Optimization:** Since each valid piece is always a prefix of some word, precompute all possible valid prefixes (from words set) up to their lengths.
- At each i-th position in target, try every valid prefix that matches target[i:].
- Use **dynamic programming** (DP): Let `dp[i]` = minimal number of valid strings needed to form target[𝑖:].  
  - Try every prefix that matches target[i:i+L], where that substring is a prefix of some word.
  - DP transitions: `dp[i] = min(dp[j] + 1)` for every j>i where target[i:j] is a valid prefix.
- For efficient prefix lookup, build a **Trie** of all words (store all their prefixes).
- Use memoization to remember already computed positions to speed up recursion.

**Final Approach:** Trie for quick prefix lookup + recursive DP (top-down) with memoization.

### Corner cases to consider  
- target is empty (`""`) ⟶ answer is 0.
- words is empty (impossible except if target is empty).
- No prefix in words matches target’s first character ⟶ return -1.
- Repeated use of the same prefix.
- Overlapping prefixes (e.g. both "l" and "lee" valid for "leetcode").
- Words of varying lengths and duplicate words.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Solution:
    def minValidStrings(self, words, target):
        # Build Trie with every possible prefix from words
        root = TrieNode()
        for word in words:
            node = root
            for c in word:
                if c not in node.children:
                    node.children[c] = TrieNode()
                node = node.children[c]
                # Mark every prefix as valid end
                node.is_end = True

        from functools import lru_cache
        
        n = len(target)
        INF = float('inf')
        
        @lru_cache(None)
        def dfs(i):
            # Base: reached end of target
            if i == n:
                return 0
            res = INF
            node = root
            # Try all possible prefixes starting at i
            for j in range(i, n):
                c = target[j]
                if c not in node.children:
                    break
                node = node.children[c]
                if node.is_end:
                    count = dfs(j+1)
                    if count != INF:
                        res = min(res, 1 + count)
            return res
        
        ans = dfs(0)
        return -1 if ans == INF else ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M × L + N²), where M is the number of words, L is the max word length, and N is the length of target.  
  - Building the Trie: O(M × L)
  - For each target position, in worst case, try up to N suffixes, with each Trie walk up to word length.
  - With memoization, total DP states is O(N).
- **Space Complexity:** O(M × L + N), for the Trie and the memoization cache.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of any prefix, you required the substring to be an **entire word** in the list?
  *Hint: How would you adapt DP transitions if only complete words are allowed?*

- How would you optimize for very large word lists?
  *Hint: Can you preprocess in different ways, or limit Trie depth, etc?*

- What if you had to return the actual set of splitting points or substrings?
  *Hint: Store parsing info in DP to reconstruct solution path.*

### Summary
This problem demonstrates the **DP + Trie** pattern, especially useful for parsing or breaking strings according to a set of allowed "dictionary" rules.  
Common variants include **word break**, **concatenation matching**, and **string segmentation**.  
The trade-off is preprocessing time (Trie), but it yields optimal runtime for many matching queries, and memoization prevents redundant string scans.

### Tags
Array(#array), String(#string), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Trie(#trie), Segment Tree(#segment-tree), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Minimum Cost to Convert String II(minimum-cost-to-convert-string-ii) (Hard)
- Construct String with Minimum Cost(construct-string-with-minimum-cost) (Hard)