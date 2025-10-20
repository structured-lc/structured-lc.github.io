### Leetcode 2568 (Medium): Minimum Impossible OR [Practice](https://leetcode.com/problems/minimum-impossible-or)

### Description  
You are given a 0-indexed integer array **nums**. An integer *x* is called **expressible** from nums if there exists a subsequence (including possibly the whole array or a single element) whose bitwise **OR** equals *x*.

Your task: **Return the smallest positive integer that is not expressible as the bitwise OR of any subsequence of nums.**

A subsequence can pick any elements in any order, but must maintain order from the original array.  
The bitwise OR of a subsequence is calculated by OR'ing all its elements.

### Examples  

**Example 1:**  
Input: `nums = [2,1]`  
Output: `4`  
*Explanation:*
- Subsequence ORs:  
  - [1] → 1  
  - [2] → 2  
  - [2,1] → 2 | 1 = 3  
- So 1, 2, and 3 are all expressible, but 4 is not.

**Example 2:**  
Input: `nums = [5,3,2]`  
Output: `1`  
*Explanation:*
- [5], [3], [2], or any combination always includes at least the bits of 2 (10), 3 (11), or 5 (101).
- There's no way to get a single bit of 1 (i.e., only the least significant bit set).  
- So 1 is not expressible.

**Example 3:**  
Input: `nums = [1,2,4,8]`  
Output: `16`  
*Explanation:*
- All single bits 1, 2, 4, 8 are present.  
- By OR'ing them in any combination, you can get 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15.
- 16 is not possible.

### Thought Process (as if you’re the interviewee)  
Start by considering the definition—*x* is not expressible if it's not an OR of any subsequence.

**Brute-force approach:**  
Try all subsequences, get OR result, check for each possible integer in order if present or not.  
But with n up to 10⁵, this is computationally infeasible.

**Key insight:**  
- The *OR* operation is monotonic: once a bit is set, it can't be unset.
- The subset of possible ORs is determined by which powers of two you can form using combinations of the available numbers.
- The only "impossible" value is a power of two for which *none* of the numbers in nums already sets that bit.
- The smallest such missing power of two is the answer.

**Optimal approach:**  
- Start with ans = 1, then 2, then 4, ... (i.e., powers of two).
- If none of the numbers in nums has the bit corresponding to ans (i.e., ans is not present in nums), then ans is not expressible.
- The answer is the **smallest power of two not found in nums**.

**Why?**  
- Because you can always create lower values when lower powers of two are present, those higher are impossible unless that power of two itself exists.

### Corner cases to consider  
- All numbers are powers of two in order (e.g., [1,2,4,8,16])  
- Multiple duplicates (e.g., [1,1,2,2])  
- Single element array ([n])  
- Large gaps (e.g., [128, 1024, 2048])  
- Array contains 1, or doesn't contain 1  
- All numbers are the same  
- Full range (contains all powers of two up to k)

### Solution

```python
def minImpossibleOR(nums):
    # Use a set for fast lookup
    num_set = set(nums)
    ans = 1
    while ans in num_set:
        # Shift to the next power of two
        ans <<= 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Building the set is O(n)
  - The loop checks at most 32 times (since 2³¹ > 10⁹), so negligible.
- **Space Complexity:** O(n)  
  - The set stores up to n elements for input nums. No extra structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input numbers could be very large (bigger than 2³¹)?
  *Hint: How does this affect your bit-range check?*

- If the array is *streaming*, how would you update your answer efficiently?
  *Hint: Consider maintaining a set or Trie structure.*

- Can you generalize this: what if instead of OR, it was AND or XOR?
  *Hint: How does subset behavior change with different bitwise operators?*

### Summary
This problem is an example of a **bit manipulation / powers-of-two** pattern. The key realization is that the *OR* operation accumulates bits permanently, so the smallest impossible result is the lowest power of two not present.  
This pattern appears in other "minimal unconstructible number" problems, such as subset sum questions or coin change. Constructing a set and iterating through powers of two is a reusable technique for similar constraints.


### Flashcard
The answer is the smallest missing power of two not present in the array.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Brainteaser(#brainteaser)

### Similar Problems
