### Leetcode 3086 (Hard): Minimum Moves to Pick K Ones [Practice](https://leetcode.com/problems/minimum-moves-to-pick-k-ones)

### Description  
You are given a binary array **nums** of length n, an integer **k**, and an integer **maxChanges** (≥ 0).  
Each move, you stand at some position. In a move, you must do one of:
- If you're standing at a 1, you "pick" it (set nums[i]=0).
- You can perform, at most **maxChanges** times total:
  - Set any nums[j]==0 (not where you're currently standing) to 1 (turn 0→1).
- Each move, you can also swap adjacent positions where nums[x]==1 and nums[y]==0, so that a 1 "slides" to a new position.

Find the **minimum number of moves** to pick up exactly **k** ones.

### Examples  

**Example 1:**  
Input: `nums = [1,1,0,0,0,1,1,0,0,1], k = 3, maxChanges = 1`  
Output: `3`  
*Explanation: Pick indices 0, 1, and 5 (which are ones) in 3 moves. No need for changes or swaps—there are enough ones present.*

**Example 2:**  
Input: `nums = [0,0,0,0,0], k = 2, maxChanges = 2`  
Output: `2`  
*Explanation: There are no ones. Use 'change' moves to set any two zeros to one, then pick them up in two moves.*

**Example 3:**  
Input: `nums = [1,0,1,0,1], k = 4, maxChanges = 2`  
Output: `4`  
*Explanation: Initial ones at indices 0,2,4. Use both changes: set a zero to one (say index 1 or 3).  
After two changes, you have four ones and can pick them in 4 moves.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try every possible way to pick k ones by simulating all moves and swaps, but this is infeasible for large arrays.
- **Observation:**  
  - Picking a one takes one move.
  - Swaps can help cluster ones if needed, but cost moves.
  - We are allowed up to maxChanges of turning zeros into ones, which increases the available ones.
- **Efficient solution:**  
  1. Collect positions of all ones.
  2. Consider using up to min(maxChanges, number of zeros) to turn zeros into ones—the best would be to flip zeros closest to existing ones (to minimize swap cost, though swapping isn’t advantageous if picking directly is possible).
  3. After change operations, select the minimum number of moves (sum of distances if ordering matters).  
  - In reality, if after changes you have ≥k ones, the minimum is just k moves.
  - If not even after all changes you cannot get k ones, answer is -1.

- **Key insight:** We only need to maximize number of available ones using changes, then pick the closest k ones.

- **Implementation plan:**
  - Get indices of ones.
  - maxOnes = initial ones + min(maxChanges, zeros)
  - If maxOnes < k, return -1.
  - Otherwise, we only need k moves to pick k ones (since only picking a one counts as a move; no benefit for swaps unless we’re forced to swap due to pick restrictions).

### Corner cases to consider  
- Empty array (`nums = []`), k = 0 or any.
- All zeros and maxChanges < k ⇒ Impossible.
- All ones and k ≤ n ⇒ Pick directly.
- k = 0 ⇒ Output 0 (no moves needed).
- Duplicate ones and zeros intermixed.
- maxChanges = 0.

### Solution

```python
def minimumMoves(nums, k, maxChanges):
    # Find positions of ones and zeros
    ones = [i for i, x in enumerate(nums) if x == 1]
    zeros = [i for i, x in enumerate(nums) if x == 0]
    
    total_ones = len(ones)
    # If after max possible changes, not enough ones
    if total_ones + min(maxChanges, len(zeros)) < k:
        return -1

    # If enough ones already
    if total_ones >= k:
        return k

    # Need to change (k - total_ones) zeros to ones
    needed_changes = k - total_ones
    if needed_changes > maxChanges:
        return -1
    
    # Changes required + picks required = k (each pick/change counts as a move)
    return k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan nums once to get indices of ones and zeros.
- **Space Complexity:** O(n), for storing indices of ones and zeros.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of one pick per move, you can pick all adjacent 1's in a single move?  
  *Hint: Consider grouping operations and adjacency.*

- If swaps cost less or are free—how can you minimize change operations?  
  *Hint: Calculate move costs when swaps reduce distance between ones.*

- What if k can be larger than n?  
  *Hint: Is picking more than the available array length ever valid?*

### Summary
This problem is a variant of the “minimum operations” or “greedy pick” pattern, focusing on gathering k items using change-constrained operations.  
The best approach leverages counting and simple greedy allocation of allowed changes, similar to two-pointer or window techniques in selection/subset-sum problems.  
It highlights the value of reducing complex move simulation to simple counting and state tracking.


### Flashcard
Collect all one positions; use maxChanges to create additional ones near the target cluster; find the k consecutive ones (or created ones) with minimum total moves.

### Tags
Array(#array), Greedy(#greedy), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Swaps to Group All 1's Together(minimum-swaps-to-group-all-1s-together) (Medium)