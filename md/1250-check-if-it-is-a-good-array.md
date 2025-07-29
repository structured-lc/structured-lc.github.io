### Leetcode 1250 (Hard): Check If It Is a Good Array [Practice](https://leetcode.com/problems/check-if-it-is-a-good-array)

### Description  
Given an array of positive integers `nums`, check if there exist integer coefficients (possibly negative, possibly zero), one for each element in `nums`, such that their linear combination equals 1. In other words, does there exist integers `x₀, x₁, ..., xₙ₋₁` so that:  
nums × x₀ + nums[1] × x₁ + ... + nums[n-1] × xₙ₋₁ = 1?

If so, return True (the array is a 'good' array), otherwise return False.

### Examples  
**Example 1:**  
Input: `nums = [12,5,7,23]`  
Output: `True`  
*Explanation: We can obtain 1 because 12 × (-1) + 23 × 1 = 11, and 11 - 7 × 1 + 5 × 1 = 1 (or via Bézout's Lemma, since gcd(12,5,7,23) = 1).*   

**Example 2:**  
Input: `nums = [29,6,10]`  
Output: `True`  
*Explanation: gcd(29,6,10) = 1 so we can get 1.*  

**Example 3:**  
Input: `nums = [3,6]`  
Output: `False`  
*Explanation: The only integers you can form as their combination are multiples of 3; so can't get 1 (gcd is 3).*  


### Thought Process (as if you’re the interviewee)  
This is a number theory problem, and it is asking whether it's possible to write 1 as an integer linear combination of the numbers in `nums`. Bézout's Lemma tells us that this is possible if and only if their greatest common divisor (gcd) is 1. So, if `gcd(nums, nums[1], ..., nums[n-1]) == 1`, the answer is True; otherwise, it's False.

Iteratively, calculate the gcd of all elements and check if the final result is 1.


### Corner cases to consider  
- nums contains only one number
- nums contains duplicate values
- nums contains 1 (then always True)


### Solution

```python
import math

def isGoodArray(nums):
    curr_gcd = nums[0]
    for num in nums[1:]:
        curr_gcd = math.gcd(curr_gcd, num)
    return curr_gcd == 1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × log(max(nums))). GCD of two numbers is log(max) using Euclidean algorithm. Traverse each element once.
- **Space Complexity:** O(1), just a few integers for gcd and iteration variables.


### Potential follow-up questions (as if you’re the interviewer)  
- How would you extend this if the array could include zeros?  
  *Hint: Consider zero doesn't affect gcd unless all are zero.*

- What if you needed to enumerate the coefficients that actually produce 1?  
  *Hint: Extended Euclidean algorithm, or successive substitutions.*

- What if the required sum was k instead of 1?  
  *Hint: Check if gcd divides k.*

### Summary
This is a direct application of greatest common divisor properties and Bézout's Lemma from number theory. The approach is classic and common in mathematical and coding challenges related to Diophantine equations.