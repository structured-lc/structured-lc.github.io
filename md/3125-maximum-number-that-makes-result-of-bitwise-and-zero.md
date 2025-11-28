### Leetcode 3125 (Medium): Maximum Number That Makes Result of Bitwise AND Zero [Practice](https://leetcode.com/problems/maximum-number-that-makes-result-of-bitwise-and-zero)

### Description  
Given an integer **n**, return the **maximum integer x** such that **x ≤ n** and the bitwise **AND** of all numbers in the range **[x, n]** is 0.

You are looking for the largest starting point **x**, less than or equal to **n**, so that the AND for all numbers from **x** up to **n** is exactly 0. This is essentially asking: for which largest **x** does **x & (x+1) & ... & n == 0**.

### Examples  

**Example 1:**  
Input: `n = 7`  
Output: `3`  
*Explanation: AND of [3, 4, 5, 6, 7] = 0, but any higher x (4, 5, 6, 7) does not give AND 0.*

**Example 2:**  
Input: `n = 9`  
Output: `7`  
*Explanation: AND of [7, 8, 9] = 0. For x > 7, AND > 0.*

**Example 3:**  
Input: `n = 17`  
Output: `15`  
*Explanation: AND of [15, 16, 17] = 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach**:  
  For each x from n down to 1, calculate the AND over [x, n] and check if it is 0. Return the largest such x.

  This is too slow for large n (up to 10¹⁵).

- **Observation**:  
  The bitwise AND of a range [x, n] becomes 0 only when the range covers all the bits up to the highest set bit in n. For the AND to become zero, the range must include a number that starts with a new higher bit (i.e., a power of two greater than x).  
  More concretely, **the largest x such that x < 2ʰ, where 2ʰ is the smallest power of two greater than n, will make [x, n] cover all bits up to the highest bit of n**.

- **Efficient approach**:
  1. Find the position of the highest set bit in n (let its bit-length be k).
  2. Construct x = 2^(k-1) - 1 (i.e., all k-1 bits are set).
  3. That x is always ≤ n, since n has a 1 at position k-1 and possibly other bits below.
  4. Return x.

- **Why this works**:  
  When you AND all numbers from x up to n, and x is right below a power of two, you are guaranteed to cover all configurations in the lower k-1 bits, so the AND must become zero.

- **Trade-off**:  
  O(1) time—no need to simulate or loop, just bitwise math.

### Corner cases to consider  
- n = 1 (Minimum input size).
- n is already a number like 2, 3, 7, 15, 31 (all bits below a power of two set).
- n is a power of two (e.g., 8, 16).
- Very large n (near 10¹⁵).
- Numbers just above or below a power of two.

### Solution

```python
def maxNumber(n: int) -> int:
    # For n, find the position of the highest set bit (bit_length)
    # Then return x = (1 << (n.bit_length() - 1)) - 1
    return (1 << (n.bit_length() - 1)) - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  All operations are constant-time bit manipulations for Python's arbitrary-length integers.

- **Space Complexity:** O(1).  
  Only a few variables, no extra space proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we ask for the count of all possible x ≤ n where the AND of [x, n] is zero?  
  *Hint: Think about how many leading 1's you can set below n's highest bit.*

- How would you do this for a range of n values efficiently?  
  *Hint: Precompute powers of two, or process in batches using bit tricks.*

- What changes if you want the bitwise OR to be all 1's instead of AND being 0?  
  *Hint: What range is needed to guarantee all bits set?*

### Summary
This problem is a variant of **bit-manipulation tricks** and relies on understanding how sequences of contiguous integers toggle bits. The core approach is applicable for any problem where we need to cover all bit combinations within a range, a pattern sometimes called "covering all bits in a range." This style of thinking surfaces often in *range-AND/OR* problems and is essential in high-efficiency number manipulation for large scales.


### Flashcard
AND of range [x, n] is zero iff the range includes numbers with all bits set up to the highest bit in n. Binary search or observe that x must be ≤ highest_power_of_2 ≤ n.

### Tags
String(#string), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
