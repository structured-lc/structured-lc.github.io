### Leetcode 491 (Medium): Non-decreasing Subsequences [Practice](https://leetcode.com/problems/non-decreasing-subsequences)

### Description  
Given an array of integers, find **all possible non-decreasing subsequences** with at least two elements.  
- A **subsequence** is a sequence formed by deleting some or no elements (without changing order).
- **Non-decreasing** means every next element is greater than or equal to the previous.
- **Result should not contain duplicate subsequences.**
- The problem is about generating all valid combinations, not just counting them.

### Examples  

**Example 1:**  
Input: `[4,6,7,7]`  
Output: `[[4,6], [4,6,7], [4,6,7,7], [4,7], [4,7,7], [6,7], [6,7,7], [7,7]]`  
*Explanation: All shown subsequences are valid, at least length 2, and non-decreasing. “7,6” is not valid.*

**Example 2:**  
Input: `[4,4,3,2,1]`  
Output: `[[4,4]]`  
*Explanation: The only non-decreasing subsequence of length two or more is `[4,4]` as all other elements decrease.*

**Example 3:**  
Input: `[1,3,2,2]`  
Output: `[[1,3],[1,2],[1,2,2],[3,2,2],[2,2]]`  
*Explanation: All valid non-decreasing subsequences are shown, including those formed by repeated 2s.*

### Thought Process (as if you’re the interviewee)  
First, the brute force solution would be to generate **all possible subsequences** (using backtracking) and then filter for the valid ones (non-decreasing, length ≥2).  
However, this can be optimized:

- **Backtracking**: At every index, I can either:
  - Add the current number to the subsequence (if it doesn't break non-decreasing order), or
  - Skip it.
- To prevent duplicates (for example, if array has duplicates), use a set or a hashmap to track what values have already been considered at the current recursion depth/level.
- Store a valid subsequence only if it’s length ≥2.
- Recursion stops when we’ve considered all elements.

Because the **array is small** (n ≤ 15), backtracking is practical here.

### Corner cases to consider  
- Empty array or `nums` of length 1 (should return empty list).
- Array with all elements the same (should still return all valid subsequences of length ≥2).
- Arrays with negative numbers, zeros, or both positive and negative.
- Multiple identical non-decreasing subsequences – ensure deduplication (e.g., `[1,2,2]`, the “2,2” subsequence).
- Mixed increasing, decreasing, and flat regions.

### Solution

```python
# Backtracking approach to generate all non-decreasing subsequences of length ≥ 2
def findSubsequences(nums):
    res = set()  # Use a set to automatically deduplicate tuples of numbers

    def backtrack(start, path):
        if len(path) >= 2:
            res.add(tuple(path))  # Must use tuple for set
        used = set()  # To avoid same number at the same recursion level
        for i in range(start, len(nums)):
            # Skip to avoid duplicates in the same tree layer
            if nums[i] in used:
                continue
            # Only include if non-decreasing
            if not path or nums[i] >= path[-1]:
                used.add(nums[i])
                backtrack(i + 1, path + [nums[i]])
    backtrack(0, [])
    return [list(seq) for seq in res]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  The number of possible subsequences is up to 2ⁿ (where n is length of nums), but only those that are non-decreasing are considered at each step. For each valid path, a copy is made. Since n ≤ 15, in the worst case (all elements equal), the total work is O(2ⁿ × n).
- **Space Complexity:**  
  O(2ⁿ × n): Needed to store all the subsequences in the result set, plus recursion stack O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return subsequences in lexicographical order?  
  *Hint: Sort the input or sort the output at the end.*

- How would you handle finding strictly increasing (not just non-decreasing) subsequences?  
  *Hint: Change the comparison from ≥ to >.*

- How would you solve this if the array was very large (e.g., n = 1000)?  
  *Hint: Generating all subsequences becomes infeasible; maybe count or find the longest subsequence instead.*

### Summary
This problem is a classic **backtracking** question with deduplication, often called the “subsets with constraints” pattern.  
This approach of recursively deciding to include or exclude each element and using sets for deduplication applies to other problems, such as generating **unique combinations, subsets with restrictions**, or **permutations with deduplication**.  
Understanding this pattern builds a foundation for tackling many combinatorial search and generation problems in coding interviews.


### Flashcard
Use backtracking to build subsequences, only adding numbers that maintain non-decreasing order; use set to avoid duplicates.

### Tags
Array(#array), Hash Table(#hash-table), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Maximum Length of Pair Chain(maximum-length-of-pair-chain) (Medium)