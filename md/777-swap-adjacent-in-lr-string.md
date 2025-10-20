### Leetcode 777 (Medium): Swap Adjacent in LR String [Practice](https://leetcode.com/problems/swap-adjacent-in-lr-string)

### Description  
Given two strings `start` and `end`, both made up of only the characters `'L'`, `'R'`, and `'X'`, determine if you can transform `start` into `end` through a sequence of valid moves.  
- The only allowed moves are:
  - Swap any occurrence of `"XL"` with `"LX"`
  - Swap any occurrence of `"RX"` with `"XR"`
  
This means:
- `'L'` can only move left by swapping with an `'X'` immediately to its left.
- `'R'` can only move right by swapping with an `'X'` immediately to its right.

Return `True` if and only if there exists such a sequence of moves, or `False` otherwise.

### Examples  

**Example 1:**  
Input: `start = "RXXLRXRXL", end = "XRLXXRRLX"`  
Output: `True`  
Explanation:  
RXXLRXRXL  
→ XRXLRXRXL (swap positions 0/1)  
→ XRLXRXRXL (swap positions 2/3)  
→ XRLXXRRXL (swap positions 5/6)  
→ XRLXXRRLX (swap positions 7/8)  

**Example 2:**  
Input: `start = "X", end = "L"`  
Output: `False`  
Explanation:  
You can't turn `"X"` into `"L"` since only `'X'` and no `'L'` present, and no move possible.

**Example 3:**  
Input: `start = "LLR", end = "RRL"`  
Output: `False`  
Explanation:  
Order and number of `'L'`/`'R'` don't match. No sequence of moves can transform the start into end.

### Thought Process (as if you’re the interviewee)  

First, make sure that `start` and `end` contain the same characters in the same quantity and order—except possibly `'X'`, because `'X'` can move around as `'L'` or `'R'` swap with it.  
Brute-force would be to generate all possible transformations, but that's extremely inefficient.

Instead, let's look for patterns. Consider only the positions of `'L'` and `'R'`.  
- `'L'` must not cross over any `'R'` or move to the right.  
- `'R'` must not cross over any `'L'` or move to the left.  
So, to validate:
- Remove all `'X'` and check if the sequence of `'L'` and `'R'` is the same in both `start` and `end`.
- For each `'L'`, its position in `end` must be ≤ its position in `start` (it can only move left).
- For each `'R'`, its position in `end` must be ≥ its position in `start` (it can only move right).

This way, in a single pass, we can compare positions and character identities.

### Corner cases to consider  
- Strings with only `'X'`  
- Strings with no moves possible (`start == end`)  
- Strings of different composition after removing `'X'`  
- Same chars but invalid `'R'` or `'L'` orders  
- One string empty, other not  
- Adjacent `'L'` or `'R'` at edges  
- Long strings to check performance

### Solution

```python
def canTransform(start: str, end: str) -> bool:
    # The sequences of 'L' and 'R' (ignoring 'X') must match exactly
    s_trim = [c for c in start if c != 'X']
    e_trim = [c for c in end if c != 'X']
    if s_trim != e_trim:
        return False

    n = len(start)
    # Now track positions of 'L' and 'R' to make sure movement rules are followed
    posL_start = [i for i, c in enumerate(start) if c == 'L']
    posL_end = [i for i, c in enumerate(end) if c == 'L']
    for s, e in zip(posL_start, posL_end):
        if e > s:  # 'L' can't move to the right
            return False

    posR_start = [i for i, c in enumerate(start) if c == 'R']
    posR_end = [i for i, c in enumerate(end) if c == 'R']
    for s, e in zip(posR_start, posR_end):
        if e < s:  # 'R' can't move to the left
            return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each operation—filtering for `'L'`/`'R'`, finding their indices, and comparing—is a single traversal over the strings.

- **Space Complexity:** O(n)  
  Storing the positions and trimmed sequences needs O(n) extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if moves other than swapping adjacent are allowed? (like swapping any `'XL'` with `'LX'` anywhere)
  *Hint: Consider generalizing the movement constraints.*

- How would you handle thousands of queries efficiently?
  *Hint: Pre-compute position lists or compare only the relevant characters.*

- Can you solve it in place, with O(1) extra space (aside from the input)?
  *Hint: Two pointers approach without storing positions explicitly.*

### Summary
This problem uses **greedy character matching**—focusing only on `'L'` and `'R'`—and **positional comparison** to enforce the movement rules. This idea, of in-place positional validation, is commonly applied in "can you transform X into Y with limited moves" questions. The key pattern: **reduce the problem by filtering out irrelevant symbols** and then enforce character-specific movement constraints using index comparisons.


### Flashcard
Compare positions of 'L' and 'R' in start and end, ensuring 'L' only moves left and 'R' only moves right, without crossing each other.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Move Pieces to Obtain a String(move-pieces-to-obtain-a-string) (Medium)