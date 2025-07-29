### Leetcode 140 (Hard): Word Break II [Practice](https://leetcode.com/problems/word-break-ii)

### Description  
You are given a string **s** (without spaces) and a **wordDict** list of valid words (can be reused any number of times). Insert spaces in **s** to split it up into sentences where every word is in **wordDict**.  
Return **all possible sentences** that can be formed this way (in any order).  
Each returned sentence should have words separated by a single space, and no extra spaces at start or end.

### Examples  

**Example 1:**  
Input: `s = "catsanddog", wordDict = ["cat", "cats", "and", "sand", "dog"]`  
Output: `["cats and dog", "cat sand dog"]`  
*Explanation:  
- "cats and dog": Split as "cats", "and", "dog" — all exist in the dictionary.  
- "cat sand dog": Split as "cat", "sand", "dog" — all are valid.*

**Example 2:**  
Input: `s = "pineapplepenapple", wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]`  
Output: `["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]`  
*Explanation:  
- "pine apple pen apple": "pine", "apple", "pen", "apple".  
- "pineapple pen apple": "pineapple", "pen", "apple".  
- "pine applepen apple": "pine", "applepen", "apple".*

**Example 3:**  
Input: `s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]`  
Output: `[]`  
*Explanation:  
No combination uses only dictionary words to cover the string. There is always a leftover segment e.g., "cats and og" (og not in dictionary).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea**:  
  Try every possible way to insert spaces between characters and check if all segments are in the dictionary.  
  This results in an exponential number of possibilities (every space is a decision).

- **Backtracking**:  
  Start from index 0. For every possible end position, check if s[start:end] is in wordDict.  
  If yes, recursively solve the remaining suffix, building up the answer as we return.  
  This is a classic "decision at every position" backtracking problem.

- **Optimization – Memoization**:  
  Many subproblems repeat. If we've already computed all sentences starting at a specific index, memoize those results.  
  This avoids recomputation, converting exponential brute-force to much faster time (but still worst-case exponential in output size).

- **Why not pure DP?**  
  We need the actual sentences, not just a yes/no. A bottom-up DP is messy, but recursion + memo (top-down DP) is elegant.

- **Trade-offs**:  
  - Brute force is slow — up to 2ⁿ splits.
  - Backtracking with memo scales much better for reasonable inputs, but in the worst case (many possible splits at each position) it's still exponential.

### Corner cases to consider  
- **Empty string**: Should return [""].  
- **No valid segmentations**: Return [].  
- **wordDict covers every possible prefix/postfix edge**.  
- **wordDict has overlapping words** (e.g., "a", "aa").  
- **String with one character**.  
- **String length 1, wordDict not matching**.  
- **wordDict contains all substrings** (impractical, but good to reason about).  

### Solution

```python
def wordBreak(s, wordDict):
    # Build a quick lookup set for O(1) word checks
    word_set = set(wordDict)
    # Memoization to avoid recomputation: start_idx -> list of sentences
    memo = {}

    def backtrack(start):
        # If we've computed this index before, return memoized result
        if start in memo:
            return memo[start]
        # If we're at the end of the string, return list with empty string
        if start == len(s):
            return [""]

        sentences = []
        # Try every possible substring s[start:end]
        for end in range(start+1, len(s)+1):
            word = s[start:end]
            if word in word_set:
                # For each way to break the rest, prepend the current word
                for rest in backtrack(end):
                    # Don't add a space at the end
                    if rest == "":
                        sentences.append(word)
                    else:
                        sentences.append(word + " " + rest)
        # Memoize and return
        memo[start] = sentences
        return sentences

    return backtrack(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × 2ⁿ) in the worst case, where n = length of s. Explained:  
  - Each index may launch branching recursive calls (in the worst case, every substring is a valid word).  
  - Since memoization stores results per starting index, and each result is a list of sentences (which can itself be exponential in size in worst input cases), overall complexity is O(n × 2ⁿ).

- **Space Complexity:**  
  O(n × 2ⁿ)  
  - Storing sentences for each substring in memoization.
  - Each sentence can use up to n space (for the worst case of every character separated by a space).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return only the count of possible sentences, not list them?
  *Hint: Tweak the memoization to only store counts.*

- How would you solve it if wordDict is *very* large (e.g. millions of entries)?
  *Hint: Trie data structure for prefix lookups.*

- How do you handle very large strings with huge output size?
  *Hint: Output an iterator/generator instead of returning all sentences at once.*

### Summary
This problem is a classic **backtracking with memoization** (top-down dynamic programming) scenario.  
It's similar to other "construct all sentences/ways" or **partitioning** problems, especially those that require generating actual solutions, not just counting them.  
Building recursion trees from prefixes, memoizing to optimize overlapping subproblems, and constructing paths as you return up the call stack is a common pattern in many substring segmentation or combinatorial construction variants.