### Leetcode 1297 (Medium): Maximum Number of Occurrences of a Substring [Practice](https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring)

### Description  
Given a string s, find the maximum number of occurrences of any substring under two constraints:  
- The substring's length must be between minSize and maxSize (inclusive).
- Each substring must contain at most maxLetters unique characters.

Return the count of the most frequently occurring substring that satisfies these constraints. The substring counts can overlap.


### Examples  

**Example 1:**  
Input: `s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4`  
Output: `2`  
*Explanation: Substring "aab" appears 2 times.  
- "aab" has 2 unique letters (≤ 2) and length 3 (≥ 3 and ≤ 4).*

**Example 2:**  
Input: `s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3`  
Output: `2`  
*Explanation: Substring "aaa" occurs twice (positions 0 and 1).  
- 1 unique letter ≤ 1, length = 3.*

**Example 3:**  
Input: `s = "aabcabcab", maxLetters = 2, minSize = 2, maxSize = 3`  
Output: `3`  
*Explanation: "ab" occurs 3 times, 2 unique characters, length 2.*

**Example 4:**  
Input: `s = "abcde", maxLetters = 2, minSize = 3, maxSize = 3`  
Output: `0`  
*Explanation: No substring of length 3 has ≤ 2 unique characters.*


### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would be to check every substring of length from minSize to maxSize and count occurrences only if the substring has at most maxLetters unique characters. However, this is very inefficient since the number of substrings explodes with larger window sizes.

On further thinking, the most frequently occurring substring will likely be at the smallest allowed size (minSize). That’s because longer substrings are less likely to repeat often. So, instead of checking all substrings for all sizes, I can focus only on checking substrings of size minSize.

To efficiently count, I’ll:
- Use a sliding window of length minSize to iterate through the string.
- For each substring, check if it has at most maxLetters unique characters.
- If so, count its occurrences using a dictionary.

This approach significantly reduces both time and space complexity.


### Corner cases to consider  
- Empty string (`s = ""`)  
- minSize > len(s) (no valid substrings exist)
- All characters in s are the same.
- maxLetters is 0 or 1.
- minSize = maxSize (simplifies implementation).
- Substring overlaps.
- s has no valid substring matching unique char constraint.


### Solution

```python
def maxFreq(s, maxLetters, minSize, maxSize):
    # Map to count valid substrings
    freq = {}
    res = 0
    
    for i in range(len(s) - minSize + 1):
        substr = s[i:i + minSize]
        
        # Count unique characters using a set
        if len(set(substr)) <= maxLetters:
            freq[substr] = freq.get(substr, 0) + 1
            # Update result with current count if higher
            if freq[substr] > res:
                res = freq[substr]
    
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × minSize), where n is the length of s.  
   - For every window, creating a set of up to minSize characters takes O(minSize) time.
   - There are (n - minSize + 1) substrings of length minSize.
- **Space Complexity:** O(n), for storing substring frequencies and temporary sets (total number of substrings ≤ n).


### Potential follow-up questions (as if you’re the interviewer)  

- What if minSize and maxSize can be very large and close to the length of the string?  
  *Hint: How would substring counts change as the substring length increases?*

- How would you handle the case if the unique character check needs to be done many times?  
  *Hint: Can you make the set-building step more efficient for a sliding window?*

- If substrings could only be counted when non-overlapping, how would that change your approach?  
  *Hint: How do you handle counting with jumps instead of moving by one position?*


### Summary
This problem is an application of the fixed window sliding window pattern, combined with frequency counting using a hash map. The key insight is that, due to repetition likelihood, only the smallest allowed substring size (minSize) needs to be checked for maximum frequency, greatly simplifying the solution.  
This pattern can be applied to other substring-counting problems with complexity constraints, especially where "most frequent" or "at most/unusual letters" requirements are present.


### Flashcard
Focus on the smallest allowed substring size to efficiently find the most frequent substring with ≤ maxLetters unique characters.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Rearrange Characters to Make Target String(rearrange-characters-to-make-target-string) (Easy)