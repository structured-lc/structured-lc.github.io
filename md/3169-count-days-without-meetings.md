### Leetcode 3169 (Medium): Count Days Without Meetings [Practice](https://leetcode.com/problems/count-days-without-meetings)

### Description  
You are given a positive integer **days**, representing how many days (numbered 1 to days) an employee is available for work.  
You are also given a 2D array **meetings** where **meetings[i] = [startᵢ, endᵢ]** means the iᵗʰ meeting covers *all days from startᵢ to endᵢ*, inclusive.  
Some meetings may overlap.  
Return the number of days when the employee is available but has **no meeting scheduled across all given meetings**.

### Examples  

**Example 1:**  
Input: `days = 10`, `meetings = [[5,7],[1,3],[9,10]]`  
Output: `2`  
*Explanation: Days 4 and 8 are not covered by any meeting.  
Covered: [1,2,3], [5,6,7], [9,10]. Left out: days 4, 8.*

**Example 2:**  
Input: `days = 5`, `meetings = [[2,4],[1,3]]`  
Output: `1`  
*Explanation: Meetings cover days 1-4 (via [1,3] and [2,4]), so only day 5 is free.*

**Example 3:**  
Input: `days = 6`, `meetings = [[1,6]]`  
Output: `0`  
*Explanation: All days from 1 to 6 are covered.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every day from 1 to days, check each meeting to see if the day is covered.  
  This is O(days × n), which is slow if days is large (up to 1e9).

- **Optimized approach:**  
  - **Merge intervals**:  
    - Meetings may overlap, so first, sort all meeting intervals by startᵢ.
    - Then, merge overlapping intervals into a list of non-overlapping intervals.
    - For any gaps between merged intervals, those are days with no meetings scheduled.
    - Also, there may be a gap at the start (before the first merged interval) or at the end (after the last merged interval).
  - **Counting:**  
    - For each gap between intervals, add its length.
    - Initial gap: days before the first meeting.
    - Between gaps: days after prev_end and before curr_start.
    - Final gap: days after last meeting interval and up to days.
  - **Why this approach?**  
    - It's much faster: only O(n log n) for sorting and one O(n) merge loop.

### Corner cases to consider  
- No meetings: All days are free.
- Meetings cover the first day or the last day.
- All meetings overlap completely.
- Back-to-back meetings (no gap between).
- Contained/same intervals.
- Single-day meetings.
- Large `days` value with few meetings.
- Meetings outside of valid days (shouldn't happen per problem statement).

### Solution

```python
def countDays(days, meetings):
    # Sort meetings by their start day
    meetings.sort()
    free_days = 0
    prev_end = 0  # End of the last merged meeting

    for start, end in meetings:
        # If there's a gap between previous end and the new start
        if start > prev_end + 1:
            free_days += (start - prev_end - 1)
        # Move forward the end of covered days
        prev_end = max(prev_end, end)

    # Days after the last meeting till 'days'
    if prev_end < days:
        free_days += (days - prev_end)

    return free_days
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - For sorting the meetings.
  - Merging is O(n).
  - n = number of meetings (not days).
- **Space Complexity:** O(1) auxiliary  
  - Not storing extra structures, just counters and in-place sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return **which days** are free, not just how many?
  *Hint: Track ranges/gaps during merging; enumerate.*

- How would you solve this if **multiple employees** (with different schedules) are involved?
  *Hint: Need to merge more intervals; intersection logic might be needed.*

- How can you handle an **online stream** of meetings (meetings arrive one at a time)?
  *Hint: Use balanced BST or interval tree to dynamically merge/check overlap.*

### Summary
This is a classic **merge intervals** problem — by merging all overlaps, you can efficiently count/track *gaps* in the schedule.  
This pattern occurs in sweep line problems, "meeting rooms", calendar schedulers, file range coalescing, and server/booking slot problems.  
Recognizing overlap → merge → count gap is a recurring approach in real-world interval data.


### Flashcard
Sort meetings by start time, merge overlapping intervals; count gaps between merged intervals and add boundary gaps (1 to first start, last end to days).

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)