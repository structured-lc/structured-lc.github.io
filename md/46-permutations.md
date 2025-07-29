### Leetcode 46 (Medium): Permutations [Practice](https://leetcode.com/problems/permutations)

### Description  
Given an array of **distinct integers**, return *all possible permutations* of its elements.  
Explain clearly:  
- A permutation is any arrangement of all elements.  
- Each number must appear exactly once per arrangement.  
- Order of output does **not** matter.

For example, nums = [1,2,3]  
Output: all possible ordered arrangements using every element (no repeats, no omissions).

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`  
Explanation: There are 3 elements. All 3! = 6 possible orderings are listed.

**Example 2:**  
Input: `[0,1]`  
Output: `[[0,1],[1,0]]`  
Explanation: Permutations are (first 0, then 1) and (first 1, then 0).

**Example 3:**  
Input: `[1]`  
Output: `[[1]]`  
Explanation: Only 1 way to arrange one element.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible arrangement by picking a starting element, then recursively choosing each next number from those left, continuing until none remain.  
  For each order, create a copy and store it.

- **Optimization:**  
  Use a **backtracking** approach:
  - Track used elements (using a boolean array or marking as "picked").
  - At each step, for each unused number, add it to the current permutation, recurse, and then backtrack.
  - When the permutation reaches length n, add a copy to the results.

- **Approach chosen:**  
  Backtracking is simple, systematic, and doesn’t generate duplicates (since all numbers are distinct).  
  Space is used efficiently by filling one path at a time.

### Corner cases to consider  
- Empty input (nums = []): Should return `[[]]` (by definition, empty permutation).
- One element (nums = [x]): Only one possible permutation.
- Large input size (size n): There are n! permutations, so be wary of efficiency and stack overflows.
- Negative numbers and zeros: All integers supported, not only positive.
- (The problem states “distinct integers”, so no need to handle duplicates.)

### Solution

```python
def permute(nums):
    result = []

    def backtrack(path, used):
        # If current path is the same length as nums, we've formed a permutation
        if len(path) == len(nums):
            result.append(path[:])   # Make a copy of path
            return

        for i in range(len(nums)):
            if used[i]:
                continue  # Skip already used numbers
            # Choose nums[i]
            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            # Backtrack: remove last added, mark as unused
            path.pop()
            used[i] = False

    used = [False] * len(nums)
    backtrack([], used)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n × n!), where n = len(nums).
    - There are n! permutations.
    - Each permutation is constructed in O(n) time (due to copying).
- **Space Complexity:**  
  - O(n!) output for storing all permutations.
  - O(n) auxiliary space due to the current path and used array.
  - O(n) recursion stack depth.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **duplicate numbers** in the input?  
  *Hint: Consider skipping repeated elements at the same recursion depth.*

- Can you generate the permutations **iteratively** without recursion?  
  *Hint: Use an explicit stack to simulate recursion, or use BFS.*

- If the array is **very large** and n! doesn't fit into memory, can you generate permutations one-by-one, on demand?  
  *Hint: Implement as a generator/yield.*

- How can you modify the solution to return only **k-length** permutations instead of using all n elements?  
  *Hint: Stop recursion when path length is k.*

### Summary
This problem is a classic use-case for **backtracking**, a common coding interview pattern for exploring all possibilities (e.g., combinations, subsets, permutations).  
Other typical applications include solving sudoku, n-queens, or word search puzzles.  
Backtracking ensures every possible candidate arrangement is checked and constructed efficiently, then unwound—so all possible unique permutations are returned.