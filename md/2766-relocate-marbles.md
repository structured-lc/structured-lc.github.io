### Leetcode 2766 (Medium): Relocate Marbles [Practice](https://leetcode.com/problems/relocate-marbles)

### Description  
You're given an array of integers representing the positions of marbles on a number line. You’re also given two arrays: one specifying positions to move marbles FROM, and one specifying the corresponding positions to move marbles TO. For each move, relocate a marble from moveFrom[i] to moveTo[i]. After performing all moves, return a sorted array of all positions that have at least one marble (duplicates count as one—they collapse into a set).  

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`, `moveFrom = [1, 2]`, `moveTo = [2, 3]`  
Output: `[3]`  
*Explanation:  
- Move: 1 → 2. Now marbles at [2,3].  
- Move: 2 → 3. Now [3]. The only unique marble position left is 3.*

**Example 2:**  
Input: `nums = [5,6,7]`, `moveFrom = [5,6]`, `moveTo = [8,9]`  
Output: `[7,8,9]`  
*Explanation:  
- Move: 5 → 8. Marbles at [6,7,8].  
- Move: 6 → 9. Marbles at [7,8,9]. Sorted: [7,8,9].*

**Example 3:**  
Input: `nums = [4]`, `moveFrom = []`, `moveTo = []`  
Output: `[4]`  
*Explanation:  
- No moves. The only marble remains at 4.*


### Thought Process (as if you’re the interviewee)  
Let’s start by thinking through a brute-force approach:
- For every move (moveFrom[i] → moveTo[i]), find a marble at moveFrom[i], remove it, then add a marble at moveTo[i].
- This could be slow if we store marbles in a list: searching/removing is O(n) per operation, for m moves, O(m\*n) in total.

But the problem only cares about which positions are occupied in the end, and duplicates don’t matter. So, we can use a set to store the unique occupied positions:
- Add all starting positions to a set.
- For each move: remove moveFrom[i] from the set, add moveTo[i] to the set.
- This makes each move O(1), for a total of O(m).
- Finally, return all positions in the set, sorted.

This is efficient both in time and code simplicity, and we can explain that the key insight is collapsing to unique occupied positions, using a set.

### Corner cases to consider  
- No moves at all (empty moveFrom/moveTo)
- Moves that overlap (e.g., moveFrom = [1,2], moveTo = [2,3])
- Moving to an already occupied spot
- Starting with duplicate positions in nums (not specified, but careful)
- All marbles moved away from their position
- Large inputs (test O(1) set operations)
- Move from a position not occupied (for robustness; not specified)

### Solution

```python
def relocateMarbles(nums, moveFrom, moveTo):
    # Track occupied positions as a set (unique positions)
    occupied = set(nums)
    
    # Apply each move
    for frm, to in zip(moveFrom, moveTo):
        # Remove from old position (only if present to avoid KeyError)
        if frm in occupied:
            occupied.remove(frm)
        # Place at new position
        occupied.add(to)
    
    # Return sorted list of unique positions
    return sorted(occupied)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m + k log k),  
  where n is the length of nums, m is number of moves, and k is the number of unique positions at the end  
  - Building the set: O(n)  
  - Processing moves: O(m)  
  - Sorting result: O(k log k), usually k ≤ n + m

- **Space Complexity:** O(n + m),  
  - The set stores unique positions (at most n + m, for no overlaps)
  - Extra space for output array

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to report how many marbles are at each position, not just unique positions?  
  *Hint: Use a dictionary (collections.Counter) to keep track of the count per position.*

- What if you have to support undoing moves efficiently?  
  *Hint: Maintain a move history stack or use a doubly linked list for positions per marble.*

- What if you want to process millions of moves on very large data?  
  *Hint: Discuss data structure choices and possible trade-offs, like direct array mapping if number line is dense.*


### Summary  
We used the **Set manipulation** pattern here, taking advantage of unique element storage and fast add/remove operations. This approach is common in problems involving states where duplicity is irrelevant (e.g., sets of positions, rooms, or active flags). The core pattern is: use a set to model the state space and apply each operation as a membership update which is fast and clean. This solution can be applied whenever you need unique, unordered elements and efficient insert/remove.