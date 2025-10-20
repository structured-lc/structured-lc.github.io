### Leetcode 775 (Medium): Global and Local Inversions [Practice](https://leetcode.com/problems/global-and-local-inversions)

### Description  
Given an array **nums** of length n, which is a permutation of all integers in the range [0, n - 1], determine whether the number of **global inversions** in the array is equal to the number of **local inversions**.

- A **global inversion** is a pair (i, j) where 0 ≤ i < j < n, and nums[i] > nums[j].
- A **local inversion** is a pair of adjacent elements (i) where 0 ≤ i < n-1 and nums[i] > nums[i+1].

Return `True` if every global inversion is also a local inversion; otherwise, return `False`[1][2][3].

### Examples  

**Example 1:**  
Input: `[1,0,2]`  
Output: `True`  
Explanation:  
- Global inversions: (0,1) → nums=1, nums[1]=0 (since 1 > 0)
- Local inversions: i=0; nums=1, nums[1]=0 (since 1 > 0)
- Both counts are 1.

**Example 2:**  
Input: `[1,2,0]`  
Output: `False`  
Explanation:  
- Global inversions: (0,2) (1 > 0), (1,2) (2 > 0) ⇒ 2 total
- Local inversion: (1,2) (2 > 0) ⇒ only 1 local inversion
- So, not all global inversions are local.

**Example 3:**  
Input: `[0,2,1]`  
Output: `True`  
Explanation:  
- Global inversion: (1,2) (2 > 1)
- Local inversion: (1,2) (2 > 1)
- Counts match, so return True.

### Thought Process (as if you’re the interviewee)  
The task is to check if every global inversion is also a local one.  
- **Brute-force approach:** Count all global inversions (O(n²)), compare it to local inversions (easy, O(n)). This is too slow for n up to 10⁵.
- **Observation:** Every local inversion is also global, but a global inversion is *local* only if j = i + 1. If there exists a pair (i, j) with j > i + 1 and nums[i] > nums[j], that's a non-local global inversion (forbidden).
- So: if all global inversions are local, then the array must NOT have any "far" (non-local) swaps.
- **Optimization:** For each i, if nums[i] > nums[j] with j ≥ i+2, that's forbidden.  
  Since nums is a permutation of [0, n-1], if any element is further than one away from its sorted index, that's a problem.
- We only need to check that for every i, abs(nums[i] - i) ≤ 1. If abs(nums[i] - i) > 1 at any position, there must be a non-local inversion.
- This finds the answer in a single pass, O(n) time[4].

### Corner cases to consider  
- Array of length 1 (no inversions, return True)
- Already sorted array ([0,1,2,...]), should return True
- Fully reversed array ([n-1,...,0]), will return False if n > 2
- Cases where elements are displaced more than one index
- Small arrays ([0,1], [1,0]); trivial to verify

### Solution

```python
def isIdealPermutation(nums):
    n = len(nums)
    for i in range(n):
        # If any element is more than 1 step away from its sorted position,
        # i.e., non-local inversion exists, return False.
        if abs(nums[i] - i) > 1:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass through the array to check the condition.
- **Space Complexity:** O(1) — No extra space used outside input variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find and count the number of global inversions in O(n log n)?
  *Hint: Try using a merge-sort-like approach for inversion counting.*

- Can you design an algorithm that counts all *non-local* global inversions?
  *Hint: For each i, check min in the suffix to the right of i+1.*

- If the input is not a permutation, but may have duplicates, how would you modify your solution?
  *Hint: Handling abs(nums[i]-i) > 1 may not suffice if not a permutation; consider all definitions carefully.*

### Summary
The key observation is that all non-local global inversions break the equality, which can be detected by checking if any element has moved more than one position from its sorted index.  
This translates to a single scan with abs(nums[i] - i) > 1.  
This is a classic “index displacement” check, related to problems involving sorted order and inversions, and can be applied to permutation/array manipulations with constrained swaps.


### Flashcard
Check if for all i, nums[i] ≤ i+1; if any nums[i] > i+1, there exists a non-local global inversion.

### Tags
Array(#array), Math(#math)

### Similar Problems
