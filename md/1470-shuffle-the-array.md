### Leetcode 1470 (Easy): Shuffle the Array [Practice](https://leetcode.com/problems/shuffle-the-array)

### Description  
Given an array nums consisting of 2n elements in the form `[x₁,x₂,...,xₙ,y₁,y₂,...,yₙ]`, return the array in the form `[x₁,y₁,x₂,y₂,...,xₙ,yₙ]` (that is, interleaving x and y pairs).

### Examples  
**Example 1:**  
Input: `nums = [2,5,1,3,4,7], n = 3`  
Output: `[2,3,5,4,1,7]`  
*Explanation: First part [2,5,1], second part [3,4,7], after shuffling: [2,3,5,4,1,7]*

**Example 2:**  
Input: `nums = [1,2,3,4,4,3,2,1], n = 4`  
Output: `[1,4,2,3,3,2,4,1]`  
*Explanation: Interleave [1,2,3,4] and [4,3,2,1].*

**Example 3:**  
Input: `nums = [1,1,2,2], n = 2`  
Output: `[1,2,1,2]`  
*Explanation: Interleave [1,1] and [2,2].*

### Thought Process (as if you’re the interviewee)  
The core task is: take the first n elements and second n elements and alternate them. A simple O(n) solution would use an output array and two pointers: i for 0..n-1 and j for n..2n-1.

### Corner cases to consider  
- n = 1 (array of length 2)
- All elements are the same
- Maximum array size
- nums is empty (though per constraints, n ≥ 1)

### Solution

```python
def shuffle(nums, n):
    result = [0] * (2 * n)
    for i in range(n):
        result[2 * i] = nums[i]
        result[2 * i + 1] = nums[i + n]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), with single loop through n.
- **Space Complexity:** O(n), for result array (required by problem, unless in-place is requested)

### Potential follow-up questions (as if you’re the interviewer)  

- (Can you do it in-place without extra array?)  
  *Hint: Try encoding two numbers into each element using modulus/math encoding.*

- (How would you modify if there are k groups instead of 2?)  
  *Hint: Generalize interleaving for k groups with step size.*

- (What if the array is immutable?)  
  *Hint: Must return a new array, can't modify in-place.*

### Summary
A simple array manipulation problem, it reinforces index math and understanding how to interleave two lists. Patterns like two-pointer or index-mapping occur in merging/sort/shuffle-related interview questions.


### Flashcard
Interleave the first n and last n elements: result[2i] = nums[i], result[2i+1] = nums[i+n] for 0 ≤ i < n.

### Tags
Array(#array)

### Similar Problems
