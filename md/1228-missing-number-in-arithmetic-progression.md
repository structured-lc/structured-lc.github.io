### Leetcode 1228 (Easy): Missing Number In Arithmetic Progression [Practice](https://leetcode.com/problems/missing-number-in-arithmetic-progression)

### Description  
Given an array where the numbers originally formed an **arithmetic progression** (AP) but one number (not the first or last) has been removed, find and return the missing value. An arithmetic progression is a sequence where the difference between any two consecutive elements is constant. The input guarantees that there is exactly one value missing and the remaining numbers retain the AP property except at the missing location.

### Examples  

**Example 1:**  
Input: `[5, 7, 11, 13]`  
Output: `9`  
*Explanation: The original AP was [5, 7, 9, 11, 13] (difference = 2), and 9 is missing.*

**Example 2:**  
Input: `[15, 13, 12]`  
Output: `14`  
*Explanation: The original AP was [15, 14, 13, 12] (difference = -1), and 14 is missing.*

**Example 3:**  
Input: `[1, 4, 7, 13, 16]`  
Output: `10`  
*Explanation: The original sequence should be [1, 4, 7, 10, 13, 16] (difference = 3), so 10 is missing.*

### Thought Process (as if you’re the interviewee)  

First, I want to identify the **common difference** of the AP. Usually, we can take the minimum of consecutive differences, but since one number is missing, one of the differences will be larger, so the minimum of the first two or last two differences is usually correct.  
There are two main approaches:

- **Sum formula:** The sum formula for AP is `sum = (first + last) × (n + 1) / 2` (where n+1 is total terms including the missing one). Subtract the actual sum of the input from this to get the missing number.  
- **Binary Search:** Find the point where the difference jumps by twice the common difference: scan through the input, and return the value that should have been at that break.  

The **sum approach** is simpler, easily implemented in one pass, and is very readable. The binary search approach is more optimal if the list is very large or input is sorted (as in Leetcode constraints).

I'll use the sum method for clarity, but can mention binary search as optimal for interview discussion.

### Corner cases to consider  
- All elements are equal (difference = 0)
- The array length is very small (e.g., only 2 elements)
- The missing number is large or negative
- Negative or decreasing progressions

### Solution

```python
def missingNumber(arr):
    n = len(arr) + 1  # original length, including missing
    total_sum = (arr[0] + arr[-1]) * n // 2  # AP sum formula
    actual_sum = sum(arr)
    return total_sum - actual_sum  # missing value
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of items in the array (due to sum computation).
- **Space Complexity:** O(1). Only a few variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if the input array were extremely large and you couldn't store/iterate through all elements?
  *Hint: Can you process APs in chunks or using streams?*

- Could you find the missing value without using sum, by checking pairwise differences?
  *Hint: What if you use binary search to locate the mismatch in the AP properties?*

- What would you do if more than one value was missing?
  *Hint: How do you generalize the approach?*

### Summary
This problem utilizes the **arithmetic progression formula** and the idea that the sum of a full AP minus the current sum yields the missing value. It fits the pattern of leveraging sequence properties—similar approaches work for missing numbers in sequences (like Leetcode's "Missing Number" problem). Binary search optimizations are possible, especially if the array is sorted and very large. The key takeaway: when a structure is linear and regular, aggregate properties (like sum or constant difference) can help quickly reveal anomalies.