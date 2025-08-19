### Leetcode 2496 (Easy): Maximum Value of a String in an Array [Practice](https://leetcode.com/problems/maximum-value-of-a-string-in-an-array)

### Description  
Given an array of strings, where each string could be made up of digits only (representing a number) or letters (or a mix), determine the **maximum "value"** in the array.  
- If a string contains only digits, its value is its numeric value (ignore leading zeroes).
- If a string contains any alphabetical character, its value is **its length**.  
Return the highest such value among all strings.

### Examples  

**Example 1:**  
Input: `["alic3", "bob", "3", "4", "00000"]`  
Output: `5`  
*Explanation:  
- "alic3" → contains letters → value = 5  
- "bob" → contains letters → value = 3  
- "3" → all digits → value = 3  
- "4" → all digits → value = 4  
- "00000" → all digits → value = 0 (numeric, leading zeros ignored)
Maximum among these: 5.*

**Example 2:**  
Input: `["1", "01", "001", "0001"]`  
Output: `1`  
*Explanation: All are digits, "1", "01", "001", "0001" convert to 1, so max is 1.*

**Example 3:**  
Input: `["abc","12345","a1b2c3","00000"]`  
Output: `6`  
*Explanation:  
- "abc" → value = 3 (letters)  
- "12345" → value = 12345 (all digits)  
- "a1b2c3" → value = 6 (letters + digits)  
- "00000" → value = 0 (all digits, leading zeros)
Maximum: 12345 (from "12345") and 6 (from "a1b2c3"), so output is 12345.*

### Thought Process (as if you’re the interviewee)  
First, for each string I need to determine:  
- Is it made up only of digits? If yes, its value is its integer representation (ignoring leading zeroes).
- Otherwise, if it has any letter, its value is just its length.  

The brute-force way is to process each string, check if it's all digits using a loop (no regex in interviews), then compute the appropriate value.  
Iterate through the strings, keep track of the current maximum value found, and update it as needed.

This logic is simple, and since all we do for each string is check each character and maybe convert to int, it's efficient.

- Approach uses only O(1) extra space and O(n\*m) time, n = number of strings, m = average string length.
- No need to optimize further, as it's already optimal for input bounds.

### Corner cases to consider  
- Empty string in array: length = 0, not a valid number, so value is 0.
- Strings with only 0’s like "000", which are numeric (become 0).
- Mix of long numbers and long text: check that string length doesn't confuse with numeric value.
- Strings with symbols or mixed cases (if not allowed by the problem, but usually only digits/letters).
- Only 1 string in input: should still work.
- All strings have same value.

### Solution

```python
def maximumValue(strs):
    max_value = 0

    for s in strs:
        # Assume by default string has only digits
        is_digit = True
        for c in s:
            if not c.isdigit():
                is_digit = False
                break

        if is_digit:
            # If string is only digits, convert to int (handles leading zeroes)
            val = int(s)
        else:
            # If contains any letter, value is length of s
            val = len(s)
        
        if val > max_value:
            max_value = val

    return max_value
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = number of strings, m = average length of string. For each string, we check each character, and potentially convert to int (which also loops through characters).
- **Space Complexity:** O(1) extra space. Only a few counters, all computation is on input array, no additional storage needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if some strings contain symbols or whitespace?
  *Hint: How would you treat non-alphanumeric characters?*

- Can you do this in a single pass without extra storage for results?
  *Hint: Is it necessary to record the value for each string?*

- How would you handle extremely large numbers?
  *Hint: Think about integer overflow; do you need to use string comparison, or language features for big integers?*

### Summary
This problem uses a **string processing** and **conditional logic** pattern.  
The main idea is classification by content (all digits or contains letters), then reduction to a single value via max.  
This pattern appears often: validate input, branch on content type (`isdigit` vs not), aggregate a property (here, max).  
It applies to problems involving input validation, string parsing, and value comparison across mixed-type data.

### Tags
Array(#array), String(#string)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)