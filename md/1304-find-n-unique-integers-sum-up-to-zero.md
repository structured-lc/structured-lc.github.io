### Leetcode 1304 (Easy): Find N Unique Integers Sum up to Zero [Practice](https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero)

### Description  
Given an integer n, return any array containing n unique integers such that they add up to 0.

### Examples  
**Example 1:**  
Input: `n = 5`  
Output: `[-7,-1,1,3,4]`  
*Explanation: The output contains 5 unique integers with sum 0.*

**Example 2:**  
Input: `n = 3`  
Output: `[-1,0,1]`  
*Explanation: -1 + 0 + 1 = 0, all numbers unique.*

**Example 3:**  
Input: `n = 1`  
Output: ``  
*Explanation: Only option is 0 sum.*

### Thought Process (as if you’re the interviewee)  
- Need n **unique** integers totaling zero.
- Use symmetric pairs: for k = 1 to ⌊n/2⌋, add k and -k. If n is odd, include 0.
- This ensures all unique values and sum zero.
- Construct incrementally and return.

### Corner cases to consider  
- n = 1: return .
- n is even or odd (need to check both cases).
- Large n.

### Solution

```python
def sumZero(n):
    res = []
    # Add pairs i and -i for i = 1 .. n//2
    for i in range(1, n // 2 + 1):
        res.append(i)
        res.append(-i)
    if n % 2 == 1:
        res.append(0)
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), as we create n elements in a list.
- **Space Complexity:** O(n), output array.


### Potential follow-up questions (as if you’re the interviewer)  
- How would you generalize if sum must be k instead of zero?
  *Hint: Build as above, then add k at the end and adjust other elements accordingly.*

- How to do this with all elements strictly positive or negative?
  *Hint: Not possible for zero sum with all positive or all negative unless n=0.*

- Can the result be generated in order with no extra space?
  *Hint: Yield values directly in a generator as you go.*

### Summary
Very common **two-pointer symmetric construction** pattern to resolve fixed-sum problems with uniqueness. Pattern applies broadly to array sum constraints.


### Flashcard
Build the result using symmetric pairs (k, -k) for 1 ≤ k ≤ ⌊n/2⌋, and add 0 if n is odd, to get n unique integers summing to zero.

### Tags
Array(#array), Math(#math)

### Similar Problems
