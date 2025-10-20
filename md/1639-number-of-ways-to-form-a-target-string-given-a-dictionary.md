### Leetcode 1639 (Hard): Number of Ways to Form a Target String Given a Dictionary [Practice](https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary)

### Description  
Given a list of words (same length) as a dictionary and a target string, count the number of ways to form the target by **choosing one letter from each column** of the dictionary words in order. In each step, for the ith character of `target`, you may pick any letter in the iᵗʰ position (column) of any word. Return the count modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `words = ["acca","bbbb","caca"], target = "aba"`  
Output: `6`  
*Explanation: For target='a', 2 choices (from "acca","caca"). For target[1]='b', 1 choice from all words at index 1. For target[2]='a', 2 choices. Ways: 2×1×2=4, but we must consider each selection path. Final count is 6.*

**Example 2:**  
Input: `words = ["abba","baab"], target = "bab"`  
Output: `4`  
*Explanation: Multiple ways to pick letters from columns to assemble 'bab'.*

**Example 3:**  
Input: `words = ["abc","def"], target = "fed"`  
Output: `0`  
*Explanation: Can't build 'fed' from the columns, so return 0.*

### Thought Process (as if you’re the interviewee)  
Right away, recognize you can only go left-to-right: can't pick columns out of order.

Dynamic Programming is suitable. Let dp[i][j] = number of ways to form target[i:] using columns j:.

Since all words are same length, for each column, precompute the frequency of each letter among all words in that column.

Then, for each dp[i][j], options are: if you match target[i] to a character at col j, you can skip or use all matches at that col and proceed. State transition: dp[i][j] = dp[i][j+1] + freq[target[i]][j] × dp[i+1][j+1].

Memoization needed for efficiency; bottom-up or top-down DP works.

### Corner cases to consider  
- No way to assemble target from words
- Duplicate letters in word columns
- Empty target
- Target longer than words
- All letters in column the same

### Solution

```python
MOD = 10**9 + 7

def numWays(words, target):
    from collections import Counter
    m, n = len(words[0]), len(target)
    freq = [Counter() for _ in range(m)]
    for word in words:
        for i, ch in enumerate(word):
            freq[i][ch] += 1
    dp = [0] * (n + 1)
    dp[n] = 1
    for i in range(m-1, -1, -1):
        for j in range(min(i+1, n)-1, -1, -1):
            dp[j] = (dp[j] + freq[i][target[j]] * dp[j+1]) % MOD
    return dp[0]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m×n + m×len(words)), where m=len(words), n=len(target), for counting and DP.
- **Space Complexity:** O(m×α + n), where α is alphabet size (for frequency), n for DP.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you optimize memory further?
  *Hint: Only next row is needed at each DP step.*

- What if words had variable lengths?
  *Hint: Not directly possible—the problem needs fixed column alignment for letters.*

- If characters are picked with cost, how to minimize/track total cost?
  *Hint: Extend DP state to include minimum path cost.*

### Summary
This is a DP problem with explicit states: letters to be matched and columns to choose from. Patterns similar to Edit Distance and Interleaving String, but grid traversal is column-constrained.


### Flashcard
Use dynamic programming to form a target string from a dictionary of words.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
