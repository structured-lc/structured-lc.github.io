### Leetcode 2511 (Easy): Maximum Enemy Forts That Can Be Captured [Practice](https://leetcode.com/problems/maximum-enemy-forts-that-can-be-captured)

### Description  
Given a list representing forts along a line, where:
- **1**: your own fort
- **0**: enemy fort
- **-1**: an empty spot

You may move your army from any own fort (1) in either direction, **jumping over a consecutive streak of enemy forts (0)**, landing on an empty spot (-1). The number of enemy forts you "capture" is **how many 0’s you jump over**. Find the **maximum** number of enemy forts you can capture in one move.  
If you can't make any valid move, return 0.

### Examples  

**Example 1:**  
Input: `forts = [1,0,0,-1,0,0,0,0,1]`  
Output: `4`  
*Explanation: Moving from position 8 (1) to position 3 (-1) captures four enemy forts at positions 4,5,6,7.*

**Example 2:**  
Input: `forts = [0,0,1,-1]`  
Output: `0`  
*Explanation: No consecutive enemy forts (0) are between an own fort (1) and an empty spot (-1), so no captures are possible.*

**Example 3:**  
Input: `forts = [1,0,0,0,-1,0,1,-1]`  
Output: `3`  
*Explanation: Move from position 0 (1) to position 4 (-1), capturing 3 enemy forts at positions 1,2,3.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would check, for each own fort, all possible targets for a move (left and right), ensuring only enemy forts are in between and landing on an empty spot.  
However, there's a more efficient way:
- **Linear scan** the array just once, always remembering the last position where you saw either an own fort (1) or an empty spot (-1).
- Each time you reach either a 1 or -1, if the last position was the "other" (i.e., going from 1→-1 or -1→1), and only 0’s are in between, you can count those as captured forts.
- Track the max number of captured enemy forts as you proceed.
- This gives an O(n) approach and avoids redundant interval checks.

### Corner cases to consider  
- No 1 or no -1 at all (nothing to move from or to).
- The segment between two markers (1 or -1) contains something other than all 0's.
- Input of length 1 (no possible moves).
- Own forts or empty slots at ends of the array.
- All elements are zeros.
- Multiple segments of enemy forts between sets of 1, -1, etc.

### Solution

```python
def captureForts(forts):
    # Initialize answer and the last seen position of 1 or -1
    ans = 0
    last = None  # last non-zero index

    for i, fort in enumerate(forts):
        if fort != 0:
            # There was a previous non-zero we can jump from?
            if last is not None and forts[i] != forts[last]:
                # Only if all enemy forts between last and i
                captured = abs(i - last) - 1
                ans = max(ans, captured)
            last = i  # update last seen non-zero position
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make a single pass through the array and each step involves constant time work.
- **Space Complexity:** O(1), as only a few extra variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If the array is circular, can moves wrap around?
  *Hint: Consider how to find valid segments that cross the boundary.*

- What if multiple armies can move simultaneously? 
  *Hint: Think about overlapping moves and maximizing total capture, not just the max of one move.*

- How would you return the starting and ending indices of the best move?
  *Hint: Track positions - update when you update ans.*

### Summary
This is a classic **two-pointer / linear scan** problem, sometimes framed as finding the longest consecutive segment with a given property (in this case, enemy forts) that is "sandwiched" between two different markers. This scan pattern appears in substring and window problems, and knowing when to scan vs. iterate with nested loops distinguishes efficient interview solutions.


### Flashcard
Single pass tracking last position of 1 or -1; when switching between them with only 0's between, count enemies captured equals distance minus 1.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Max Consecutive Ones(max-consecutive-ones) (Easy)
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)