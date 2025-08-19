### Leetcode 2566 (Easy): Maximum Difference by Remapping a Digit [Practice](https://leetcode.com/problems/maximum-difference-by-remapping-a-digit)

### Description  
Given an integer **num**, you can pick a single digit (appearing anywhere in num), and **remap all its occurrences** to *any other digit* (from 0 to 9, inclusively, but the digit must change). You can only choose one digit type to remap.   
Your goal: make the difference between the *maximum* and *minimum* numbers (obtained after remapping one digit as above) **as large as possible**.  
Leading zeros after remapping are allowed and kept (i.e., 021 becomes 21).  
Return that **maximum possible difference**.

### Examples  

**Example 1:**  
Input: `num = 11891`  
Output: `99009`  
*Explanation:  
Max: Pick '1' → remap all '1'→'9' → 99899  
Min: Pick '1' → remap all '1'→'0' → 00890 (leading zeros allowed, so 890)  
Difference: 99899 - 890 = 99009*

**Example 2:**  
Input: `num = 90`  
Output: `99`  
*Explanation:  
Max: Pick '0' → remap all '0'→'9' → 99  
Min: Pick '9' → remap all '9'→'0' → 00 (so 0)  
Difference: 99 - 0 = 99*

**Example 3:**  
Input: `num = 1000`  
Output: `9000`  
*Explanation:  
Max: Pick '1' → remap all '1'→'9' → 9000  
Min: Pick '1' → remap all '1'→'0' → 0000 (so 0)  
Difference: 9000 - 0 = 9000*


### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try every possible (digit, new_digit) mapping and compute the max-min difference; but for 9 digits in num and 10 possible digits, this is unnecessary since only the most significant change affects the result most.
- **Optimal approach**:
  - To get the *maximum*, replace all of the first non-'9' digit with '9' (because the most significant non-9 digit change increases the value maximally).
  - To get the *minimum*, replace all of the first digit with '0' (the highest place digit gives the biggest decrease, and leading zeros are allowed).
- Just return the difference.  
This works in O(n) where n = number of digits (at most 9 for num ≤ 10⁸), so it's fast.


### Corner cases to consider  
- All digits already '9' (no higher max possible).
- All digits identical (e.g., 3333).
- Single digit input.
- Input contains zero(s), test remapping for leading zeros.
- Remapping doesn't change num (e.g. all digits same and already 0 or 9).


### Solution

```python
def minMaxDifference(num: int) -> int:
    # Convert num to string for easy replacement
    s = str(num)
    
    # --- For max: replace all occurrences of first non-9 digit with '9' ---
    max_s = s
    for c in s:
        if c != '9':
            max_s = s.replace(c, '9')
            break  # Only one digit choice allowed for replacement

    max_num = int(max_s)
    
    # --- For min: replace all occurrences of the first digit with '0' ---
    min_s = s.replace(s[0], '0')
    min_num = int(min_s)
    
    # Return the difference
    return max_num - min_num
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of digits in num (≤ 9). Each replacement operation and loop over the string has constant upper bound.
- **Space Complexity:** O(n), since we create string copies for remapping; the integer conversion is also O(n).


### Potential follow-up questions (as if you’re the interviewer)  

- What if leading zeros are not allowed after remapping?  
  *Hint: You'd need to skip remappings that would lead to a number with leading zeros, except for single digit '0'.*

- Can you optimize if you are allowed to remap more than one digit type?  
  *Hint: Explore dynamic programming or greedy on digit counts and positions.*

- How would you modify for string-based numbers of arbitrary length (very large num)?  
  *Hint: Avoid integer conversion, operate entirely as strings.*


### Summary
We use **greedy digit mapping**: maximize by remapping the first non-9 to 9 (all), minimize by remapping the most significant digit to 0 (all), taking care with strings since digit positions matter most.  
This is a classic *digit manipulation* problem—a common LeetCode pattern for maximizing or minimizing integers via replacements—and the same approach can help in other problems involving changing/rearranging digits for maximum or minimum values.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
