### Leetcode 2202 (Medium): Maximize the Topmost Element After K Moves [Practice](https://leetcode.com/problems/maximize-the-topmost-element-after-k-moves)

### Description  
You are given a 0-indexed integer array **nums** representing a pile, where **nums** is the topmost item. In one move, you can **remove** the topmost element (if the pile is not empty), or **add** any one of the previously removed elements back onto the pile (making it the new topmost element).  
You are given an integer **k**, specifying exactly how many moves to make.  
**Return the maximum possible value of the topmost element after exactly _k_ moves.** If after exactly _k_ moves the pile is empty, return -1.

### Examples  

**Example 1:**  
Input: `nums = [5,2,2,4,0,6]`, `k = 4`  
Output: `5`  
*Explanation:  
- Remove 5 (remaining: [2,2,4,0,6], removed: [5])  
- Remove 2 (remaining: [2,4,0,6], removed: [5,2])  
- Remove 2 (remaining: [4,0,6], removed: [5,2,2])  
- Add back 5 (pile: [5,4,0,6]).  
Max possible top after 4 moves is 5.*

**Example 2:**  
Input: `nums = [2]`, `k = 1`  
Output: `-1`  
*Explanation:  
- Only one element. If we remove it, pile is empty.  
- If we add back, need at least one element already removed.  
- After 1 move, pile ends up empty.*

**Example 3:**  
Input: `nums = [2,5]`, `k = 1`  
Output: `5`  
*Explanation:  
- Remove 2 (get [5]), or  
- Add back (not possible since not removed yet),  
- So after 1 move, top is 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Simulate every sequence of k moves (remove/add), keeping track of pile and removed list. This is exponential and not feasible for large input.

- **Optimization:**  
  The only way to maximize the topmost element after k moves is to maximize the choice pool within the allowed moves.  
  Think:  
  - If we only **remove** elements: after k removals, top is `nums[k]` if k < len(nums).
  - But after removing up to k−1 elements, we can "add back" **any** of the removed elements — including the largest one we've taken so far.
  - So max top is the **largest of the first min(k-1, len(nums)) elements** (if at least one is left after k moves).

- Special rules:
  - If k < len(nums), we can "peek" as far as `nums[k]`, but can also replace top with a removed value.
  - If k == len(nums), after k removals the pile is empty: unless k==1 and n==1 (see edge cases).
  - If k > len(nums), we will remove everything and then only be able to add back removed elements, but last add counts as top.

- **Time/Space:** Just find the max in prefix or up to k−1, and handle edge cases.

### Corner cases to consider  
- `nums` has only 1 element.
- `k` is 0 (no moves): Should return original top.
- `k` is 1   
    - If `len(nums)==1`, after 1 remove pile is empty, so -1.  
    - If `len(nums)>1`, after 1 remove, `nums[1]` is top.
- `k` > len(nums): We can always add back, use max of all nums.
- `k` == len(nums): All removed; the only way to have element left is to add back, but check moves parity.
- All elements equal.
- Large values of k compared to pile length.

### Solution

```python
def maximumTop(nums, k):
    n = len(nums)
    # If no moves, return initial topmost element
    if k == 0:
        return nums[0] if nums else -1  # Defensive for empty input

    # If the pile has only 1 element
    if n == 1:
        # If k is odd, pile becomes empty; Even k returns original value
        return -1 if k % 2 == 1 else nums[0]

    # If k == 1, we remove the top
    if k == 1:
        # If only one item: pile is empty after 1 move
        return nums[1] if n > 1 else -1

    # If k <= n, after k moves, the pile is not empty
    # We can remove up to k-1 items, then add back any removed element (max of nums[:k-1])
    # Or, if we always remove, the pile's top is nums[k] (if k < n)
    max_in_removed = max(nums[:min(n, k-1)])  # Max among removed
    if k < n:
        return max(max_in_removed, nums[k])
    else:
        # We can only add back removed (since removing all would empty the pile)
        return max_in_removed
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(min(k, n)) — since we only scan up to the ⌊k-1⌋-th element to find the max.
- **Space Complexity:** O(1) — uses only constant extra space (one variable for max, some counters).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle repeated or duplicate values in the pile?  
  *Hint: Do you need to track indices or just values?*

- Suppose you want to minimize the topmost element; how would you change the approach?  
  *Hint: What would you tweak in your max selection?*

- Imagine if you were allowed to add *any* previously removed element at most once in total, not per move. How does the logic change?  
  *Hint: Can you keep track of "used" flags?*

### Summary
This is a **"simulation + greedy analysis"** problem, but the optimal solution is built on reasoning about how the "removed pool" expands with each move — no need for actual pile simulation.  
This pattern of simulating constrained sequence of removals and replacements to optimize some value (here, maximum top) is common in **stack manipulation** and game/priority queue problems.  
Efficiently picking max from a prefix, and handling odd/even moves or "remaining move" parity, comes up in similar questions involving k-removals or k-operations on lists.


### Flashcard
To maximize the top element after k moves, consider removing up to k−1 elements and then adding back the largest available, or simply removing k elements if possible.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Gas Station(gas-station) (Medium)