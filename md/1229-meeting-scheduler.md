### Leetcode 1229 (Medium): Meeting Scheduler [Practice](https://leetcode.com/problems/meeting-scheduler)

### Description  
You are given the available time slots of two people, where each time slot is a non-overlapping interval `[start, end]`. The goal is to find the earliest time slot where **both people are available** and **the slot is at least of a certain duration**. If such a slot exists, return its start and end time in a 2-element list; if not, return an empty list.

### Examples  

**Example 1:**  
Input: `slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8`  
Output: `[60,68]`  
Explanation: The overlapping interval `[60,70]` exists in both schedules, and it is at least 8 units long.

**Example 2:**  
Input: `slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 12`  
Output: `[]`  
Explanation: Although `[60,70]` overlaps, its length is only 10, which is less than the required 12. No interval of length ≥12 is shared.

**Example 3:**  
Input: `slots1 = [[1,10]], slots2 = [[2,3],[5,7]], duration = 2`  
Output: `[5,7]`  
Explanation: The first person is available from 1 to 10. The second person is available from 2–3 and 5–7. The overlapping intervals `(2,3)` (only 1 unit long) and `(5,7)` (2 units long). The second interval matches the duration.

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea: For each slot in `slots1`, check all slots in `slots2` to see if they overlap with at least the required duration. This is O(m×n) and will be slow for large input.

To optimize:
- Both people's slots are non-overlapping and can be sorted by start time.
- Use two pointers, one for each schedule. For each pair at the pointers, compute the overlap:
  - Latest `start` = max(slots1[i], slots2[j])
  - Earliest `end` = min(slots1[i][1], slots2[j][1])
- If overlap ≥ duration, return `[latest_start, latest_start + duration]`
- If slots1[i] ends earlier, move i; else, move j.
This way, we only scan through the lists once.

This leverages the **two pointers** and **sorting** patterns, efficiently handling large input sizes.

### Corner cases to consider  
- Either list is empty ⇒ return `[]`
- No overlapping interval meets the required duration
- Multiple overlapping intervals, but only the earliest is to be returned
- Available slots touching at the endpoints (e.g., `[5,10]` and `[10,12]`, check if duration fits)
- Slots not sorted (need to sort before algorithm)
- Overlap exactly equals duration

### Solution

```python
from typing import List

def minAvailableDuration(slots1: List[List[int]], slots2: List[List[int]], duration: int) -> List[int]:
    # First, sort both slot lists by their start time
    slots1.sort(key=lambda x: x[0])
    slots2.sort(key=lambda x: x[0])
    
    i, j = 0, 0
    while i < len(slots1) and j < len(slots2):
        # Find the overlapping window between the two current slots
        start = max(slots1[i][0], slots2[j][0])
        end = min(slots1[i][1], slots2[j][1])
        
        # If the overlap is at least 'duration', return the meeting slot
        if end - start >= duration:
            return [start, start + duration]
        
        # Move the pointer that has the slot finishing earlier
        if slots1[i][1] < slots2[j][1]:
            i += 1
        else:
            j += 1
            
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log m + n log n) for sorting the two slot lists (`m` and `n` are lengths). O(m + n) for the pointers scan; overall dominated by sorting.
- **Space Complexity:** O(1) extra (ignoring input size). Only variables and pointers are used; sorting is in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are more than two people's schedules to coordinate?  
  *Hint: How would the pairwise intersection logic extend? Could you generalize scan for k lists?*
  
- How can you return all possible meeting times that fit the duration, not just the earliest?  
  *Hint: Instead of returning early, collect all intervals where the overlap ≥ duration.*

- What changes if the slots could have overlaps within the same person's list?  
  *Hint: Consider merging intervals first to ensure non-overlapping availability per person.*

### Summary
This problem uses a classic **interval intersection** and **two-pointer** approach on two sorted lists. It's a common pattern for scheduling, calendar merging, and finding joint intervals across two sources. The careful calculation of overlaps and advancing the correct pointer is critical and generalizes to related problems.