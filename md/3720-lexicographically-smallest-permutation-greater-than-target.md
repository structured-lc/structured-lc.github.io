### Leetcode 3720 (Medium): Lexicographically Smallest Permutation Greater Than Target [Practice](https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target)

### Description  
Given two arrays, **nums** and **target**, both of length *n* and containing integers from 1 to *n* with possible duplicates, your task is to find the lexicographically smallest permutation of **nums** that is **strictly greater** than **target**.  
- The output must use all elements from **nums** (including duplicates).
- If no such permutation exists (i.e., all permutations of **nums** are ≤ target), return an empty array.  
For example, if nums = [2,2,3,1] and target = [2,2,1,3], the output should be the smallest permutation of nums that is strictly larger than target.

### Examples  

**Example 1:**  
Input: `nums = [2,2,3,1], target = [2,2,1,3]`  
Output: `[2,3,1,2]`  
*Explanation: The permutations in order are [1,2,2,3], [1,2,3,2], ..., [2,3,1,2]. [2,3,1,2] is the smallest that is greater than [2,2,1,3].*

**Example 2:**  
Input: `nums = [1,1,1], target = [1,1,1]`  
Output: `[]`  
*Explanation: All possible permutations are [1,1,1], which is not greater than target. So, return an empty array.*

**Example 3:**  
Input: `nums = [3,3,1,2], target = [3,1,2,3]`  
Output: `[3,1,3,2]`  
*Explanation: [3,1,2,3] is not greater. Next is [3,1,3,2], which is valid.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Generate all permutations of nums, check which are greater than target, pick smallest. This is **O(n!)** and infeasible for large n.
- **Optimized**:  
  - Instead, use the concept of **next permutation**, but since nums may have duplicates and its current arrangement could be arbitrary, we need to:
    - Sort **nums** to get its lex smallest permutation.
    - From there, repeatedly generate the next greater permutation until we find one that is strictly greater than target.
    - If the sorted permutation is already greater, return it immediately.
    - Otherwise, use an efficient next-permutation algorithm (just like Leetcode 31: Next Permutation) and compare to target after each generation.
    - Stop when the permutation > target, or when all permutations have been checked (if not found, return []).
  - **Trade-offs**: Uses the "next permutation" pattern, which is O(n) for each permutation, with O(n!)-worst-case if all need to be checked. For smaller n, this works well.

### Corner cases to consider  
- Arrays contain only one element.
- nums has the same elements as target, and is lexicographically maximum (no answer).
- nums has all duplicates.
- nums or target are already sorted.
- nums and target have completely different arrangements.
- All permutations of nums ≤ target.

### Solution

```python
def lexicographically_smallest_permutation_greater_than_target(nums, target):
    # Helper: generates next lexicographical permutation in-place
    def next_permutation(arr):
        n = len(arr)
        # Find the rightmost index 'i' such that arr[i] < arr[i+1]
        i = n - 2
        while i >= 0 and arr[i] >= arr[i+1]:
            i -= 1
        if i == -1:
            return False  # already at last permutation
        # Find the rightmost element greater than arr[i]
        j = n - 1
        while arr[j] <= arr[i]:
            j -= 1
        # Swap them
        arr[i], arr[j] = arr[j], arr[i]
        # Reverse the suffix
        left, right = i+1, n-1
        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
        return True

    # Step 1: Start with lexicographically smallest permutation
    nums_sorted = sorted(nums)
    # Step 2: If already > target, just return
    if nums_sorted > target:
        return nums_sorted
    # Step 3: Iterate through next permutations until find answer or exhaust
    arr = nums_sorted[:]
    while next_permutation(arr):
        if arr > target:
            return arr
    # No answer found
    return []

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting nums: O(n log n)
  - Generating next permutation O(n) for each step, worst case O(n!) if all need to be checked.
  - So worst case is O(n × n!) (only when every permutation needs to be checked).

- **Space Complexity:**  
  - Extra O(n) to store and manipulate permutations in arr.
  - No additional auxiliary structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums and target were much larger (e.g. n=10^5)?  
  *Hint: Explore possible patterns, or if only K positions differ, if you could solve using greedy or binary search.*

- How would you handle generating the kᵗʰ permutation greater than target?  
  *Hint: You'd need a ranking/ordering system for permutations; combinatorics and factorial number system.*

- Could you output all permutations strictly greater than target (possibly sorted)?  
  *Hint: Modify your loop to keep collecting them.*

### Summary
This problem uses the "next permutation" coding pattern—an important approach for generating the next lexicographically ordered sequence—which frequently appears in combinatorics and string/array ordering problems. The same pattern can be applied to related questions like generating all permutations, finding previous permutation, or working with a subset of permutations given constraints.

### Tags


### Similar Problems
