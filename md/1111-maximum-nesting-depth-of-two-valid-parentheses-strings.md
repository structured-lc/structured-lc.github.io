### Leetcode 1111 (Medium): Maximum Nesting Depth of Two Valid Parentheses Strings [Practice](https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings)

### Description  
Given a **valid parentheses string** (VPS) `seq` (i.e., it contains only '(' and ')', is balanced, and follows VPS rules), your task is to split `seq` into two disjoint subsequences **A** and **B**, each itself a VPS, so that every parenthesis belongs to exactly one subsequence. Your goal: **Minimize the maximum nesting depth** among the two resulting subsequences.

Return an integer array `answer` such that for each character `seq[i]`, `answer[i]` is either `0` (if assigned to A) or `1` (if assigned to B), representing a valid assignment minimizing the maximum depth.

### Examples  

**Example 1:**  
Input: `"(()())"`  
Output: `[0,1,1,1,1,0]`  
Explanation:  
- Assigning alternating nesting levels to A and B:  
- A: positions 0, 5 → "()"  
- B: positions 1,2,3,4 → "(())"  
- max(depth(A), depth(B)) = 1  
- Any assignment that keeps the max depth minimal is accepted.  

**Example 2:**  
Input: `"()(())()"`  
Output: `[0,0,0,1,1,0,1,1]`  
Explanation:  
- A: positions 0,1,2,5 → "()()"  
- B: positions 3,4,6,7 → "(())"  
- Both A and B are valid parentheses strings.  

**Example 3:**  
Input: `"((()))"`  
Output: `[0,1,0,1,0,1]`  
Explanation:  
- Assigning nesting levels alternately as "010101":
- A: positions 0,2,4 → "((()))" at odd depths  
- B: positions 1,3,5 → "((()))" at even depths  

### Thought Process (as if you’re the interviewee)  
First, let's clarify:  
- A VPS is always valid and can be built recursively by pairing '(', ')', or by concatenating valid VPSs.
- Our goal is to split the sequence so that both subsets are valid VPSs and the **maximum of their nesting depths** is minimized.

**Brute-force:** Try all assignments: assign parentheses to A or B in every possible way while ensuring both are valid. This is exponential and infeasible for large inputs.

**Pattern-spotting / Optimization:**  
- **Observation:** To minimize peak nesting, we can distribute nesting levels between A and B. When iterating through the string, keep a counter for depth, and assign the parenthesis based on the depth:  
  - For '(': increment depth; for ')': assign then decrement.  
  - **Assign by parity:** If depth is odd, assign one group (say 1); if even, the other (0). This naturally balances the nesting depth between A and B.

So, for each '(', assign `depth % 2`, then increase depth.  
For each ')', decrease depth after assigning `depth % 2`.

This way, the deepest parens get split between both groups, minimizing maximum nesting.

**Why choose this?**  
- Linear time, space, and elegant to code.  
- No need for special stack tracking beyond integer depth.

### Corner cases to consider  
- Empty string: Should output an empty array.
- All opening, then all closing: e.g. `"(((())))"`
- Simple VPS like `"()"` or `"()()"`.
- Nested and concatenated forms mixed, e.g. `"()(())(())"`.

### Solution

```python
def maxDepthAfterSplit(seq):
    # Array to store the answer
    res = []
    # Current depth
    depth = 0

    for ch in seq:
        if ch == '(':
            # Before increasing depth, assign by parity (so outermost is 0, next is 1, etc.)
            res.append(depth % 2)
            depth += 1
        else: # ch == ')'
            depth -= 1
            # Assign by current parity after decreasing (matches the opening)
            res.append(depth % 2)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), iterates once through the sequence, constant work per character.
- **Space Complexity:** O(n), for the output array of assignments.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this solution to split a VPS into **k** valid groups to minimize the maximum depth among them?  
  *Hint: Think about assigning by depth modulo k.*

- What if instead of *minimizing* the max depth, you want to **maximize** the min depth between A and B in their partitions?  
  *Hint: Try constructing pathological/nested inputs.*

- How to efficiently **validate** a large parentheses string is a VPS and compute depth in one pass?  
  *Hint: Use stack or simple integer counter.*

### Summary
This is a **parity, greedy, or depth splitting pattern** problem: Assign parentheses to two groups by alternating their assignment at each depth level, thereby balancing the nesting as evenly as possible. This approach avoids extra stack usage and is a common trick in parentheses splitting and depth minimization, and can be adapted to similar problems where grouping at balanced depths is needed.

### Tags
String(#string), Stack(#stack)

### Similar Problems
- Maximum Nesting Depth of the Parentheses(maximum-nesting-depth-of-the-parentheses) (Easy)