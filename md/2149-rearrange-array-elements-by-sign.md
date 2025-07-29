### Leetcode 2149 (Medium): Rearrange Array Elements by Sign [Practice](https://leetcode.com/problems/rearrange-array-elements-by-sign)

### Description  
You are given an integer array `nums` of even length containing an **equal** number of positive and negative integers.  
Your task is to rearrange the elements so that:
- You alternate positive and negative numbers, i.e., every consecutive pair has opposite signs.
- The **order** of positive numbers and the order of negative numbers should be kept as given in the input.
- The rearranged array **must start with a positive number**.
Return the rearranged array.

### Examples  

**Example 1:**  
Input: `[3,1,-2,-5,2,-4]`  
Output: `[3,-2,1,-5,2,-4]`  
*Explanation: The positive numbers in order: 3, 1, 2. The negative numbers: -2, -5, -4.  
We alternate starting with positive: 3 (pos), -2 (neg), 1 (pos), -5 (neg), 2 (pos), -4 (neg).*

**Example 2:**  
Input: `[-1,1]`  
Output: `[1,-1]`  
*Explanation: The array has one positive and one negative, so rearrange to start with positive 1, then -1.*

**Example 3:**  
Input: `[1,-1,2,-2]`  
Output: `[1,-1,2,-2]`  
*Explanation: The order is already correct: positive 1, negative -1, positive 2, negative -2.*

### Thought Process (as if you’re the interviewee)  
First, observe that we are guaranteed an equal number of positives and negatives, and always an even length.  
Brute force idea:  
- Extract all positives and negatives into two separate lists while maintaining their original order.
- Then, rebuild the result array by alternately taking one from positives and one from negatives, starting with positive.

Time: O(n) for scan, O(n) for rebuild. Space: O(n) for positives, O(n) for negatives.

Optimization discussion:
- Can we do this in O(1) extra space? It’s much trickier without changing order.
- But the most straightforward and robust approach for interviews is to use the auxiliary arrays since the space constraint is not strict here and the order must be preserved.

Tradeoff:
- **O(n)** time, **O(n)** space — clean and meets all constraints.

### Corner cases to consider  
- Input array of length 2: `[1,-1]` or `[-1,1]`  
- The input is already in required order.
- Large arrays.
- Input with repeated positives or negatives (e.g. `[2, 2, -1, -1]`)
- Input where all positives are at start or end.
- No zeroes (since numbers are strictly positive or negative per the problem).

### Solution

```python
def rearrangeArray(nums):
    # Separate out positives and negatives, preserving their order
    positives = []
    negatives = []
    for num in nums:
        if num > 0:
            positives.append(num)
        else:
            negatives.append(num)
            
    # Rebuild result, alternating starting with positive
    result = []
    for i in range(len(positives)):
        result.append(positives[i])
        result.append(negatives[i])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  One pass to separate positives and negatives, and one pass to interleave them. Both are O(n).

- **Space Complexity:** O(n).  
  We use two auxiliary arrays to hold the positive and negative numbers (each up to n⁄2 elements), and another result array (can re-use input).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this **in-place** (O(1) space)?  
  *Hint: This is challenging because of the "preserve order" constraint, but consider variations where order doesn't matter.*

- How would you handle **arrays where counts of positives and negatives are unequal**?  
  *Hint: Think about what to do with extra positives/negatives and where to place them.*

- Suppose **zero is allowed**, and you have to treat it as either positive or negative. How does that change the solution?  
  *Hint: Decide how to categorize zeros; possibly by counting as positive, negative, or neither.*

### Summary
This problem demonstrates the **two-list partitioning** pattern, then merging while preserving original order. This approach commonly appears in problems that require stable rearrangement (relative order) by some property (e.g. even-odd, sign, category). 
The same logic can be adapted for alternate even-odd placement, or any two-group alternation where relative order matters. The key constraint (maintain order) makes O(n) space the cleanest solution.