### Leetcode 2405 (Medium): Optimal Partition of String [Practice](https://leetcode.com/problems/optimal-partition-of-string)

### Description  
Given a string s, split it into the smallest possible number of substrings such that **no character appears in more than one substring**. Each substring must have all unique characters, and you must use the whole string. You want to return the minimum number of substrings in such a partition.

### Examples  

**Example 1:**  
Input: `s = "abacaba"`  
Output: `4`  
*Explanation: We can split as "a", "ba", "cab", "a". Each substring has unique letters. No smaller partition is possible.*

**Example 2:**  
Input: `s = "ssssss"`  
Output: `6`  
*Explanation: Every letter is the same, so each must be its own substring: "s","s","s","s","s","s".*

**Example 3:**  
Input: `s = "world"`  
Output: `1`  
*Explanation: All letters are unique, so the answer is just the whole string.*

### Thought Process (as if you’re the interviewee)  
First, I’d think about brute force: try all possible partitions and check for uniqueness, but that's clearly exponential.

Instead, for an optimal solution, I can **scan the string left to right**, keeping track of which characters are currently in the active substring. If I see a duplicate (i.e., a character that’s already in the current substring), I need to **start a new substring**. I’ll reset the character set and keep counting.

For efficient character look-up, I can use a boolean set or a 26-bit integer (bitmask) since only lowercase letters are allowed.

This is a greedy approach: whenever you must, you split, and you can’t postpone the split without breaking the unique-character rule. It's **O(n)** time and **O(1)** space (constant alphabet size).

### Corner cases to consider  
- **Empty string:** Should return 0.
- **All unique letters:** Answer is 1.
- **All identical letters:** Each one must be its own substring.
- **One letter:** Should return 1.
- **String with early repeats:** e.g., "abca" → needs split after 'c'.
- **Long runs:** e.g., unique-for-a-long-time, then a duplicate late in the string.

### Solution

```python
def partitionString(s: str) -> int:
    # Number of partitions needed
    count = 1
    # Track which characters are in the current substring (using a set)
    used = set()
    for c in s:
        if c in used:
            # Need a new partition for this duplicate character
            count += 1
            used.clear()
        used.add(c)
    return count
```

#### Bitmask optimization (for only lowercase letters):
```python
def partitionString(s: str) -> int:
    count = 1
    used = 0
    for c in s:
        idx = ord(c) - ord('a')
        if (used >> idx) & 1:
            # Duplicate detected, reset for a new partition
            count += 1
            used = 0
        used |= 1 << idx
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. We process each character once.
- **Space Complexity:** O(1), since at most we use a set or a 26-bit integer (the alphabet size is fixed).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains uppercase letters or non-ASCII characters?  
  *Hint: How do you generalize your data structure for other alphabets?*

- Can you return the actual partitioning (e.g., the list of substrings), not just the count?  
  *Hint: Track the start and end indices for each partition.*

- What if you want to minimize the size of the largest substring?  
  *Hint: This becomes an interval balancing problem; can greedy still work?*

### Summary
This uses the **greedy partitioning** coding pattern, scanning while maintaining a set (or bitmask) of used characters. Every time a repeated character appears, it triggers a split. This is a classic method for substring partitioning with constraints. The design philosophy resembles that of "Longest Substring Without Repeating Characters" and "Partition Labels", and is applicable in scenarios where substrings must maintain uniqueness under some grouping rule.


### Flashcard
Scan the string left to right, starting a new substring whenever a duplicate character is found.

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)
- Longest Substring with At Least K Repeating Characters(longest-substring-with-at-least-k-repeating-characters) (Medium)
- Partition Labels(partition-labels) (Medium)
- Partition Array into Disjoint Intervals(partition-array-into-disjoint-intervals) (Medium)
- Maximum Sum of Distinct Subarrays With Length K(maximum-sum-of-distinct-subarrays-with-length-k) (Medium)