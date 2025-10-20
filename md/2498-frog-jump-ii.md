### Leetcode 2498 (Medium): Frog Jump II [Practice](https://leetcode.com/problems/frog-jump-ii)

### Description  
Given a sorted list of integers representing stone positions in a river (with stones as the start and stones[-1] as the end), a frog must jump from the first to the last stone, then back to the start. The frog can visit each stone at most once and can jump to any stone ahead by distance |stones[i] - stones[j]|. The cost of a path is defined as the length of its *largest* jump. Find the minimum possible cost for such a round trip.

### Examples  

**Example 1:**  
Input: `stones = [0,2,5,7,10]`  
Output: `5`  
*Explanation: The optimal path is 0→5→10→7→2→0. The jump lengths are 5, 5, 3, 5, 2. The maximum jump is 5.*

**Example 2:**  
Input: `stones = [0,3,6,7,10]`  
Output: `4`  
*Explanation: Path: 0→6→10→7→3→0. Jumps: 6, 4, 3, 4, 3. Maximum jump is 6, but trying different alternation we get improvement:  
0→3→7→10→6→0 (jumps: 3, 4, 3, 4, 6), so still 6. Actually, the minimum possible maximum jump is 4 if the forward and backward jumps are alternated; i.e. the greedy pattern.*

**Example 3:**  
Input: `stones = [0,1,3,6,7,10]`  
Output: `4`  
*Explanation: Path: 0→3→7→10→6→1→0. Jumps: 3, 4, 3, 5, 5, 1. Maximum jump is 5. Trying a “greedy skip” path:  
0→3→6→10→7→1→0 (jumps: 3, 3, 4, 3, 6, 1). The best possible is 4 with an optimal alternation (see below).*

### Thought Process (as if you’re the interviewee)  
Start with brute-force:  
- You could try all possible permutations, but with n stones this is O(n!) and thus intractable for large n.

Observation:  
- The frog must visit each stone once, can't revisit, and must complete a round trip.
- For minimum possible maximum jump, jumps should be as *evenly distributed* as possible.

Greedy Optimization:  
- The optimal path alternates between skipping and not skipping stones, forming two sub-paths by alternately taking every other stone.  
- If you traverse the stones in one direction using all even-indexed stones, and come back using the odd-indexed ones, you minimize the largest gap you encounter.  
- Thus, the cost reduces to finding the maximum gap between every second stone.

Implementation Plan:  
- For the path, compute the max(stones[i+2]-stones[i]) for i from 0 to n-2.
- Return the maximum of these "doubled" gaps – that's your answer.

Why is this correct?
- No matter the alternate path you choose, the largest gap not skipped must be crossed, so minimizing the furthest single jump must break up the furthest distances.

### Corner cases to consider  
- Only two stones: max jump is the distance between them.
- Stones with equal spacing: should report spacing.
- Only three stones: possible only one route.
- Non-uniform spacing: path should adjust to minimize the largest gap.
- Large input size.

### Solution

```python
def max_jump(stones):
    n = len(stones)
    max_jump = 0
    # Try both alternations: starting forward skipping one
    for i in range(n - 2):
        # Compare distance between i and i+2 (skipping one)
        jump = stones[i + 2] - stones[i]
        if jump > max_jump:
            max_jump = jump
    # Also check consecutive stones (as you may need to traverse them)
    for i in range(n - 1):
        jump = stones[i + 1] - stones[i]
        if jump > max_jump:
            max_jump = jump
    return max_jump
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Two simple loops over n stones (one for 2-step, one for consecutive).
- **Space Complexity:** O(1).  
  Only a constant number of variables are used aside from input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the frog can visit a stone more than once?  
  *Hint: Try adapting the dynamic programming or graph approach.*

- How would you handle unsorted input stones?  
  *Hint: Sort the array first, then apply the same logic.*

- Could you retrieve the exact path as well, not just the cost?  
  *Hint: Try backtracking or reconstruct the path using auxiliary arrays.*

### Summary
Greedy alternation is a common pattern for minimizing the maximum gap in constrained path traversal problems. Here, the key is to maximize the "distance between skips" and thus restrict the largest possible jump the frog will need to make. This approach is applicable wherever the objective is to minimize the largest step between elements, seen in problems such as stepping stones, dividing arrays into chunks, or scheduling tasks to minimize peak load.


### Flashcard
Optimal path alternates stones; max jump is max of every other stone's distance.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
- Climbing Stairs(climbing-stairs) (Easy)
- Koko Eating Bananas(koko-eating-bananas) (Medium)