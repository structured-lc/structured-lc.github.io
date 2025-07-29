### Leetcode 268 (Easy): Missing Number [Practice](https://leetcode.com/problems/missing-number)

### Description  
Given an array `nums` containing **n** distinct numbers from the range 0 to n, find the one number from that range that is missing in the array. The array will always contain n numbers, making it clear that one number in the range is absent. Your goal is to return the missing number, using an efficient algorithm—ideally O(n) time and O(1) extra space.

### Examples  

**Example 1:**  
Input: `[3, 0, 1]`  
Output: `2`  
*Explanation: The numbers in the range 0 to 3 are [0,1,2,3]. Only 2 is missing from the input array, so the output is 2.*

**Example 2:**  
Input: `[0, 1]`  
Output: `2`  
*Explanation: The range is [0,1,2]. The missing number is 2.*

**Example 3:**  
Input: `[9,6,4,2,3,5,7,0,1]`  
Output: `8`  
*Explanation: The numbers in the range 0 to 9 are [0,1,2,3,4,5,6,7,8,9]. The number 8 is missing.*

### Thought Process (as if you’re the interviewee)  

Let's brainstorm solutions:

- **Brute-force:**  
  For each number from 0 to n, check if it exists in `nums`. If not, return it.  
  But this takes O(n²) time since searching in a list is O(n) per lookup.

- **Sorting:**  
  Sort the array, then check each index for mismatches.  
  This takes O(n log n) due to sorting—not optimal since it can be solved in linear time.

- **Mathematical Sum (Optimal):**  
  The sum of 0 to n is total = n × (n+1) / 2.  
  Subtract the sum of `nums` from total—missing = total - sum(nums).  
  Time: O(n), Space: O(1). Very simple, no library functions necessary—just a running sum.

- **XOR approach (Optimal Alternate):**  
  For every number in 0 to n, XOR it with every number in `nums`.  
  All matching numbers cancel each other out; the leftover is the missing number.  
  This works because a ⊕ a = 0 and 0 ⊕ b = b.  
  Time: O(n), Space: O(1).

The **sum method** is usually the easiest to code and very intuitive.

### Corner cases to consider  
- Array with a single element, e.g., `` → missing is `1`  
- Array missing `0`, e.g., `[1,2,3]`  
- Array missing `n`, e.g., `[0,1,2]`  
- Array is empty, e.g., `[]` (should output `0`)  
- Numbers in random order, not sorted  
- All elements present (not possible as per constraints, but good to note)

### Solution

```python
def missingNumber(nums):
    """
    Given an array nums containing n distinct numbers taken from 0, 1, 2, ..., n,
    return the one that is missing from the array.
    """
    n = len(nums)
    total = n * (n + 1) // 2   # Gauss' formula for the sum of 0 + 1 + ... + n
    actual_sum = 0
    
    # Compute sum of nums
    for num in nums:
        actual_sum += num

    # The missing number is the difference between expected and actual sum
    return total - actual_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We traverse the list once to calculate the sum (no sort or nested loop).
- **Space Complexity:** O(1) — Only a few extra integer variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains negative numbers or out-of-range numbers?  
  *Hint: Validate inputs are in [0, n], or specify behavior on invalid input.*

- Could you solve it without modifying the input array and without extra space?  
  *Hint: Both the sum and XOR methods naturally avoid extra space and don't need to modify input.*

- Can you find the missing number if two numbers are missing instead of one?  
  *Hint: You could use sum and sum-of-squares, or set techniques for multiple missing numbers.*

### Summary  
This problem uses the **Math Summation** or **Bit Manipulation XOR** patterns, both allowing O(n) time and O(1) space algorithms. This "missing element by comparison to a completed set" pattern is common in array, cyclic, and checksum problems, and can be applied to related issues like finding duplicates or multiple missing numbers.