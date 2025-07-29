### Leetcode 1876 (Easy): Substrings of Size Three with Distinct Characters [Practice](https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters)

### Description  
You are given a string **s**. Find the number of substrings of length 3 such that all characters within the substring are distinct (i.e., no repeated characters). Each substring must be of length exactly 3, and substrings are *contiguous* (consecutive characters). If the same substring appears in multiple places, each occurrence is counted separately.

### Examples  

**Example 1:**  
Input: `s = "xyzzaz"`  
Output: `1`  
*Explanation: The only substring of length 3 with distinct characters is "xyz". The other substrings "yzz", "zza", and "zaz" all have at least one repeated character.*

**Example 2:**  
Input: `s = "aababcabc"`  
Output: `4`  
*Explanation: Substrings with all distinct characters are "abc" at positions 2–4, "bca" at 3–5, "cab" at 4–6, and "abc" at 5–7. Note that "abc" appears twice and both are counted.*

**Example 3:**  
Input: `s = "aaa"`  
Output: `0`  
*Explanation: There are no substrings of length 3 with all distinct characters, as every character is 'a'.*

### Thought Process (as if you’re the interviewee)  
Start by brute-forcing:  
- For every possible substring of size 3, check whether all three characters are different.
- Iterate the string from index 0 to len(s) - 3 + 1, extract s[i:i+3], check uniqueness, and increment a counter.

Optimization:  
- Since substrings are only of length 3, explicit set construction or three character comparisons will both be O(1).
- No need for a sliding window as nothing is reused, but direct comparisons (s[i] != s[i+1] != s[i+2]) are space-optimal.
- No further optimizations needed due to fixed substring size.

Trade-offs:  
- Explicitly comparing three characters is both readable and efficient.
- Using a set may feel more generalizable, but not necessary here.

### Corner cases to consider  
- Empty string (`""`) or length less than 3 → should return 0.
- String with all identical characters (no good substrings).
- String with no three adjacent distinct letters.
- String with overlapping substrings where both are valid.
- String with special characters or mixed case (should work as all are valid chars).

### Solution

```python
def countGoodSubstrings(s):
    # If string is too short, immediately return 0
    if len(s) < 3:
        return 0

    count = 0
    # Iterate through all possible substrings of size 3
    for i in range(len(s) - 2):
        # Get three consecutive characters
        a, b, c = s[i], s[i+1], s[i+2]
        # Check all are distinct
        if a != b and a != c and b != c:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s. Each index 0 to n-3 is checked once.
- **Space Complexity:** O(1); just a counter and three variables. No dynamic or extra data structure allocation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the substring length is **k** instead of 3?  
  *Hint: How would you generalize the distinct check for any k?*

- Can you solve in a single pass with minimal extra space?  
  *Hint: Is it possible with a sliding window and a frequency counter for k > 3?*

- Does the solution still work if s contains unicode or non-ASCII characters?  
  *Hint: Are you using methods that work on any character set?*

### Summary
This is a classic *fixed-size sliding window* or *single pass substring* problem, but optimal here is a linear scan and direct character comparison because substring length is fixed and small. The same pattern (check each fixed-sized substring for a property) occurs in problems involving "substring of length k" with uniqueness/distinctness or character property checks, and can usually be solved with a sliding window and/or frequency counters for higher values of k.