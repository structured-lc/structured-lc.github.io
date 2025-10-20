### Leetcode 1024 (Medium): Video Stitching [Practice](https://leetcode.com/problems/video-stitching)

### Description  
Given multiple video clips, each represented as an interval `[start, end]`, you need to cover an event that lasts from time `0` to `T` (inclusive of 0, exclusive of `T`). Clips can overlap, and you may reuse any segment of any clip. The task is to determine the **minimum number of clips** needed (possibly by cutting and splicing) so every moment in the timeline `[0, T]` is covered without any gaps. If it’s impossible, return `-1`.

### Examples  

**Example 1:**  
Input: `clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], T = 10`  
Output: `3`  
*Explanation: Use [0,2] → [1,9] → [8,10]. These three cover 0–10 completely.*

**Example 2:**  
Input: `clips = [[0,1],[1,2]], T = 5`  
Output: `-1`  
*Explanation: Can't reach time 5; only 0–2 can be covered.*

**Example 3:**  
Input: `clips = [[0,4],[2,8]], T = 5`  
Output: `2`  
*Explanation: [0,4] covers 0–4, then [2,8] covers 4–5 (with partial overlap). Use both clips.*

### Thought Process (as if you’re the interviewee)  
My first instinct is to treat this as an **interval covering problem**. The goal is to use as few intervals as possible to fully cover the range `[0, T]`.  
A brute-force approach would involve trying all possible combinations of clips, but this is exponential.  
A better approach is **greedy**: always pick, at every step, the clip starting before or at the current time that extends coverage the farthest forward.  
- Sort clips by their start times.
- For the current covered end (`st`), scan for the clip with `start_i ≤ st` that has the **maximum `end_i`**. Take that, add one to the count, and move `st` up to new range.
- If no such clip exists at any point, return `-1` (gap).
This is similar to the "Jump Game II" greedy jump strategy and works because we always extend the frontier optimally.

### Corner cases to consider  
- `clips` is empty.
- Some moments are not covered by any clip (gap in timeline).
- All clips start after 0 or end before T.
- Multiple clips start at the same time.
- Clips that fully cover the target alone (e.g., `[0, T]` exists).
- Clips with zero or negative length (should be ignored in practical code).
- T = 0 (trivial case, needs 0 clips).

### Solution

```python
def videoStitching(clips, T):
    # Sort clips by start time
    clips.sort(key=lambda x: (x[0], -x[1]))
    
    res = 0        # Result: number of clips used
    st = 0         # Current furthest time covered
    end = 0        # Furthest end reachable in the current step
    i = 0
    n = len(clips)
    
    while st < T:
        # Try to extend coverage from st as far as possible using clips that start ≤ st
        while i < n and clips[i][0] <= st:
            end = max(end, clips[i][1])
            i += 1
        # Could not extend further (gap), return -1
        if end == st:
            return -1
        # Use one more clip; move st to the furthest end
        res += 1
        st = end
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N) due to sorting the clips initially; scanning through clips is O(N).
- **Space Complexity:** O(1) extra space (excluding input). No need for extra DP arrays or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each clip can only be used as a whole, no segmenting allowed?  
  *Hint: You'll need to find a subset of non-overlapping intervals that cover [0, T].*

- If we're given very large clips (possible values up to 1e9), how can we avoid scanning unnecessary intervals?  
  *Hint: Use a sweep line and store only maximums per start.*

- How can you reconstruct the actual set of clips chosen, not just the count?  
  *Hint: Track indices or prev pointers when updating coverage.*

### Summary
This problem uses a **greedy interval covering** pattern, specifically by always extending coverage as far as possible at each step. This approach is common in other greedy "cover" problems like Jump Game II, activity selection, and scheduling. Recognizing the pattern enables an efficient solution that avoids exhaustive search and works for large inputs.


### Flashcard
Sort clips, greedily pick the one extending coverage farthest at each step; increment count when coverage advances.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
