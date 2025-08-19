### Leetcode 1929 (Easy): Concatenation of Array [Practice](https://leetcode.com/problems/concatenation-of-array)

### Description  
Given an integer array, you need to create a new array that is exactly twice as long. The first half of the new array is a copy of the original, and the second half is another exact copy—so the output array is simply the original array concatenated with itself. For every i (0 ≤ i < n), the result at positions i and i+n are both equal to the iᵗʰ element of nums.

### Examples  

**Example 1:**  
Input: `nums = [1,2,1]`  
Output: `[1,2,1,1,2,1]`  
*Explanation: The result is the original array followed by the same array again: [1,2,1] + [1,2,1] = [1,2,1,1,2,1].*

**Example 2:**  
Input: `nums = [3,4,5]`  
Output: `[3,4,5,3,4,5]`  
*Explanation: Concatenate [3,4,5] with [3,4,5] to get [3,4,5,3,4,5].*

**Example 3:**  
Input: `nums = `  
Output: `[7,7]`  
*Explanation: The array with one element duplicates itself to become [7,7].*

### Thought Process (as if you’re the interviewee)  
First, let's think about what the problem wants: a new array with all elements of nums, then all elements of nums again. The brute-force way is to loop through nums twice, appending each value both times.  
Alternatively, we observe that the new array’s value at index i is just nums[i % n] where n is the length of nums. We can fill a new array of length 2n using this rule.  
Python makes this problem trivial using the + operator or \*2, but in a real interview, I’d implement it using loops to show I can think algorithmically and not just rely on language features.

### Corner cases to consider  
- Empty array input: nums = []  
- Array with one element  
- Array where all elements are the same  
- Large arrays (test efficiency, no integer overflows expected)
- Arrays containing negative numbers or zeros

### Solution

```python
def getConcatenation(nums):
    n = len(nums)
    ans = [0] * (2 * n)  # Initialize result array with size 2n
    for i in range(n):
        # Fill both the iᵗʰ and (i+n)ᵗʰ elements with nums[i]
        ans[i] = nums[i]
        ans[i + n] = nums[i]
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We loop through the original array exactly once, and each assignment is O(1).

- **Space Complexity:** O(n) extra  
  We create a result array of size 2n (so O(n) additional space compared to input).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this in-place if the language/constraints allowed?  
  *Hint: Consider if the original array is resizable and you can append in place.*

- What if the array elements were objects or references instead of integers?  
  *Hint: Be mindful of deep versus shallow copy for objects or references.*

- Can you solve this if memory is severely constrained?  
  *Hint: Can you process the result as a stream or output values one by one?*

### Summary
This problem is a basic application of array manipulation and a classic "construct a new array based on the input" pattern. The logic can be applied to any routine needing concatenation or simple mapping-from-input-to-output by positional rules. It relies on careful indexing and is best approached with a straightforward loop. Variants of this idea show up in problems requiring repetition, sliding windows, or modular access to array elements.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
