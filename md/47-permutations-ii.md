### Leetcode 47 (Medium): Permutations II [Practice](https://leetcode.com/problems/permutations-ii)

### Description  
Given a list of integers `nums` that may include duplicates, generate **all unique permutations** of the list.  
The goal is to return every arrangement of numbers where the order matters, but you can’t return duplicate arrangements if numbers repeat in the input.  
For example, for `nums = [1,1,2]`, you shouldn’t return both `[1,1,2]` permutations multiple times just because the 1s can swap places. The output must not have duplicate permutations.

### Examples  

**Example 1:**  
Input: `nums = [1,1,2]`  
Output: `[[1,1,2],[1,2,1],[2,1,1]]`  
*Explanation: The unique permutations are: starting with 1, then another 1, then 2; or 1 then 2 then 1; or starting with 2, then both 1s.*

**Example 2:**  
Input: `nums = [1,2,3]`  
Output: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`  
*Explanation: All permutations are unique when there are no duplicates.*

**Example 3:**  
Input: `nums = [1]`  
Output: `[[1]]`  
*Explanation: Only one way to arrange a single element.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to generate all possible permutations and filter out duplicates, possibly using a set to store them. However, this is inefficient because generating all n! permutations wastes time on duplicates and uses a lot of extra memory.
- A better approach is **backtracking with duplicate pruning**:  
  - Sort the input `nums` first.  
  - Use a boolean array `used` to track which elements are in the current permutation.
  - At each recursion, skip over an element if it’s a duplicate of the previous element **and** the previous duplicate hasn't been used yet (to avoid producing the same arrangement as earlier swaps).
  - Add permutations to the result only when the permutation is complete.
- This cuts off duplicate generation immediately, is generally efficient for `n ≤ 8`, and is the standard Leetcode/backtracking pattern for unique-permutations problems.

### Corner cases to consider  
- Empty array (`[]`)  
- Array with all elements the same, e.g. `[2,2,2]`
- Array of length 1 (``)
- Array with negative and positive numbers, e.g. `[1,-1,1]`
- Array with only two unique values, e.g. `[1,1,2,2]`
- Large input (length 8, with many duplicates)

### Solution

```python
def permuteUnique(nums):
    # Sort to group duplicates together
    nums.sort()
    result = []
    used = [False] * len(nums)
    
    def backtrack(path):
        # If the current path is a full permutation, add it to result
        if len(path) == len(nums):
            result.append(path[:])
            return
        # Loop through all indices
        for i in range(len(nums)):
            # Skip numbers that have already been used in this permutation
            if used[i]:
                continue
            # Skip duplicates: if current is same as previous and previous was not used, skip
            if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
                continue
            # Mark as used and go deeper
            used[i] = True
            path.append(nums[i])
            backtrack(path)
            # Unmark for the next possibility
            path.pop()
            used[i] = False
            
    backtrack([])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - In the worst case (all nums unique), there are n! permutations, so O(n!) total.
  - With duplicates, the output size can be as low as O(n!/k₁!k₂!...kₘ!) where kⱼ is the count of each unique value.  
  - Each permutation takes O(n) to build/copy.
  - The backtracking itself is efficient and prunes duplicates early.

- **Space Complexity:**  
  - O(n) for the recursion stack and the `used` array.
  - O(n!) × n for the result list, storing all unique permutations.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the output order must be lexicographically sorted?  
  *Hint: Sorting the input at the start and careful ordering in recursion handles this.*

- How would you handle streams of numbers or infinite input?  
  *Hint: True permutation generation requires all data in memory. For streams, you’d need a sliding window or partial permutation approach.*

- Can you generate permutations without modifying the input or using extra arrays?  
  *Hint: It’s tough to avoid tracking used elements with backtracking; see if bitmasking or index swapping could substitute.*

### Summary
This problem is a classic **backtracking** and **duplicate-pruning** pattern. The key twist from Leetcode 46 is avoiding repeated permutations when elements repeat.  
You efficiently prune duplicates by sorting, tracking element usage, and only allowing swaps when no smaller duplicate could have been moved instead.  
This technique is commonly used in permutation generation when the collection has duplicates and is broadly useful in problems like "Subsets II," "Combination Sum II," etc.