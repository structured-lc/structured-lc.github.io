### Leetcode 1349 (Hard): Maximum Students Taking Exam [Practice](https://leetcode.com/problems/maximum-students-taking-exam)

### Description  
Given a 2D classroom grid of seats ('.' means available, '#' means broken), you must select the **maximal number of students** such that:
- No two students are seated next to each other (left, right, or diagonally upper-left/upper-right).
Return the largest possible number of students who can take the exam.

### Examples  

**Example 1:**  
Input: `[ [".", "#", ".", ".", "#", "."], [".", ".", "#", ".", ".", "#"], ["#", ".", "#", ".", "#", "."] ]`  
Output: `4`  
*Explanation: Sample optimal placement may be: row 0: put student at positions 0 and 3; row 1: position 1; row 2: position 5.*

**Example 2:**  
Input: `[ ["#", ".", "#"], [".", "#", "."], ["#", ".", "#"] ]`  
Output: `1`  
*Explanation: Only one available non-adjacent seat.*

**Example 3:**  
Input: `[ ["."] ]`  
Output: `1`  
*Explanation: Only one seat.*

### Thought Process (as if you’re the interviewee)  
Treat each row's seats as a bitmask: 1 means occupied, 0 means not occupied/unavailable. For each row, enumerate all valid seatings (no students adjacent), and for each, check that it doesn't conflict with the previous row according to the diagonal constraints. Use DP: dp[row][state] = max students for first row rows with current row's state. Try all compatible seat patterns for each row, update DP accordingly. This masks-and-dp approach is needed because it's exponential per row but input size is constrained (≤8 columns).

### Corner cases to consider  
- All seats are broken (should return 0)
- Only one seat (return 1 if '.').
- One full row, all unbroken
- Diagonals in multiple rows

### Solution

```python
# State DP with row bitmasking, since max columns ≤ 8

def maxStudents(seats):
    R, C = len(seats), len(seats[0])
    valid_masks = []
    for row in seats:
        mask = 0
        for c, seat in enumerate(row):
            if seat == '.':
                mask |= (1 << c)
        valid_masks.append(mask)

    from collections import defaultdict

    dp = {0: 0}  # previous row: mask -> max students so far
    for r in range(R):
        row_valid = valid_masks[r]
        new_dp = defaultdict(int)
        for curr_mask in range(1 << C):
            # curr_mask must only sit in valid seats
            if (curr_mask & row_valid) != curr_mask:
                continue
            # No two students adjacent in row
            if curr_mask & (curr_mask >> 1):
                continue
            # Try all prev row masks
            for prev_mask, val in dp.items():
                # No upper left/right diagonals
                if (curr_mask & (prev_mask >> 1)) or (curr_mask & (prev_mask << 1)):
                    continue
                new_dp[curr_mask] = max(new_dp[curr_mask], val + bin(curr_mask).count('1'))
        dp = new_dp
    return max(dp.values() or [0])
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(R × 2^C × 2^C)—for each row, try all possible masks vs previous row. With constraints (C ≤ 8), this is feasible.
- **Space Complexity:** O(2^C) for storing DP per row.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of columns/fixed seats is much larger?   
  *Hint: The bitmask DP becomes intractable beyond 15 or so columns; need new ideas (matching/graph coloring?)*

- How to handle if students can also NOT sit diagonally below (future rows)?   
  *Hint: Update the bitmask conditions for future rows as well.*

- Can this be solved greedily?   
  *Hint: Try an example and spot how greed fails; conflict spans diagonals and isn't localizable.*

### Summary
This is a classic bitmask DP for seating/placement with adjacency constraints. Pattern is common: DP[state] over bit-encoded states – similar to tiling, coloring, and hardware assignment problems.


### Flashcard
Use bitmask DP: for each row, enumerate valid seatings, check compatibility with previous row, and update dp[row][state] for max students.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Matrix(#matrix), Bitmask(#bitmask)

### Similar Problems
