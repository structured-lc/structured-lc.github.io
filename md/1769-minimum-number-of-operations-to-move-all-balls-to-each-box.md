### Leetcode 1769 (Medium): Minimum Number of Operations to Move All Balls to Each Box [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box)

### Description  
Given a binary string `boxes` of length n, where `boxes[i]` is `'1'` if the iᵗʰ box contains a ball and `'0'` if it’s empty, you can move any ball to an adjacent box in one operation. Every move transfers one ball from its box to a directly neighboring box (left or right). For each box, compute the **minimum number of operations** needed to bring all balls in the system to this box. Return an array of size n where output[i] is the total moves for the iᵗʰ box, based on the initial arrangement.

### Examples  

**Example 1:**  
Input: `boxes = "110"`  
Output: `[1,1,3]`  
*Explanation:*
- Box 0: Move 1 ball from box 1 to box 0 (1 move).
- Box 1: Move 1 ball from box 0 to box 1 (1 move).
- Box 2: Move 1 ball from box 0 (2 moves) + from box 1 (1 move) = 3 moves.

**Example 2:**  
Input: `boxes = "001011"`  
Output: `[11,8,5,4,3,4]`  
*Explanation:*
- Each answer[i] gives the minimum number of moves needed to bring all balls to box i.
- For example, box 0: There are balls at indices 2, 4, 5. To box 0: |2-0| + |4-0| + |5-0| = 2 + 4 + 5 = 11.

**Example 3:**  
Input: `boxes = "000"`  
Output: `[0,0,0]`  
*Explanation:*
- There are no balls — no moves needed at any position.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each box i, check every other box j. If box j contains a ball (`'1'`), add |i - j| to the count for box i. Repeat for all n boxes.  
  This naive approach takes O(n²): for each box, check all boxes.

- **Optimization:**  
  Since moving a ball has a cost proportional to the distance, we can optimize using prefix sums:
  - Make two passes:
    - **Left to right:**  
      Keep a running count of balls and the current operation cost from the left. For each box i, store total cost to move left-side balls to i.
    - **Right to left:**  
      Do the same from the right, updating the answer array.
  - This approach achieves O(n) time.

- **Why this works:**  
  We cumulatively know, at each box, how many balls are to our left and how much effort to bring them further. The two-pass prefix sum ensures we accumulate the full cost to assemble all balls at any given position, efficiently.

### Corner cases to consider  
- All boxes empty: e.g., `boxes = "000"`
- All boxes full: e.g., `boxes = "111"`
- Only one ball, e.g., `boxes = "0000100"`
- Ball at first/last position only
- Length-1: `boxes = "1"` or `boxes = "0"`

### Solution

```python
def minOperations(boxes: str) -> list[int]:
    n = len(boxes)
    answer = [0] * n

    # Left pass: accumulate moves from left side
    left_balls = 0
    moves_left = 0
    for i in range(n):
        answer[i] += moves_left
        if boxes[i] == '1':
            left_balls += 1
        moves_left += left_balls

    # Right pass: accumulate moves from right side
    right_balls = 0
    moves_right = 0
    for i in range(n - 1, -1, -1):
        answer[i] += moves_right
        if boxes[i] == '1':
            right_balls += 1
        moves_right += right_balls

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each pass is a single scan over the array (one left-to-right, one right-to-left).
- **Space Complexity:** O(n), for storing the answer array. Only constant extra space is used otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- What if box operations weren’t just adjacent, but could jump k steps in one move?  
  *Hint: How would the cost formula \|i-j\| change if jumps are allowed?*

- Can you do this in place or with O(1) extra space?  
  *Hint: Is answer array the minimal requirement? Is it possible to overwrite input?*

- How would you handle updates — if a box’s state flips, can you efficiently update answer?  
  *Hint: Consider how each change affects the prefix/suffix sums.*

### Summary
This is a classic prefix sum / bidirectional traversal problem: for each box, you sum the distance from every other box with a ball, which can be efficiently computed in O(n) using two passes. This technique of rolling cumulative counts and costs appears frequently in interval, range-update, and "gather to one location" problems in arrays and strings.