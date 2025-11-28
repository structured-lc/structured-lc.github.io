### Leetcode 3732 (Medium): Maximum Product of Three Elements After One Replacement [Practice](https://leetcode.com/problems/maximum-product-of-three-elements-after-one-replacement)

### Description
You're given an array of integers and a range [x, y]. You must replace exactly one element in the array with any value within that range. After the replacement, find the maximum product of any three distinct elements from the modified array.

The key insight is that to maximize a product of three numbers, you want either:
- Three large positive numbers
- Two large negative numbers (since their product is positive) and one large positive number

Since you can replace one element with any value in the given range, you'll optimally replace it with either the minimum value in the range (if it helps create two large negatives) or the maximum value in the range (if it helps create three large positives).

### Examples

**Example 1:**  
Input: `nums = [-4, -2, -3], x = 2, y = 105`  
Output: `1200000`  
*Explanation: Replace -2 with 105 → product = (-4) × 105 × (-3) = 1200000. The two negative numbers have a large absolute value, and when multiplied together with the large positive number, they produce the maximum product.*

**Example 2:**  
Input: `nums = [1, 2, 3], x = 2, y = 105`  
Output: `105 × 3 × 2 = 630`  
*Explanation: Replace 1 with 105 → product = 105 × 3 × 2 = 630. Three large positive numbers give the maximum product.*

**Example 3:**  
Input: `nums = [-1, -2, -3, -4], x = 10, y = 10`  
Output: `400`  
*Explanation: Replace -1 with 10 → product = (-4) × 10 × (-3) = 1200. Or replace -2 with 10 → product = (-4) × 10 × (-3) = 1200. Two large negatives multiplied with a positive number give a large product.*

### Thought Process (as if you're the interviewee)

At first, I might think: "I need to try all possible replacements?" But that's inefficient since the range could be huge.

Then I'd realize: **To maximize the product of three numbers, I only care about extreme values.** Specifically:
- If I'm replacing a number, I should replace it with either the **minimum** (x) or **maximum** (y) value in the range, never something in between.
- After replacement, the maximum product will come from either the three largest numbers or the two smallest (most negative) and one largest.

So my approach:
1. Replace the element at each position with x, then with y
2. For each modified array, find the maximum product of three elements by checking:
   - The product of the three largest elements
   - The product of the two smallest (most negative) and the largest element
3. Return the overall maximum

This works because if we have negatives with large absolute values, their product is positive and could be large. So we need to consider both the top three positives and the strategy of using two negatives.

### Corner cases to consider

- All elements are negative → replacing with max value (y) gives the best result
- All elements are positive → the product may come from the three largest or from two small positives and one large
- Array has exactly three elements → we must replace exactly one, then compute the product of the three
- Very large or very small values in the range → could overflow, but LeetCode typically handles this in the result validation
- Mix of positive and negative → both strategies (three large positives, or two large negatives + one positive) matter

### Solution

```python
def maximumProduct(nums, x, y):
    n = len(nums)
    max_product = float('-inf')
    
    # Try replacing each element with x and y
    for i in range(n):
        original = nums[i]
        
        # Try replacing with y (max value)
        nums[i] = y
        max_product = max(max_product, get_max_product_of_three(nums))
        
        # Try replacing with x (min value)
        nums[i] = x
        max_product = max(max_product, get_max_product_of_three(nums))
        
        # Restore original value
        nums[i] = original
    
    return max_product

def get_max_product_of_three(nums):
    # Find three largest and two smallest (most negative) numbers
    nums_sorted = sorted(nums)
    n = len(nums_sorted)
    
    # Option 1: product of three largest
    product1 = nums_sorted[n - 1] * nums_sorted[n - 2] * nums_sorted[n - 3]
    
    # Option 2: product of two smallest and one largest
    # (two smallest could be large negatives)
    product2 = nums_sorted[0] * nums_sorted[1] * nums_sorted[n - 1]
    
    return max(product1, product2)
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n²) — We iterate through each of the n positions to replace (O(n)), and for each replacement, we sort the array (O(n log n)). The dominant factor is n × n log n, but since we're doing this for a fixed problem size per replacement, it simplifies to O(n²) for practical purposes. With n ≤ 10⁵ as typical LeetCode constraints, this is acceptable.

- **Space Complexity:** O(n) — The sorted array takes O(n) space. We don't use additional recursive stacks or other data structures proportional to input size.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *What if we can replace multiple elements instead of just one? How would the approach change?*  
  *Hint: Think about whether we need dynamic programming or if a greedy strategy still works.*

- (Follow-up question 2)  
  *What if instead of a range [x, y], we can replace the element with any value from a given set of candidates?*  
  *Hint: You'd still only need to try a limited number of candidates—which ones matter?*

- (Follow-up question 3)  
  *Can you optimize the solution to O(n) time without sorting?*  
  *Hint: Use a single pass to track the min and max values, or maintain running candidates for largest and smallest elements.*

### Summary
This problem teaches the importance of recognizing that **to maximize a product, we need to consider both positive and negative contributions**. Instead of brute-force trying all possibilities, we use the insight that only extreme values matter (either the range min or max for replacement). The solution combines **greedy selection** with **exhaustive case checking** to find the true maximum. This pattern applies to similar optimization problems where you must consider counter-intuitive strategies (like using negative numbers) alongside obvious ones.


### Flashcard
Maximum product of three elements comes from either three largest or two smallest (most negative) numbers; try replacing one element with min or max of range and compute both cases.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Maximum Product of Three Numbers(maximum-product-of-three-numbers) (Easy)