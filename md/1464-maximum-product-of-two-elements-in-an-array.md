### Leetcode 1464 (Easy): Maximum Product of Two Elements in an Array [Practice](https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array)

### Description  
Given a list of integers `nums`, find the maximum product of two distinct elements such that the product is `(a-1) × (b-1)` where `a` and `b` are elements in the array and `a ≠ b`.

### Examples  

**Example 1:**  
Input: `nums = [3,4,5,2]`  
Output: `12`  
*Explanation: max numbers are 4 and 5, so (5-1) × (4-1) = 4×3 = 12.*

**Example 2:**  
Input: `nums = [1,5,4,5]`  
Output: `16`  
*Explanation: max numbers are 5 and 5, so (5-1) × (5-1) = 4×4 = 16.*

**Example 3:**  
Input: `nums = [3,7]`  
Output: `12`  
*Explanation: (7-1) × (3-1) = 6×2 = 12.*

### Thought Process (as if you’re the interviewee)  
- The maximum product comes from the two largest numbers (since subtracting 1 reduces both equally).
- Find the two largest values in the array, then compute the product as specified.
- Avoid sorting the whole array; just scan once to find largest and second largest elements.

### Corner cases to consider  
- Duplicate largest elements ([5,5] or more).
- Minimum length array (length 2).
- All elements the same.

### Solution

```python
def maxProduct(nums):
    first = second = 0
    for n in nums:
        if n > first:
            second = first
            first = n
        elif n > second:
            second = n
    return (first - 1) * (second - 1)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) single scan to find top 2.
- **Space Complexity:** O(1), constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed the k highest numbers?  
  *Hint: Use a heap for top-k extraction in O(n log k).*  

- Can negative integers appear, and if so, how does it affect the answer?  
  *Hint: Problem specifies positive integers, but with negatives you must consider pairs with the smallest negatives.*

- Can you do it in-place, modifying the original array?  
  *Hint: Yes, keep indices instead of values if necessary, but original array doesn’t need to be preserved.*

### Summary
Classic "find the top 2" problem; common in array max/min/one-scan problems. Useful wherever you need the largest or smallest k items, e.g., heaps, selection algorithms.


### Flashcard
Find the two largest numbers in the array, then return (max₁-1) × (max₂-1).

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
