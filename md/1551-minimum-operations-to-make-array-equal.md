### Leetcode 1551 (Medium): Minimum Operations to Make Array Equal [Practice](https://leetcode.com/problems/minimum-operations-to-make-array-equal)

### Description  
Given an integer `n`, consider the array `arr` of length `n` where `arr[i] = 2*i + 1` (for 0 ≤ i < n), for example `[1,3,5,7,9]` if n=5. In one operation, you choose any two indices x and y (x ≠ y), subtract 1 from `arr[x]` and add 1 to `arr[y]`. Return the minimum number of such operations needed so all elements in the array are equal.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `2`  
*Explanation: Initial array: [1,3,5] → [2,3,4] after one operation → [3,3,3] after second operation.*

**Example 2:**  
Input: `n = 6`  
Output: `9`  
*Explanation: Initial array: [1,3,5,7,9,11] → Number of operations required is 9.*

**Example 3:**  
Input: `n = 1`  
Output: `0`  
*Explanation: Array is [1], already equal. No operation needed.*

### Thought Process (as if you’re the interviewee)  
First, we see the array is always a sequence of odd numbers. The mean (after all operations) will be the median value, so every element must become the median.

Brute-force: Pair up the lowest and highest numbers and adjust them to the median, counting swaps. But for each such pair (i, n - i - 1), the sum of needed increments/decrements is predictable.

Optimized: Only the first ⌊n/2⌋ elements need to be processed; for each, number of moves needed is median - arr[i]. Or, simply sum over the first ⌊n/2⌋ elements (as the latter half will be symmetrically opposite).

General formula:
If n is odd: operations = (n//2) × (n//2 + 1)
If n is even: operations = (n//2) × (n//2)

So, for any n: result = (n ⨉ n)//4

This yields O(1) time and space.

### Corner cases to consider  
- n = 1 (array is already equal, no operation needed)
- n is even or odd
- Large n (should still be O(1))

### Solution

```python
def minOperations(n):
    # For both even and odd n, formula below works (integer division)
    return (n * n) // 4
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — just arithmetic, independent of input
- **Space Complexity:** O(1) — uses constant space

### Potential follow-up questions (as if you’re the interviewer)  

- What if the operation allowed incrementing or decrementing by more than 1?  
  *Hint: Think how the generalization would affect the move-count or formula.*

- How would the answer change if the initial array was not an arithmetic progression?  
  *Hint: Could you find a median or another invariant?*

- Could you output the sequence of moves?  
  *Hint: Try to construct an explicit sequence since the process is deterministic.*

### Summary
Use the observation about pairing closest-to-farthest elements to the median. This is a common symmetric-pairing pattern, where you only need to process half the array and multiply out the difference. Pattern is similar to minimizing the cost to equalize via pairwise balancing.


### Flashcard
Array is odd sequence [1,3,5,...]; median is n. Sum first ⌊n/2⌋ differences: (n-1) + (n-3) + ... = arithmetic series = n²/4 or (n²-1)/4 depending on parity.

### Tags
Math(#math)

### Similar Problems
- Minimum Number of Operations to Make Arrays Similar(minimum-number-of-operations-to-make-arrays-similar) (Hard)
- Minimum Operations to Make Array Equal II(minimum-operations-to-make-array-equal-ii) (Medium)