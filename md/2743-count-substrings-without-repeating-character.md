### Leetcode 2743 (Medium): Count Substrings Without Repeating Character [Practice](https://leetcode.com/problems/count-substrings-without-repeating-character)

### Description  
Given a string s of only lowercase English letters, count the total number of substrings that do **not** contain any repeating characters. A **substring** is any contiguous sequence of characters in s, and to be "special," no letter can appear twice within it. Your task is to return the total number of such special substrings in s.

### Examples  

**Example 1:**  
Input: `s = "abcd"`  
Output: `10`  
*Explanation: All substrings are unique because there are no repeating characters.  
Substrings: "a", "b", "c", "d", "ab", "bc", "cd", "abc", "bcd", "abcd" (10 in total).*

**Example 2:**  
Input: `s = "aaa"`  
Output: `3`  
*Explanation: Only single-character substrings "a" are allowed since every longer substring contains a repeated 'a'.*

**Example 3:**  
Input: `s = "abac"`  
Output: `7`  
*Explanation: Substrings are:
"a", "b", "a", "c", "ab", "ba", "ac" (valid).
Others like "aba", "bac", "abac" contain repeats.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to generate all possible substrings and, for each, check if it has duplicate characters. This would be O(n³): O(n²) substrings, and O(n) to check uniqueness.  
To optimize, notice that substrings without repeating characters must be within a window where all characters are unique. We can use a sliding window:  
- Use two pointers, left and right.  
- Move right to extend the window, and if a repeat is seen, move left forward to skip over or remove it from our window tracking.  
- For each step, the window size (right - left + 1) gives the count of special substrings ending at right.  
This reduces time to O(n), since left and right scan the string at most n steps each.

### Corner cases to consider  
- Empty string ⇒ output `0`  
- Single-character string ⇒ output `1`  
- All characters the same (e.g., "aaaaaa")  
- String with all unique characters  
- String with intermittent repeats (e.g., "abcabc")  
- Very long string (check limits)

### Solution

```python
def countSubstrings(s: str) -> int:
    # Track the last seen position of each character
    last_seen = {}  # char -> index
    n = len(s)
    total = 0
    left = 0  # left pointer for window
    
    for right in range(n):
        c = s[right]
        # If char was seen and in current window, move left
        if c in last_seen and last_seen[c] >= left:
            left = last_seen[c] + 1
        # Count all substrings ending at right and starting in [left, right]
        total += right - left + 1
        # Update last seen position
        last_seen[c] = right
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of s. Both left and right pointers scan forward without backtracking.  
- **Space Complexity:** O(1), because the hashmap holds at most 26 entries (lowercase letters only).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains uppercase letters or Unicode?  
  *Hint: Adjust your window/hashing to account for more unique characters, possibly requiring more space.*

- Can you return all such substrings instead of just the count?  
  *Hint: You'd need to record the actual substrings during enumeration, which increases space significantly.*

- How would you adapt this if substrings can be non-contiguous (subsequences)?  
  *Hint: That’s a much harder combinatorial counting problem. Dynamic programming is needed.*

### Summary
We use the sliding window pattern (with two pointers) to efficiently count substrings without duplicate characters, reducing brute-force O(n³) to O(n) by leveraging the window of uniqueness property. This is a classic application of the two-pointer sliding window and hashmap idea, which appears in many similar substring/window substring problems such as "Longest substring without repeating characters" and others.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Count Complete Substrings(count-complete-substrings) (Hard)