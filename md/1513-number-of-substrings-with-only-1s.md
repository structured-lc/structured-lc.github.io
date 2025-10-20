### Leetcode 1513 (Medium): Number of Substrings With Only 1s [Practice](https://leetcode.com/problems/number-of-substrings-with-only-1s)

### Description  
Given a binary string s, count the total number of substrings that contain only '1's. Since this count can be huge, return the result modulo 10⁹+7. A substring is a contiguous sequence—so for every sequence of k consecutive '1's, there are k × (k+1) / 2 such substrings.

### Examples  
**Example 1:**  
Input: `s = "0110111"`  
Output: `9`  
*Explanation: The substrings are: '1' (at 1, 4, 5, 6), '11' (4-5, 5-6), '111' (4-6). Count = 4 + 2 + 1 = 7, plus 2 from the isolated '1' at position 2.*

**Example 2:**  
Input: `s = "101"`  
Output: `2`  
*Explanation: Only substrings are at position 0 and 2 ('1' at each), no runs longer than 1.*

**Example 3:**  
Input: `s = "111111"`  
Output: `21`  
*Explanation: There are 6×7/2 = 21 substrings as '1's form one long block.*

### Thought Process (as if you’re the interviewee)  
The brute-force method would be to use two nested loops to examine all substrings (O(n²)), checking if all characters are '1'. But that's slow. Notice: Each maximal run of consecutive '1's of length k uniquely determines k × (k+1)/2 substrings of '1'. Thus, scan left to right, count the length of each block of '1', add up k × (k+1)/2 to the result. For modulus, take care to use modulo at every step.

### Corner cases to consider  
- All '0's (output 0)
- Single '1'
- Interleaved '1's and '0's
- Very large string (test for x10⁵ or more)

### Solution

```python
def numSub(s):
    MOD = 10**9 + 7
    result = 0
    count = 0  # count of consecutive '1's
    for c in s:
        if c == '1':
            count += 1
            result = (result + count) % MOD
        else:
            count = 0
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), single pass over s.
- **Space Complexity:** O(1), constant extra space.

### Potential follow-up questions (as if you’re the interviewer)  
- What if substrings can wrap around (circular)?
  *Hint: Concatenate s to itself, but be careful with substrings not double counting.*

- Can you count substrings of fixed length?
  *Hint: For each block of k, count max(0,k-L+1) substrings of length L.*

- If input string is not only '0'/ '1'?
  *Hint: Add an input validation step.*

### Summary
This is a classic 'prefix/group block' problem with a key mathematical formula for summing substrings in runs. The pattern applies widely—counting substrings by group, range, streak, etc.—enabling O(n) solutions where naive approaches would take O(n²).


### Flashcard
Count substrings with only '1's by scanning the string and summing the number of substrings for each block of consecutive '1's.

### Tags
Math(#math), String(#string)

### Similar Problems
- Count Number of Homogenous Substrings(count-number-of-homogenous-substrings) (Medium)
- Count Vowel Substrings of a String(count-vowel-substrings-of-a-string) (Easy)