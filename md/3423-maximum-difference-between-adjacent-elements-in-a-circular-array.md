### Leetcode 3423 (Easy): Maximum Difference Between Adjacent Elements in a Circular Array [Practice](https://leetcode.com/problems/maximum-difference-between-adjacent-elements-in-a-circular-array)

### Description  
Given an array of integers, treat it as a **circular array**: the element after the last is the first. You are to find the **maximum absolute difference** between any two adjacent elements, considering this circular property. That is, the difference between the last and first element must also be checked as "adjacent".

### Examples  

**Example 1:**  
Input: `[1,2,4]`  
Output: `3`  
*Explanation: The absolute differences are |1 − 2| = 1, |2 − 4| = 2, |4 − 1| = 3. The maximum is 3.*

**Example 2:**  
Input: `[-5,-10,-5]`  
Output: `5`  
*Explanation: The absolute differences are |-5 − (−10)| = 5, |−10 − (−5)| = 5, |−5 − (−5)| = 0. The maximum is 5.*

**Example 3:**  
Input: `[10, 20]`  
Output: `10`  
*Explanation: The absolute differences are |10 − 20| = 10, |20 − 10| = 10. The maximum is 10.*

### Thought Process (as if you’re the interviewee)  
- First, I need to compare all pairs of *adjacent* elements, but since the array is circular, the last and first elements should also be compared.  
- **Brute-force approach:** For each element, calculate the absolute difference with the next element, and for the last element, calculate the difference with the first element (wrap around with modulus).  
- **Optimized approach:** Since the brute-force is already O(n) and the array size is up to 100, an O(n) single pass to compute the max of all adjacent absolute differences (including the wrap-around) is both simple and optimal.  
- There's no benefit in sorting or other complex patterns, as maximum difference might lie between any two adjacent numbers due to the circular property and the variety of possible negative values.

### Corner cases to consider  
- Arrays of size 2 (wraps around between both elements, which are adjacent twice)
- Arrays where all elements are equal (difference should be 0)
- Negative numbers and mixed-sign numbers
- Array with alternating high/low values
- Minimal or maximal constraints on element value

### Solution

```python
def max_adjacent_difference(nums):
    # Handle empty array or single element defensively
    if not nums or len(nums) < 2:
        return 0

    n = len(nums)
    max_diff = 0

    for i in range(n):
        # (i + 1) % n wraps around to the start for the last element
        diff = abs(nums[i] - nums[(i + 1) % n])
        if diff > max_diff:
            max_diff = diff

    return max_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We process each of the n elements once, computing and comparing adjacent differences.
- **Space Complexity:** O(1) — No additional data structures are needed; only a couple of integer variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find the *index pair* where the maximum difference occurs?  
  *Hint: Track the index each time you update the maximum.*

- Could you return both the maximum difference and all index pairs that produce it?  
  *Hint: Use a list to collect pairs when you find or tie the max.*

- How would you solve the same problem if the array is not circular?  
  *Hint: The loop would stop at n-1, not n, and no wrap-around is necessary.*

### Summary
This problem exemplifies the *adjacent pair scanning* pattern with a circular extension: considering elements at the ends as adjacent. It demonstrates careful handling of indices (using `(i+1)%n`), and is a frequent sub-routine in problems involving cycles, patterns, or ring buffers. The time and space optimal solution uses a single linear scan and tracks a running maximum.


### Flashcard
Compute absolute differences between all adjacent pairs (including last and first due to circularity); return the maximum difference.

### Tags
Array(#array)

### Similar Problems
