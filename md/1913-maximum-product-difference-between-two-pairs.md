### Leetcode 1913 (Easy): Maximum Product Difference Between Two Pairs [Practice](https://leetcode.com/problems/maximum-product-difference-between-two-pairs)

### Description  
Given an array of integers, select four **distinct** elements to form two pairs: (a, b) and (c, d). The **product difference** between the pairs is defined as (a × b) - (c × d).  
Return the **maximum** possible product difference among all valid choices.

Basically:  
- Pick the two largest numbers for one pair,
- Pick the two smallest numbers for the other pair,
- Return: (largest₁ × largest₂) - (smallest₁ × smallest₂).

### Examples  

**Example 1:**  
Input: `nums = [5,6,2,7,4]`  
Output: `34`  
*Explanation: The largest two numbers are 7 and 6, the smallest are 2 and 4. So, (7 × 6) - (2 × 4) = 42 - 8 = 34.*

**Example 2:**  
Input: `nums = [4,2,5,9,7,4,8]`  
Output: `64`  
*Explanation: Largest two are 9 and 8, smallest are 2 and 4. (9 × 8) - (2 × 4) = 72 - 8 = 64.*

**Example 3:**  
Input: `nums = [1,6,7,5,2,3,8]`  
Output: `40`  
*Explanation: Largest two are 8 and 7, smallest are 1 and 2. (8 × 7) - (1 × 2) = 56 - 2 = 54.*

### Thought Process (as if you’re the interviewee)  

- **Naive idea:**  
  Consider all ways to pick four elements—then for each pair of pairs, compute the product difference.  
  But this is O(n⁴), which is obviously too slow.

- **Optimize:**  
  Notice that to maximize (a × b) - (c × d):  
  - You want the largest pair for a × b  
  - You want the smallest pair for c × d  
  So, just find the two largest and two smallest numbers.  
  Try both combinations if values are repeated, to ensure they're distinct indices, but given all elements are positive and distinct, picking the two max and two min always works (array always has ≥4 elements).

- **Final approach:**  
  - Scan the array once to find the largest₁, largest₂, smallest₁, smallest₂ (O(n))
  - Return (largest₁ × largest₂) - (smallest₁ × smallest₂)
  - No extra space, just simple variables.

  *Trade-off:*  
  - Sorting would also work (O(n log n)), but O(n) with variables is better.

### Corner cases to consider  
- Array of length 4 (minimum case).
- Duplicate values among the largest or smallest numbers.
- All elements identical (product difference is always 0).
- Highly skewed: e.g. [1, 1000, 2, 999].

### Solution

```python
def maxProductDifference(nums):
    # Initialize variables for two largest and two smallest numbers
    max1 = max2 = 0            # Two largest
    min1 = min2 = float('inf') # Two smallest

    # Single pass: track the two largest and two smallest
    for num in nums:
        # Update largest two
        if num > max1:
            max2 = max1
            max1 = num
        elif num > max2:
            max2 = num

        # Update smallest two
        if num < min1:
            min2 = min1
            min1 = num
        elif num < min2:
            min2 = num

    # Compute product difference
    return (max1 * max2) - (min1 * min2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Single traversal to determine two largest and smallest elements.

- **Space Complexity:** O(1)  
  Only constant extra space for tracking four numbers (regardless of input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are negative numbers in the array?  
  *Hint: Negative numbers can change what the "lowest" product is—two negatives multiplied equal a positive.*

- How would you solve this if you needed the indices of the pairs (not just the value)?  
  *Hint: Track values and their original indices, update only if indices are unique. Careful with duplicates.*

- If the array is streaming (can’t be stored fully), how would you do it?  
  *Hint: Maintain only two largest and two smallest so far as you read elements.*

### Summary
This problem uses the **greedy pattern** and "find the top-k/largest values."  
The crux is that maximizing (a × b) - (c × d) means you want the largest two elements for one product, and the smallest two for the other, which is a pattern that arises in questions requiring maximization/minimization combinations.  
No need for sorting or brute force due to the simplicity of the pairwise product structure. This approach is commonly applicable to problems involving selection of top/bottom values to maximize or minimize a function.