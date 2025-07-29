### Leetcode 943 (Hard): Find the Shortest Superstring [Practice](https://leetcode.com/problems/find-the-shortest-superstring)

### Description  
Given an array of strings, return the shortest possible string (the superstring) that contains every string from the array as a substring. Each string must appear at least once as a contiguous sequence. None of the strings are substrings of any other, so you should always use all the words. The order of appearance is not fixed—you can concatenate and overlap strings in any order, as long as the final string contains them all as substrings. If multiple shortest answers exist, return any one.

### Examples  

**Example 1:**  
Input: `["alex","loves","leetcode"]`  
Output: `"alexlovesleetcode"`  
Explanation. Directly concatenating all the strings works; any permutation is a valid answer since there are no overlaps here, e.g., "lovesalexleetcode" etc.

**Example 2:**  
Input: `["catg","ctaagt","gcta","ttca","atgcatc"]`  
Output: `"gctaagttcatgcatc"`  
Explanation. The strings can be arranged and overlapped: "gcta" + "ctaagt" (overlap 'cta') → "gctaagt", then "gctaagt" + "ttca" (overlap 'tca') → "gctaagttca", etc., to build the shortest string containing every word.

**Example 3:**  
Input: `["abc","bca","cab"]`  
Output: `"abcabca"`  
Explanation. "abc" overlaps with "bca" (bc), then "bca" with "cab" (ca), building the minimal superstring.

### Thought Process (as if you’re the interviewee)  
Naive brute-force would try all permutations of words and overlap as much as possible at each step. However, for n words, this results in n! permutations, and for each merge operation, you need to compute the possible overlap, making it infeasible for n ≥ 10.

A better way is to use **dynamic programming with bitmasking**:
- Compute the maximum overlap between every pair of words (i, j) where i ≠ j.
- Use DP where dp[mask][i] is the length of the shortest superstring for a set 'mask' of used words that ends with the iᵗʰ word.
- For every state, try appending a new word with maximum possible overlap.
- At the end, reconstruct the best path to build the actual string.

Tradeoff:  
- This is a typical **Traveling Salesman Problem (TSP)** variant: find the minimum "route" (superstring) covering all "cities" (words) with cost determined by how much extra length is required when you append one word after another.

### Corner cases to consider  
- One word only: Return the word itself.
- No overlap at all between any two words (every possible permutation is valid).
- All words overlap maximally in a cycle, forcing careful selection to minimize length.
- Some overlaps may be zero, but must still include all words.
- The strings may have similar prefixes or suffixes but no full overlap.

### Solution

```python
def shortestSuperstring(words):
    n = len(words)
    
    # Compute overlap between i and j: max suffix of words[i] equal to prefix of words[j]
    overlap = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            m = min(len(words[i]), len(words[j]))
            for k in range(m, 0, -1):
                if words[i][-k:] == words[j][:k]:
                    overlap[i][j] = k
                    break

    # dp[mask][i]: shortest superstring length with words in mask, ending with iᵗʰ word
    dp = [[float('inf')] * n for _ in range(1 << n)]
    parent = [[-1] * n for _ in range(1 << n)]  # For reconstruction

    # Base cases: each word starts as itself
    for i in range(n):
        dp[1 << i][i] = len(words[i])

    # Fill DP table
    for mask in range(1, 1 << n):
        for j in range(n):
            if not (mask & (1 << j)):
                continue
            prev_mask = mask ^ (1 << j)
            if prev_mask == 0:
                continue
            for i in range(n):
                if not (prev_mask & (1 << i)):
                    continue
                cost = dp[prev_mask][i] + len(words[j]) - overlap[i][j]
                if cost < dp[mask][j]:
                    dp[mask][j] = cost
                    parent[mask][j] = i

    # Reconstruct shortest string
    # Find last word in optimal sequence
    min_len = float('inf')
    last = -1
    final_mask = (1 << n) - 1
    for i in range(n):
        if dp[final_mask][i] < min_len:
            min_len = dp[final_mask][i]
            last = i

    # Build path
    seq = []
    mask = final_mask
    while last != -1:
        seq.append(last)
        prev = parent[mask][last]
        mask ^= (1 << last)
        last = prev
    seq = seq[::-1]

    # Construct the superstring using the path
    result = words[seq[0]]
    for i in range(1, len(seq)):
        overlap_len = overlap[seq[i-1]][seq[i]]
        result += words[seq[i]][overlap_len:]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 2ⁿ + n² × L²), where n = number of words, L = max word length.
    - O(n² × 2ⁿ) for DP table.
    - O(n² × L²) for preprocessing overlaps (worst case substring matching).
- **Space Complexity:** O(n × 2ⁿ) for DP and parent arrays, plus O(n²) for overlap matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- If we allow that some strings are substrings of others, how does your algorithm change?  
  *Hint: Pre-filter all words that are substrings of any other word; removing them does not affect the answer and can reduce the problem size.*

- How would you handle much larger input sizes (e.g., n > 20) where O(2ⁿ) DP is infeasible?  
  *Hint: Consider greedy or approximation algorithms; the problem is known to be NP-hard (Shortest Common Superstring problem).*

- Can you output all possible shortest superstrings, not just one?  
  *Hint: Track all optimal paths and build every minimal solution using backtracking over the parent array.*

### Summary
This problem uses a dynamic programming with bitmasking pattern, very similar to solving TSP. It's common for problems where you need to consider all permutations of set items with pairwise costs and reconstruct a minimal path or sequence. The bitmask DP pattern is frequently seen in covering sets or sequences optimally, especially when n is small (≤ 20).