### Leetcode 3760 (Medium): Maximum Substrings With Distinct Start [Practice](https://leetcode.com/problems/maximum-substrings-with-distinct-start)

### Description  
Given a string s of lowercase English letters, return the maximum number of non-empty substrings you can split s into such that each substring starts with a distinct character.  
The key insight is that you can always achieve this maximum by greedily starting a new substring whenever you encounter a new character, appending duplicates to the previous substring.

### Examples  

**Example 1:**  
Input: `s = "abacba"`  
Output: `3`  
*Explanation: Split as "a", "bac", "ba". These start with 'a', 'b', 'c' (all distinct). Cannot get more than 3 since only 3 unique chars exist.*

**Example 2:**  
Input: `s = "abcd"`  
Output: `4`  
*Explanation: Split as "a", "b", "c", "d". Each starts with a distinct char ('a','b','c','d').*

**Example 3:**  
Input: `s = "a"`  
Output: `1`  
*Explanation: Only one substring "a" possible, starting with 'a'.*


### Thought Process (as if you're the interviewee)  
First, brute force: try all possible ways to split the string and count valid splits where starting chars are unique—O(2ⁿ × n) time, too slow.  

Realize the limit is the number of unique characters (max 26 for lowercase letters), since each substring needs a distinct start char.  

Key insight: we can always achieve exactly this number by scanning left-to-right—start a new substring on first occurrence of any char, append repeats to the prior substring. No length/contiguity restrictions beyond covering the whole string.  

This is O(n) using a set to track seen chars, but since answer is just unique count, even simpler. Trade-off: set gives clean tracking but we don't need positions.

### Corner cases to consider  
- Empty string: return 0 (no substrings possible).  
- Single character: return 1.  
- All identical chars (e.g., "aaa"): return 1.  
- All unique chars: return length of string.  
- Max unique chars (26 lowercase letters).  

### Solution

```python
def maximumSubstringsWithDistinctStart(s: str) -> int:
    # Use a set to track unique characters encountered
    seen = set()
    
    # Iterate through each character once
    for char in s:
        # Add to set if new (set auto-handles uniqueness)
        seen.add(char)
    
    # Number of unique chars = max possible substrings with distinct starts
    return len(seen)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). Single pass to build set.
- **Space Complexity:** O(1), since set stores at most 26 lowercase letters.


### Potential follow-up questions (as if you're the interviewer)  

- Modify to return one possible split (as list of substrings) achieving this maximum.  
  *Hint: Track last split position, start new substring on unseen chars.*

- What if substrings must also have distinct *ending* characters (both start+end unique)?  
  *Hint: Need two-pass greedy or DP tracking both constraints.*

- Generalize to digits+uppercase (62 possible chars), or return -1 if impossible?  
  *Hint: Still O(1) space possible with array for ASCII.*

### Summary
Count unique characters in the string—the answer is always this count, achieved by greedy splitting on first occurrences. Classic "count distinct elements" pattern, applicable to frequency-limited partitioning problems.

### Flashcard
Count unique characters in string: that's the maximum substrings with distinct starts, by greedily starting new substring on first occurrence of each char.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
