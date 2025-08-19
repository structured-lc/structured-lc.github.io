### Leetcode 2535 (Easy): Difference Between Element Sum and Digit Sum of an Array [Practice](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array)

### Description  
Given a list of positive integers called nums, compute:
- The **element sum**: sum of all elements in nums.
- The **digit sum**: sum of all digits of every number in nums (i.e., for 15 it’s 1 + 5).
Return the absolute difference between these two sums.

### Examples  

**Example 1:**  
Input: `nums = [1,15,6,3]`  
Output: `9`  
*Explanation: Element sum = 1 + 15 + 6 + 3 = 25.  
Digit sum = 1 + 1 + 5 + 6 + 3 = 16.  
Output = |25 - 16| = 9.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `0`  
*Explanation: Element sum = 1 + 2 + 3 + 4 = 10.  
Digit sum = 1 + 2 + 3 + 4 = 10.  
Output = |10 - 10| = 0.*

**Example 3:**  
Input: `nums = [101,100,99]`  
Output: `182`  
*Explanation: Element sum = 101 + 100 + 99 = 300.  
Digit sum = 1+0+1 + 1+0+0 + 9+9 = 1+0+1+1+0+0+9+9 = 21.  
Output = |300 - 21| = 279.*

### Thought Process (as if you’re the interviewee)  
- To find the **element sum**, simply iterate through nums and add all values.
- For the **digit sum**, for each number, extract its digits (using modulo and integer division) and sum them.
- The absolute difference can then be found with `abs(element_sum - digit_sum)`.
- No need for complex data structures, as the array length and element values are small (≤ 2000).
- This is most efficient as a single pass: accumulate both sums as you visit each integer.
- Trade-off: No further optimization is necessary, as time and space are both efficient.

### Corner cases to consider  
- Empty input? (Problem constraint: nums always has at least 1 element.)
- All numbers single-digit (element sum and digit sum will be equal).
- All numbers multi-digit and all the same value.
- Numbers with internal zeros (like 1005).

### Solution

```python
def differenceOfSum(nums):
    element_sum = 0     # Sum of elements
    digit_sum = 0       # Sum of all digits

    for num in nums:
        element_sum += num           # Add current number to element sum

        current = num
        while current > 0:
            digit_sum += current % 10    # Add last digit
            current //= 10               # Remove last digit

    return abs(element_sum - digit_sum)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d)  
  Where n is the number of elements, and d is the maximum number of digits in an element (since we process every digit of every number). For constraints (max 2000 numbers, each ≤ 2000), this is very efficient.
- **Space Complexity:** O(1)  
  Only fixed extra variables are used; no additional space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums can include zero or negative numbers?  
  *Hint: How should digit sum be computed for negative or zero values?*

- How would you solve this if each number is extremely large (represented as strings)?  
  *Hint: Can't rely on normal int arithmetic, must parse digits directly as characters.*

- Could you do both sums in a single loop, or is a double pass necessary?  
  *Hint: Can you process both sums as you see each number?*

### Summary
This problem is a classic “digit sum” simulation, often used as an exercise in math and number manipulation. The coding pattern is simple iteration, digit extraction using `%` and integer division, and accumulating the results. This approach is also seen in problems involving digit root, checksum, or manipulating the representation of numbers.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Add Digits(add-digits) (Easy)
- Minimum Sum of Four Digit Number After Splitting Digits(minimum-sum-of-four-digit-number-after-splitting-digits) (Easy)