### Leetcode 496 (Easy): Next Greater Element I [Practice](https://leetcode.com/problems/next-greater-element-i)

### Description  
Given two integer arrays nums1 and nums2 where nums1 is a subset of nums2, return an array answer where answer[i] is the next greater element for nums1[i] in nums2. The next greater element is the first element to the right that is greater than the current element. If no such element exists, return -1.

### Examples  

**Example 1:**  
Input: `nums1 = [4,1,2], nums2 = [1,3,4,2]`  
Output: `[-1,3,-1]`  
*Explanation: For 4 in nums2, no greater element to the right (-1). For 1, next greater is 3. For 2, no greater element to the right (-1).*

**Example 2:**  
Input: `nums1 = [2,4], nums2 = [1,2,3,4]`  
Output: `[3,-1]`  
*Explanation: For 2, next greater is 3. For 4, no greater element (-1).*

### Thought Process (as if you're the interviewee)  
This is a classic "next greater element" problem. The key insight is using a stack to efficiently find the next greater element for all elements in nums2, then looking up the results for nums1.

Approaches:
1. **Brute force**: For each element in nums1, find it in nums2 and scan right for next greater
2. **Stack + HashMap**: Use monotonic stack to precompute next greater elements, store in map
3. **Optimized lookup**: Since nums1 ⊆ nums2, we only need to compute for elements in nums1

The stack approach is most efficient as it processes each element in nums2 exactly once.

### Corner cases to consider  
- nums1 is empty
- No greater elements exist for any element
- nums2 is sorted in descending order
- Single element arrays
- All elements in nums1 are at the end of nums2

### Solution

```python
def nextGreaterElement(nums1, nums2):
    # Use stack to find next greater element for all elements in nums2
    stack = []
    next_greater = {}
    
    # Process nums2 from left to right
    for num in nums2:
        # While stack is not empty and current num is greater than stack top
        while stack and num > stack[-1]:
            # Current num is the next greater element for stack top
            next_greater[stack.pop()] = num
        
        # Push current number to stack
        stack.append(num)
    
    # Elements remaining in stack have no next greater element
    while stack:
        next_greater[stack.pop()] = -1
    
    # Build result for nums1
    result = []
    for num in nums1:
        result.append(next_greater[num])
    
    return result

# Alternative approach with right-to-left processing
def nextGreaterElementRightToLeft(nums1, nums2):
    stack = []
    next_greater = {}
    
    # Process nums2 from right to left
    for i in range(len(nums2) - 1, -1, -1):
        num = nums2[i]
        
        # Pop elements from stack that are <= current number
        while stack and stack[-1] <= num:
            stack.pop()
        
        # Next greater element is top of stack (or -1 if empty)
        next_greater[num] = stack[-1] if stack else -1
        
        # Push current number to stack
        stack.append(num)
    
    # Build result for nums1
    return [next_greater[num] for num in nums1]

# Brute force approach (for comparison)
def nextGreaterElementBruteForce(nums1, nums2):
    result = []
    
    for num1 in nums1:
        # Find index of num1 in nums2
        index = nums2.index(num1)
        
        # Search for next greater element to the right
        next_greater = -1
        for i in range(index + 1, len(nums2)):
            if nums2[i] > num1:
                next_greater = nums2[i]
                break
        
        result.append(next_greater)
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m) where n = len(nums2) and m = len(nums1). Each element in nums2 is pushed and popped at most once.
- **Space Complexity:** O(n) for the stack and hashmap storing next greater elements.

### Potential follow-up questions (as if you're the interviewer)  

- How would you solve this if nums1 was not guaranteed to be a subset of nums2?  
  *Hint: Check if element exists in the hashmap before accessing, return -1 if not found.*

- What if you needed to find the next greater element in a circular array?  
  *Hint: Process the array twice using modulo arithmetic to simulate circular behavior.*

- Can you solve this for previous greater element instead of next greater?  
  *Hint: Similar approach but process from right to left or reverse the logic.*

### Summary
This problem demonstrates the powerful monotonic stack pattern for solving "next/previous greater/smaller element" problems. The stack maintains elements in a specific order (monotonic decreasing in this case) and efficiently finds relationships between elements. This pattern is fundamental in many algorithmic problems involving element relationships and appears frequently in array processing, histogram problems, and optimization scenarios.
