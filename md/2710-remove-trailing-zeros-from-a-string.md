### Leetcode 2710 (Easy): Remove Trailing Zeros From a String [Practice](https://leetcode.com/problems/remove-trailing-zeros-from-a-string)

### Description  
Given a string representing a **positive integer**, remove all trailing zeros from the string and return the new string. Only the zeros at the **end** of the string should be removed; leading or internal zeros should remain untouched. The return value should also be a string.  
For example, if given `"520300"`, the answer is `"5203"`.

### Examples  

**Example 1:**  
Input: `"51230100"`,  
Output: `"512301"`  
*Explanation: The string ends with two zeros. Remove both to get "512301".*

**Example 2:**  
Input: `"123"`,  
Output: `"123"`  
*Explanation: The string does not end with zeros, so it stays the same.*

**Example 3:**  
Input: `"10000"`,  
Output: `"1"`  
*Explanation: The string ends with four zeros. Remove all trailing zeros, giving "1".*

### Thought Process (as if you’re the interviewee)  
- The problem asks for removal of all zeros at the end (trailing zeros) of the string.
- One brute-force approach: iterate backwards from the last character, and count how many zeros there are until you encounter a non-zero. Then slice up to that index.
- Since strings are immutable in Python, slicing for this scenario is safe and efficient.
- Alternatively, in production code with allowed libraries, using `.rstrip("0")` would do the job, but in interviews you often need to do it manually.
- The manual method gives O(n) time, as we may have to look at each character once in the worst case.

### Corner cases to consider  
- The string does **not** have leading zeros (guaranteed).
- The number has **no trailing zeros** (should return itself).
- The number is `0` (guaranteed not to happen here, since input is positive integer).
- **All** digits after the first are zeros (e.g., "1000" → "1").
- String length is **1** (e.g., "7").
- Maximum size input (1000 digits).

### Solution

```python
def remove_trailing_zeros(num: str) -> str:
    # Start from the end, find the position of the last non-zero character
    i = len(num) - 1
    # Move left as long as we see zeros
    while i >= 0 and num[i] == '0':
        i -= 1
    # Slice up to the last non-zero character inclusive
    return num[:i + 1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We may need to scan all n digits if all are zeros except the first, or if there are no zeros.
- **Space Complexity:** O(1) additional  
  We only use a couple of variables. The returned string slice shares memory with the original (in CPython); worst case new string of same length, but no extra space is needed for auxiliary data.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input could have **leading zeros**?
  *Hint: Would you need to strip both leading and trailing zeros? How would you do both in place?*

- What if the input could be **very large** (beyond memory)?
  *Hint: How would you process the string from a stream, or line by line?*

- Can you do it **in place** if you received the input as a character array?
  *Hint: Use two pointers in place to shift characters, and return new length or slice.*

### Summary
Simple pass-from-end algorithms and string slicing are classic patterns for handling substrings in coding interviews. This problem is a textbook example of the "scan-and-trim" pattern and is commonly encountered in file parsing or input sanitization tasks. Similar logic applies to removing leading zeros, counting/significant digit extraction, or string trimming problems.