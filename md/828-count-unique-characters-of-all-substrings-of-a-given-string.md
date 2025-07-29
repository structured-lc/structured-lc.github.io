### Leetcode 828 (Hard): Count Unique Characters of All Substrings of a Given String [Practice](https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string)

### Description  
Given a string `s`, for every possible substring of `s`, count how many characters appear exactly once in that substring. Your goal is to return the sum of these counts over **all** substrings.  
- For a substring, a character is unique if it appears only once within that substring.
- Some substrings may repeat/overlap, but every occurrence must be counted.

### Examples  

**Example 1:**  
Input: `s = "ABC"`  
Output: `10`  
*Explanation: Substrings are: "A", "B", "C", "AB", "BC", "ABC".  
Unique chars per substring: "A":1, "B":1, "C":1, "AB":2, "BC":2, "ABC":3  
Sum = 1 + 1 + 1 + 2 + 2 + 3 = 10*

**Example 2:**  
Input: `s = "ABA"`  
Output: `8`  
*Explanation: "A":1, "B":1, "A":1, "AB":2, "BA":2, "ABA":1  
Sum = 1 + 1 + 1 + 2 + 2 + 1 = 8*

**Example 3:**  
Input: `s = "LEETCODE"`  
Output: (computed, can be verified in LeetCode)  
*Explanation: For each substring, count the number of chars that appear exactly once in that substring and sum across all substrings.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Generate every substring (O(n²)), for each substring, count unique chars (O(n)).  
  - Total time: O(n³).  
  - Too slow for large strings.

- **Observation:**  
  - Each unique character occurrence contributes to the answer as long as it's *the only occurrence* of that char in that substring.
  - Instead of counting for all substrings, count for each char:  
    - For each occurrence of a char at pos i:
      - Let `prev` = previous index of that char; `next` = next index of that char.
      - The number of substrings where s[i] is **unique**:
        - All substrings that start after `prev` and end before `next`, and include position i.
        - Count: (i - prev) × (next - i)
  - For all unique positions, sum those contributions.

- **Implementation Plan:**  
  - For each character, record all its indices (use a dict of lists).
  - For each character, for each occurrence, compute number of contributing substrings.
  - Sum contributions of all occurrences of all characters.
  - This brings total time to O(n).

### Corner cases to consider  
- Empty string (`s = ""`)
- All same character (e.g. "AAAA")
- All unique characters (e.g. "ABCDEFG")
- String with one character
- String with alternating repeats ("ABABAB")

### Solution

```python
def uniqueLetterString(s: str) -> int:
    # Map each character to all its occurrence indices
    index_map = {}
    n = len(s)
    for i, c in enumerate(s):
        if c not in index_map:
            index_map[c] = []
        index_map[c].append(i)
    
    result = 0
    for indices in index_map.values():
        # Pad indices with -1 at the start and n at the end for easy boundary calculation
        padded = [-1] + indices + [n]
        # For each occurrence, count the number of substrings where it is unique
        for i in range(1, len(padded) - 1):
            left = padded[i] - padded[i-1]
            right = padded[i+1] - padded[i]
            result += left * right

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Building the index map: O(n)
  - For every unique character, iterating through their indices: O(n) (total over the whole string)
  - Final sum is over O(n) total occurrences.
- **Space Complexity:** O(n)
  - Index map stores up to n indices (worst case: all unique characters).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if the alphabet size is much larger (e.g. Unicode)?
  *Hint: Avoid pre-allocating fixed arrays; use dicts dynamically.*

- What would change if we want all substrings with at least two unique characters?
  *Hint: You would need to examine substring composition or consider inclusion-exclusion techniques.*

- Can you extend this approach for palindromic substrings with unique characters?
  *Hint: You’d need to combine palindrome checking and this counting logic.*

### Summary
This problem uses a **contribution counting pattern**: for each character occurrence, count how many substrings exist where it is uniquely present. By precomputing previous and next occurrences, we efficiently sum up all unique contributions in O(n), avoiding generating all substrings. This technique is common for substring queries where each element's effect can be computed independently — it also appears in problems that require tracking windows or unique element counts (like "Subarrays with K Different Integers", "Count of Substrings with All Unique Characters", etc.).