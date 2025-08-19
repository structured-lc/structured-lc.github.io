### Leetcode 2495 (Medium): Number of Subarrays Having Even Product [Practice](https://leetcode.com/problems/number-of-subarrays-having-even-product)

### Description  
Given an integer array nums (0-indexed), return the **number of contiguous subarrays whose product is even**.  
A subarray is a contiguous part of the array. The product of a subarray is the result of multiplying all its elements. A single element subarray also counts if its value is even.

The key insight: the product of a subarray is even **if and only if it includes at least one even number**. We must count all subarrays containing at least one even element.

### Examples  

**Example 1:**  
Input: `nums = [9, 6, 7, 13]`  
Output: `6`  
*Explanation:  
The subarrays with an even product are:
- nums[0..1] = 9 × 6 = 54  
- nums[0..2] = 9 × 6 × 7 = 378  
- nums[0..3] = 9 × 6 × 7 × 13 = 4914  
- nums[1..1] = 6  
- nums[1..2] = 6 × 7 = 42  
- nums[1..3] = 6 × 7 × 13 = 546*

**Example 2:**  
Input: `nums = [7, 3, 5]`  
Output: `0`  
*Explanation:  
There are no subarrays with an even product, because all numbers are odd (odd × odd... = odd).*

**Example 3:**  
Input: `nums = [2, 2, 2]`  
Output: `6`  
*Explanation:  
All subarrays ([2], [2,2], [2,2,2], etc.) have products that are even as every element is even.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force Approach:**  
  - Generate every possible subarray (O(n²)), compute the product, check if it’s even.  
  - For n up to 10⁵, this is far too slow.

- **Optimization:**  
  - Observe: the product is even **iff at least one number is even** (since even × anything = even).
  - So, count all subarrays that contain at least one even number.
  - Easier: count total subarrays, then subtract the number of subarrays made **only** of odd numbers.
      - Total subarrays = n × (n + 1) / 2
      - Count all subarrays of consecutive odd numbers (for every maximal sequence of odd numbers, count subarrays within them).
      - The answer = total subarrays - total odd-only subarrays.

- **Final (Best) Approach:**  
  - **OR**, accumulate as you go:
    - For each index i:
      - If nums[i] is even, then **all subarrays ending at i** have an even product (each starts at position 0..i).
      - Track the last index where we saw an even number.
      - For each i, number of subarrays ending at i with even product = last_even_index + 1 (if nums[i] is even, update last_even_index).

### Corner cases to consider  
- All numbers are odd (should return 0).
- All numbers are even (should return n × (n + 1) / 2).
- Single element (even/odd).
- Arrays with alternating even and odd numbers.
- Empty array (return 0).
- Long runs of odds or evens.

### Solution

```python
def numOfSubarraysEvenProduct(nums):
    n = len(nums)
    ans = 0           # total count of subarrays with even product
    last_even = -1    # last index where we saw an even number

    for i in range(n):
        if nums[i] % 2 == 0:
            last_even = i
        # For every position, subarrays ending at i with even product:
        # all starting from position 0..last_even
        ans += last_even + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each number is processed once.
- **Space Complexity:** O(1). Only a few variables used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the actual subarrays, not just the count?  
  *Hint: Think about storing the start and end indices when you detect inclusion of an even number.*

- How would the answer change if you had to count subarrays with product divisible by k (for arbitrary k)?  
  *Hint: Generalize even/odd reasoning to k-divisibility, how can you efficiently track the latest divisible index?*

- Could you solve this efficiently if the array changes dynamically (i.e., with updates/queries)?  
  *Hint: Range queries/updating data structures like segment trees.*

### Summary
This problem leverages a **counting by exclusion** strategy—the key insight that a subarray has even product iff it contains at least one even.  
The approach avoids brute force product calculation by translating the problem to: count all subarrays, subtract those with all odds.  
This is a classic example of using **prefix scans and position tracking**—a widespread pattern for array problems involving subarrays with some property, e.g., "at least one occurrence", "no occurrence", etc. It demonstrates a reduction from candidate generation to combinatorial counting.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
