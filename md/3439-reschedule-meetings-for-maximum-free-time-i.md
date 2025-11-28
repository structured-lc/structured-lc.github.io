### Leetcode 3439 (Medium): Reschedule Meetings for Maximum Free Time I [Practice](https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-i)

### Description  
You are given an integer **eventTime**, representing an event that runs from time t = 0 to t = eventTime. You also get two integer arrays **startTime** and **endTime**, each of length n, representing the start and end times of n **non-overlapping meetings** (the ith meeting is from startTime[i] to endTime[i]).  
You may reschedule **at most k meetings** by shifting their start times while **preserving their durations**. The order of meetings must remain the same, and the meetings still must not overlap or go outside the event boundaries.  
Your goal: **maximize the length of the largest possible continuous “free time” segment** (i.e., the biggest gap between meetings or from event start/end).

### Examples  

**Example 1:**  
Input: `eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]`  
Output: `2`  
*Explanation:  
Meetings: [1,2], [3,5]. You can move the first meeting to start at 0 (so it's [0,1]). This creates a free interval [1,3], which is of length 2.*

**Example 2:**  
Input: `eventTime = 10, k = 0, startTime = [2,5,7], endTime = [3,6,8]`  
Output: `4`  
*Explanation:  
No meetings can be moved (k = 0). Gaps are: [0,2]→2, [3,5]→2, [6,7]→1, [8,10]→2. The largest gap is 2.*

**Example 3:**  
Input: `eventTime = 10, k = 2, startTime = [2,5,7], endTime = [3,6,8]`  
Output: `4`  
*Explanation:  
You can move both the first and last meetings to [0,1] and [9,10]. The middle meeting [5,6] can stay. Now free times are [1,5]→4, [6,9]→3, so the max is 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all possible ways to reschedule up to k meetings by sliding them to the earliest/latest possible position, while preserving order and ensuring no overlap. For every configuration, calculate the max free segment.  
  This approach is exponential in n and k, which is not feasible for larger inputs.

- **Optimization:**  
  Notice that since meeting order must be maintained and durations must remain, the only flexibility is “sliding” any chosen meeting as left as possible or right as possible (without overlap or exceeding boundaries).  
  For each possible set of k meetings to be flexibly placed, find their optimal positions.  
  The problem then reduces to finding **the best window of k consecutive meetings to reschedule**, slide them to maximize one of the gaps before/after, using a sliding window.

- **Final approach (greedy + sliding window):**  
  - Iterate over all windows of size k (or less) among the n+1 possible "gaps" (before, between, and after the meetings).
  - For each window, you virtually “push” the meetings in that window to one side (as far as allowed), and compute the free periods.
  - The answer is the maximum gap across all possible reschedulings of k meetings.

### Corner cases to consider  
- When `k=0`, simply find the largest gap as-is.
- n=0: No meetings, so the free time is just eventTime.
- Meetings already touch, so there are no gaps.
- Large k (≥ n): All meetings can be rescheduled; maximize the single largest possible gap.
- Meetings at the start or end, producing larger gaps after rescheduling.

### Solution

```python
def maximizeFreeTime(eventTime, k, startTime, endTime):
    n = len(startTime)
    durations = [endTime[i] - startTime[i] for i in range(n)]
    
    # Precompute gaps between meetings (incl. before first and after last)
    gaps = []
    # gap before first meeting
    gaps.append(startTime[0] - 0)
    # gaps between meetings
    for i in range(1, n):
        gaps.append(startTime[i] - endTime[i-1])
    # gap after last meeting
    gaps.append(eventTime - endTime[-1])

    max_gap = 0

    # There are n+1 gaps. Rescheduling any k consecutive meetings
    # allows merging their k+1 adjacent gaps into one.
    # So do a sliding window over gaps.
    for i in range(len(gaps) - k):
        # by merging gaps[i] through gaps[i+k], the sum is the maximum possible gap
        merged_gap = sum(gaps[i:i+k+1])
        max_gap = max(max_gap, merged_gap)

    return max_gap
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Compute durations: O(n). Compute gaps: O(n). Sliding window over gaps: O(n).
- **Space Complexity:** O(n).  
  Storing durations and gaps arrays, both of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- If you could move meetings **out of order** (not just shifting but rearrangement), how would that change the problem?  
  *Hint: This would allow for global reordering, likely maximizing the largest possible gap by placing the largest duration clusters together.*

- What if you also allowed **changing the duration** of meetings (e.g., making them shorter if possible)?  
  *Hint: This would require knowing the minimum durations and could further increase gaps.*

- How would you handle **overlapping** meetings initially (i.e., input not guaranteed to be non-overlapping)?  
  *Hint: You’d first need to resolve overlaps, perhaps by merging or rescheduling before maximizing free time.*

### Summary
This problem uses a **greedy sliding window approach** on precomputed “gaps” between meetings, efficiently considering how rescheduling any k consecutive meetings allows maximizing one continuous free period.  
This is a classic example of **window manipulation** in interval/array problems where you merge segments for a global optimum.  
The pattern also appears in conference scheduling, busy/idle slot optimization, or maximizing contiguous resource availability in other time-interval problems.


### Flashcard
Identify gaps in schedule; for each gap, check if any meeting can slide into it; compute max free time after optimal rescheduling.

### Tags
Array(#array), Greedy(#greedy), Sliding Window(#sliding-window)

### Similar Problems
- Meeting Scheduler(meeting-scheduler) (Medium)