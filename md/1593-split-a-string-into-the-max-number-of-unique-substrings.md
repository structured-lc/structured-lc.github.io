### Leetcode 1593 (Medium): Split a String Into the Max Number of Unique Substrings [Practice](https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings)

### Description  
Given a string `s`, split it into as many **unique non-empty substrings** as possible such that no two substrings are equal. Find the maximum number of substrings you can get. Each split can be anywhere and substrings must be non-empty and not repeated.

### Examples  
**Example 1:**  
Input: `"ababccc"`  
Output: `5`  
*Explanation: One way: "a", "b", "ab", "c", "cc". Cannot get 6 because "a"/"b" repeated.*

**Example 2:**  
Input: `"aba"`  
Output: `2`  
*Explanation: Split as "a", "ba". Any other split would have at least one repeated substring.*

**Example 3:**  
Input: `"aa"`  
Output: `1`  
*Explanation: Only way is "aa". Both "a" and "a" would repeat.*

### Thought Process (as if you’re the interviewee)  
This is an optimal split problem with uniqueness constraints. Brute-force: try all possible split placements recursively, keep track of used substrings, and take the max. This is a backtracking (DFS) problem. At each step, try to split at every possible next location (from current index+1 onward), and skip if substring is already used. Maintain a set of used substrings. At each recursion, update the max found so far.

### Corner cases to consider  
- All characters unique (maximum splits possible)
- All characters same (only one split possible)
- Very short strings (empty, one char)
- Prefixes being the same but suffixes are different

### Solution

```python
def maxUniqueSplit(s: str) -> int:
    max_count = 0
    def dfs(pos, used):
        nonlocal max_count
        if pos == len(s):
            max_count = max(max_count, len(used))
            return
        for end in range(pos + 1, len(s) + 1):
            part = s[pos:end]
            if part not in used:
                used.add(part)
                dfs(end, used)
                used.remove(part)
    dfs(0, set())
    return max_count
```

### Time and Space complexity Analysis  
- **Time Complexity:** Exponential in n (O(2ⁿ)), but pruned heavily if duplicates encountered early
- **Space Complexity:** O(n) recursion plus O(n) for the set of used substrings

### Potential follow-up questions (as if you’re the interviewer)  
- What if you need to return one valid split, not just the count?
  *Hint: Add a path list and record it on success.*

- How would you handle Unicode or multi-character substrings?
  *Hint: String slicing works for any unicode codepoints, but for multi-codepoint units you may need special handling.*

- Could you make this iterative instead of recursive?
  *Hint: Use a manual stack to backtrack instead of recursion.*

### Summary
This is a classic backtracking problem asking for maximal splits under uniqueness constraints. It maps to subset/split and permutation counting, and it's a good example of how to use sets and recursive control flow to exhaust possibilities with pruning.

### Tags
Hash Table(#hash-table), String(#string), Backtracking(#backtracking)

### Similar Problems
