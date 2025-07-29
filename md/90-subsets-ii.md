### Leetcode 90 (Medium): Subsets II [Practice](https://leetcode.com/problems/subsets-ii)

### Description  
Given an integer array that may contain duplicates, return all possible subsets (the power set) such that no subset is repeated. Each subset must be sorted in non-descending order, and you must not return duplicate subsets. The order of subsets in the result does not matter.

### Examples  

**Example 1:**  
Input: `[1,2,2]`  
Output: `[[], [1], [1,2], [1,2,2], [2], [2,2]]`  
*Explanation: All unique subsets are generated, avoiding duplicates that would result from repeated 2’s.*

**Example 2:**  
Input: ``  
Output: `[[], ]`  
*Explanation: There are just two possible subsets: the empty set, and a single-element subset.*

**Example 3:**  
Input: `[4,4,4,1,4]`  
Output: `[[], [1], [1,4], [1,4,4], [1,4,4,4], [1,4,4,4,4], [4], [4,4], [4,4,4], [4,4,4,4]]`  
*Explanation: Duplicates are handled by always only advancing the index past all same-value duplicates when skipping, so no repeated subset.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  - Generate all subset combinations. After collecting all, add them to a set for deduplication.  
  - Cons: This is inefficient—may process many duplicate combinations, wasting time and space.

- **Optimized approach:**  
  - **Key insight:** If input is sorted, duplicates are adjacent, so we can cleverly skip over them when constructing subsets.
  - At each recursive call, decide whether to include the current number or skip ahead past all duplicates of that number.
  - If we pick the first instance, it can be added. If we want to skip that number in subsets, we skip *all* contiguous duplicates of it to avoid repeated sets.

- **Pattern:**  
  - Use **backtracking** (or DFS recursion) plus skip logic to avoid duplicates.
  - Before recursion, *sort* the input to ensure duplicates are adjacent.

### Corner cases to consider  
- Empty array `[]` → Should return `[[]]`.
- Array with all duplicates: `[2,2,2]`.
- Array with no duplicates: `[1,2,3]`.
- Array with one element: ``.
- Large input, or all unique values.
- Cases where duplicate numbers are at the start or end.

### Solution

```python
def subsetsWithDup(nums):
    # First, sort nums so that duplicates are adjacent
    nums.sort()
    res = []
    
    def backtrack(start, path):
        # Always add current subset to result
        res.append(list(path))
        
        for i in range(start, len(nums)):
            # Skip duplicate elements at the same recursive level
            if i > start and nums[i] == nums[i-1]:
                continue
            # Include nums[i] in this path, and move to next index
            path.append(nums[i])
            backtrack(i + 1, path)
            # Backtrack: remove last element for next candidate
            path.pop()
    
    backtrack(0, [])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(2ⁿ), where n = number of elements in `nums`.  
    - Sorting takes O(n log n).
    - Backtracking generates all possible subsets, which is up to 2ⁿ, but we skip duplicates by pruning.
  - In the worst case (all elements unique), we still visit all 2ⁿ possibilities.

- **Space Complexity:**  
  - O(2ⁿ × n) for output (all subsets), plus O(n) recursion stack for backtracking.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers can have negative values?  
  *Hint: Sorting and deduplication logic remains unchanged, as values' sign doesn't impact subset formation.*

- How would you modify this if the result needed to be sorted lexicographically?  
  *Hint: After generation, sort the list of subsets based on their elements.*

- What if we care about the order of items inside each subset?  
  *Hint: Maintain current order, but since input is sorted, subsets will be sorted as needed.*

### Summary
This problem is a classic example of the **backtracking** pattern, augmented by sorting and careful duplicate-skipping to avoid redundant results. The approach can be generalized to other “powerset”-type problems where duplicates or combinatorial explosion are a concern, such as "Combination Sum II" and "Permutations II".