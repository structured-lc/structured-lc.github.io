### Leetcode 78 (Medium): Subsets [Practice](https://leetcode.com/problems/subsets)

### Description  
Given an array of *distinct* integers, return **all possible subsets** (the power set).  
A subset is any combination of elements from the original array—possibly none, some, or all elements.  
No duplicate subsets are allowed, and each subset can be in any order.  
For example, for nums = [1,2,3], some valid subsets are [], [1], [2, 3], and [1, 2, 3].

### Examples  

**Example 1:**  
Input: `[1, 2, 3]`  
Output: `[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`  
*Explanation: Each element can be included or excluded, so 2³ = 8 subsets. This includes the empty set, all 1-element sets, all 2-element sets, and the set itself.*

**Example 2:**  
Input: ``  
Output: `[[], ]`  
*Explanation: Only two possibilities: the empty set and the set containing 0.*

**Example 3:**  
Input: `[4, 7]`  
Output: `[[], [4], , [4,7]]`  
*Explanation: Subsets: take none, take each individually, or take both.*

### Thought Process (as if you’re the interviewee)  
My goal is to generate **all possible combinations** (subsets) from a list of unique integers.

- **Brute-force idea:**  
  Try every combination for each element: *include* it or *exclude* it. As each number has two choices, for n numbers there are 2ⁿ possibilities.

- **Recursive/Backtracking approach:**  
  Build subsets by:
  - At each step, for the current position, choose to either *include* the number or *not include* it.
  - The function recurses forward for both choices, and when we reach the end, add the current subset to the answer list.

- **Iterative approach (optional):**  
  Start from the empty subset. For each number, append it to all existing subsets to form new subsets.

I’ll use **recursive backtracking**, since it’s intuitive for “pick or skip” scenarios and easy to reason about.

### Corner cases to consider  
- Input is an empty array ⇒ Only return `[[]]`.
- Input has one element ⇒ `[[], [num]]`.
- All numbers are unique (as per the problem statement).
- Large array size: Output grows exponentially—be mindful of potential time/memory issues for n > 10.
- Input already sorted or unsorted: Subset ordering does not matter.

### Solution

```python
def subsets(nums):
    res = []

    def backtrack(start, path):
        # Add the current subset (path) to result
        res.append(list(path))
        # Try adding each further number in nums
        for i in range(start, len(nums)):
            # Include nums[i]
            path.append(nums[i])
            # Recurse to build further with nums[i] included
            backtrack(i + 1, path)
            # Backtrack: remove last added number to explore alternative combinations
            path.pop()

    backtrack(0, [])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n)  
  For n elements, there are 2ⁿ possible subsets (each element is included/excluded). Generating each subset (making a copy of path) may take up to n time.

- **Space Complexity:** O(2ⁿ × n)  
  - Output list holds 2ⁿ subsets, each up to n elements.
  - Extra stack space: O(n) for recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your code change if `nums` could contain duplicates?  
  *Hint: Sort `nums` first and avoid duplicate paths by only exploring unique subsequent choices.*

- Can you output the subsets in lexicographic order?  
  *Hint: Sort `nums` first and build subsets in increasing order of indices.*

- What is the relationship between the number of elements and the size of the output?  
  *Hint: 2ⁿ subsets for n elements—output grows exponentially.*

### Summary
This problem is a classic example of **backtracking**: at every decision point, we branch to include or exclude the current item. It’s the “subsets/power set” pattern, which appears in various forms:
- Combinations (choose k from n)
- Permutations (all orderings)
- Generating all subsequences  
Recursive backtracking is clean for *pick/skip* logic and easy to modify for constraints (e.g., duplicates, size limits).


### Flashcard
Use backtracking to explore all subsets by including or excluding each element, generating 2ⁿ possible subsets.

### Tags
Array(#array), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Subsets II(subsets-ii) (Medium)
- Generalized Abbreviation(generalized-abbreviation) (Medium)
- Letter Case Permutation(letter-case-permutation) (Medium)
- Find Array Given Subset Sums(find-array-given-subset-sums) (Hard)
- Count Number of Maximum Bitwise-OR Subsets(count-number-of-maximum-bitwise-or-subsets) (Medium)