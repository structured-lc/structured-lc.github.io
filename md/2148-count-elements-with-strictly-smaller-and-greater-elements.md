### Leetcode 2148 (Easy): Count Elements With Strictly Smaller and Greater Elements  [Practice](https://leetcode.com/problems/count-elements-with-strictly-smaller-and-greater-elements)

### Description  
Given an integer array, count how many elements have **at least one other element strictly smaller** and **at least one strictly greater**. In other words, for each number, check if there is a strictly smaller and strictly greater value somewhere else in the array. Return how many such numbers there are.

### Examples  

**Example 1:**  
Input: `nums = [11,7,2,15]`  
Output: `2`  
*Explanation: 7 and 11 are strictly between the smallest (2) and largest (15) values.*

**Example 2:**  
Input: `nums = [-3,3,3,90]`  
Output: `0`  
*Explanation: There are only two distinct values; none are strictly between min and max.*

**Example 3:**  
Input: `nums = [1,2,3]`  
Output: `1`  
*Explanation: Only the element 2 has both a smaller (1) and a greater (3) neighbor.*

### Thought Process (as if you’re the interviewee)  
First, I’d consider brute force: for each element, I could scan left and right to check if a smaller and greater value exists. However, this is O(n²) and inefficient.

Instead, notice that the only elements which can satisfy the condition are those **strictly greater than the minimum and strictly less than the maximum**. So, I can:
- Find the minimum and maximum in O(n).
- Iterate again and count how many elements are strictly between these two extremes.

This is a single scan for min, single scan for max, then another scan for the count: O(n).

If all elements are the same, or there are only two distinct values, then no element will be both strictly greater and strictly smaller than anything else.

Sorting is unnecessary—we only care about relative extremes, not the order.

### Corner cases to consider  
- Array contains all the same numbers ⇒ output is 0.
- Array of length ≤ 2 ⇒ always output 0.
- Duplicates in the array but only of min/max ⇒ output is 0.
- Only one element is min and/or max, others are the same in the middle.
- Negative and positive numbers, large ranges.
- Multiple numbers at min or max positions.

### Solution

```python
def countElements(nums):
    # Find the smallest and largest values
    min_val = nums[0]
    max_val = nums[0]
    for num in nums:
        if num < min_val:
            min_val = num
        if num > max_val:
            max_val = num

    # Count elements strictly between min and max
    count = 0
    for num in nums:
        if min_val < num < max_val:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), for scanning through nums three times (finding min, max, and counting), n = len(nums).
- **Space Complexity:** O(1), only a constant number of variables are created regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you only need to return *whether* there exists any such element, not the count?  
  *Hint: Could you short-circuit once you find one?*

- How would your approach change if the numbers are so large that calculating min and max is expensive?  
  *Hint: Can you do it in one sweep?*

- What if the array is sorted in advance?  
  *Hint: Could scanning from index 1 to n-2 be sufficient?*

### Summary
This problem is a classic example of **single-pass min/max searching** and **counting elements in a range**, a common coding interview pattern. It's efficient and doesn’t require sorting, and the core logic applies to many problems involving finding values between extremes or counting non-boundary elements in arrays.