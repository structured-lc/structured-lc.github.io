### Leetcode 167 (Medium): Two Sum II - Input Array Is Sorted [Practice](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)

### Description  
Given a sorted array of integers, find two numbers such that they add up to a specific target number. Return the indices of the two numbers as a list, using 1-based indexing. You may not use the same element twice. Exactly one solution exists.  
In other words:  
- You’re given an array `numbers`, sorted in non-decreasing order, and a number `target`.
- Find two distinct elements such that their sum is `target`.
- Return their indices as `[index₁, index₂]` (both 1-based, and index₁ < index₂).

### Examples  

**Example 1:**  
Input: `numbers = [2,7,11,15], target = 9`  
Output: `[1,2]`  
*Explanation: 2 (at index 1) + 7 (at index 2) = 9.*

**Example 2:**  
Input: `numbers = [1,2,3,4,4,9,56,90], target = 8`  
Output: `[4,5]`  
*Explanation: 4 (index 4) + 4 (index 5) = 8.*

**Example 3:**  
Input: `numbers = [1, 3, 4, 6, 8, 13], target = 7`  
Output: `[2,3]`  
*Explanation: 3 (index 2) + 4 (index 3) = 7.*

### Thought Process (as if you’re the interviewee)  
First, brute-force would be to check every pair (i, j) where 0 ≤ i < j < n and see if numbers[i] + numbers[j] == target.  
- This gives O(n²) time, which isn't efficient for large arrays.

But since the array is **sorted**, we can use the **two-pointer approach:**  
- Initiate one pointer at the start (left) and one at the end (right) of the array.
- Check sum = numbers[left] + numbers[right]:
  - If sum == target: we found the answer.
  - If sum < target: increment left to get a larger sum.
  - If sum > target: decrement right to get a smaller sum.
- This continues until left < right.
- The single-pass and O(1) space nature is attractive and takes advantage of the sorted array.

**Why choose this:**  
- Two pointers are intuitive here due to the sorted property.
- It’s optimal: O(n) time and O(1) extra space.
- Easy to code and understand.

### Corner cases to consider  
- The pair is at the very start or end of the array.
- Array contains duplicates or negative numbers.
- No elements (not possible as the problem guarantees a solution).
- Array of exactly two numbers.
- Large or small target compared to elements.

### Solution

```python
def twoSum(numbers, target):
    # Start two pointers
    left = 0
    right = len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        
        if current_sum == target:
            # Indices are 1-based
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1  # Need a bigger sum
        else:
            right -= 1  # Need a smaller sum
    # The problem guarantees a solution exists, so we never reach here.
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each pointer moves at most n times (together, up to n steps).
- **Space Complexity:** O(1), using only two pointers—no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is **not sorted**?
  *Hint: Can you use a hashmap as in regular Two Sum?*

- How would you find **all unique pairs** that sum to target?
  *Hint: Keep moving past duplicates after each pair is found.*

- Could you handle the case where **no solution exists**?
  *Hint: Return an empty list if not found.*

### Summary
Used the **two-pointer technique** taking advantage of the sorted input for linear time and constant extra space. This pattern is common for problems involving sorted arrays and searching for pairs or ranges (e.g., 2 Sum, 3 Sum, sorted array range queries). It’s a classic and highly reusable approach in coding interviews for array-related questions.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Two Sum IV - Input is a BST(two-sum-iv-input-is-a-bst) (Easy)
- Two Sum Less Than K(two-sum-less-than-k) (Easy)