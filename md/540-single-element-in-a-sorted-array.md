### Leetcode 540 (Medium): Single Element in a Sorted Array [Practice](https://leetcode.com/problems/single-element-in-a-sorted-array)

### Description  
Given a **sorted integer array** in which every element appears **exactly twice** except for one element that appears only **once**, find and return that single element.  
- The solution must run in O(log n) time and O(1) space.  
You can think of it as: "Given an array like `[1,1,2,3,3,4,4,8,8]`, how do I identify the '2'? Every integer is paired up next to itself… except for a single outlier."

### Examples  

**Example 1:**  
Input: `nums = [1,1,2,3,3,4,4,8,8]`  
Output: `2`  
*Explanation: All elements are in pairs except '2', which appears only once. The answer is 2.*

**Example 2:**  
Input: `nums = [3,3,7,7,10,11,11]`  
Output: `10`  
*Explanation: All elements except '10' are paired. So, the answer is 10.*

**Example 3:**  
Input: `nums = [1]`  
Output: `1`  
*Explanation: The single element is the only value present.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to iterate through the list and use a hash map to count occurrences, then return the number with count 1. This takes O(n) time and O(n) space.

But since the input is **sorted**, we can do better using binary search, aiming for O(log n) time and O(1) space:

- If we look at pairs in the sorted array, elements to the **left** of the unique value will have their first occurrence at **even** indices and their second at **odd**. Once the unique value is inserted, this pattern breaks.
- By picking the middle index and checking if it's part of a pair with its neighbor, we can decide which half to search next.
- Adjust search bounds based on whether the unique element lies to the left or right.

This approach is efficient and leverages the special structure of the input.

### Corner cases to consider  
- Array of length 1, e.g., `[5]`.
- The unique element is at the start, e.g., `[4,5,5,6,6]`.
- The unique element is at the end, e.g., `[1,1,3,3,7]`.
- No unique element (invalid input) — but by constraints, assume input is always valid.

### Solution

```python
def singleNonDuplicate(nums):
    left = 0
    right = len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        # Ensure mid is even, so it always points to the first of a pair
        if mid % 2 == 1:
            mid -= 1
        
        # Pair intact: unique element is after this pair
        if nums[mid] == nums[mid + 1]:
            left = mid + 2
        else:
            # Broken pair: unique is before this or at mid
            right = mid
    return nums[left]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), because each iteration of the binary search halves the search space.
- **Space Complexity:** O(1), as we're only using a few pointers and not extra structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the array is **unsorted**?
  *Hint: Sorting or using a hash map/XOR trick allows O(n) time, but not O(log n).*

- Could you solve if **every element appeared k times except one**?
  *Hint: Generalizes to using bit manipulation and counting techniques.*

- What if the array can have **multiple unique singletons**?
  *Hint: The binary search idea breaks; alternate approaches needed, maybe use a hash map.*

### Summary
This problem is a classic use of **binary search on a sorted array** with special properties, focusing on index parity to guide search direction. This "divide and conquer by pattern" is a recurring pattern in interview problems involving paired elements or sorted data and can be applied in similar "find the unique/different element among pairs/groups" scenarios.