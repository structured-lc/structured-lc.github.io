### Leetcode 2901 (Medium): Longest Unequal Adjacent Groups Subsequence II [Practice](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii)

### Description  
Given two arrays: a string array **words** and an integer array **groups** of length n, find the **longest subsequence** of indices such that for every pair of adjacent indices in the subsequence:
- Their groups are **unequal** (groups[iⱼ] ≠ groups[iⱼ₊₁]).
- The corresponding words are of **equal length** and have **Hamming distance** 1 (the words differ by exactly one character at the same position).

Return the list of words in this **longest valid subsequence**.

### Examples  

**Example 1:**  
Input:  
words = `["ab", "ac", "bc", "bb"]`, groups = `[1, 2, 1, 2]`  
Output:  
`["ab","ac","bc"]`  
Explanation:  
ab (group 1) → ac (group 2, length same, hamming=1) → bc (group 1, groups alternate, hamming=1).

**Example 2:**  
Input:  
words = `["abcd","abed","aecd","aecb"]`, groups = `[1, 2, 1, 3]`  
Output:  
`["abcd", "abed", "aecd", "aecb"]`  
Explanation:  
Each step flips one character, and adjacent groups are all different.

**Example 3:**  
Input:  
words = `["aaa","aab","abb","aba","abc"]`, groups = `[1,2,3,4,5]`  
Output:  
`["aaa","aab","abb","abc"]`  
Explanation:  
aaa→aab (hd=1), aab→abb (hd=1), abb→abc (hd=1), groups always different. "aba" can't be added as would break group/distance rule.

### Thought Process (as if you’re the interviewee)  
First, think brute-force: enumerate all possible subsequences and check constraints, but that's exponential and too slow.

Notice relations:
- If words differ by Hamming 1 and groups are different, you can extend a valid sequence.
- This is similar to the Longest Increasing Subsequence, but with special "adjacent" rules (unequal groups; Hamming=1).

We can use **dynamic programming**:
- dp[i]: The length of the longest valid subsequence ending at index i.
- To update dp[i], check every previous j < i:
    - words[i] and words[j] are same length.
    - Hamming distance is 1.
    - groups[i] ≠ groups[j].
    - If so, dp[i] = max(dp[i], dp[j] + 1).
- To reconstruct the path, keep a **prev** array tracking previous indices.

At the end, find the index with the largest dp[i], then reconstruct sequence.

Tradeoffs: O(n² × L) time, L = word length, since for each pair we may need to compare up to length L.

### Corner cases to consider  
- All groups identical (no sequence >1).
- All words have different lengths.
- Only one word.
- No two words with Hamming distance 1.
- Empty input.
- Multiple longest sequences (any one can be returned).
- Groups alternate, but Hamming != 1, etc.

### Solution

```python
def longest_unequal_adjacent_groups_subsequence(words, groups):
    n = len(words)
    dp = [1] * n          # dp[i]: length of longest valid subseq ending at i
    prev = [-1] * n       # prev[i]: backtracking previous index in path

    def hamming_distance(a, b):
        # Assumes len(a) == len(b)
        return sum(x != y for x, y in zip(a, b))

    for i in range(n):
        for j in range(i):
            if groups[i] != groups[j] and len(words[i]) == len(words[j]) \
               and hamming_distance(words[i], words[j]) == 1:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    prev[i] = j

    # Find index of max dp
    max_len = max(dp)
    idx = dp.index(max_len)

    # Reconstruct the subsequence indices
    result = []
    while idx != -1:
        result.append(idx)
        idx = prev[idx]

    # Indices were appended in reverse; reverse again for order
    result = result[::-1]

    # Return the words corresponding to indices
    return [words[i] for i in result]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × L), where n = #words and L = max word length. For each pair (i, j), Hamming check is O(L).
- **Space Complexity:** O(n), for dp and prev arrays, and the output path.

### Potential follow-up questions (as if you’re the interviewer)  

- Can this be solved faster than O(n² × L)?  
  *Hint: What if you preprocess all words into a map for quick Hamming-1 transitions?*

- What if you want to actually return the count, not the sequence?  
  *Hint: Just track max(dp) instead of path.*

- If words are very long but many duplicates, can you optimize Hamming checks?  
  *Hint: Group same words; precompute all single-character variations.*

### Summary
This is a **dynamic programming** problem closely related to **Longest Increasing Subsequence** but with custom "compatibility" relations (Hamming distance 1 and group difference).  
The technique—DP + path reconstruction—is a common pattern and can be used any time you need to build the longest sequence with adjacency constraints, such as in string/graph puzzles or variant subsequence questions.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
