### Leetcode 1646 (Easy): Get Maximum in Generated Array [Practice](https://leetcode.com/problems/get-maximum-in-generated-array)

### Description  
Given an integer n, generate an integer array nums with n+1 elements. The array is constructed as follows:
- nums = 0
- nums[1] = 1 (only if n ≥ 1)
- For each 2 ≤ 2i ≤ n: nums[2i] = nums[i]
- For each 2 ≤ 2i+1 ≤ n: nums[2i+1] = nums[i] + nums[i+1]
Return the maximum integer in the generated array.

### Examples  

**Example 1:**  
Input: `n = 7`  
Output: `3`  
*Explanation: Generated array nums = [0,1,1,2,1,3,2,3], the maximum is 3.*

**Example 2:**  
Input: `n = 2`  
Output: `1`  
*Explanation: Generated array nums = [0,1,1], the maximum is 1.*

**Example 3:**  
Input: `n = 3`  
Output: `2`  
*Explanation: Generated array nums = [0,1,1,2], the maximum is 2.*

### Thought Process (as if you’re the interviewee)  
- The problem asks for explicitly simulating array construction according to rules and tracking the max value.
- Start with nums=0, nums[1]=1; for each index from 2 to n, calculate nums[i] as per given rules:
  - if i is even, nums[i]=nums[i//2]
  - if i is odd, nums[i]=nums[i//2] + nums[i//2 + 1]
- As you build, keep a variable to track the max number seen so far.
- After filling the whole array, return the highest value found.
- This solution is O(n) as every element is processed once.

### Corner cases to consider  
- n = 0 (only nums exists)
- n = 1 (nums=[0,1])
- n is even vs n is odd
- Large n to check for performance

### Solution

```python
# Returns the maximum integer in the generated array nums for input n.
def getMaximumGenerated(n):
    if n == 0:
        return 0
    nums = [0] * (n + 1)
    nums[0] = 0
    nums[1] = 1
    max_value = 1
    for i in range(2, n + 1):
        if i % 2 == 0:
            nums[i] = nums[i // 2]
        else:
            nums[i] = nums[i // 2] + nums[i // 2 + 1]
        if nums[i] > max_value:
            max_value = nums[i]
    return max_value
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), since we generate each nums[i] once and compare for max in one pass.
- **Space Complexity:** O(n), needs an array of n+1 elements.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you reduce the space usage if only the max is required (not the whole array)?  
  *Hint: Try using just two variables for the previous values needed for step i.*

- What if the array construction rules change (different recurrence)?  
  *Hint: Consider how to generalize your dynamic programming approach.*

- Can you output not only the max but all indices where max occurs?  
  *Hint: Traverse nums and collect all i where nums[i] == max.*

### Summary
This is a direct simulation/dynamic programming problem with O(n) time and space. The solution builds up nums while keeping track of the maximum. This pattern (fill array by recurrence, track max/min as you go) is commonly used in dynamic programming and can be seen in many array recursion/generation problems.


### Flashcard
Simulate array construction and track the maximum value.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- Largest Element in an Array after Merge Operations(largest-element-in-an-array-after-merge-operations) (Medium)