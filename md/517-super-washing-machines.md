### Leetcode 517 (Hard): Super Washing Machines [Practice](https://leetcode.com/problems/super-washing-machines)

### Description  
Imagine you have **n** washing machines aligned in a row. Each has a number of dresses, possibly zero. On each move, you can select any number of machines (from 1 to n) and for each selected machine, transfer one dress to **one** adjacent machine (left or right). Multiple machines can pass dresses simultaneously.

Given an integer array `machines`, where `machines[i]` is the dresses in the iᵗʰ machine, find the **minimum number of moves needed so all machines have an equal number of dresses**. If it is *impossible* (the dresses can't be evenly distributed), return `-1`.

### Examples  

**Example 1:**  
Input: `machines = [1,0,5]`,  
Output: `3`  
Explanation:  
1st move:  1  0 <-- 5  →  1 1 4  
2nd move:  1 <-- 1 <-- 4  →  2 1 3  
3rd move:  2  1 <-- 3  → 2 2 2  


**Example 2:**  
Input: `machines = [0,3,0]`,  
Output: `2`  
Explanation:  
1st move:  0 <-- 3  0  →  1 2 0  
2nd move:  1 2 --> 0  →  1 1 1  


**Example 3:**  
Input: `machines = [0,2,0]`,  
Output: `-1`  
Explanation:  
It's impossible to make all three washing machines have the same number of dresses.


### Thought Process (as if you’re the interviewee)  

- Start by noting the **target**: all machines must have the same dresses, so this must be the average. If total dresses cannot be divided evenly by n, return -1 immediately.

- Naive idea: simulate every move. However, that's exponential time—unworkable.

- Optimization:
  - Consider *prefix sum* ideas. For each machine, track how many dresses need to flow in or out, relative to the target.
  - At step i, define `diff = machines[i] - target`. 
  - Maintain a running `cumulative` sum of these diffs as you iterate through machines (`acc += diff`). This captures how much “imbalance” has passed through.
  - For each machine, the **required moves** must be enough to fix the current imbalance and also handle whatever needs to be sent/received along the line so far.
  - The answer is the **maximum** of `abs(cumulative), diff` at each machine.

- Why? Because you can only move one dress per machine per move, so bottlenecks are determined by where the max transfer (either local or cumulative) is required.

- This approach gives an O(n) greedy solution: one pass, update the max moves needed based on imbalance and cumulative transferred counts.


### Corner cases to consider  
- Input with a single machine (`[n]`)
- Machines already balanced (all equal)
- Impossible distributions (`sum(machines) % n ≠ 0`)
- All dresses in one machine
- All zeros except for one machine


### Solution

```python
def find_min_moves(machines):
    n = len(machines)
    total = sum(machines)
    if total % n != 0:
        return -1  # Impossible to evenly distribute

    target = total // n
    max_moves = 0
    cumulative = 0

    for i in range(n):
        # Difference of current machine from target
        diff = machines[i] - target
        cumulative += diff
        # Max moves needed is max of:
        # 1) abs(cumulative): total dresses need to be passed through so far
        # 2) diff: dresses need to be moved out of current machine
        max_moves = max(max_moves, abs(cumulative), diff)

    return max_moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Single pass through machines to compute result
- **Space Complexity:** O(1)
  - Only a few variables for tracking


### Potential follow-up questions (as if you’re the interviewer)  

- What if *each machine* could move a *different number* of dresses in each move?  
  *Hint: Try to generalize your approach to handle bulk transfers per move.*

- What if the machines were arranged in a **circle**?  
  *Hint: Consider the effect of adjacency wrapping around.*

- How would you handle **multiple queries** with different machine starting states quickly?  
  *Hint: Can anything be precomputed for efficiency?*


### Summary
This problem uses a **greedy and prefix sum** pattern to efficiently find the number of moves required to balance an array under local transfer constraints. The approach demonstrates that bottlenecks are determined not by direct transfers alone, but the accumulation of imbalance through the array. This idea of cumulative load balancing is powerful and commonly appears in “balance by transfer” and “water pouring” problems.


### Flashcard
If total dresses isn’t divisible by n, return -1; otherwise, track running sum of differences and take the max of abs(running sum) and local diff.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
