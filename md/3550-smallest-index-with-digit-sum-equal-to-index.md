### Leetcode 3550 (Easy): Smallest Index With Digit Sum Equal to Index [Practice](https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index)

### Description  
Given an integer array **nums**, return the smallest index **i** such that the sum of the digits of **nums[i]** is equal to **i**. If no such index exists, return **-1**.

You need to iterate through the array and, for each element, compute the digit sum; as soon as the digit sum matches the index, immediately return the index. If the scan finishes with no matching index, return -1.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2]`  
Output: `2`  
*Explanation: For index 0 the digit sum is 1 (≠0). For index 1, digit sum is 3 (≠1). For index 2, digit sum is 2 (==2). So, output is 2.*

**Example 2:**  
Input: `nums = [5,10,12]`  
Output: `1`  
*Explanation: For index 0, digit sum = 5 (≠0). For index 1, digit sum = 1+0=1 (==1), so output is 1 (do not check further indices).*

**Example 3:**  
Input: `nums = [7,8,9]`  
Output: `-1`  
*Explanation: For index 0, digit sum = 7; for index 1, it's 8; for index 2, it's 9 — none match their indices. So, output is -1.*

### Thought Process (as if you’re the interviewee)  
First, the problem asks for the smallest index `i` such that the sum of digits of `nums[i]` equals `i`. The brute-force way is to:
- Loop through the array.
- For each element, compute the sum of its digits.
- Compare the result to the current index.
- Return the first matching index.

This brute-force works because the input size is not specified as being huge, digit sum is fast (\~O(1) per number), and we’re asked for the *first* matching index.

There’s little to optimize; digit sum is inherently fast (whether via integer division/modulo or converting to `str` and summing). Just ensure the implementation is clear and easy to follow. No sorting/extra data structures are needed.

If there are no matching indices, return -1.

### Corner cases to consider  
- Array has only one element.
- All digit sums are higher or lower than any index.
- Multiple matching indices (return the smallest).
- Negative numbers (depending on constraints: if negatives are allowed, digit sum should ignore sign).
- Large numbers (check sum still efficient).
- Array contains zero.

### Solution

```python
def smallest_index_with_digit_sum_equal_to_index(nums):
    # Iterate over each index and corresponding element
    for i, num in enumerate(nums):
        # Calculate digit sum by summing absolute value digits
        digit_sum = sum(int(d) for d in str(abs(num)))
        # Compare the digit sum to current index
        if digit_sum == i:
            return i  # Return the smallest index immediately
    # If no index found, return -1
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d), where n = len(nums), d = max digit count of any number. For typical numbers, d is at most 10 (since numbers are ≤ 10⁹), so this is effectively O(n).
- **Space Complexity:** O(1) extra space, as we're only using fixed extra variables (digit sum, index), not dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums contains negative numbers?  
  *Hint: Check how you compute the digit sum; ignore the sign, use abs(num).*

- How would you write the digit sum function without converting to string?  
  *Hint: Base-10 modulo/division while num > 0.*

- Can this be solved in less than O(n)?  
  *Hint: Since you must check each element, it cannot get better than O(n) for this problem.*

### Summary
This problem is a classic *single pass / scan for first matching* pattern and a simple exercise in *digit processing*. The digit sum is a standard utility function you may encounter in problems involving number properties or base manipulation. Similar approaches are common in interview questions that require *linear search with a custom property* or *stat-based filtering on array elements*.

### Tags
Array(#array), Math(#math)

### Similar Problems
