### Leetcode 3048 (Medium): Earliest Second to Mark Indices I [Practice](https://leetcode.com/problems/earliest-second-to-mark-indices-i)

### Description  
You're given two arrays:
- **nums** (1-indexed, size n): Each position i represents an integer with initial value nums[i].
- **changeIndices** (size m): Each element is an integer between 1 and n. For every second s (from 1 to m), you may:
  - Pick an *unmarked* index i (1 ≤ i ≤ n) and decrement nums[i] by 1.
  - If nums[changeIndices[s]] is currently 0, you can mark that index.
  - Do nothing.
  
Initially, no index is marked.  
Your goal: **Find the earliest second (from 1 to m) by which all indices can be marked, or -1 if it’s impossible.**  
You may only mark at second s the index changeIndices[s] (if its value is zero at that moment).

### Examples  

**Example 1:**  
Input:  
`nums = [1,1,1]`, `changeIndices = [1,2,3]`  
Output:  
`5`  
*Explanation:*
- s=1: decrement nums[1] → [0,1,1]; mark index 1 via changeIndices[1]  
- s=2: decrement nums[2] → [0,0,1]; mark index 2 via changeIndices[2]  
- s=3: decrement nums[3] → [0,0,0]; mark index 3 via changeIndices[3]  
- All indices marked at time = 3, but to mark each after zero, you also need a marking operation at s=4 and s=5, thus answer is 5.

**Example 2:**  
Input:  
`nums = [2,2]`, `changeIndices = [1,1,2,2]`  
Output:  
`6`  
*Explanation:*
- Marking at s=3 requires nums[2] to be 0, which takes 2 decrements (at earlier seconds).
- Similarly for index 1.
- You need at least 6 seconds (with the allowed mark operations) to get both zeros at the right moments and mark.

**Example 3:**  
Input:  
`nums = [3]`, `changeIndices = [1,1,1,1]`  
Output:  
`-1`  
*Explanation:*
- You'd need to decrement [1] three times (to reach zero), then a mark trigger at s=4.
- If not enough time/operations, or if changeIndices cannot mark when zero, output -1.

### Thought Process (as if you’re the interviewee)  
Start brute-force—try all combinations of decrements and marks per second.  
But that's too slow: m could be large, and the operation choices are exponential.

#### Optimized Approach:
- Note marking only possible at specific seconds for each index, controlled by changeIndices.
- For every moment, I can either:
  - Decrement an unmarked index (spend a second),
  - Mark the current index, *if* its value is zero.
  
**Goal**: At some second, *every* nums[i] has been marked (means it was decremented to zero and marked via changeIndices).

Key insight: To efficiently check if all indices can be marked by a certain second t, we can run a simulation for the first t seconds:
- Track the earliest moments when each index appears in changeIndices.  
- Figure out: Do I have enough "operations" before each mark time to reduce every nums[i] to zero—given that at that second I can mark i?
- Use binary search on t ∈ [1, m] to find the smallest t that works (simulate marking logic for each candidate t).

Final approach:
1. Binary search on answer t (1 to m).
2. For each t, simulate:
   - Try to schedule decrements to get each nums[i] to zero before its assigned mark moment (appearance in changeIndices).
   - If possible, return the minimum t.

This is greedy + binary search, since the costliest indices (largest nums[i]) need enough decrements before they can be marked, and marks can only happen at pre-specified seconds.

### Corner cases to consider  
- nums contains zeros: can mark immediately if scheduled in changeIndices.
- changeIndices missing some indices: impossible to mark all.
- Multiple mark opportunities per index: pick the earliest feasible.
- m much less than total decrement needs: impossible.
- Duplicates in changeIndices (overlapping options).
- Only one index / all ones.

### Solution

