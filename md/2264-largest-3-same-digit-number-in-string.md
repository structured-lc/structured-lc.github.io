### Leetcode 2264 (Easy): Largest 3-Same-Digit Number in String [Practice](https://leetcode.com/problems/largest-3-same-digit-number-in-string)

### Description  
Given a string representing a large integer, find the largest substring of length 3 where all digits are the same. If there are multiple such substrings, pick the numerically largest one. Return the substring as a string (not an integer). If no such substring exists, return an empty string.

### Examples  

**Example 1:**  
Input: `num = "6777133339"`  
Output: `"777"`  
*Explanation: The substrings "777" and "333" are valid, but "777" is numerically larger.*

**Example 2:**  
Input: `num = "2300019"`  
Output: `"000"`  
*Explanation: The substring "000" is the only valid 3-length same-digit substring.*

**Example 3:**  
Input: `num = "42352338"`  
Output: `""`  
*Explanation: No 3-length substring with the same digit exists.*

### Thought Process (as if you’re the interviewee)  
First, we need to find all substrings of length 3 in the string and check if all 3 digits are the same. For each such substring, record the largest one found (alphabetical comparison works since all digits are the same in a substring).  

A brute-force solution would be to check every substring of length 3 and see if they contain the same characters, keeping track of the maximum found.

Since the string could be large, an O(n) traversal is preferred. During one pass, compare num[i], num[i+1], and num[i+2] for all i from 0 to len(num)-3. If they match, update the answer if it’s greater than the previous best.

Optimizations are minimal—this sliding window approach is both simple and efficient for this problem size.

### Corner cases to consider  
- The string is less than 3 digits long: should return `""`
- Multiple valid substrings: should pick the largest numerically (the one with the largest digit)
- Only zeroes share triplets: should return `"000"`
- All digits are different: return `""`
- Overlapping triplets (e.g., `"1111"` gives two triplets, both should be checked)
- Input already sorted in descending or ascending order

### Solution

```python
def largestGoodInteger(num: str) -> str:
    # Store the answer - start with empty string
    ans = ""
    # Loop over the string, checking every substring of length 3
    for i in range(len(num) - 2):
        # Check if three consecutive chars are the same
        if num[i] == num[i+1] == num[i+2]:
            # Form the substring
            candidate = num[i:i+3]
            # Update answer if it is larger
            if candidate > ans:
                ans = candidate
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. We scan each window of size 3 exactly once.
- **Space Complexity:** O(1), since we only store a couple of strings regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the substring with k same digits instead of 3?  
  *Hint: Generalize the window size in your approach.*

- How would you modify this to return all such substrings, not just the largest?  
  *Hint: Instead of a single answer, keep a list and append whenever a triplet is found.*

- Can you solve it for substrings where the digits are increasing or decreasing (not necessarily all the same)?  
  *Hint: Adjust your condition to check for different digit sequences instead of equality.*

### Summary
This is a classic example of the sliding window/string scanning pattern, checking each substring of a fixed length for a simple property. It’s commonly used in windowed substring, anagram, or pattern search problems, and demonstrates a straightforward O(n) solution without extra data structures.

### Tags
String(#string)

### Similar Problems
- Largest Odd Number in String(largest-odd-number-in-string) (Easy)