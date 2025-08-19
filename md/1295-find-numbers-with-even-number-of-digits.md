### Leetcode 1295 (Easy): Find Numbers with Even Number of Digits [Practice](https://leetcode.com/problems/find-numbers-with-even-number-of-digits)

### Description  
Given an array of integers `nums`, return the count of how many numbers in the array contain an **even number of digits**.

### Examples  
**Example 1:**  
Input: `nums = [12,345,2,6,7896]`  
Output: `2`  
*Explanation: 12 (2 digits) and 7896 (4 digits) have even digit counts.*

**Example 2:**  
Input: `nums = [555,901,482,1771]`  
Output: `1`  
*Explanation: Only 1771 (4 digits) has even number of digits.*

**Example 3:**  
Input: `nums = [1,22,333,4444,55555]`  
Output: `2`  
*Explanation: 22 and 4444 have even digit counts (2 and 4).* 

### Thought Process (as if you’re the interviewee)  
Imagine checking every number in the array, converting to string (or dividing by 10 until 0) to count digits. For each, check if the number of digits is even. This is direct, easy to implement, and efficient since number sizes are small (up to 100,000 elements, numbers ≤ 10⁵).

### Corner cases to consider  
- Single-digit numbers
- Zero (should count as one digit)
- Negative numbers (input guarantees only non-negative)

### Solution

```python
def findNumbers(nums):
    even_count = 0
    for num in nums:
        if len(str(num)) % 2 == 0:
            even_count += 1
    return even_count
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), where N is the length of the array, as we process each number once.
- **Space Complexity:** O(1), only a counter used.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the numbers are large and you must not convert to string?  
  *Hint: Use division by 10 and count the number of divisions until zero.*

- Can you do this with functional programming or Python list comprehensions?  
  *Hint: Try sum(1 for x in nums if len(str(x)) % 2 == 0).* 

- How would you handle negative numbers or zero?  
  *Hint: Take absolute value before counting digits; zero should be one digit.*

### Summary
This is a straightforward **counting/digit property** problem, with the core pattern being evaluating an array and accumulating a property using a simple loop or comprehension. Such digit-counting logic is also found in digit sum/parity/divisibility problems.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Finding 3-Digit Even Numbers(finding-3-digit-even-numbers) (Easy)
- Number of Even and Odd Bits(number-of-even-and-odd-bits) (Easy)
- Find if Digit Game Can Be Won(find-if-digit-game-can-be-won) (Easy)