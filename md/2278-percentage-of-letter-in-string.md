### Leetcode 2278 (Easy): Percentage of Letter in String [Practice](https://leetcode.com/problems/percentage-of-letter-in-string)

### Description  
Given a string `s` and a character `letter`, return the percentage of characters in `s` that are exactly equal to `letter`, rounded down to the nearest whole percent.  
For example, if `letter` occurs 2 times in a 6-length string, the percentage is 33 (since 2/6 × 100 = 33.33..., and you round down).

### Examples  

**Example 1:**  
Input: `s = "foobar", letter = "o"`  
Output: `33`  
*Explanation: "o" appears 2 times in "foobar" (length 6). Percentage = (2/6) × 100 = 33.33...; rounded down to 33.*

**Example 2:**  
Input: `s = "jjjj", letter = "k"`  
Output: `0`  
*Explanation: "k" does not appear in "jjjj" (length 4). Percentage = (0/4) × 100 = 0.*

**Example 3:**  
Input: `s = "abcde", letter = "e"`  
Output: `20`  
*Explanation: "e" appears once in "abcde" (length 5). Percentage = (1/5) × 100 = 20.*

### Thought Process (as if you’re the interviewee)  
Start by scanning through the string and counting how many times `letter` appears.  
Compute the percentage by:  
- dividing the count by the length of `s`
- multiplying by 100  
- finally, take the integer part (floor/round down) since the output should be the nearest whole percent not exceeding the real value.

This is O(n) time since you must check every character. No need for extra data structures; just use a counter.

No complex optimizations are needed, as even a brute-force single-pass is optimal for this input size.

### Corner cases to consider  
- Empty string `s` (though based on problem constraints, this may not occur)
- `letter` not present in `s`
- All characters in `s` are equal to `letter`
- `s` has length 1
- Upper and lower case sensitivity (assumed to match exactly)
- Division where the result is not integer (ensure correct flooring, not rounding)

### Solution

```python
def percentageLetter(s, letter):
    # Count occurrences of 'letter' in string 's'
    count = 0
    for ch in s:
        if ch == letter:
            count += 1
    
    # Length of the string
    n = len(s)
    
    # Calculate percentage (integer division floors the result)
    percentage = (count * 100) // n
    return percentage
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `s`. We scan each character once.
- **Space Complexity:** O(1) extra space, aside from input, just a few integer variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What happens if the input string can be extremely large (e.g., streaming input)?
  *Hint: Can you do this without storing the whole string?*

- Can you generalize this to count the percentage of multiple letters?
  *Hint: Use a frequency counter or dictionary for multiple queries.*

- How would you handle case-insensitive counting?
  *Hint: Normalize both the letter and characters in `s` (e.g., `ch.lower()`).*

### Summary
This problem is a simple application of string traversal and basic math (frequency, percentages, integer division). The approach is linear scan, counting how often `letter` appears, then computing (count × 100) // length.  
This scan-and-count pattern is common for histogram-building, statistics, and basic frequency-based analytics. It can generalize to more complex string analysis tasks.