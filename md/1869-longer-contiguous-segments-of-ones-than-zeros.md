### Leetcode 1869 (Easy): Longer Contiguous Segments of Ones than Zeros [Practice](https://leetcode.com/problems/longer-contiguous-segments-of-ones-than-zeros)

### Description  
Given a binary string, return true if the longest segment of adjacent 1’s is **strictly longer** than the longest segment of adjacent 0’s.  
A segment is a sequence of the same character with no interruptions by the other digit. If the string has no 0’s or no 1’s, treat the corresponding segment as length 0.

### Examples  

**Example 1:**  
Input: `s = "1101"`  
Output: `true`  
*Explanation: The longest contiguous 1’s is "11" (length 2). The longest contiguous 0’s is "0" (length 1). 2 > 1 → true*

**Example 2:**  
Input: `s = "111000"`  
Output: `false`  
*Explanation: The longest contiguous 1’s is "111" (length 3). The longest contiguous 0’s is "000" (length 3). 3 = 3 → false*

**Example 3:**  
Input: `s = "110100010"`  
Output: `false`  
*Explanation: The longest contiguous 1’s is "11" (length 2). The longest 0’s is "000" (length 3). 2 < 3 → false*

### Thought Process (as if you’re the interviewee)  
- First, I need to find the *longest run* (consecutive segment) of '1's and '0's.
- I can use two variables to store the maximum lengths found so far for '1's and '0's.
- As I iterate through the string, I’ll keep track of the current run’s length and which character it’s for, and update the maximum if a longer segment is found.
- At each character, if it matches the previous, I increment the run. If not, I reset the run to 1 and switch which character I’m tracking.
- At the end, compare the two maximums and return true if the max for '1's is strictly greater than for '0's.
- This is efficient: a single pass through the string (O(n)), and O(1) extra space.

### Corner cases to consider  
- String has only 1’s (e.g., `"1111"`) or only 0’s (`"0000"`).
- Alternating 1’s and 0’s (e.g., `"101010"`).
- Single character: `"1"` or `"0"`.
- The longest segments for 1’s and 0’s are the same length.
- String contains segment(s) of length 1 only.

### Solution

```python
def checkZeroOnes(s: str) -> bool:
    max_ones = max_zeros = 0  # Track the longest '1's and '0's found
    curr_ones = curr_zeros = 0  # Current consecutive counters
    
    for ch in s:
        if ch == '1':
            curr_ones += 1
            curr_zeros = 0  # reset zeros counter
            if curr_ones > max_ones:
                max_ones = curr_ones
        else:  # ch == '0'
            curr_zeros += 1
            curr_ones = 0  # reset ones counter
            if curr_zeros > max_zeros:
                max_zeros = curr_zeros
    
    return max_ones > max_zeros
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we loop through the entire string once, examining each character.
- **Space Complexity:** O(1). We use only a fixed number of variables, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string could also contain characters other than '0' and '1'?  
  *Hint: How would you validate the input or handle unexpected values?*

- How would you modify the solution if you need to return the actual segment instead of just true/false?  
  *Hint: Track the start and end indices of each maximum segment.*

- Can you solve this if the input is a stream, rather than a string (i.e., you only see one character at a time and cannot backtrack)?  
  *Hint: Is your algorithm already streamable, or what changes would it need?*

### Summary
This is a classic *single pass* problem — find the longest segment of two types in a binary string and compare them.  
It uses a common pattern: tracking running segment lengths while iterating.  
Such segment-finding logic can be applied in problems like maximum consecutive ones, or any run-length encoding questions.  
Efficient for both interview and production: O(n) time, O(1) space.


### Flashcard
Track the longest runs of '1's and '0's in a string.

### Tags
String(#string)

### Similar Problems
- Max Consecutive Ones(max-consecutive-ones) (Easy)
- Count Subarrays With More Ones Than Zeros(count-subarrays-with-more-ones-than-zeros) (Medium)
- Check if Binary String Has at Most One Segment of Ones(check-if-binary-string-has-at-most-one-segment-of-ones) (Easy)