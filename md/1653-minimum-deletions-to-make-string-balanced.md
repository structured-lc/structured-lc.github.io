### Leetcode 1653 (Medium): Minimum Deletions to Make String Balanced [Practice](https://leetcode.com/problems/minimum-deletions-to-make-string-balanced)

### Description  
Given a string `s` consisting only of characters 'a' and 'b', find the minimum number of deletions needed so that **no character 'b' appears before any character 'a'** (i.e., all 'a's appear before all 'b's).

### Examples  

**Example 1:**  
Input: `s = "aababbab"`  
Output: `2`  
*Explanation: Delete the two 'b's at indices 2 and 6. Result: "aaabab" which is balanced.*

**Example 2:**  
Input: `s = "bbaaaaabb"`  
Output: `2`  
*Explanation: Delete both 'b's from the start or the two at the end. Result: all 'a's followed by all 'b's.*

**Example 3:**  
Input: `s = "aaaa"`  
Output: `0`  
*Explanation: Already balanced, no deletion needed.*


### Thought Process (as if you’re the interviewee)  
- The challenge is to make all 'a's before all 'b's via minimum deletions.
- Brute-force: try all partitions; delete all b's to the left, a's to the right. Too slow for large s.
- Optimize by left-to-right scan, maintaining counts of misplaced b's ('b' before 'a'). Use prefix sums.
- At each index, consider splitting: left side only b's deleted, right side only a's deleted. Keep minimum.


### Corner cases to consider  
- All 'a's or all 'b's (zero deletions)
- Single char string
- Alternating 'a' and 'b' (e.g. 'ababab')
- Empty string


### Solution

```python
def minimumDeletions(s: str) -> int:
    n = len(s)
    total_a = s.count('a')
    min_del = total_a  # If we delete all a's
    left_b = 0
    for c in s:
        if c == 'a':
            total_a -= 1  # One less a to right
        else:  # It's a 'b', so delete this b or all a's to right
            min_del = min(min_del, left_b + total_a)
            left_b += 1
    min_del = min(min_del, left_b)  # All b's deleted
    return min_del
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), single scan to process string.
- **Space Complexity:** O(1), only counters and some temporary vars.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you return one possible resulting balanced string after minimum deletions?  
  *Hint: Keep track of indices of deleted chars.*

- What if the string uses more than two types of chars?  
  *Hint: Generalize the approach per character.*

- Can you do this in-place?  
  *Hint: Maintain pointers and overwrite unneeded chars.*

### Summary
This problem uses a common **prefix/suffix scan** technique to find the minimum split, similar to minimum flips or 0-1 partition problems in arrays.


### Flashcard
Scan left to right, track misplaced 'b's, and find the split point where deleting all 'b's left and 'a's right is minimized.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Stack(#stack)

### Similar Problems
- Check if All A's Appears Before All B's(check-if-all-as-appears-before-all-bs) (Easy)