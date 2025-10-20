### Leetcode 1520 (Hard): Maximum Number of Non-Overlapping Substrings [Practice](https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings)

### Description  
You are given a string `s` of lowercase English letters. Find the **maximum number of non-overlapping substrings** such that:
- Each substring is non-empty.
- For each character included in a substring, **all occurrences** of that character in `s` must be contained within that substring.
- The substrings do not overlap.

The goal is to return the **maximum possible set** of such substrings.

### Examples  

**Example 1:**  
Input: `s = "adefaddaccc"`  
Output: `["e", "f", "ccc"]`  
*Explanation: "e", "f", and "ccc" are substrings such that all occurrences of each character inside them are covered, and the substrings do not overlap. Choosing larger valid substrings (e.g., "adefadda") would cause overlaps or leave fewer substrings.*

**Example 2:**  
Input: `s = "ababa"`  
Output: `["ababa"]`  
*Explanation: Any substring other than the whole string would fail, since all a’s and b’s are spread across the string. So only "ababa" is valid.*

**Example 3:**  
Input: `s = "cabcccbaa"`  
Output: `["cab", "ccc", "aa"]`  
*Explanation:  
- "cab" contains all 'c', 'a', 'b' up to the first 'b'.  
- "ccc" covers all 'c's in the segment.  
- "aa" covers both 'a's at the end.
All occurrences of any character inside each substring are captured, and the substrings do not overlap.*

### Thought Process (as if you’re the interviewee)  
First, consider brute force: try every possible combination of substrings and check their validity. However, this is impractical because the number of substring combinations is exponential.

Key insight: For each character, any valid substring containing it **must contain all its occurrences**.

Approach:
- Record the **leftmost** and **rightmost** positions for each character.
- For each character's leftmost occurrence, try to expand the minimal substring that covers all occurrences of the characters it touches (recursively expand its range when it contains other characters, to ensure their full ranges are also within).
- Use a greedy approach: Find all such minimal valid substrings, sort them by their ending index, and greedily select non-overlapping ones.
- The reason this works: Choosing smallest possible valid substrings (earliest finishing) maximizes the number of non-overlapping substrings we can take.

Trade-off: Slight complexity to check/expand valid substrings, but guarantees optimal number.

### Corner cases to consider  
- Empty string (should return an empty list)
- All unique characters (each character can be its own substring)
- All the same character (should return the entire string as one substring)
- Interleaved characters (like "ababa")
- Characters appearing only once in non-overlapping ranges
- Large input strings at limit

### Solution

```python
def maxNumOfSubstrings(s):
    # Step 1: Find leftmost and rightmost occurrence of each character
    n = len(s)
    left = [n] * 26
    right = [-1] * 26
    for i, ch in enumerate(s):
        idx = ord(ch) - ord('a')
        left[idx] = min(left[idx], i)
        right[idx] = max(right[idx], i)

    # Step 2: For each character's left index, try to find the minimal valid substring
    def get_valid_interval(start):
        end = right[ord(s[start]) - ord('a')]
        i = start
        while i <= end:
            c = ord(s[i]) - ord('a')
            # If this char has an earlier occurrence, can't start here
            if left[c] < start:
                return None
            # Extend the end if this char ends later
            end = max(end, right[c])
            i += 1
        return (start, end)

    intervals = []
    for i in range(n):
        if left[ord(s[i]) - ord('a')] == i:
            result = get_valid_interval(i)
            if result:
                intervals.append(result)

    # Step 3: Greedily select non-overlapping substrings by earliest end
    intervals.sort(key=lambda x: x[1])
    res = []
    prev_end = -1
    for start, end in intervals:
        if start > prev_end:
            res.append(s[start:end+1])
            prev_end = end
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of s. We scan the string several times: once to build left/right bounds, and then for each valid substring we expand at most N characters total.
- **Space Complexity:** O(N) for storing intervals and the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you also needed to minimize the total length of substrings (rather than maximizing their count)?  
  *Hint: Switch greedy criterion; prefer substrings with minimal total length—would that change your sort strategy?*

- What would you do if characters could appear both uppercase and lowercase and should be treated separately?  
  *Hint: You'd need to expand tracking arrays from size 26 to 52 or use a dictionary.*

- How does your solution handle very large inputs? Would there be stack or memory concerns?  
  *Hint: The algorithm is linear, and recursive depth is bounded; large n should not cause stack overflows.*

### Summary
This problem uses the **greedy** and **interval scheduling** pattern: find all candidate non-overlapping intervals and select the maximum number by sorting on their end points. The expansion step ensures we only pick intervals where all occurrences of each contained character are strictly inside, resulting in valid substrings. This "merge intervals with constraints" pattern appears in parsing, substring extraction, and certain DP optimizations.


### Flashcard
Find the maximum number of non-overlapping substrings by tracking the leftmost and rightmost occurrences of each character.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Maximum Number of Non-overlapping Palindrome Substrings(maximum-number-of-non-overlapping-palindrome-substrings) (Hard)