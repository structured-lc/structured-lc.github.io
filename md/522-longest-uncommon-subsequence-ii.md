### Leetcode 522 (Medium): Longest Uncommon Subsequence II [Practice](https://leetcode.com/problems/longest-uncommon-subsequence-ii)

### Description  
Given an array of strings, find the length of the longest string that is an uncommon subsequence — that is, a string which appears as a subsequence in exactly one string in the array and not in any of the other strings.  
A subsequence is formed by deleting zero or more characters (without reordering the rest). If no such subsequence exists, return -1.

### Examples  

**Example 1:**  
Input: `["aba", "cdc", "eae"]`  
Output: `3`  
*Explanation: Each string is length 3, so we consider them one by one. "aba" does not appear as a subsequence of "cdc" or "eae", so it is an uncommon subsequence. The answer is 3.*

**Example 2:**  
Input: `["aaa", "aaa", "aa"]`  
Output: `-1`  
*Explanation: All the strings are subsequences of each other. No uncommon subsequence exists.*

**Example 3:**  
Input: `["aabb", "aab"]`  
Output: `4`  
*Explanation: "aabb" is not a subsequence of "aab", but the reverse is true. So, "aabb" is the longest uncommon subsequence and the answer is 4.*

### Thought Process (as if you’re the interviewee)  
First, I need to understand what makes a subsequence "uncommon":  
- It must be a subsequence of exactly one string and **not** any other string in the list.

A brute force approach:
- For each string, generate all possible subsequences and count their occurrences across all strings. But generating all subsequences is exponential and impractical for lengths up to 50.

A key insight is:
- If a string is not a subsequence of any of the other strings (and appears only once in the list), then the string itself is a candidate for the answer.  
- So, for each string, check whether it's a subsequence of any other string in the list. If not, it's a valid candidate; keep track of the max length among such candidates.

Optimization:
- Sort strings by length (descending), so we can break early if we find a longer uncommon subsequence.
- For checking if s is a subsequence of another string t, use a two-pointer scan.

Trade-offs:
- The approach is O(n² \* m), but with constraints (n, m ≤ 50), that's acceptable.

### Corner cases to consider  
- All strings are the same.
- All strings are subsequences of each other.
- Multiple strings with same content; check for duplicates.
- Empty string(s) in the input.
- Only one string in the input.

### Solution

```python
def findLUSlength(strs):
    # Helper function to check if s is a subsequence of t
    def is_subseq(s, t):
        i = j = 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)
    
    # Sort strings by length descending to check longer first
    strs.sort(key=len, reverse=True)
    n = len(strs)
    
    for i, s in enumerate(strs):
        # Count how many strings s is a subsequence of (excluding itself)
        found = False
        for j, t in enumerate(strs):
            if i == j:
                continue
            if len(t) < len(s):
                break  # Since later strings are shorter, they can't contain s
            if is_subseq(s, t):
                found = True
                break
        if not found:
            return len(s)
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × m), where n is the number of strings and m is the max string length.  
   - For each string, we compare it against up to n-1 others, and subsequence check is O(m).
- **Space Complexity:** O(1) additional space, excluding input storage; we use only a few variables and pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the strings are very long (thousands of characters)?
  *Hint: How can you efficiently represent and compare subsequences?*
  
- Can you return the actual uncommon subsequence instead of just its length?
  *Hint: Track the candidate strings when checking.*

- How would you handle Unicode, or non-lowercase letters?
  *Hint: Adapt the subsequence check for general characters.*

### Summary
This problem uses the pattern of **comparing string subsequences** across all pairs to check for uniqueness. The two-pointer subsequence check is common for problems such as "is subsequence," and sorting the strings by length helps short-circuit the search for the maximal solution. This technique is useful in string processing, uniqueness queries, and subsequence-based challenges.


### Flashcard
For each string, check if it is not a subsequence of any other; return the length of the longest such string.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), String(#string), Sorting(#sorting)

### Similar Problems
- Longest Uncommon Subsequence I(longest-uncommon-subsequence-i) (Easy)