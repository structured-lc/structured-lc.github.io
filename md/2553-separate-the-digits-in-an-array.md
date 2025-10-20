### Leetcode 2553 (Easy): Separate the Digits in an Array [Practice](https://leetcode.com/problems/separate-the-digits-in-an-array)

### Description  
Given an array of positive integers `nums`, return a new array containing all the individual digits of each integer in `nums`, in the exact order they occur.   
For example, if `nums = [10921, 324]`, the returned array should be `[1,0,9,2,1,3,2,4]`.  
Effectively, we "separate" the digits of each integer and concatenate them into one list, maintaining the original sequence.

### Examples  

**Example 1:**  
Input: `nums = [13,25,83,77]`  
Output: `[1,3,2,5,8,3,7,7]`  
*Explanation: 13 → [1,3], 25 → [2,5], 83 → [8,3], 77 → [7,7]. Concatenate in order: [1,3,2,5,8,3,7,7].*

**Example 2:**  
Input: `nums = [7,1,0,123]`  
Output: `[7,1,0,1,2,3]`  
*Explanation: 7 → , 1 → [1], 0 → , 123 → [1,2,3]. Final list: [7,1,0,1,2,3].*

**Example 3:**  
Input: `nums = [10921]`  
Output: `[1,0,9,2,1]`  
*Explanation: 10921 → [1,0,9,2,1]. Only one number, digits are listed in order.*

### Thought Process (as if you’re the interviewee)  
To solve this, I first notice that for each integer in the list, I need to extract its digits and append each one, in order, to an output list.  

The brute-force approach:
- For each number, repeatedly take the modulus by 10 (`num % 10`) and divide by 10 (integer division) to extract the digits, but this gives digits in reverse order. So I'd need to store each number's digits temporarily and reverse before adding to result.  

A simpler approach:
- Turn each number into a string, then iterate through each character, convert back to int, and append to the result. This preserves digit order natively, and the string conversion is efficient for positive integers.  

Both methods have similar time and space complexity, but the string method is simpler and less error-prone in most languages, particularly Python.

Chose approach: **Convert each integer to a string and process each character (digit) in order, adding its integer value to the result.**

### Corner cases to consider  
- Input list is empty (`[]`)
- Numbers with only one digit
- Numbers with leading zeros (invalid for positive integers, but `0` must be handled)
- All zeros in the input, e.g. [0, 0, 0]
- Large numbers with many digits
- No negative numbers since the input restricts to positive integers

### Solution

```python
def separateDigits(nums):
    # Initialize empty result list
    result = []
    # Iterate through each number in nums
    for num in nums:
        # Convert the current number to string
        for c in str(num):
            # Convert each character (digit) back to integer and append
            result.append(int(c))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of digits across all numbers in the input array.  
  - We visit each digit exactly once.
- **Space Complexity:** O(N), where N is the total number of digits across all numbers in the input array.  
  - The output array stores every digit found; no extra space aside from standard temporary variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array contains negative integers?  
  *Hint: How should you handle the '-' sign — ignore, keep, or treat as an error?*

- How would you do it without converting integers to strings?  
  *Hint: Try using division and modulus to extract digits, but be careful with digit order.*

- Can you solve this if the input list is extremely large and you have memory constraints?  
  *Hint: Consider streaming output or processing batches.*

### Summary
This is a classic array and digit manipulation problem using simple iteration and type conversion. The use of string conversion to access digits in order is both expressive and efficient in high-level languages.  
This extraction pattern — breaking down numbers into their digits and reassembling or processing them — is common in problems like integer palindrome, digit sum, and digit product calculations.


### Flashcard
For each number, convert to string, split into digits, and append to result—no need for modulus or reversal.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- Count Integers With Even Digit Sum(count-integers-with-even-digit-sum) (Easy)
- Alternating Digit Sum(alternating-digit-sum) (Easy)