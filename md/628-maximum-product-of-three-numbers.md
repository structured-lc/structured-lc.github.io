### Leetcode 628 (Easy): Maximum Product of Three Numbers [Practice](https://leetcode.com/problems/maximum-product-of-three-numbers)

### Description  
You’re given an integer array `nums`. Your task is to find three numbers in the array whose product is the largest possible, and return that maximum product.  
For example, if `nums = [1, 2, 3, 4]`, you need to choose three numbers (could be negative or positive) so that their product is as large as possible.

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `6`  
*Explanation: 1 × 2 × 3 = 6 is the largest product possible from these three numbers.*

**Example 2:**  
Input: `[1,2,3,4]`  
Output: `24`  
*Explanation: The largest product is 2 × 3 × 4 = 24.*

**Example 3:**  
Input: `[-10,-10,1,3,2]`  
Output: `300`  
*Explanation: The two smallest numbers are negatives, so (-10) × (-10) × 3 = 100 × 3 = 300 is larger than 1 × 2 × 3 = 6.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force way would be to try all possible combinations of three numbers and compute their product, keeping the highest found. That’s O(n³), which is too slow.

A key insight is:
- The maximum product can come from either the three largest numbers in the array,
- **Or** from the two smallest numbers (most negative) and the largest positive number (two negatives make a positive when multiplied).
So, if we can find the three largest and two smallest numbers in one linear scan, we can compare `max₁ × max₂ × max₃` vs `min₁ × min₂ × max₁` (where max₁ is the largest number, max₂ the second largest, etc.; min₁ is the smallest, min₂ second smallest).

This can be done in a single O(n) pass, so it’s efficient in both time and space.

### Corner cases to consider  
- Array contains all negative numbers (maximum may come from the three largest negative numbers)
- Array contains both large negative and positive numbers (might need to use two negatives and one largest positive)
- Array all positive numbers
- Array contains zeros (e.g., two negatives and a zero would be worse than three positives)
- Duplicates in array
- Array size exactly 3 (only one possible product)
- Very large or very small values (avoid overflow, but Python handles integers well)

### Solution

```python
def maximumProduct(nums):
    # Initialize maximums and minimums.
    max₁ = max₂ = max₃ = float('-inf')
    min₁ = min₂ = float('inf')
    
    for num in nums:
        # Update max₁, max₂, max₃ (largest, 2nd largest, 3rd largest)
        if num > max₁:
            max₃ = max₂
            max₂ = max₁
            max₁ = num
        elif num > max₂:
            max₃ = max₂
            max₂ = num
        elif num > max₃:
            max₃ = num
        
        # Update min₁, min₂ (smallest, 2nd smallest)
        if num < min₁:
            min₂ = min₁
            min₁ = num
        elif num < min₂:
            min₂ = num
    
    # Maximum product is either three biggest,
    # or two smallest (could be negative) times the largest.
    prod₁ = max₁ * max₂ * max₃
    prod₂ = min₁ * min₂ * max₁
    return max(prod₁, prod₂)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Just a single pass through the array is needed.
- **Space Complexity:** O(1). Only a fixed number of variables used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the actual triplet, not just the product?  
  *Hint: Track the indices or keep the variables as tuples.*

- Can this be generalized to return the maximum product of k numbers?  
  *Hint: Consider using heaps or maintaining k largest/smallest numbers.*

- Can you handle the case where array length < 3 gracefully, or do you need to add error handling?  
  *Hint: Usually, constraints say length ≥ 3, but always check for robustness in production code.*

### Summary
The core idea is to recognize that the **maximum product of three numbers** comes either from the three largest numbers or from two smallest (possibly negative) numbers with the largest positive.  
This uses the classic “single scan, track extrema” coding pattern, which is very common for “find top k” problems. This approach also appears in interview contexts whenever you’re asked about subarray or subset optimization with little extra storage.


### Flashcard
Maximum product is max of (three largest numbers) or (two smallest × largest); find these in one pass or by sorting.

### Tags
Array(#array), Math(#math), Sorting(#sorting)

### Similar Problems
- Maximum Product Subarray(maximum-product-subarray) (Medium)
- Maximum Product of Three Elements After One Replacement(maximum-product-of-three-elements-after-one-replacement) (Medium)