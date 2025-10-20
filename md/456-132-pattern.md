### Leetcode 456 (Medium): 132 Pattern [Practice](https://leetcode.com/problems/132-pattern)

### Description  
Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j]. Return true if there is a 132 pattern in nums, otherwise, return false.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4]`  
Output: `false`  
*Explanation: There is no 132 pattern in the sequence.*

**Example 2:**  
Input: `nums = [3,1,4,2]`  
Output: `true`  
*Explanation: There is a 132 pattern in the sequence: [1, 4, 2].*

**Example 3:**  
Input: `nums = [-1,3,2,0]`  
Output: `true`  
*Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].*


### Thought Process (as if you're the interviewee)  
We need to find three indices i < j < k where nums[i] < nums[k] < nums[j].

**Brute Force Approach:**
Try all possible triplets (i, j, k) and check the condition.
Time complexity: O(n³), which is too slow for the given constraints.

**Optimized Approach with Stack:**
Let's think about this differently. If we iterate from right to left and maintain some information about potential candidates:

1. We can use a stack to keep track of potential nums[k] values (the middle value in 132 pattern)
2. We maintain a variable `second` to track the largest nums[k] we've seen so far
3. For each position, we check if current element can be nums[i] (i.e., current < second)

**Key Insight:**
- Iterate from right to left
- Use a monotonic decreasing stack to store potential nums[j] values  
- When we find a smaller element, it becomes our potential nums[k]
- If we find an element smaller than our tracked nums[k], we have a 132 pattern

**Algorithm:**
1. Initialize stack and second = float('-inf')
2. Iterate from right to left
3. If current element > second, we found our nums[i] (return True)
4. While stack is not empty and current >= stack top, pop and update second
5. Push current to stack


### Corner cases to consider  
- Array with less than 3 elements: Should return false  
- All elements in ascending order: No 132 pattern possible  
- All elements in descending order: No 132 pattern possible  
- Array with duplicate elements: Need to handle equal comparisons carefully  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def find132pattern(nums):
    if len(nums) < 3:
        return False
    
    # Stack to maintain potential nums[j] values (decreasing order)
    stack = []
    # Track the largest nums[k] value we've seen
    second = float('-inf')
    
    # Iterate from right to left
    for i in range(len(nums) - 1, -1, -1):
        current = nums[i]
        
        # If current element is smaller than our tracked nums[k],
        # we found a 132 pattern
        if current < second:
            return True
        
        # While stack has elements and current is greater than or equal to top,
        # pop elements and update second (potential nums[k])
        while stack and current >= stack[-1]:
            second = stack.pop()
        
        # Push current element to stack (potential nums[j])
        stack.append(current)
    
    return False

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) - Each element is pushed and popped from the stack at most once, so the total number of operations is linear.
- **Space Complexity:** O(n) - In the worst case, the stack might contain all elements (when the array is in strictly increasing order from right to left).


### Potential follow-up questions (as if you're the interviewer)  

- Can you solve this problem in O(1) space?  
  *Hint: This is very challenging and might require a more complex approach with careful tracking of candidates*

- What if you need to find all 132 patterns instead of just checking if one exists?  
  *Hint: You'd need to modify the algorithm to continue searching and collect all valid triplets instead of returning early*

- How would you solve the generalized version for any pattern like 1324 or 13254?  
  *Hint: This becomes much more complex and might require dynamic programming or other advanced techniques*

### Summary
This problem demonstrates the power of monotonic stacks for solving complex pattern recognition problems. The key insight is to process the array from right to left while maintaining a stack of candidates and tracking the second-largest value seen so far. The stack maintains potential nums[j] values in decreasing order, allowing us to efficiently find valid 132 patterns. This technique of using stacks with auxiliary variables to track specific conditions is common in many array problems involving patterns or subsequences.


### Flashcard
Iterate right-to-left, using a stack to track potential "3" values and a variable for the "2" value, to detect a 132 pattern in O(n) time.

### Tags
Array(#array), Binary Search(#binary-search), Stack(#stack), Monotonic Stack(#monotonic-stack), Ordered Set(#ordered-set)

### Similar Problems
