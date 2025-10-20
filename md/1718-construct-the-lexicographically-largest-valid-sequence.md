### Leetcode 1718 (Medium): Construct the Lexicographically Largest Valid Sequence [Practice](https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence)

### Description  
Given an integer n, construct an array of length 2 × n - 1 that:
- The integer 1 appears exactly once.
- Each integer i (2 ≤ i ≤ n) appears exactly twice.
- For every i (2 ≤ i ≤ n), the two occurrences of i are separated by exactly i places (so, for any indices j, j+i, both nums[j] and nums[j+i] are i).
Return the **lexicographically largest** valid array possible.  
Lexicographical order means compare arrays left to right; the first position with a difference decides which is larger.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `[3,1,2,3,2]`  
*Explanation:*
- Place the largest numbers first if possible.
- Place 3 at indices 0 and 3 (distance = 3).
- Now, place 2 at indices 2 and 4 (distance = 2).
- 1 can only go at the remaining spot (index 1).

```
indices:   0 1 2 3 4
sequence: [3 1 2 3 2]
```

**Example 2:**  
Input: `n = 4`  
Output: `[4,2,3,2,4,3,1]`  
*Explanation:*
- Place 4 at indices 0 and 4 (distance = 4).
- Next, place 3 at indices 2 and 5 (distance = 3).
- Place 2 at indices 1 and 3 (distance = 2).
- 1 goes in the only spot left (index 6).

```
indices:   0 1 2 3 4 5 6
sequence: [4 2 3 2 4 3 1]
```

**Example 3:**  
Input: `n = 5`  
Output: `[5,3,1,4,3,5,2,4,2]`  
*Explanation:*
- Largest possible valid numbers are placed first, ensuring the sequence is as "large" as possible.
- Details omitted for brevity, but follows the exact constraint rules.

### Thought Process (as if you’re the interviewee)  

First, brute-force/exhaustive search:  
- Try all possible placements of each number to find all valid sequences.
- For each permutation, check all constraints.
- This is very slow (factorial or worse).

Key optimizations:
- Since we want the **lexicographically largest** sequence, always try to place larger numbers first at each step.
- Use **backtracking**: recursively fill the array, always greedily placing the **largest available number** at the leftmost valid positions.
- For each number i from n down to 1:
  - For i > 1, when placing i at position j, also place i at position j + i (and both spots must be available).
  - For 1, place it in any one empty spot (since 1 only appears once).
- As soon as a complete valid array is created, return it (short-circuit since we always try bigger numbers first).

Why is this optimal?
- Because at every possible "choice," we insert the biggest possible number in the earliest legal spot, ensuring maximum lex order at every prefix.

### Corner cases to consider  
- **n = 1:** Only [1] is correct.
- No valid sequence possible? (By constraints, always possible, so don't handle invalid input.)
- Large n (test efficiency).
- Placement where two required spots overlap/are out of bounds.
- Repeating values should not overlap in the array.

### Solution

```python
def constructDistancedSequence(n):
    L = 2 * n - 1                      # final length of the answer
    ans = [0] * L                      # 0 means "empty" or "not filled"
    used = [False] * (n + 1)           # used[i] == True means all appearances of i are placed

    def backtrack(pos):
        if pos == L:
            return True                # Entire array filled

        if ans[pos] != 0:
            return backtrack(pos + 1)  # Skip if already filled

        # Try all numbers in descending order for lex-largest
        for i in range(n, 0, -1):
            if used[i]:
                continue

            if i == 1:
                ans[pos] = 1
                used[1] = True
                if backtrack(pos + 1):
                    return True
                ans[pos] = 0
                used[1] = False
            else:
                j = pos + i           # The other required position for number i
                if j < L and ans[pos] == 0 and ans[j] == 0:
                    ans[pos] = ans[j] = i
                    used[i] = True
                    if backtrack(pos + 1):
                        return True
                    ans[pos] = ans[j] = 0
                    used[i] = False

        return False

    backtrack(0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n!) in practice due to pruning/greedy placement, but can be up to O(n² × n!) worst case for high n (since for each of n numbers, we may try many positions).  
- **Space Complexity:** O(n) for the recursion stack, plus O(n) for the answer and usage arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if lexicographically smallest valid sequence is required?  
  *Hint: Try placing the smallest available number at each step instead.*

- How would you modify the approach to output **all** possible valid sequences?  
  *Hint: Do not end backtracking at the first valid answer; collect them in a list.*

- Can this problem be solved non-recursively (iteratively)?  
  *Hint: Use an explicit stack to replace recursion, but logic will be similar.*

### Summary
This problem is a **backtracking with greedy choice** pattern—always try to place the largest numbers first, with constraint propagation.  
It's an example of constraint-satisfaction search and "construct the lexicographically largest element" questions.  
The template can be applied to similar puzzles involving placing items with spacing/distance constraints, or constructing max/min lexicographical orderings under rules.


### Flashcard
Use backtracking, always placing the largest available number first at each step to maximize lex order—enforce placement constraints.

### Tags
Array(#array), Backtracking(#backtracking)

### Similar Problems
- The Number of Beautiful Subsets(the-number-of-beautiful-subsets) (Medium)
- Find the Lexicographically Largest String From the Box I(find-the-lexicographically-largest-string-from-the-box-i) (Medium)