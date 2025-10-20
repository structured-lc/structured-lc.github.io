### Leetcode 1018 (Easy): Binary Prefix Divisible By 5 [Practice](https://leetcode.com/problems/binary-prefix-divisible-by-5)

### Description  
Given an array of binary digits (`0`s and `1`s), for each prefix of the array (from index 0 up to index i), form the binary number represented by that prefix. For each prefix number, return `True` if it is divisible by 5, else `False`. The returned array should indicate, for every prefix ending at index i, whether the number built so far is divisible by 5.

### Examples  

**Example 1:**  
Input: `nums = [0,1,1]`  
Output: `[True, False, False]`  
*Explanation: Prefixes are: 0 (0) → True, 01 (1) → False, 011 (3) → False.*

**Example 2:**  
Input: `nums = [1,1,1]`  
Output: `[False, False, False]`  
*Explanation: Prefixes are: 1 (1) → False, 11 (3) → False, 111 (7) → False.*

**Example 3:**  
Input: `nums = [1,0,1]`  
Output: `[False, False, True]`  
*Explanation: Prefixes are: 1 (1) → False, 10 (2) → False, 101 (5) → True.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force way is to, for each prefix, convert the binary digits to a decimal number and check if it is divisible by 5. This works but is inefficient, especially for longer prefixes, since converting the same prefix repeatedly is redundant and risks integer overflow with larger numbers.

A **better approach** is to build the prefix number iteratively:  
- Maintain a running integer, and for every new digit, update the number by shifting left (×2) and adding the new digit.
- Since we only care about divisibility by 5, we can use modulo 5 arithmetic at every step to prevent the number from becoming too large: `current = (current × 2 + num) % 5`
- If `current % 5 == 0`, that prefix is divisible by 5.

This method is efficient, clean, and optimal for this problem.

### Corner cases to consider  
- Array with only one element (``, `[1]`)
- All zeros (`[0,0,...]`) – every prefix should be `True`
- Numbers that remain not divisible by 5 throughout
- Large input arrays (make sure no overflow)
- Prefix number becomes zero after some non-zero numbers

### Solution

```python
def prefixesDivBy5(nums):
    result = []
    current = 0
    for num in nums:
        # Update current prefix number in modulo 5 space
        current = (current * 2 + num) % 5
        # Append True if divisible by 5, else False
        result.append(current == 0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  For each element, we do a constant-time operation; no nested loops.

- **Space Complexity:** O(n)  
  We create a result list of the same size as input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if, instead of 5, we want to check divisibility by another constant K?  
  *Hint: Replace 5 with K in the modulo computation.*

- How would you handle massive input if you could only output results streaming (one-by-one)?  
  *Hint: The algorithm already supports this, as each result depends solely on prior results and can be output immediately.*

- What if the input digits are characters in a string instead of a list of ints?  
  *Hint: Convert each character to int during iteration.*

### Summary
The problem uses an **iterative prefix and modulo pattern**: for each step, the prefix is updated in O(1) time, and we keep intermediate values small with `% 5`. This approach is common for problems involving divisibility checks over growing sequences ("prefix modular arithmetic"), and it can be generalized for divisibility by other numbers. The coding pattern is efficient and easy to apply to similar problems like "prefix sum is divisible by K" and real-time streaming checks.


### Flashcard
For each bit, update running value as curr = curr×2 + bit; check curr mod 5 for divisibility, append result.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Average Value of Even Numbers That Are Divisible by Three(average-value-of-even-numbers-that-are-divisible-by-three) (Easy)
- Find the Maximum Divisibility Score(find-the-maximum-divisibility-score) (Easy)