### Leetcode 2729 (Easy): Check if The Number is Fascinating [Practice](https://leetcode.com/problems/check-if-the-number-is-fascinating)

### Description  
Given a **three-digit integer** n, determine if it is a **fascinating number**.  
A number is "fascinating" if you concatenate n, 2\*n, and 3\*n (in this order), and the resulting 9-digit number contains all digits from 1 to 9 **exactly once** (i.e., has no zeroes, no repeats, and no missing digits).

Put simply:  
- Take n, 2\*n, 3\*n.  
- Join them as a string.  
- If this string uses all digits 1-9 exactly once (no zeros!), n is fascinating.

### Examples  

**Example 1:**  
Input: `192`  
Output: `True`  
*Explanation: 192, 384, 576 → "192384576". This uses each of 1–9 exactly once, so 192 is fascinating.*

**Example 2:**  
Input: `100`  
Output: `False`  
*Explanation: 100, 200, 300 → "100200300". This contains zeros and repeats digits, so it's not fascinating.*

**Example 3:**  
Input: `273`  
Output: `True`  
*Explanation: 273, 546, 819 → "273546819". This uses each of 1–9 exactly once, so 273 is fascinating.*

### Thought Process (as if you’re the interviewee)  

To solve this:  
- I start by computing the three numbers: n, 2×n, 3×n.  
- Concatenate their string versions into one 9-character string.  
- If the concatenated string has length 9 and, when sorted or converted to a set, is exactly the digits '1' to '9', then return True. Otherwise, return False.

Brute force:  
- Concatenate, count each digit, check for zero, check no duplicates, check for all digits 1-9.  
- Since n is always 3 digits, all steps are very fast and acceptable.

Optimized approach:  
- Convert the string to a set, verify set is {'1','2','3',...,'9'}.  
- Or sort the string and check if it equals "123456789".

Trade-off:  
- Both are O(1) and clear.  
- The sorted string method is concise and directly checks the condition.

### Corner cases to consider  
- n with zeroes (e.g., 100, 102), should return False due to zero or repeated digit  
- n yielding repeats when concatenated (e.g., 222 → "222444666")  
- Non-3-digit n (but as per problem, input is always 3-digit)  
- Concatenation not 9 digits long (should not happen for 3-digit n, but always validate length)  
- Digits out of order, so cannot just compare input n digits

### Solution

```python
def isFascinating(n):
    # Concatenate n, 2×n, and 3×n as strings
    s = str(n) + str(2 * n) + str(3 * n)
    
    # Check: 9 digits, all digits must be 1..9 exactly once
    return ''.join(sorted(s)) == '123456789'
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  - n is always three-digit, so all string and sort operations are constant time.

- **Space Complexity:** O(1)  
  - Uses fixed extra space for the concatenated string (9 chars), regardless of input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize the idea for k\*n for k > 3 to get other pandigital numbers?  
  *Hint: Try to match digit counts for k × n format—how does the digit frequency constraint change?*  

- What if n is not guaranteed to be three digits?  
  *Hint: Validate the concatenated string's length and adjust digit set accordingly.*

- What if you want to find all 3-digit fascinating numbers in a given range?  
  *Hint: Simply loop n from 100 to 999 and apply your function.*

### Summary  
This problem follows a **permutation/string-character validation pattern**, also seen in checking for "pandigital" numbers or anagrams.  
Core steps:
- String manipulation
- Set or sorted comparison to validate exactly one of each digit
Patterns like this are used for validation of unique element presence, common in coding interviews.