### Leetcode 2717 (Easy): Semi-Ordered Permutation [Practice](https://leetcode.com/problems/semi-ordered-permutation)

### Description  
You are given a 0-indexed permutation of n integers, nums.  
A permutation is called **semi-ordered** if the first number equals 1 and the last number equals n.  
You can **swap any two adjacent elements** any number of times.  
Return the **minimum number of operations** needed to make nums a semi-ordered permutation.

### Examples  

**Example 1:**  
Input: `nums = [2,1,4,3]`  
Output: `2`  
Explanation:  
- Swap indices 0 and 1: `[1,2,4,3]`
- Swap indices 2 and 3: `[1,2,3,4]`
- Both criteria are met with 2 swaps.

**Example 2:**  
Input: `nums = [2,4,1,3]`  
Output: `3`  
Explanation:  
- Swap 1 left by two steps: `[2,1,4,3]`, then `[1,2,4,3]`
- Swap n (4) to last: `[1,2,3,4]`
- Total 3 swaps.

**Example 3:**  
Input: `nums = [1,3,4,2,5]`  
Output: `0`  
Explanation:  
- Already semi-ordered: first is 1, last is 5.

### Thought Process (as if you’re the interviewee)  
First, clarify:  
- We only care about 1 (should be first) and n (should be last).  
- Swaps can be made between any adjacent elements.

**Brute-force:**  
- Try all possible swaps? Too slow; unnecessary since only 1 and n’s locations matter.

**Optimize:**  
- Find index of 1 (call it i₁) and n (call it iₙ).
- Move 1 to index 0: needs i₁ swaps.
- Move n to the last index: needs (len(nums) - 1 - iₙ) swaps.

Key insight:  
- If i₁ < iₙ: moving 1 left doesn’t affect n; sum the two.
- If i₁ > iₙ: after moving 1 left, n’s index is reduced by 1 (since 1 passed n); total swaps = i₁ + (len(nums) - 1 - iₙ) - 1.

Why? Each swap to bring 1 left will push n right (if n is to the left of 1).

### Corner cases to consider  
- nums is already semi-ordered: no swaps needed.
- 1 is already at the front, or n at the end.
- 1 and n are next to each other (either order).
- Small arrays (length 2).
- Maximum swaps (reverse order).

### Solution

```python
def semiOrderedPermutation(nums):
    n = len(nums)
    idx1 = nums.index(1)        # index of 1
    idxn = nums.index(n)        # index of n

    # If 1 comes before n, the swaps to bring both to correct places don't overlap
    if idx1 < idxn:
        return idx1 + (n - 1 - idxn)
    # If 1 comes after n, moving 1 left passes n, so subtract 1
    else:
        return idx1 + (n - 1 - idxn) - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Locating the indices of 1 and n both take O(n).
  - Rest is O(1) arithmetic.
- **Space Complexity:** O(1)
  - Only a few variables; no extra space used apart from input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed both ascending order and semi-ordered (strict sort)?
  *Hint: Think of bubble sort minimum moves, not just 1 and n positions.*

- If the allowed operation was not just adjacent swaps?
  *Hint: Would your approach still work if arbitrary swaps are allowed?*

- How would your solution change for doubly-linked lists vs arrays?
  *Hint: Think about the cost and feasibility of adjacent swaps in linked structures.*

### Summary
This problem reduces to finding the minimum moves needed to bring 1 to the front and n to the end using **adjacent swaps**. The pattern is a classic **greedy + index calculation** frequently seen in permutation adjustment and minimum swaps problems. This approach—focusing just on the positions of the most crucial values—applies to a range of similar interview questions involving rearrangement with minimal moves.