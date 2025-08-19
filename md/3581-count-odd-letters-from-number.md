### Leetcode 3581 (Easy): Count Odd Letters from Number [Practice](https://leetcode.com/problems/count-odd-letters-from-number)

### Description  
Given an integer `n`, convert it to its English lowercase representation (spell out its digits in English, e.g., "one two three"), then count how many different English letters in that full string appear an odd number of times.

For example:  
- For n = 11, the number in English is "one one". Concatenate all the letters (ignoring spaces) and count for each unique letter how many times it appears. Then, count how many of these appear an odd number of times.

### Examples  

**Example 1:**  
Input: `1`  
Output: `3`  
*Explanation: "one" → o, n, e  
Counts: o(1), n(1), e(1). All appear once (odd count). So answer is 3.*

**Example 2:**  
Input: `12`  
Output: `4`  
*Explanation: "onetwo" → o(2), n(1), e(1), t(1), w(1).  
o appears 2 times (even), all others (n, e, t, w) are odd. Answer is 4.*

**Example 3:**  
Input: `111`  
Output: `1`  
*Explanation: "oneoneone" → o(3), n(3), e(3).  
All are odd, so answer is 3.*

**Example 4:**  
Input: `10`  
Output: `4`  
*Explanation: "onezero"  
Letter counts: o(2), n(1), e(2), z(1), r(1). Odd: n, z, r. Answer is 3.*

### Thought Process (as if you’re the interviewee)  

- Start by converting the number to string and then splitting it into digits.
- Convert each digit to its English word ("zero", "one", ..., "nine").
- Concatenate all digit-words, remove spaces to get a single character string.
- Count occurrences of each letter.
- For each letter, check if it appears an odd number of times.
- Output how many unique letters appear an odd number of times.

**Brute-force is fine:** just loop over all steps.  
**Optimization:** Since the number of digits (0-9) is fixed, and English representation is small, there’s no real need for optimization. The algorithm is already optimal for all feasible constraints.

### Corner cases to consider  
- n = 0 (single digit)
- n contains repeated digits (like 11111 or 222)
- All digits are distinct (like 1234567890)
- Large n (check behavior for very long numbers)
- n includes only one letter-word (e.g., "zero")

### Solution

```python
def count_odd_letters_from_number(n):
    # English representation for digits 0-9
    digit_words = [
        "zero", "one", "two", "three", "four",
        "five", "six", "seven", "eight", "nine"
    ]
    
    # Step 1: Convert n to list of digits (as strings)
    digit_str = str(n)
    
    # Step 2: Map each digit to its word, concatenate all
    letters = []
    for ch in digit_str:
        digit = int(ch)
        letters.extend(digit_words[digit])
    
    # Step 3: Count each letter
    from collections import Counter
    letter_counts = Counter(letters)
    
    # Step 4: Count how many unique letters appear an odd number of times
    odd_count = 0
    for cnt in letter_counts.values():
        if cnt % 2 == 1:
            odd_count += 1
    return odd_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L), where L is the number of letters in the full English representation of n. Each digit adds at most 5 (for "three") letters.
- **Space Complexity:** O(1) extra, since only up to 26 letters possible (constant), but total string may be O(L).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we extended to capital letters or mixed case?
  *Hint: Watch letter casing when counting.*

- Can you do it without extra space?
  *Hint: Can simulate the count in place if needed, but with 26 letters, space isn't an issue.*

- What if the number is very large (e.g., input as a string)?
  *Hint: Process digit by digit, as above, supports long input.*

### Summary
This problem is a direct application of mapping digits to words, grouping and counting letters, and then aggregating based on parity. It follows a classic map/count/filter pattern — common in string counting, anagram, or histogram frequency questions. This pattern appears across problems involving counting unique objects with certain properties (e.g., letters with odd/even counts).

### Tags
Hash Table(#hash-table), String(#string), Simulation(#simulation), Counting(#counting)

### Similar Problems
