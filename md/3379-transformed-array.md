### Leetcode 3379 (Easy): Transformed Array [Practice](https://leetcode.com/problems/transformed-array)

### Description  
You are given an integer array **nums** that should be treated as *circular* (so index wrapping is allowed). You need to create a new array **result** of the same size where, for every index i,  
result[i] = nums[(i + nums[i] % n + n) % n],  
where n is the length of the array, and "%" means modulo operation (ensuring positive index wrapping even with negative values).

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 1]`  
Output: `[1, 2, 3]`  
*Explanation:*
- n = 3
- i=0: idx = (0 + 2 % 3 + 3) % 3 = (0 + 2 + 3) % 3 = 5 % 3 = 2, result=nums[2]=1  
- i=1: idx = (1 + 3 % 3 + 3) % 3 = (1 + 0 + 3) % 3 = 4 % 3 = 1, result[1]=nums[1]=3  
- i=2: idx = (2 + 1 % 3 + 3) % 3 = (2 + 1 + 3) % 3 = 6 % 3 = 0, result[2]=nums=2

**Example 2:**  
Input: `nums = [0, 1, 2, 3]`  
Output: `[0, 2, 3, 1]`  
*Explanation:*
- n = 4
- i=0: idx = (0 + 0 % 4 + 4) % 4 = 4 % 4 = 0, result=nums=0  
- i=1: idx = (1 + 1 % 4 + 4) % 4 = 6 % 4 = 2, result[1]=nums[2]=2  
- i=2: idx = (2 + 2 % 4 + 4) % 4 = 8 % 4 = 0, result[2]=nums=0  
- i=3: idx = (3 + 3 % 4 + 4) % 4 = 10 % 4 = 2, result[3]=nums[2]=2  

**Example 3:**  
Input: `nums = [-1, -2, -3]`  
Output: `[3, 1, 2]`  
*Explanation:*  
- n = 3
- i=0: idx = (0 + (-1) % 3 + 3) % 3 = (0 + 2 + 3) % 3 = 5 % 3 = 2 ⇒ nums[2] = -3  
- i=1: idx = (1 + (-2) % 3 + 3) % 3 = (1 + 1 + 3) % 3 = 5 % 3 = 2 ⇒ nums[2] = -3  
- i=2: idx = (2 + (-3) % 3 + 3) % 3 = (2 + 0 + 3) % 3 = 5 % 3 = 2 ⇒ nums[2] = -3  

(Note: Negative numbers in Python's modulo yield positive results.)

### Thought Process (as if you’re the interviewee)  
- The task is a straightforward simulation of the formula given in the problem statement.
- For each index i, directly compute the new index by the formula and take value from nums at that index.
- Since the formula ensures circular access and handles negatives, there's no need for extra care about index bounds.
- Brute-force is simply iterating over nums and applying the formula, O(n) time.
- No need to optimize further since each element is transformed once; O(n) is optimal.

### Corner cases to consider  
- Empty array (n = 0): Should return an empty list.
- All elements are zero.
- Some or all elements are negative.
- Single element arrays.
- All elements are the same.
- Elements larger than or equal to len(nums).

### Solution

```python
def constructTransformedArray(nums):
    # Calculate the length of the input array
    n = len(nums)
    # Initialize the result array with the same size
    result = []
    # Iterate through each index and compute the target index using the formula
    for i, num in enumerate(nums):
        # Compute wrapped index taking care with negative numbers
        idx = (i + num % n + n) % n
        result.append(nums[idx])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass through the array, computing a formula and accessing nums is O(1) for each index.
- **Space Complexity:** O(n) — The result array stores a copy of n elements. No extra space beyond output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums is extremely large and you must compute the array in-place?
  *Hint: Can you avoid extra storage by reading and writing carefully, or by encoding new and old values?*

- What if nums may contain object references instead of integers?
  *Hint: Does your formula or result logic rely on integer properties?*

- Suppose instead of simple addition, the index was determined by a different function of i and nums[i]?  
  *Hint: Can you generalize your implementation? Would time/space complexity change?*

### Summary
The solution uses direct array simulation with index wrapping, a common approach for circular array problems using modular arithmetic. This O(n) single-pass pattern is frequently seen in LeetCode problems involving rotation, jumps, or cyclic index mapping, making this problem a typical example of the "array transform with modular indexing" coding pattern.