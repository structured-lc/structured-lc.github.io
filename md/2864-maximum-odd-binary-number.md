### Leetcode 2864 (Easy): Maximum Odd Binary Number [Practice](https://leetcode.com/problems/maximum-odd-binary-number)

### Description  
Given a **binary string** s (a string consisting only of '0's and '1's) containing at least one '1', rearrange its characters to produce the **largest possible odd binary number**.  
A binary number is **odd** if its last digit is '1'.  
You can have **leading zeros**, and must return any permutation of s’s characters forming the maximum possible **odd-value** binary number.

### Examples  

**Example 1:**  
Input: `s = "010"`  
Output: `001`  
*Explanation: There is just one '1', so it must go at the end to ensure the number is odd. The largest number possible is "001".*

**Example 2:**  
Input: `s = "0101"`  
Output: `1001`  
*Explanation: We need one '1' at the end for oddness. The remaining '1' goes in front for maximal value, with all '0's in the middle: "1001".*

**Example 3:**  
Input: `s = "100011"`  
Output: `111000`  
*Explanation: Total number of '1's = 3. Place 2 '1's at front, all '0's next, and a '1' at end ("111000").*

### Thought Process (as if you’re the interviewee)  
- First, I notice that to guarantee the number is **odd**, the last character in the output must be `'1'`.
- To maximize the binary value (as leftmost '1's contribute most to the value), I should put as many '1's as possible at the start.
- Thus, I:
  - Count the number of '1's (say, ones).
  - Place (ones-1) '1's at the beginning.
  - Fill the middle with all '0's.
  - Place the last '1' at the end to ensure oddness.
- This greedy placement gives the largest possible value while meeting the oddness requirement.
- Brute force (try all permutations) is too slow: complexity is O(n!), so not practical.
- The described greedy approach is O(n) time and very efficient.  
- No sorting or library sorting needed, just counts.

### Corner cases to consider  
- All bits are '1': e.g., "11" → "11".
- Only one '1': e.g., "0001" → "0001".
- All bits except for one are '0': e.g., "10000" → "00001".
- Input like "101" or "001", i.e., with leading or scattered '0's.
- Length 1: e.g., "1" → "1".

### Solution

```python
def maximumOddBinaryNumber(s):
    # Count number of '1's in s
    ones = 0
    for char in s:
        if char == '1':
            ones += 1
    zeros = len(s) - ones

    # Place (ones-1) '1's at the start
    # Then all '0's
    # Then the last '1' at end (to make odd)
    result = '1' * (ones - 1) + '0' * zeros + '1'
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). We scan through the list once to count '1's, and generate a new string of size n.
- **Space Complexity:** O(n), for constructing the output string of length n.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this rearrangement **in place** if s was mutable?
  *Hint: Think about swapping in arrays and two-pointer approaches.*

- What if you had to maximize **even** binary numbers instead?  
  *Hint: Now the last digit must be '0'.*

- How would your approach change if the string could have digits other than ‘0’ and ‘1’?  
  *Hint: Would need additional validation or filtering.*

### Summary
The approach here is **greedy** and relies on **counting**, a very common pattern in binary digit/string rearrangement problems. This method is optimal because maximizing leftmost `'1'`s increases value, and the parity (odd requirement) is easily handled by fixing the rightmost bit.  
Similar **count-and-place** patterns appear in problems involving string composition, majority elements, or digit/bit manipulation.


### Flashcard
Count ones; place all but one '1' at the start, fill with zeros, and put the last '1' at the end for the largest odd binary.

### Tags
Math(#math), String(#string), Greedy(#greedy)

### Similar Problems
