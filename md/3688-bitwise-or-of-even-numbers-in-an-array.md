### Leetcode 3688 (Easy): Bitwise OR of Even Numbers in an Array [Practice](https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array)

### Description  
Given an integer array **nums**, return the bitwise OR of all even numbers in the array. If there are no even numbers, return 0.  
In other words, you need to combine all the even numbers in the array using the bitwise OR operator and output the result.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4]`  
Output: `6`  
Explanation: Even numbers are 2 and 4. Bitwise OR → 2 | 4 = 6.

**Example 2:**  
Input: `nums = [1, 3, 5]`  
Output: `0`  
Explanation: There are no even numbers, so output is 0.

**Example 3:**  
Input: `nums = [8, 6, 7, 5, 4, 2]`  
Output: `14`  
Explanation: Even numbers are 8, 6, 4, 2.  
Step by step:  
8 | 6 = 14  
14 | 4 = 14  
14 | 2 = 14

### Thought Process (as if you’re the interviewee)  
- Initially, I would look for all even numbers in the list. An even number can be checked with `num % 2 == 0` or `(num & 1) == 0`.
- Once I collect the even numbers, I can run a running bitwise OR operation over them.
- If no even numbers are found, I simply return 0.
- We don’t need extra space, just a running result (initialized to 0 since OR’ing with 0 has no effect).
- Since the problem is straightforward (processing each element once), no further optimization beyond a single pass is needed.

### Corner cases to consider  
- Input array is empty (should return 0)
- No even numbers in the array (should return 0)
- All numbers are even
- All numbers are odd
- Array has only one element (even or odd)
- Array contains negative even numbers

### Solution

```python
def bitwiseOrEvenNumbers(nums):
    # Initialize result to 0 (since OR with 0 is identity)
    result = 0
    found_even = False  # Track if we've found any even number

    for num in nums:
        # Check if the number is even using bitwise AND
        if num & 1 == 0:
            result |= num
            found_even = True

    # If no even number was found, return 0
    return result if found_even else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the array. Each element is checked once.
- **Space Complexity:** O(1), no extra space used regardless of input size, only a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large and cannot fit in memory?
  *Hint: Can we process the numbers as a stream?*
- What if each number is extremely large (e.g., in the order of 1e18)?
  *Hint: The current approach still works, since bitwise operations are on individual items.*
- How would you solve this if you needed to find the bitwise AND rather than OR of all even numbers?
  *Hint: Be careful with initialization value.*

### Summary
This problem is an example of an "accumulation" coding pattern, where we traverse a list and aggregate a result by combining each element that meets a certain criteria.  
The even-number check using `num & 1` is a common trick for efficiency.  
This approach has broad applications in problems that require calculating any associative operation (like sum, product, bitwise AND/OR) on filtered elements of an array.


### Flashcard
Information not available in search results.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Simulation(#simulation)

### Similar Problems