```python
def earliestSecondToMarkIndices(nums, changeIndices):
    n = len(nums)
    m = len(changeIndices)
    nums = list(nums)  # in case input is a tuple
    changeIndices = list(changeIndices)

    from collections import defaultdict, deque
    
    # For binary search, check if it's possible to mark all by second `t`
    def can_mark(t):
        # When can we mark each index?
        mark_secs = defaultdict(deque)
        for sec in range(t):
            idx = changeIndices[sec] - 1  # convert to 0-based index
            mark_secs[idx].append(sec)
        
        available = []  # All seconds where we're allowed to mark some index
        
        needed_decrement_ops = 0
        decrement_slots = []
        
        mark_target = []
        for i in range(n):
            # If never scheduled in first t seconds, can't mark this one
            if not mark_secs[i]:
                return False
            # Needs nums[i] decrements before its earliest scheduled mark
            mark_time = mark_secs[i][-1]  # latest possible mark moment for i within t
            mark_target.append((mark_time, nums[i], i))
        # Sort by latest possible mark time (do tightest first)
        mark_target.sort()
        
        used = [False] * n
        decs_left = [nums[i] for i in range(n)]
        decrements_available = t - n  # n marks, rest can be decrements

        # Greedyly assign as much pre-decrement work as possible
        # At each mark_time, must have decs_left[i] == 0
        current_time = 0
        scheduled_decrement_ops = 0
        
        needed = 0
        dec_positions = []
        # For each marking opportunity, can we get value to zero by then?
        marks_used = [False]*n
        remaining_ops = t
        slots = []
        marked = set()

        # Simulate backwards: At every second from t-1 down to 0,
        # if we can mark, do so, else use for decrement (if still have work).
        # We need at least nums[i] decrements prior to the mark time.
        # Assign decrements as late as possible (so early seconds can be used by later indices).
        decrements = []
        last_mark_time = [mark_secs[i][-1] for i in range(n)]
        
        # Prepare: for each index, the last time we can mark it
        time_used = [False] * t
        decs_need = []
        for i in range(n):
            decs_need.append((last_mark_time[i], nums[i], i))
        decs_need.sort()
        
        # Used seconds, simulate from last second to 0
        t_left = t
        scheduled_marks = set()
        scheduled_decrements = 0
        available_seconds = set(range(t))
        # "Reserve" the seconds where the mark for each index happens
        for (sec, need, idx) in decs_need:
            # For this index idx, find a second sec' ≤ sec to mark it
            # We need to have its value at zero by sec'
            # All before that can be used for decrements
            k = need
            # Mark at time sec
            # To decrement: need to find k unused times among available_seconds < sec
            slots = [s for s in available_seconds if s < sec]
            if len(slots) < k:
                return False
            for s in slots[-k:]:
                available_seconds.remove(s)
            if sec not in available_seconds:
                return False
            available_seconds.remove(sec)
        return True

    l, r = 1, len(changeIndices)
    res = -1
    while l <= r:
        mid = (l + r) // 2
        if can_mark(mid):
            res = mid
            r = mid - 1
        else:
            l = mid + 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log m)
  - Binary search over m (log m iterations).
  - Each can_mark check sorts up to n entries and scans first t ≤ m steps; that's O(m) per check.
- **Space Complexity:** O(m)
  - Primarily for tracking mark opportunities, slots, and auxiliary arrays proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if changeIndices doesn’t allow marking every index at least once?
  *Hint: How to efficiently check all indices are "addressed" soon enough?*

- Could you return not just the time, but the operation plan (seconds at which to decrement or mark)?
  *Hint: Build or reconstruct the sequence during simulation.*

- How would you handle a version where each index can be marked at any second (not controlled by changeIndices)?
  *Hint: Would the problem become easier? Try greedy.*

### Summary
This problem uses the **binary search on the answer** pattern combined with a **greedy scheduling** technique. It's especially relevant when you must allocate limited actions over time subject to strict scheduling constraints. This approach applies to many scheduling problems, deadline-based task execution, and similar "minimum time" optimizations under resource or timing constraints.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
