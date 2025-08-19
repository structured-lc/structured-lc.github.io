### Leetcode 31 (Medium): Next Permutation [Practice](https://leetcode.com/problems/next-permutation)

### Description  
Given an array of integers, rearrange its numbers to form the lexicographically next greater permutation of numbers using its digits. If such arrangement is not possible (the sequence is the highest permutation), rearrange it as the lowest possible order (i.e., sorted in ascending order). The rearrangement must be done in-place and with only constant extra memory.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `[1,3,2]`  
*Explanation: The next permutation after [1,2,3] is [1,3,2], as 3 is swapped with 2 to get the next greater arrangement.*

**Example 2:**  
Input: `nums = [3,2,1]`  
Output: `[1,2,3]`  
*Explanation: The array is already the highest possible permutation, so we return the lowest possible order by sorting it ascendingly.*

**Example 3:**  
Input: `nums = [1,1,5]`  
Output: `[1,5,1]`  
*Explanation: The next permutation swaps the last two elements to get [1,5,1].*

### Thought Process (as if you’re the interviewee)  
My brute-force idea would be to generate all possible permutations, sort them, and find the next biggest one after the current array. However, this isn't feasible due to factorial time complexity.

We need an efficient solution, ideally \(\mathcal{O}(n)\) time and \(\mathcal{O}(1)\) space. Observing the problem, the trick is to simulate what "next lexicographical" means:

- Start from the end and find the first index (let's call it pivot) where nums[i] < nums[i+1]. This is where the next permutation differs.
- Then, find the next larger element to nums[i] to its right and swap them.
- Finally, reverse the sequence after position i to get the smallest possible arrangement in that tail to complete the next permutation.

If no pivot is found (the sequence is descending), we reverse the entire array.

This is the optimal approach and matches the requirement to rearrange in-place.

### Corner cases to consider  
- Empty array (should handle gracefully; nothing to change)
- Single element array (no permutation possible)
- All elements same (e.g., `[2,2,2]`; output should remain unchanged)
- Array is already in the highest permutation (should reverse to lowest)
- Array is already in lowest permutation (should make the smallest change)
- Array is partially descending (test the correctness of the reverse step)

### Solution

```python
def nextPermutation(nums):
    n = len(nums)
    if n <= 1:
        return
    
    # 1. Find the first decreasing element from the right
    i = n - 2
    while i >= 0 and nums[i] >= nums[i+1]:
        i -= 1

    # 2. If such an element is found, find the next greater element from the right and swap
    if i >= 0:
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        # Swap pivot (i) with successor (j)
        nums[i], nums[j] = nums[j], nums[i]

    # 3. Reverse the sequence after the pivot
    left, right = i + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We perform at most two linear passes: one to find the pivot and successor, another to reverse the suffix.
- **Space Complexity:** O(1) — All operations are done in place, no extra data structures allocated except variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle repeated numbers in the array?  
  *Hint: Observe that the algorithm finds the first "rise" from the back regardless of uniqueness.*

- Can you generate all permutations in lexicographical order given this as a subroutine?  
  *Hint: Use this function repeatedly to generate permutations until the array reverts to the starting state.*

- Can this logic be adapted for strings or linked lists?  
  *Hint: For strings, convert to a char list; for linked lists, handling in-place swap and reverse is more complex.*

### Summary  
This solution uses a two-pointer approach to find the next lexicographical permutation in-place. It identifies a pivot, finds the correct element to swap, and reverses the suffix efficiently. This "next permutation" pattern is common for permutation generation, backtracking, and combinatorial problems.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Permutations(permutations) (Medium)
- Permutations II(permutations-ii) (Medium)
- Permutation Sequence(permutation-sequence) (Hard)
- Palindrome Permutation II(palindrome-permutation-ii) (Medium)
- Minimum Adjacent Swaps to Reach the Kth Smallest Number(minimum-adjacent-swaps-to-reach-the-kth-smallest-number) (Medium)