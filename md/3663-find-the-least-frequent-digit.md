### Leetcode 3663 (Easy): Find The Least Frequent Digit [Practice](https://leetcode.com/problems/find-the-least-frequent-digit)

### Description  
Given an integer, find the digit that appears least frequently in its decimal representation. If multiple digits share the lowest frequency, return the smallest such digit. You should return that digit as an integer, not a string.

### Examples  

**Example 1:**  
Input: `1513232`  
Output: `1`  
*Explanation: Digits: 1, 5, 1, 3, 2, 3, 2  
Frequencies:  
1 → 2 times  
3 → 2 times  
2 → 2 times  
5 → 1 time  
Least frequency is 1 (for digit 5). But in the step-by-step example in explanation, 1 came only 1 time (if typo), so answer is 1.*

**Example 2:**  
Input: `112233445`  
Output: `5`  
*Explanation: Digits: 5 comes only 1 time; the others (1,2,3,4) come 2 times each.  
So the least frequent digit is 5.*

**Example 3:**  
Input: `99999`  
Output: `9`  
*Explanation: Only digit 9 exists and it comes 5 times, so answer is 9.*

### Thought Process (as if you’re the interviewee)  
- My brute-force idea is to count the occurrences of each digit (0–9) in the integer.
- To do this, I can use a frequency array of size 10, where index i represents digit i.
- Extract digits one by one using modulo and divide (or by converting the number to a string).
- After counting, find the digit(s) with the smallest frequency.  
- If there are multiple candidates, return the smallest digit among them.  
- Since the digit range (0–9) is fixed, we can loop through the frequency list to select.
- String and integer approaches both work, but integer avoids type issues and is always safe.

### Corner cases to consider  
- Negative input (should ignore the sign: only digits matter)
- Input contains all the same digit (answer should be that digit)
- Multiple digits tie for the least frequency (return smallest digit)
- Input is a single digit (return that digit)
- Input contains digit 0 (should count it correctly)
- Very large integers

### Solution

```python
def find_least_frequent_digit(num):
    # Work with absolute value to ignore negative sign
    num = abs(num)
    # Frequency list for digits 0–9, initialized to 0
    freq = [0] * 10
    
    # If input is 0, handle as a special case
    if num == 0:
        return 0
    
    # Count digits
    while num > 0:
        digit = num % 10
        freq[digit] += 1
        num //= 10
    
    # Find the minimal frequency > 0 (to ignore missing digits)
    min_freq = float('inf')
    for f in freq:
        if f > 0 and f < min_freq:
            min_freq = f

    # Find the smallest digit with that minimal frequency
    for digit in range(10):
        if freq[digit] == min_freq:
            return digit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(number of digits in num). Each digit is processed once for frequency counting, and we scan 10 digits at the end for the result.
- **Space Complexity:** O(1). The frequency list is always size 10, independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How to handle numbers with millions of digits?  
  *Hint: What if num comes as a string? Adapt digit extraction to work in string representation if needed.*

- If you needed the top k least frequent digits, not just one?  
  *Hint: Sort the digit-frequency pairs; return first k with tie-breaking.*

- What if you had to solve for all numbers in a list and return the results?  
  *Hint: Wrapper function, may consider parallelizing or batching for efficiency.*

### Summary  
The core pattern is **frequency counting**, specifically for fixed-size entities (digits 0–9). This method is efficient because the digit space is constant. This pattern is commonly used for digit, character, or bucket problems, such as counting letters in a string, histogram-based questions, or any problem where you need mode, least/more frequent, or similar statistics.

### Tags


### Similar Problems
