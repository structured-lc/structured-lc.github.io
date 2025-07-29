### Leetcode 3598 (Medium): Longest Common Prefix Between Adjacent Strings After Removals [Practice](https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals)

### Description  
Given an array of strings `words`, for every index `i` in the array, remove the element at index `i` and find the maximum length of the common prefix among all pairs of adjacent strings in the new array. Return an array `answer`, where `answer[i]` is this value after the `iᵗʰ` word is removed. If no adjacent pairs exist or none share a prefix, `answer[i] = 0`.

### Examples  

**Example 1:**  
Input: `words = ["abc", "abd", "ab", "acd"]`  
Output: `2,2,1,2`  
Explanation:  
- Remove index 0 (`"abc"`): pairs `[ "abd", "ab" ]` → LCP=2, `[ "ab", "acd" ]` → LCP=1. Max=2.
- Remove index 1 (`"abd"`): `[ "abc", "ab" ]` → LCP=2, `[ "ab", "acd" ]` → LCP=1. Max=2.
- Remove index 2 (`"ab"`): `[ "abc", "abd" ]` → LCP=2, `[ "abd", "acd" ]` → LCP=1. Max=2.
- Remove index 3 (`"acd"`): `[ "abc", "abd" ]` → LCP=2, `[ "abd", "ab" ]` → LCP=2. Max=2.

**Example 2:**  
Input: `words = ["run", "jump", "run"]`  
Output: `0,1,0`  
Explanation:  
- Remove index 0: `[ "jump", "run" ]` → LCP=0.
- Remove index 1: `[ "run", "run" ]` → LCP=3.
- Remove index 2: `[ "run", "jump" ]` → LCP=1.

**Example 3:**  
Input: `words = ["a"]`  
Output: `0`  
Explanation:  
- After removing the only word, there are no pairs.

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each removal, re-build the array and manually compute LCP for all adjacent pairs. Time complexity is O(n² × m), very slow for large n.
- We can optimize because only two adjacent pairs are directly affected by each removal: those adjacent to the removal point.
- Precompute LCP for all adjacent pairs in the original list and store. For each index, the answer is the max of:
    - Any LCPs not affected by the removal (prefix/suffix),
    - The LCP between the two newly adjacent words (only if not removing at the endpoints).
- We use prefix and suffix max arrays to get unaffected LCPs in O(1).
- Only the LCP between words[i-1] and words[i+1] must be evaluated on the fly when removing an internal index.

### Corner cases to consider  
- Empty input array or array with one word.
- All words being identical.
- All words completely different.
- Removing the first or last word (edge removals).
- Words with different lengths.
- Multiple pairs sharing the same max LCP.

### Solution

```python
# Helper to compute the common prefix length
def lcp(a: str, b: str) -> int:
    i = 0
    while i < len(a) and i < len(b) and a[i] == b[i]:
        i += 1
    return i

def longest_common_prefix_after_removals(words):
    n = len(words)
    # Precompute LCP for all adjacent pairs
    lcp_adj = [lcp(words[i], words[i+1]) for i in range(n - 1)]
    
    # Precompute prefix max and suffix max for lcp_adj
    prefix_max = [0] * (n - 1)
    suffix_max = [0] * (n - 1)
    for i in range(n - 1):
        prefix_max[i] = lcp_adj[i] if i == 0 else max(prefix_max[i-1], lcp_adj[i])
    for i in range(n - 2, -1, -1):
        suffix_max[i] = lcp_adj[i] if i == n - 2 else max(suffix_max[i+1], lcp_adj[i])
    
    res = []
    for i in range(n):
        left = prefix_max[i-2] if i-2 >= 0 else 0  # LCPs strictly before i-1
        right = suffix_max[i+1] if i+1 < n-1 else 0  # LCPs strictly after i
        # If i is not at the end or start, need to check the new LCP between words[i-1] and words[i+1]
        if 0 < i < n-1:
            middle = lcp(words[i-1], words[i+1])
            answer = max(left, right, middle)
        else:
            # Edge removals, there is no 'new' adjacent pair, only unaffected LCPs exist
            answer = right if i == 0 else left
        res.append(answer)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L), where n is the number of words and L is the average word length. Each LCP computation is O(L), and we do O(n) of them in preprocessing and at most O(n) more (for each removal).
- **Space Complexity:** O(n), needed for the prefix/suffix arrays and result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if you needed to support efficient dynamic insertions or removals (not just one-off removals)?
  *Hint: Think about advanced data structures like segment trees or tries for fast LCP queries and updates.*
- Can you modify your solution to return not just the length, but the actual longest common prefix substring?
  *Hint: Store the substrings instead of just their lengths and update prefix/suffix calculations accordingly.*
- Suppose the input strings are very long. Can you do better than comparing every character in every LCP computation?
  *Hint: Hashing (e.g., rolling hashes) or trie-based comparison can help optimize repeated LCP checks.*

### Summary
We use a **precompute-and-sweep** pattern: preprocess LCPs for all adjacent pairs, then for each removal, combine unaffected prefix/suffix ranges and (if needed) compute a new LCP for the merged adjacent pair. This reduces a potentially quadratic problem to a linear solution with smart range queries and direct local recomputation, a pattern useful for moving window or "remove one" aggregation problems.