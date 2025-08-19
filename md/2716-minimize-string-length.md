### Leetcode 2716 (Easy): Minimize String Length [Practice](https://leetcode.com/problems/minimize-string-length)

### Description  
Given a string containing only lowercase English letters, you may repeatedly perform the following operation: select any character that appears at least twice, and delete one occurrence of it. Your goal is to minimize the length of the string by applying this operation as many times as possible. Return the length of the resulting minimized string.  
In other words: remove duplicates one at a time, as long as any character still appears twice, to shrink the string as much as possible.

### Examples  

**Example 1:**  
Input: `s = "aaabc"`  
Output: `3`  
*Explanation: Remove two of the 'a's (since 'a' appears 3 times), resulting in "abc", which contains only unique characters. The minimized length is 3.*

**Example 2:**  
Input: `s = "cbbd"`  
Output: `3`  
*Explanation: Remove one of the 'b's (since 'b' appears twice), giving "cbd". Now, all characters are unique. The minimized length is 3.*

**Example 3:**  
Input: `s = "dddaaa"`  
Output: `2`  
*Explanation: Remove two 'd's and four 'a's, ending with just "da". Only unique characters remain—minimized length is 2.*

### Thought Process (as if you’re the interviewee)  
First, I’d think about how to systematically remove duplicates. Brute-force would involve actually simulating deletions, but after observing the question, I realize only one copy of each unique character can remain after all operations.  
So, the minimum possible length after all possible deletions is simply the number of unique characters in the string.  
Thus, I just need to count how many unique letters there are.  
Using a set (or similar structure), I add every character from the string, then return the set’s size.  

Trade-offs:  
- Brute-force character removal is much slower (quadratic)
- Using a set or boolean array for 26 English lowercase letters is optimal (linear time, constant extra space)

### Corner cases to consider  
- String with all unique characters (should return original length)  
- String with all the same character (length 1)  
- Empty string (not allowed by constraints, but good to note)  
- String with two types, all repeated (should return 2)  
- Single-character string  

### Solution

```python
def minimizedStringLength(s):
    # Initialize an empty set to store unique characters
    unique_chars = set()
    # Add each character to the set
    for c in s:
        unique_chars.add(c)
    # The minimized length is the count of unique characters
    return len(unique_chars)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character must be processed once to add to the set.
- **Space Complexity:** O(1) extra space (since there are at most 26 unique lowercase English letters).

### Potential follow-up questions (as if you’re the interviewer)  

- If the input were Unicode or could include any ASCII character, how would this affect your space complexity?  
  *Hint: The set could grow much larger, which could impact memory usage. Would a bitmap or alternate data structure help?*

- What if the operation allowed you to change, not just remove, any duplicate letter?  
  *Hint: Explore how changing vs. deletion affects the minimal length; can you ever end up with more than one of the same character?*

- How would you adapt this for a streaming input (very long string, cannot fit all in memory)?  
  *Hint: Can you track unique elements efficiently with limited memory? Think about data sketches or approximate counting.*

### Summary
We leveraged counting unique elements using a set to minimize string length by exhaustively removing duplicates. This is a classic hash set/deduplication pattern seen in many array/string problems—whenever order or positions do not matter, and only uniqueness/per-element identity is relevant.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Remove All Adjacent Duplicates In String(remove-all-adjacent-duplicates-in-string) (Easy)
- Remove All Adjacent Duplicates in String II(remove-all-adjacent-duplicates-in-string-ii) (Medium)