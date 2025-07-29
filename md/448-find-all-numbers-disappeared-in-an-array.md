### Leetcode 448 (Easy): Find All Numbers Disappeared in an Array [Practice](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array)

### Description  
Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums. Can you solve it without extra space and in O(n) runtime?

### Examples  

**Example 1:**  
Input: `nums = [4,3,2,7,8,2,3,1]`  
Output: `[5,6]`  
*Explanation: Numbers 1,2,3,4,7,8 appear in array, so 5 and 6 are missing from range [1,8].*

**Example 2:**  
Input: `nums = [1,1]`  
Output: `[2]`  
*Explanation: In range [1,2], number 2 is missing since array only contains 1s.*

### Thought Process (as if you're the interviewee)  
The constraint asks for O(n) time and O(1) extra space, which rules out using hash sets or additional arrays. The key insight is to use the array itself as a way to mark which numbers we've seen.

Approaches:
1. **Hash set**: Use extra space O(n) to track seen numbers
2. **Array marking**: Use indices to mark presence by negating values
3. **Cyclic sort**: Try to place each number at its correct position

I'll use the array marking approach since it meets the space constraint.

### Corner cases to consider  
- All numbers present (no missing numbers)
- All numbers missing except one
- Array with all same numbers
- Array of size 1
- Numbers at boundary positions (1 and n)

### Solution

```python
def findDisappearedNumbers(nums):
    # Use the array itself to mark which numbers we've seen
    # For each number x, mark nums[x-1] as negative (if not already)
    
    n = len(nums)
    
    # Mark numbers as seen by negating the value at corresponding index
    for num in nums:
        index = abs(num) - 1  # Convert to 0-based index
        if nums[index] > 0:   # Only negate if not already negative
            nums[index] = -nums[index]
    
    # Find all positive numbers - their indices+1 are missing
    missing = []
    for i in range(n):
        if nums[i] > 0:
            missing.append(i + 1)
    
    return missing

# Alternative approach using cyclic sort
def findDisappearedNumbersCyclicSort(nums):
    n = len(nums)
    i = 0
    
    # Try to place each number at its correct position
    while i < n:
        correct_pos = nums[i] - 1
        
        # If number is not at correct position and positions are different
        if nums[i] != nums[correct_pos]:
            nums[i], nums[correct_pos] = nums[correct_pos], nums[i]
        else:
            i += 1
    
    # Find numbers not at their correct positions
    missing = []
    for i in range(n):
        if nums[i] != i + 1:
            missing.append(i + 1)
    
    return missing

# Hash set approach (uses extra space but clearer logic)
def findDisappearedNumbersHashSet(nums):
    n = len(nums)
    num_set = set(nums)
    
    missing = []
    for i in range(1, n + 1):
        if i not in num_set:
            missing.append(i)
    
    return missing
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for all approaches as we iterate through the array a constant number of times.
- **Space Complexity:** O(1) for marking and cyclic sort approaches (not counting output array), O(n) for hash set approach.

### Potential follow-up questions (as if you're the interviewer)  

- What if the array could contain negative numbers or numbers outside the range [1,n]?  
  *Hint: First pass to handle invalid numbers, or use different marking strategy like adding n to values.*

- How would you find the missing number if only one number was missing?  
  *Hint: Use XOR or sum formula: expected_sum - actual_sum.*

- Can you solve this if the array was read-only?  
  *Hint: Would need to use extra space with hash set or mathematical approaches.*

### Summary
This problem showcases the clever technique of using array indices to store metadata about element presence. The marking approach transforms a space-constrained problem into an elegant O(1) space solution by reusing the input array as auxiliary storage. This pattern appears in many array problems where you need to track element properties without additional space.
