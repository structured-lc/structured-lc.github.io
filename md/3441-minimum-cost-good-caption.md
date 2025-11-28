### Leetcode 3441 (Hard): Minimum Cost Good Caption [Practice](https://leetcode.com/problems/minimum-cost-good-caption)

### Description  
Given a string **caption** of length n, a *good caption* is a string where every character appears in groups of at least 3 consecutive occurrences.  
You can perform any number of the following operation:  
- For any index `i` (0 ≤ i < n), you may change the character at index `i` to either:
  - The letter before it in the alphabet (if not 'a').
  - The letter after it in the alphabet (if not 'z').

Return the **minimum number of operations** to turn the given caption into a good caption, and if multiple answers exist, return the **lexicographically smallest** good caption.  
If impossible, return an empty string "".

### Examples  

**Example 1:**  
Input: `caption = "abc"`  
Output: `""`  
*Explanation:  
No way to make every group ≥ 3. Any transformation must split up at least one group, making a good caption impossible.*

**Example 2:**  
Input: `caption = "aabbccc"`  
Output: `"aaabbbccc"`  
*Explanation:  
Change positions 2 and 3 ('b','b') to 'a' for "aaa"; need at least 1 more operation to form "bbb" group, etc. The output displays the minimum-ops and lex smallest possible good caption.*

**Example 3:**  
Input: `caption = "aabb"`  
Output: `""`  
*Explanation:  
Impossible to form groups of size 3 with only 4 letters and 2 types; there is no way to meet requirements.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all ways to partition the string into groups of at least length 3, then for each group, pick a letter and compute the minimum cost to transform its positions—all combinations are exponential.

- **Observation:**  
  - Since every group must have at least 3 consecutive same characters, possible partitions are only at lengths ≥3.
  - To minimize operations and lexicographically order, for each block pick the target letter whose transformation cost is lowest; break ties by choosing the smaller character.

- **Optimization:**  
  Dynamic Programming:
  - dp[i]: the minimum cost and string for making substring [0..i) into good blocks.
  - For each position i, for each possible partition size k (3 ≤ k ≤ i), consider changing s[i-k:i] to some letter, compute cost, and keep min.

- **Approach:**  
  - For all endings, for each valid group size (len ≥3), for each letter ('a'..'z'), 
    - count cost to make substring s[end-k:end] all to letter c,  
    - combine with dp[end-k] for minimal total.
    - Track resultant string for lexicographical order.

- **Why DP?**  
  Brute force is too slow (exponential), but each state only depends on prior groupings; so optimal substructure fits DP.  
  Lexicographically smallest: In case of tie in cost, pick earliest alphabet character.

### Corner cases to consider  
- Input empty (""): should return "".
- All chars already in proper groups ≥3.
- Impossible cases (string too short, or with too many "single"/"double" runs).
- Multiple possible "good" captions with equal cost.
- One character only.
- Borders: groups at front or back.

### Solution

```python
def minimumCostGoodCaption(caption: str) -> str:
    n = len(caption)
    if n < 3:
        return ""
    
    # dp[i] = (min_cost, resulting_string)
    dp = [(float('inf'), "")] * (n + 1)
    dp[0] = (0, "")

    for i in range(3, n+1):
        # Consider all possible partitionings ending at i with last group size sz
        for sz in range(3, i+1):
            l = i - sz
            # try making s[l:i] all c ('a'..'z')
            group = caption[l:i]
            for c in map(chr, range(ord('a'), ord('z')+1)):
                # How many positions do we need to change?
                change = sum(1 for ch in group if ch != c)
                prev_cost, prev_s = dp[l]
                # Only proceed if previous partition is possible
                if prev_cost != float('inf'):
                    cand_s = prev_s + c * sz
                    cand = (prev_cost + change, cand_s)
                    # Compare with dp[i]: better cost, or same cost & lex smaller
                    if (cand[0] < dp[i][0]) or (cand[0] == dp[i][0] and cand[1] < dp[i][1]):
                        dp[i] = cand

    min_cost, min_caption = dp[n]
    return min_caption if min_cost != float('inf') else ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × n²)  
  For each index, all partition sizes up to n, and for 26 possible characters (a-z).
- **Space Complexity:** O(n)  
  Only dp array of size n+1 is maintained for optimal solution string/cost at each index.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct all minimal cost *good captions* if there could be multiple answers?  
  *Hint: Track all minimal solutions in dp, not just one; backtrack to enumerate them.*

- What if only certain character changes are allowed (e.g., only to next letter, not to both previous and next)?  
  *Hint: Restrict candidate characters accordingly in inner loop.*

- How would you optimize further on top of O(26 × n²) for extremely long inputs?  
  *Hint: Memoization, precompute change costs, or use rolling frequency arrays for blocks.*

### Summary
This problem is a case study in **Dynamic Programming with string partitioning**, optimizing both for minimal edits and lexicographical order. Patterns used here (segment DP, partition & merge, keeping track of best cost & result for substrings) are broadly useful for other string partition, edit distance, or k-group problems, and show up in problems requiring optimal grouping with constraints.


### Flashcard
Partition string into groups of ≥3 consecutive same characters; for each group, pick target letter minimizing transformation cost; use DP for optimal partitioning.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
