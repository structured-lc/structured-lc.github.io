### Leetcode 442 (Medium): Find All Duplicates in an Array [Practice](https://leetcode.com/problems/find-all-duplicates-in-an-array)

### Description  
Given an integer array nums of length n where all the integers are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appear twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

### Examples  

**Example 1:**  
Input: `nums = [4,3,2,7,8,2,3,1]`  
Output: `[2,3]`  
*Explanation: Numbers 2 and 3 each appear twice in the array.*

**Example 2:**  
Input: `nums = [1,1,2]`  
Output: `[1]`  
*Explanation: Number 1 appears twice.*

**Example 3:**  
Input: `nums = [1]`  
Output: `[]`  
*Explanation: No number appears twice.*

### Thought Process (as if you're the interviewee)  
This problem has the constraint that all integers are in range [1, n] where n is the array length. This suggests we can use the array indices as a form of hash table.

Key insights:
1. **Index mapping**: Since numbers are in range [1, n], we can map each number to its corresponding index
2. **Mark visited**: Use array modification to mark which numbers we've seen
3. **Sign flipping**: Use negative values to indicate we've seen a number before

Approaches:
1. **HashSet**: Use extra space to track seen numbers - O(n) space
2. **Sort first**: Sort then find duplicates - O(n log n) time
3. **Index as hash**: Use array indices and sign flipping - O(1) space, O(n) time
4. **Cyclic sort**: Place each number in its correct position

The index-as-hash approach with sign flipping meets the space and time constraints.

### Corner cases to consider  
- Array with no duplicates
- Array where all elements appear twice
- Single element array
- Array with only one duplicate pair
- Numbers appearing at their corresponding indices

### Solution

```python
def findDuplicates(nums):
    result = []
    
    for num in nums:
        # Get the absolute value to handle negative markers
        index = abs(num) - 1
        
        # If the number at this index is already negative,
        # it means we've seen this number before
        if nums[index] < 0:
            result.append(abs(num))
        else:
            # Mark this number as seen by making it negative
            nums[index] = -nums[index]
    
    return result

# Alternative approach with restoration
def findDuplicatesRestore(nums):
    result = []
    
    # First pass: mark seen numbers
    for i in range(len(nums)):
        index = abs(nums[i]) - 1
        
        if nums[index] < 0:
            # This number is a duplicate
            result.append(abs(nums[i]))
        else:
            # Mark as seen
            nums[index] = -nums[index]
    
    # Second pass: restore original array (optional)
    for i in range(len(nums)):
        nums[i] = abs(nums[i])
    
    return result

# Cyclic sort approach
def findDuplicatesCyclicSort(nums):
    # Place each number in its correct position
    i = 0
    while i < len(nums):
        correct_pos = nums[i] - 1
        
        # If current number is not in its correct position
        # and the correct position doesn't already have the right number
        if nums[i] != nums[correct_pos]:
            # Swap to place number in correct position
            nums[i], nums[correct_pos] = nums[correct_pos], nums[i]
        else:
            i += 1
    
    # Find numbers that are not in their correct positions
    result = []
    for i in range(len(nums)):
        if nums[i] != i + 1:
            result.append(nums[i])
    
    return result

# Using the fact that we can add n to mark duplicates
def findDuplicatesAddition(nums):
    n = len(nums)
    result = []
    
    for num in nums:
        # Get the original value (before any additions)
        original = (num - 1) % n
        index = original
        
        # Add n to mark this index as visited
        nums[index] += n
    
    # Find indices where value > 2n (visited twice)
    for i in range(n):
        if nums[i] > 2 * n:
            result.append(i + 1)
    
    return result

# Two-pass approach for clarity
def findDuplicatesTwoPass(nums):
    result = []
    
    # First pass: mark all seen numbers
    for num in nums:
        index = abs(num) - 1
        nums[index] = -abs(nums[index])
    
    # Second pass: find duplicates and restore
    for num in nums:
        index = abs(num) - 1
        if nums[index] < 0:
            result.append(abs(num))
            nums[index] = abs(nums[index])  # Restore to avoid duplicate counting
    
    return result

# Using XOR properties (alternative mathematical approach)
def findDuplicatesXOR(nums):
    # This approach is more complex for this specific problem
    # but demonstrates alternative thinking
    result = []
    
    # Create a copy to avoid modifying original
    arr = nums[:]
    
    for i in range(len(arr)):
        index = abs(arr[i]) - 1
        
        if arr[index] < 0:
            result.append(abs(arr[i]))
        else:
            arr[index] = -arr[index]
    
    return result

# Brute force approach for comparison (violates constraints)
def findDuplicatesBruteForce(nums):
    from collections import Counter
    counter = Counter(nums)
    return [num for num, count in counter.items() if count == 2]

# Another brute force without extra space but O(n²) time
def findDuplicatesBruteForceNoSpace(nums):
    result = []
    
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j] and nums[i] not in result:
                result.append(nums[i])
    
    return result

# Clean implementation with comments
def findDuplicatesClean(nums):
    duplicates = []
    
    for current_num in nums:
        # Calculate index for current number
        target_index = abs(current_num) - 1
        
        # Check if we've seen this number before
        if nums[target_index] < 0:
            # Negative means we've seen it, so it's a duplicate
            duplicates.append(abs(current_num))
        else:
            # First time seeing this number, mark it as seen
            nums[target_index] *= -1
    
    return duplicates

# Version that handles edge cases explicitly
def findDuplicatesRobust(nums):
    if not nums:
        return []
    
    result = []
    
    for num in nums:
        # Handle the case where num might be negative due to marking
        abs_num = abs(num)
        index = abs_num - 1
        
        # Boundary check (should not be needed with valid input)
        if index >= len(nums):
            continue
        
        if nums[index] < 0:
            # Already marked negative, this is a duplicate
            result.append(abs_num)
        else:
            # Mark as seen by making negative
            nums[index] = -nums[index]
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of the array. We traverse the array once (or twice in some variations).
- **Space Complexity:** O(1) excluding the output array. We only use the input array for marking and a few variables.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this if numbers could appear more than twice?  
  *Hint: Use different marking strategies, like adding multiples of n or using bit manipulation for counting.*

- What if the range was [0, n-1] instead of [1, n]?  
  *Hint: Adjust the index calculation accordingly (index = abs(num) instead of abs(num) - 1).*

- How would you solve this if you couldn't modify the input array?  
  *Hint: Use Floyd's cycle detection algorithm or binary search with counting, though this might not meet the O(1) space requirement.*

- Can you extend this to find all numbers that appear exactly k times?  
  *Hint: Use more sophisticated marking schemes or mathematical properties to track occurrence counts.*

### Summary
This problem showcases a clever use of array indices as a hash table, exploiting the constraint that numbers are in the range [1, n]. The sign-flipping technique is a common pattern for marking visited elements without using extra space. This approach is fundamental in problems where you need to track state within the constraints of the input structure. Understanding how to use array modifications for marking is crucial for solving space-efficient algorithms and demonstrates the importance of leveraging problem constraints creatively.
