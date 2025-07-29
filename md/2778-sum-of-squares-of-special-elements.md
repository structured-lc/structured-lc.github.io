### Leetcode 2778 (Easy): Sum of Squares of Special Elements  [Practice](https://leetcode.com/problems/sum-of-squares-of-special-elements)

### Description  
Given an array of integers nums of length n, find the sum of the squares of all "special elements" in the array.  
A special element is defined as an element whose 1-based index divides the length of the array evenly (that is, n % i == 0 for 1-based index i).  
Return the total sum of the squares of those special elements.

### Examples  

**Example 1:**  
Input: `nums = [2, 7, 1, 19, 18, 3]`  
Output: `63`  
*Explanation: n = 6. The special 1-based indices are 1, 2, 3, 6 (since 6 % i == 0). So the elements are 2 (i=1), 7 (i=2), 1 (i=3), 3 (i=6).  
Sum = 2² + 7² + 1² + 3² = 4 + 49 + 1 + 9 = 63.*

**Example 2:**  
Input: `nums = [3, 1, 4, 1, 5, 9]`  
Output: `107`  
*Explanation: n = 6. Special indices are 1, 2, 3, 6. Elements are 3, 1, 4, 9.  
Sum = 3² + 1² + 4² + 9² = 9 + 1 + 16 + 81 = 107.*

**Example 3:**  
Input: `nums = [8, 5]`  
Output: `89`  
*Explanation: n = 2. Special indices are 1, 2. Elements are 8, 5.  
Sum = 8² + 5² = 64 + 25 = 89.*

### Thought Process (as if you’re the interviewee)  
- Start by clarifying what a "special element" is: An element is special if its 1-based index divides the array length (n) exactly (i.e., n % i == 0 with i starting from 1).
- Brute-force: For each index i in nums (convert 0-based to 1-based as i+1), check if n % (i+1) == 0. If true, square nums[i] and add to sum.
- Since we’re simply iterating through the array once and applying a constant-time check per index, this approach is efficient (linear time).
- There is no need for further optimization as the constraints are very mild for an O(n) time solution.

### Corner cases to consider  
- Empty array (`nums = []`) → should return 0.
- Array of length 1 (`nums = [x]`) → index 1 always divides 1, so output should be x².
- All numbers are the same.
- Array with both positive and negative numbers.
- Very large/small numbers (test for integer overflows in other languages).
- Single element at the only special index.

### Solution

```python
def sumOfSquares(nums):
    # Get the length of the array
    n = len(nums)
    total = 0
    
    # Enumerate using 1-based index by starting enumerate at 1
    for i, val in enumerate(nums, 1):
        # Check if i divides n exactly
        if n % i == 0:
            total += val * val  # add square to total
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We traverse the array once, checking the condition for each index.
- **Space Complexity:** O(1) — Only a fixed number of variables are used for tracking the sum.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is extremely large (e.g., in the range of 10⁶–10⁷)?  
  *Hint: Can your logic still run efficiently in linear time?*

- How would you solve this if you needed the indices themselves, not their sum?  
  *Hint: Collect the valid indices in a list instead of summing squares directly.*

- Can you solve it recursively?  
  *Hint: Use recursion with index and base case when index reaches len(nums).*

### Summary
This problem uses a simple single-pass traversal pattern with index-based filtering — a common pattern for selection and transformation in arrays. The approach cleanly demonstrates mapping between 0-based and 1-based indices and is widely applicable to problems based on divisibility, special indices, or in-place filtering.