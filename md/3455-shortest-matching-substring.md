### Leetcode 3455 (Hard): Shortest Matching Substring [Practice](https://leetcode.com/problems/shortest-matching-substring)

### Description  
Given a string **s** and a pattern **p**, where **p** contains exactly two '\*' wildcard characters, find the length of the shortest substring in **s** that matches pattern **p**. Each '\*' can match any (possibly empty) consecutive sequence of characters. Return -1 if no such substring exists. The empty substring is considered valid.

### Examples  

**Example 1:**  
Input: `s = "abcccaabccaac"`,  `p = "a*cc*ac"`  
Output: `8`  
*Explanation: The substring `"aabccaac"` (positions 5 to 12) matches the pattern: "a" + any chars + "cc" + any chars + "ac". There is no shorter substring matching the pattern.*

**Example 2:**  
Input: `s = "abcxxdefxygh"`,  `p = "a*xy*gh"`  
Output: `7`  
*Explanation: The substring `"fxygh"` (positions 7 to 11) matches as "a" matches at start, "xy" is between, and "gh" is at end (with '*'s matching any sequence). But `"cxxdefx"` does not but `"fxygh"` (positions 7-11) is short and valid.*

**Example 3:**  
Input: `s = "abc"`,  `p = "x*y*z"`  
Output: `-1`  
*Explanation: There is no substring in `"abc"` that matches the pattern "x* y* z".*


### Thought Process (as if you’re the interviewee)  
- First, break down the pattern **p** by its two '\*' wildcards: this divides **p** into three fixed segments (let's call them first, mid, last).
- The problem reduces to: **find the shortest substring in s that contains, in order, these three segments separated by arbitrary (possibly empty) strings.**
- **Brute-force approach:** For every possible start and end position in **s**, check if the substring from start to end matches the segmented pattern in order. This is O(n³), which is too slow.
- **Optimize:** Since the order in the pattern is enforced, we can use three pointers (one for each segment) and slide through **s**:
    - For each position where the first segment starts, find the next position where the second segment starts (after the first), then the third segment (after the second).
    - Store the segment positions to move pointers efficiently, minimizing redundant searches.
- **Why this approach:** Rather than generating all possible substrings, we efficiently seek only those that could possibly match, and attempt to derive the minimal substring length.  
- **Trade-off:** We optimize for time at the expense of a bit more space and code complexity, but the overall time can be brought down to O(n²⋅k), which is manageable for interview-sized input.

### Corner cases to consider  
- The segments in the pattern may overlap in the string.
- Segments may be empty (be careful splitting on '*').
- **s** is shorter than the concatenation of the fixed segments.
- No matching substring exists.
- Multiple possibilities; the shortest substring must be found.
- Large input strings (to test efficiency).

### Solution

```python
def shortestMatchingSubstring(s: str, p: str) -> int:
    # Split p into fixed parts using '*'
    parts = p.split('*')
    if len(parts) != 3:
        return -1  # Invalid pattern according to constraints
    
    first, mid, last = parts
    n = len(s)
    min_len = float('inf')

    start = 0
    while True:
        # Find next occurrence of first part
        start = s.find(first, start)
        if start == -1:
            break
        mid_start = start + len(first)
        # Find next occurrence of mid part after 'first'
        mid_pos = s.find(mid, mid_start)
        if mid_pos == -1:
            start += 1
            continue
        last_start = mid_pos + len(mid)
        # Find next occurrence of last part after 'mid'
        last_pos = s.find(last, last_start)
        if last_pos == -1:
            start += 1
            continue
        # Calculate substring length
        substring_len = last_pos + len(last) - start
        min_len = min(min_len, substring_len)
        # Move start forward to look for possibly shorter substrings
        start += 1

    return min_len if min_len != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the length of s. For each possible starting position, we may scan ahead twice (once for each segment), using find (which is O(n)).
- **Space Complexity:** O(1) extra space (not counting input); only pointers and a few integers are stored.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize your solution if there are more than two '*' wildcards in p?  
  *Hint: Think about handling patterns split into more than three fixed segments, and how you would sequence the searches.*

- How would you optimize if s is extremely large (streaming), but p is always small?  
  *Hint: Consider suffix automata, Aho-Corasick, or two-pointers over segment matches.*

- What if '*' can match only a bounded number of characters (for example, at most 3)?  
  *Hint: You'd need to enumerate possible matchings or use DP on positions and segment indices.*


### Summary
This problem exemplifies the **multi-segment substring search** pattern, a generalization of sliding window but with multiple targets in sequence.  
It’s related to *multi-pattern matching*, *greedy incremental search*, and is commonly seen in string parsing and wildcard pattern matching problems.  
This technique can be adapted for patterns with multiple wildcards, and the coding patterns apply to problems like “subsequence with required segments” and custom regex substring searches.


### Flashcard
Split pattern by '\*' wildcards into three segments; use two-pointer or sliding window to find shortest substring containing all three in order.

### Tags
Two Pointers(#two-pointers), String(#string), Binary Search(#binary-search), String Matching(#string-matching)

### Similar Problems
