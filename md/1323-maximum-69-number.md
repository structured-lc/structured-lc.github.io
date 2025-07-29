### Leetcode 1323 (Easy): Maximum 69 Number [Practice](https://leetcode.com/problems/maximum-69-number)

### Description  
You're given a *positive integer* that contains only the digits **6** and **9**. By changing at most **one digit** from **6** to **9** (or vice versa), return the *maximum number* possible. For optimality, you may only want to do a single change — and it’s optional: changing is not mandatory if the number is already at its max.

### Examples  

**Example 1:**  
Input: `9669`  
Output: `9969`  
*Explanation: Changing the first occurring 6 (at index 1) to 9 gives 9969, which is the largest possible. Changing other digits results in smaller numbers.*

**Example 2:**  
Input: `9996`  
Output: `9999`  
*Explanation: Only one 6, at the last position — change it to 9. No higher value can be obtained.*

**Example 3:**  
Input: `9999`  
Output: `9999`  
*Explanation: Every digit is already a 9. No change yields a higher value, so return as is.*

### Thought Process (as if you’re the interviewee)  
First, brute force would be to:
- Inspect every digit. For every 6, try flipping it to 9, and compute the resulting integer. Do this for every 6 and keep track of the maximum.
- This works, but it’s wasteful, as flipping the *leftmost* 6 will always maximize our number (since most significant digits matter more).

Optimized approach:
- Just convert the number to a string, search for the first (leftmost) 6, and change only that to 9.
- If no 6s are found, the number is already at its maximum.
- This is fast (single pass), and space is minimal.

**Tradeoff:**  
Brute force is slower (\(O(n^2)\)), while string manipulation approaches are direct, fully readable, and O(n).

### Corner cases to consider  
- Input is already all 9s (e.g. `9999`), so output = input.
- Only one digit (e.g. `6` or `9`).
- Multiple 6's: only change the leftmost.
- No 6 at all.
- Input is at the lower boundary (e.g. `6`).

### Solution

```python
def maximum69Number(num):
    # Convert to string to navigate easily
    num_str = list(str(num))
    # Traverse left to right
    for i in range(len(num_str)):
        if num_str[i] == '6':
            # Only the first 6 is flipped
            num_str[i] = '9'
            break  # Make at most one change
    # Recombine into integer and return
    return int(''.join(num_str))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of digits. Each digit is checked at most once.
- **Space Complexity:** O(n): storing the string/list version of input digits.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could change up to **k** digits?
  *Hint: Consider scanning left to right, flipping the first k 6's you see.*

- What if the number can contain digits other than just 6 and 9?
  *Hint: Generalize the logic: flip the first lowest digit to the highest possible digit to maximize the number.*

- Can you solve it *without* converting the input to a string?
  *Hint: Use math operations (modulo, division, multiplication by powers of 10). Track and flip the highest-position 6.*

### Summary  
This is a classic **greedy** string manipulation problem — maximize a number by changing only one digit, hence target the most significant possible spot.  
- Common coding patterns: digit manipulation, greedy, string handling, “first-occurrence” strategies.
- This approach generalizes to other digit-flipping max-value problems (e.g., “minimum number with k changes”).