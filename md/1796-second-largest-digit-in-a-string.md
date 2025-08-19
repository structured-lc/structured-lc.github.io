### Leetcode 1796 (Easy): Second Largest Digit in a String [Practice](https://leetcode.com/problems/second-largest-digit-in-a-string)

### Description  
Given an alphanumeric string `s`, find and return the second largest **distinct numerical digit** in the string. If there is no second largest digit, return -1.  
A string is alphanumeric if it consists of only lowercase English letters and digits.

### Examples  

**Example 1:**  
Input: `s = "dfa12321afd"`  
Output: `2`  
*Explanation: The digits are [1, 2, 3]. The largest is 3, the second largest is 2.*

**Example 2:**  
Input: `s = "abc1111"`  
Output: `-1`  
*Explanation: Only digit present is [1]; no second largest exists.*

**Example 3:**  
Input: `s = "abc09876abc"`  
Output: `8`  
*Explanation: The digits are [0, 9, 8, 7, 6]. Largest is 9, second largest is 8.*

### Thought Process (as if you’re the interviewee)  
To solve this:
- First, I’d identify all digits appearing in the string.
- A brute-force way is to collect all digit characters, sort them (removing duplicates), then pick the second largest.
- But sorting is unnecessary, as I only need the top two unique digits.
- Instead, I can scan through the string, track the largest and second largest unique digits so far. Each time I find a digit:
  - If it's larger than the current maximum, update both maximum and second maximum.
  - If it's between the current maximum and second maximum, update the second maximum.
- This can be done in one pass (O(n)), uses limited extra space (constant, since there are only 10 possible digits).

### Corner cases to consider  
- Empty string: should return -1 (though constraints prevent this case).
- String with **no digits**: should return -1.
- String with **only one unique digit** (e.g. `"abc1111"`): return -1.
- Digits appear multiple times: must consider only unique digits.
- All digits 0–9 present: should return 8 (as 9 is the largest).
- Digits in non-increasing order: ensure correct second largest is found.

### Solution

```python
def second_highest(s):
    # Initialize the two maximums as -1 (since only digits are 0-9)
    max_digit = -1
    second_max_digit = -1

    for c in s:
        # Check if the character is a digit
        if '0' <= c <= '9':
            digit = ord(c) - ord('0')
            # Skip if this digit is already the current max or second max
            if digit == max_digit or digit == second_max_digit:
                continue
            # If we find a new maximum
            if digit > max_digit:
                second_max_digit = max_digit
                max_digit = digit
            # If digit is less than max but bigger than second max
            elif digit > second_max_digit:
                second_max_digit = digit

    return second_max_digit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character in the string is checked once, and all other operations are constant time.
- **Space Complexity:** O(1)  
  Only two integer variables are maintained, not dependent on input size. (No extra data structures are created.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find the kᵗʰ largest unique digit instead?  
  *Hint: Consider maintaining a fixed-length data structure, like a heap or sorted array of unique digits.*

- Could you generalize to find the second largest **letter**?  
  *Hint: You’d want to track max/second max letters using similar logic, but for a–z.*

- How would you extend this for Unicode digits?  
  *Hint: Check for digit-ness via character properties, not just `'0' <= c <= '9'`.*

### Summary
This problem is a classic example of single-pass scanning while tracking the largest and second largest element (here, unique digits).  
The pattern used is **tracking two variables for max and second max**; it’s a common coding pattern whenever “second largest”, “runner-up”, or similar properties are asked for.  
This approach can be adapted for finding kᵗʰ largest, or when the values to be tracked are letters or other comparable items.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Remove Digit From Number to Maximize Result(remove-digit-from-number-to-maximize-result) (Easy)