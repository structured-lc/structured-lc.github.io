### Leetcode 1643 (Hard): Kth Smallest Instructions [Practice](https://leetcode.com/problems/kth-smallest-instructions)

### Description  
Given destination (row, column) and an integer k, find the kᵗʰ lexicographically smallest "move string" to reach (row, column) from (0,0) using exactly row moves 'V' (down), and column moves 'H' (right). Each move is 'H' or 'V'; output the kᵗʰ path when all such move instructions are ordered in lex order.

### Examples  
**Example 1:**  
Input: `destination = [2,3]`, `k = 1`  
Output: `"HHHVV"`  
*Explanation: Lexicographically smallest is all H's first, then all V's.*

**Example 2:**  
Input: `destination = [2,3]`, `k = 3`  
Output: `"HHVHV"`  
*Explanation: List third smallest path: "HHHVV", "HHVHV", "HHVVH". So output is third.*

**Example 3:**  
Input: `destination = [2,3]`, `k = 4`  
Output: `"HVHHV"`  
*Explanation: Fourth path.*

### Thought Process (as if you’re the interviewee)  
Total moves is row + column. Lexicographically smallest paths have H before V. To get kᵗʰ smallest, at each step, decide: do we choose 'H' or 'V'? This depends on how many total instructions begin with 'H', and whether k falls within those. Use combinations (nCr):
- numH = columns left, numV = rows left
- If the number of paths starting with 'H' is ≥ k, choose 'H', else choose 'V' (and reduce k by number of 'H'-starting options)

Repeat this for every letter in the instruction string.

### Corner cases to consider  
- k = 1 (lex smallest)
- k = total num of instructions (lex largest)
- row or column is 0 (all moves same direction)
- Large row/column, k in the middle

### Solution

```python
def kthSmallestPath(destination, k):
    from math import comb
    row, col = destination
    res = []
    for _ in range(row + col):
        if col == 0:
            res.append('V')
            row -= 1
        elif row == 0:
            res.append('H')
            col -= 1
        else:
            hs = comb(row + col - 1, col - 1)
            if k <= hs:
                res.append('H')
                col -= 1
            else:
                res.append('V')
                k -= hs
                row -= 1
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = row + col, constant work per step.
- **Space Complexity:** O(n), building output string; call stack is O(1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is very large (up to 1e18)?  
  *Hint: Only integer math/combinations needed.*

- Can you generalize to multiple types of moves?  
  *Hint: n-multichoose, i.e., multinomial coefficients.*

- How do you list all such instructions efficiently?  
  *Hint: Next lexicographical permutation, but too slow for printing all; use combinatorics.*

### Summary
This problem relies on combinatorial counting and greedy character-by-character string construction. The approach appears in "k-th lexicographical permutations" and is a common pattern for grid/path enumeration problems.