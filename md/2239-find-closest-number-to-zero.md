### Leetcode 2239 (Easy): Find Closest Number to Zero [Practice](https://leetcode.com/problems/find-closest-number-to-zero)

### Description  
Given an array of integers, return the element that is closest to zero. If there are multiple numbers equally close to zero, return the largest among them. For example, in the array `[4, -1, -1, 2]`, both `-1` and `-1` are equally close, but you'd return `-1`. If the array contained both `-2` and `2`, with both being two units away from zero, you'd return `2` because it is larger.

### Examples  

**Example 1:**  
Input: `nums = [-4, -2, 1, 4, 8]`  
Output: `1`  
*Explanation: 1 is closest to zero, with a difference of 1. Other numbers are farther away.*

**Example 2:**  
Input: `nums = [2, -1, 1]`  
Output: `1`  
*Explanation: -1 and 1 are both 1 unit away from zero. We return 1, since it’s larger.*

**Example 3:**  
Input: `nums = [-5, -2, -3]`  
Output: `-2`  
*Explanation: -2 is closest to zero. All other values are farther away.*

### Thought Process (as if you’re the interviewee)  
- Start with the brute-force approach: 
  - For each number in the list, calculate its distance from zero (absolute value) and track the minimum distance found so far.
  - If we find a number with a smaller absolute value, update our answer.
  - If two numbers have the same smallest absolute value, pick the larger value.
- Optimize by using a single pass, tracking both the smallest distance and the value.
- Sorting is possible (sort by abs(x), and in case of tie, by value descending), but it would be slower (O(n log n)) than the single pass O(n) solution.
- The single-pass/iterative method is optimal for both time and space (O(n) and O(1)).
- Choose single-pass iteration in interviews for clarity and efficiency.

### Corner cases to consider  
- The array contains only one element.
- All values are negative.
- All values are positive.
- There are both a negative and a positive number equally close to zero.
- The array contains zeros.
- The array is not sorted.

### Solution

```python
def findClosestNumber(nums):
    # Initialize closest to first element
    closest = nums[0]
    
    # Iterate through the array
    for num in nums[1:]:
        # If this number is closer to zero, update
        if abs(num) < abs(closest):
            closest = num
        # If tie in distance, pick the larger value
        elif abs(num) == abs(closest) and num > closest:
            closest = num
    return closest
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in the array, as we iterate over the list once.
- **Space Complexity:** O(1), no extra space is used aside from variables for tracking (not proportional to input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find the *k* numbers closest to zero?
  *Hint: Could you use a heap or sort the list by absolute value?*

- What if numbers are streaming in and you never see the entire list at once?
  *Hint: Think about maintaining the current closest as numbers arrive.*

- How would your solution change if you wanted the smallest (not largest) in case of a tie?
  *Hint: Change the tie-breaking condition in your comparison step.*

### Summary
This problem uses the classic "track optimal value while iterating" (one-pass, O(n)) pattern. This approach is common for finding minimum/maximum or best-fit values. The comparison logic (absolute value, tie-breaking by value) is reusable for other problems where you need to select an element based on multiple criteria. This pattern is also applicable in streaming scenarios or whenever you want a solution with minimal space and linear time.


### Flashcard
Track the number with smallest absolute value; on tie, pick the larger value.

### Tags
Array(#array)

### Similar Problems
- Find K Closest Elements(find-k-closest-elements) (Medium)