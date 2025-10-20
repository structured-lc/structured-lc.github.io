### Leetcode 1239 (Medium): Maximum Length of a Concatenated String with Unique Characters [Practice](https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters)

### Description  
Given an array of strings, you need to find the length of the longest string you can form by concatenating a subsequence of these strings so that all characters in the resulting string are unique. A subsequence can be any combination of the original strings in order, but you cannot rearrange the characters inside the strings. If any concatenation would have repeated characters, it's invalid.

### Examples  

**Example 1:**  
Input: `arr = ["un","iq","ue"]`  
Output: `4`  
*Explanation: Possible concatenations are "", "un", "iq", "ue", "uniq", "ique". "uniq" and "ique" give length 4 with all unique letters.*

**Example 2:**  
Input: `arr = ["cha","r","act","ers"]`  
Output: `6`  
*Explanation: Valid combinations: "chaers" and "acters" both make length 6 and have all unique characters.*

**Example 3:**  
Input: `arr = ["abcdefghijklmnopqrstuvwxyz"]`  
Output: `26`  
*Explanation: The single string already uses every letter once with length 26.*

**Example 4:**  
Input: `arr = ["aba","bcc","e"]`  
Output: `1`  
*Explanation: "aba" and "bcc" have duplicate characters, so only "e" can be taken, giving output 1.*

### Thought Process (as if you’re the interviewee)  
First, I notice that brute-force solutions could examine every possible subsequence (2ⁿ, since each string can be included or not). For each combination, we can check if the concatenation has all unique characters. As n ≤ 16, it's feasible.

To optimize, since the order of strings in the subsequence doesn't really matter except for concatenation, we can use backtracking (DFS), always deciding for each index: take it or skip it.  
- If a string itself has duplicate letters, skip it entirely.  
- At each step, combine the current bitmask of used characters with the string’s bitmask. If they overlap, skip this path.

Bitmasking is ideal:  
- 26 bits for lower-case letters.  
- Precompute each string's character bitmask.  
- If any string has duplicate letters (same bit twice within itself), discard it.

This “pick/skip” DFS ensures we cover all combinations, tracking the max valid length seen.

### Corner cases to consider  
- arr has empty strings.
- arr has only one string.
- Any string with duplicate letters should be ignored.
- No subset of strings can be concatenated without duplicate letters (should return 0).
- All the strings are unique and compatible.
- arr includes single letter strings.
- Strings have complete word overlap (e.g., "aa", "aaa")

### Solution

```python
def maxLength(arr):
    # Helper to convert s to bitmask and check for duplicate characters
    def get_bitmask(s):
        mask = 0
        for ch in s:
            bit = 1 << (ord(ch) - ord('a'))
            # If this char already set, s contains duplicate character
            if mask & bit:
                return 0
            mask |= bit
        return mask

    # Precompute masks, ignore strings with internal duplicates
    masks = []
    lengths = []
    for s in arr:
        m = get_bitmask(s)
        if m:  # skip if mask==0 due to duplicates
            masks.append(m)
            lengths.append(len(s))
    
    # Backtracking DFS: try all pick/skip options
    def dfs(idx, curr_mask):
        if idx == len(masks):
            # Count bits set in current mask
            return bin(curr_mask).count('1')
        # Option 1: skip current string
        result = dfs(idx + 1, curr_mask)
        # Option 2: pick current string, only if disjoint chars
        if (curr_mask & masks[idx]) == 0:
            result = max(result, dfs(idx + 1, curr_mask | masks[idx]))
        return result

    return dfs(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ + L), where n = unique strings after filtering and L = total length of all strings. For each subset (2ⁿ), we check for disjoint character sets using bitmasks (fast).
- **Space Complexity:** O(n), used for the masks and recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `arr` contains up to 10⁵ strings?  
  *Hint: Is brute force/backtracking practical? Can you use greedy or iterative methods, or further filter possibilities?*

- Can you solve it if the strings include uppercase or non-English letters?  
  *Hint: Bitmasking won’t directly work for >26 characters—need hash-set or array per string.*

- How would you return an actual concatenation string, not just the max length?  
  *Hint: Backtrace your path when max updating, or record choices along the way.*

### Summary  
This problem uses a “backtracking with pruning” coding pattern, common in combinatorial search (e.g., subset/combination problems). Key optimizations: preprocess to filter bad inputs early, and use bitmasking for efficient character uniqueness checking. This approach applies wherever subsets/combinations must meet uniqueness or disjoint constraints (e.g., “Maximum length substring with unique chars”, “Disjoint sets problems”).


### Flashcard
Use backtracking to try all combinations, skipping strings with duplicate letters, and track max length with unique chars.

### Tags
Array(#array), String(#string), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation)

### Similar Problems
