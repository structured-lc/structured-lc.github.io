### Leetcode 3597 (Medium): Partition String  [Practice](https://leetcode.com/problems/partition-string)

### Description  
You are given a string **s**. Partition it into the smallest possible number of *unique* segments (substrings) as follows:  
- Start from index 0, build a segment character by character.
- Extend the current segment as long as all characters in it haven't appeared in the current segment before.
- As soon as a character repeats in the current segment, the segment ends, and a new segment starts from that character.
- Continue until the end of the string.  
Return the minimum number of segments needed so that each segment contains no repeated characters.

### Examples  

**Example 1:**  
Input: `s = "abacaba"`  
Output: `4`  
*Explanation: The segments are "a", "b", "a", "c", "a", "b", "a". But to minimize segments, we can group as: "a", "ba", "cab", "a". Each has all unique characters. Total segments = 4.*

**Example 2:**  
Input: `s = "ssssss"`  
Output: `6`  
*Explanation: Each 's' must be a separate segment since any repeat in a segment is not allowed. Segments: "s", "s", "s", "s", "s", "s".*

**Example 3:**  
Input: `s = "world"`  
Output: `1`  
*Explanation: All characters are unique, so the string can be one segment: "world".*

### Thought Process (as if you’re the interviewee)  
First, I consider the brute-force approach:  
Try all possible segmentations and find the one with the minimum number of segments where each has unique characters, but this is exponential in time (2ⁿ possibilities).

Let's optimize. Since each segment must have unique letters, and we want the *minimum* number of such segments, a greedy approach works.  
- Use a set to track characters in the current segment.
- Iterate through the string left to right.
  - For each character, if it's not in the set, add it to the current segment.
  - If it *is* in the set, start a new segment (increment count), clear the set, and add this character as the first in the new segment.
- This way, each segment is extended as long as possible before a repeat.

Time and space are both highly efficient, and correctness is easy to reason about because the "greedy" property (longest segment without repeats) both minimizes the number of segments and satisfies all constraints.

### Corner cases to consider  
- Empty string: should return 0 segments.
- String with all identical characters: must return len(s) segments.
- String with all unique characters: should return 1 segment.
- Single-character string.
- Long strings.
- Any non-lowercase or special character (if not limited in the problem).

### Solution

```python
def partitionString(s: str) -> int:
    segments = 0
    seen = set()
    
    for ch in s:
        # If character repeated, start a new segment
        if ch in seen:
            segments += 1
            seen.clear()
        seen.add(ch)
    # Count the last segment if any characters remain
    if seen:
        segments += 1
    return segments
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s).  
  We iterate through the string once, and set operations are O(1) per character.

- **Space Complexity:** O(1) (constant),  
  The set can have at most 26 entries (lowercase alphabet), or O(k) where k = alphabet size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input string could contain unicode or non-latin characters?  
  *Hint: How would you track already-seen characters efficiently if alphabet size isn't constant?*

- Can you solve this for the maximum possible length of unique segments rather than the minimum number of segments?  
  *Hint: What property of the input would make this different?*

- Could you output the segments themselves, not just the count?  
  *Hint: When do you know a segment ends, and how do you collect substrings efficiently?*

### Summary
This is a classic greedy partitioning problem, using a sliding window and set for uniqueness tracking per segment.  
It demonstrates the greedy pattern: at each character, extend the current segment as long as possible without violating the uniqueness condition.  
Variants of this pattern are common in substring/partition/unique-letter type problems (e.g., Longest Substring Without Repeating Characters).

### Tags
Hash Table(#hash-table), String(#string), Trie(#trie), Simulation(#simulation)

### Similar Problems
