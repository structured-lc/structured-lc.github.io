### Leetcode 3131 (Easy): Find the Integer Added to Array I [Practice](https://leetcode.com/problems/find-the-integer-added-to-array-i)

### Description  
You are given two arrays, **nums1** and **nums2**, of equal length. Each element in **nums1** has been increased or decreased by the same integer **x** to create the corresponding element in **nums2**, that is, for every i, **nums2[i] = nums1[i] + x**. Your goal is to determine the value of **x**.

### Examples  

**Example 1:**  
Input: `nums1 = [2, 3, 4]`, `nums2 = [5, 6, 7]`  
Output: `3`  
*Explanation: Each element in nums1 was increased by 3: 2+3=5, 3+3=6, 4+3=7.*

**Example 2:**  
Input: `nums1 = [1, 0, -1]`, `nums2 = [2, 1, 0]`  
Output: `1`  
*Explanation: Each element in nums1 was increased by 1: 1+1=2, 0+1=1, -1+1=0.*

**Example 3:**  
Input: `nums1 = [5, 5, 5]`, `nums2 = [2, 2, 2]`  
Output: `-3`  
*Explanation: Each element in nums1 was decreased by 3: 5-3=2, 5-3=2, 5-3=2.*

### Thought Process (as if you’re the interviewee)  
First, let’s confirm the transformation: the same integer **x** is added to every element of **nums1** to obtain **nums2**. That means for all i, **nums2[i] = nums1[i] + x**.

To solve for **x**, note that since the transformation is uniform, the difference between the corresponding elements of the sorted arrays remains the same.  
So, if we sort both arrays, **x = sorted(nums2)[i] - sorted(nums1)[i]** for any i.

But we don’t really need to sort if the arrays are always mapped one-to-one and only shifted. If no rearrangement is done on the arrays, the difference between any pair (**nums2 - nums1**) gives x.

However, in the general case (where order might not be guaranteed), aligning the smallest elements is a robust way:
- Find the minimum value in both arrays.
- **x = min(nums2) - min(nums1)**

This works because, after applying x to every number in nums1, the smallest number should line up with the smallest in nums2.

**Trade-offs:** This approach is both time and space efficient; we just need to scan both arrays once to find the minima, and subtract.

### Corner cases to consider  
- Arrays with one element.
- Arrays where all elements are the same.
- Arrays with negative numbers.
- Arrays with large positive/negative numbers.
- Arrays containing zeros.
- Arrays already identical (**x = 0**).

### Solution

```python
def addedInteger(nums1, nums2):
    # Find minimum in both nums1 and nums2
    min_nums1 = nums1[0]
    min_nums2 = nums2[0]
    for n in nums1:
        if n < min_nums1:
            min_nums1 = n
    for n in nums2:
        if n < min_nums2:
            min_nums2 = n
    # The integer x that was added to nums1 is the difference of minima
    return min_nums2 - min_nums1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we iterate through both arrays once to find their minimums.
- **Space Complexity:** O(1), as only a fixed number of variables are used beyond the input arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the mapping between nums1 and nums2 is not one-to-one (e.g. arrays got shuffled after the increment)?
  *Hint: Can you sort both arrays and compare the differences for all elements?*

- How would you solve this if the “additive” transformation wasn’t guaranteed and some elements differed in other ways?
  *Hint: What if it's not guaranteed all differences are the same? Test all differences for consistency.*

- What if you have to do this operation in a streaming fashion (elements of arrays are coming one by one)?
  *Hint: Keep track of minima on the fly as elements arrive.*

### Summary
The problem uses the **difference pattern** and relies on linear scanning for the minimum value in each array, making it efficient and robust. This approach and code pattern appear in other problems involving transformations by a constant (additive) across arrays or sequences. It's a common pattern for "find the constant shift" questions.


### Flashcard
Sort both arrays; x = sorted_nums2 − sorted_nums1 works for any index since transformation is uniform.

### Tags
Array(#array)

### Similar Problems
