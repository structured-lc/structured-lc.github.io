### Leetcode 2612 (Hard): Minimum Reverse Operations [Practice](https://leetcode.com/problems/minimum-reverse-operations)

### Description  
You are given an array of size `n`, initially all zeros except for position `p` (which has a 1). You can reverse any subarray of length `k` (must be exactly of length `k`) and the goal is: For each index, find the minimum number of reverse operations required to bring the 1 to that index (only considering moves that never put the 1 on a banned list of indices). If it is impossible, return -1 for that index.

### Examples  

**Example 1:**  
Input: `n=4, p=0, banned=[2], k=2`  
Output: `[0,1,-1,2]`  
*Explanation:  
- Start at index 0, this is where the 1 is already present (`res=0`).  
- Reverse [0,1]: 1 moves to index 1 (`res[1]=1`).  
- 2 is banned (`res[2]=-1`).
- Next, reverse [1,3]: 1 moves to 3 (`res[3]=2`).*

**Example 2:**  
Input: `n=4, p=0, banned=[1,3], k=2`  
Output: `[0,-1,-1,-1]`  
*Explanation:  
- The only possible reverse (from index 0) is to 1, but 1 is banned. There are no other valid moves. Only position 0 is reachable.*

**Example 3:**  
Input: `n=5, p=0, banned=, k=3`  
Output: `[-1,-1,-1,-1,-1]`  
*Explanation:  
- The starting position is banned. No reversal is possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible reverse operations from `p`, update all positions reached, and repeat until all possibilities are exhausted. This would be exponential.
- **Optimization:** Problem asks for the minimum number of moves—this is equivalent to a *shortest path search* in an unweighted graph, so we should use BFS.
- The state is the position of 1, and the moves are “all valid subarrays of length k containing position i (current 1) and not containing banned indices after the move.”
- To efficiently find all positions you can reach, use sets (to quickly update and avoid revisiting).
- The parity of positions (`k` is even/odd) impacts which indices you can reach.
- Instead of checking every subarray, use Ordered Sets/TreeSets to find reachable indices faster.

### Corner cases to consider  
- All indices are banned.
- The starting index is itself banned.
- k = n (whole array reversal).
- k = 1 (no effect: you can't move the 1).
- k is even or odd and n is odd/even.
- No reverse brings the 1 to a given index.

### Solution

```python
def minReverseOperations(n, p, banned, k):
    # Initialize the result array with -1 (unreachable)
    res = [-1] * n
    
    # Mark banned positions with -2 to separate from unvisited (-1)
    for b in banned:
        res[b] = -2
    
    # The starting position requires 0 moves
    res[p] = 0
    
    # To speed up finding unvisited positions by parity (even/odd)
    unvisited = [set(), set()]   # 0: even indices, 1: odd indices
    for i in range(n):
        if res[i] == -1:
            unvisited[i % 2].add(i)
    
    from collections import deque
    q = deque([p])
    step = 0
    
    while q:
        step += 1
        for _ in range(len(q)):
            cur = q.popleft()
            
            # Compute the possible leftmost and rightmost windows
            # [start, end] window of length k containing current position
            min_start = max(cur - k + 1, 0)
            max_start = min(cur, n - k)
            
            # For each possible start, the 1 moves to next = start + end - cur
            for start in range(min_start, max_start + 1):
                # After reversing, the 1 moves to this position
                nxt = start + (k - 1) - (cur - start)
                if res[nxt] == -1:
                    res[nxt] = step
                    q.append(nxt)
                    # Remove from unvisited set
                    unvisited[nxt % 2].discard(nxt)
    
    # Convert banned (-2) values back to -1
    for i in range(n):
        if res[i] == -2:
            res[i] = -1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each index is pushed to the queue at most once, and every window is visited only when necessary due to set removal.
- **Space Complexity:** O(n). For result list, banned sets, queue, and sets to track unvisited indices.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k can change at every operation?
  *Hint: Would require an extra dimension in BFS state, increasing time complexity.*

- How would you optimize if the banned list is very large/very small?
  *Hint: Consider boolean arrays vs. sets for fast lookup.*

- If the array contains elements other than 0/1, how would your approach change?
  *Hint: The state definition may change—now you'd need to track value/content at each index.*

### Summary
This problem is essentially a shortest path in a *virtual* unweighted graph, making BFS ideal. Parity and set tricks allow efficient search/pruning of reachable indices. Patterns used here include *BFS for minimal steps*, *state modeling*, and use of sets for fast lookup—these techniques are broadly applicable to problems involving minimal transformations, state transitions, and sliding window operations.


### Flashcard
Use BFS to find the minimum number of reverse operations to reach all possible positions, avoiding banned indices.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Ordered Set(#ordered-set)

### Similar Problems
