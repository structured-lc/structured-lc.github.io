### Leetcode 1055 (Medium): Shortest Way to Form String [Practice](https://leetcode.com/problems/shortest-way-to-form-string)

### Description  
Given two strings **source** and **target**:  
You can form a string from **source** by deleting zero or more characters (without reordering any of the remaining characters), which makes a *subsequence*.  
Your task is: **What is the minimum number of subsequences of source needed (concatenated together, in order), to form the target string?**  
If it is impossible to form **target** this way, return `-1`.

*Example*: If source is “abc” and target is “abcbc”, you might take “abc” from the first 3, and then “bc” from the next, needing 2 subsequences.

### Examples  

**Example 1:**  
Input: `source = "abc"`, `target = "abcbc"`  
Output: `2`  
*Explanation: Take subsequence "abc" (from source), then take "bc" (from another "abc"). Concatenating gives "abcbc".*

**Example 2:**  
Input: `source = "abc"`, `target = "acdbc"`  
Output: `-1`  
*Explanation: "d" is in target but not in source, so impossible to form.*

**Example 3:**  
Input: `source = "xyz"`, `target = "xzyxz"`  
Output: `3`  
*Explanation: First, take "xz" (from "xyz"), then take "y" (from new subsequence), then take "xz" again. So 3 total subsequences.*

### Thought Process (as if you’re the interviewee)

- **Brute-force idea**: For each character in the target, scan source from start; if you hit end, start new subsequence and try again. Repeat until target is consumed.
  - Major flaw: If a character in target doesn’t exist in source, you'll forever loop—need to check for impossibility.

- **Optimized greedy**:  
  - Move through target, and for each character, scan source *linearly* until you match.
  - If you reach the end of source without matching, increment subsequence count and start from the beginning of source again.
  - If you *never* find the target character in source at all, return -1.

- **Further optimization**:  
  - Preprocess source with a *lookup table* (or DP table) recording for each position, where the next occurrence of every character is.  
  - This allows you to jump to the next required letter directly, making the process faster for long strings.

- **Trade-off**:  
  - Greedy is simple, O(n×m) time (n = length of target, m = length of source).  
  - DP preprocessing is O(m×26) but can speed up queries for large strings, at the cost of extra memory.

### Corner cases to consider  
- source or target is an empty string
- target contains a character not in source
- all characters in target are the same as in source
- source of length 1; target of length > 1; verify repetition.
- repeated characters in source or target
- very large strings

### Solution

```python
def shortestWay(source, target):
    # Set of characters in source for quick check
    source_set = set(source)
    for char in target:
        if char not in source_set:
            return -1  # Impossible if target needs an absent char

    subseq_count = 1  # At least one subsequence is needed
    src_idx = 0  # Pointer in source

    for char in target:
        while src_idx < len(source) and source[src_idx] != char:
            src_idx += 1
        if src_idx == len(source):
            # Couldn't match char, need a new subsequence
            subseq_count += 1
            src_idx = 0
            # Retry matching this char from beginning
            while src_idx < len(source) and source[src_idx] != char:
                src_idx += 1
        src_idx += 1  # Move to next src char for next target char

    return subseq_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  n = length of target, m = length of source. For each target char, in the worst case, might scan all of source.
- **Space Complexity:** O(1)  
  Only uses fixed extra space (no large data structures), except for the set of source characters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need not just the count, but the actual subsequences used?
  *Hint: Store substrings or start indices as you go.*

- Can you optimize for large alphabet or large source size?
  *Hint: Use a preprocessed DP table for next letter lookups.*

- What if deleting characters from source incurs a cost? How to minimize cost?
  *Hint: Think of dynamic programming to track minimal cost solutions.*

### Summary
This problem uses the *Greedy Subsequence Construction* or *Two-pointers* pattern for linear scanning and matching. It’s a classic greedy+scanning approach, with optimizations possible via precomputed jump/lookup tables (commonly used in substring-search problems), and is especially useful anywhere you need to compose a sequence from repeated patterns or subsequences—a pattern frequently seen in parsing and edit-distance type problems.


### Flashcard
Greedily scan source for each target character, restarting from the beginning of source as needed, and count subsequences.

### Tags
Two Pointers(#two-pointers), String(#string), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
- Is Subsequence(is-subsequence) (Easy)
- Number of Matching Subsequences(number-of-matching-subsequences) (Medium)