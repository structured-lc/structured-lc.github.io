### Leetcode 1624 (Easy): Largest Substring Between Two Equal Characters [Practice](https://leetcode.com/problems/largest-substring-between-two-equal-characters)

### Description  
Given a string s, return the length of the longest substring between two equal characters, excluding the characters themselves. If no such substring exists, return -1.

### Examples  
**Example 1:**  
Input: `s = "abca"`  
Output: `2`  
*Explanation: The substring between the two 'a' is "bc" (length 2).* 

**Example 2:**  
Input: `s = "cbzxy"`  
Output: `-1`  
*Explanation: No repeating letters, so return -1.*

**Example 3:**  
Input: `s = "cabbac"`  
Output: `4`  
*Explanation: Between the two 'c's is "abba" (length 4).* 

### Thought Process (as if you’re the interviewee)  
Want to find max distance between two same letters (excluding endpoints). Can do this in O(n): Track for each character its first and last occurrence. For each character, length of substring = last index - first index - 1.

### Corner cases to consider  
- No duplicate characters (return -1)
- Duplicates only adjacent (length zero substrings)

### Solution

```python
def max_length_between_equal_chars(s):
    first = {}
    ans = -1
    for i, c in enumerate(s):
        if c in first:
            ans = max(ans, i - first[c] - 1)
        else:
            first[c] = i
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), scan string once
- **Space Complexity:** O(1) for 26 letters, O(n) general case

### Potential follow-up questions (as if you’re the interviewer)  

- How do you find the actual substring, not just the length?  
  *Hint: Store indices and return s[first+1:last].*

- What if characters can be unicode?  
  *Hint: Use a map instead of array for arbitrary alphabets.*

- How to do this in a single pass?  
  *Hint: Track first occurrence as you go.*

### Summary
Uses a hash map/single-pass scan to get min/max index for each character. The pattern is useful for substring interval problems.
