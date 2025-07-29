### Leetcode 1417 (Easy): Reformat The String [Practice](https://leetcode.com/problems/reformat-the-string)

### Description  
Given a string containing only lowercase English letters and digits, rearrange its characters so that no two adjacent characters are both letters or both digits. The reformatted string should alternate between digits and letters. If it is not possible to do so (e.g., if the difference between the number of letters and digits is more than 1), return an empty string.

### Examples  

**Example 1:**  
Input: `"a0b1c2"`  
Output: `"a0b1c2"`  
Explanation: Characters already alternate (letter-digit-letter-digit-letter-digit).

**Example 2:**  
Input: `"leetcode"`  
Output: `""`  
Explanation: Only letters, so impossible to alternate with digits.

**Example 3:**  
Input: `"1229857369"`  
Output: `""`  
Explanation: Only digits, so impossible to alternate with letters.

### Thought Process (as if you’re the interviewee)  
First, I would count the number of letters and digits. If the absolute difference between these counts is more than 1, alternating them is impossible, and I should return an empty string.  
If alternating is possible, I’ll split the input string into two arrays: one for letters and one for digits. I’ll start with whichever group is larger, then build the result by alternately picking one character from each group. This ensures the output alternates types throughout.

The brute-force approach would try every permutation, but that is extremely inefficient for n up to 500. Since we only need to alternate and the order within groups doesn’t matter, my approach is O(n) and space O(n).

### Corner cases to consider  
- Input string has all letters or all digits.
- Number of letters and digits differs by more than 1.
- Only one character (either a digit or a letter).
- Input is already alternating (should return as is).
- Input where letters and digits are already perfectly balanced.

### Solution

```python
def reformat(s: str) -> str:
    # Separate the input string into two lists: letters and digits
    letters = []
    digits = []
    for ch in s:
        if ch.isdigit():
            digits.append(ch)
        else:
            letters.append(ch)
    
    # Check if reformatting is possible: counts can differ by at most 1
    if abs(len(letters) - len(digits)) > 1:
        return ""
    
    # Decide which group starts first (whichever is more abundant)
    result = []
    if len(letters) >= len(digits):
        first, second = letters, digits
    else:
        first, second = digits, letters
    
    # Alternate between the two groups
    for i in range(len(s)):
        if i % 2 == 0:
            # Even index: take from the larger group (first)
            if first:
                result.append(first.pop())
        else:
            # Odd index: take from the smaller group (second)
            if second:
                result.append(second.pop())
    
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of input string; each character examined and appended at most twice.
- **Space Complexity:** O(n), for storing all characters in separate lists (letters, digits, and output list).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we care about the relative order of letters and digits from the input?
  *Hint: Try using queues instead of stacks so the original order is maintained.*

- What if Unicode letter types (not just ASCII) are present? 
  *Hint: Use appropriate string methods or libraries for isalpha and isdigit.*

- Can this be done in-place with O(1) extra space?
  *Hint: Try arranging characters by swapping within the string array.*

### Summary
This problem demonstrates the two-pointer or two-bucket pattern: split the input into groups, then recombine while preserving a structural property (alternating types). The approach is efficient and commonly found in partitioning or rearrangement problems such as merging even/odd arrays or alternating positive/negative numbers.