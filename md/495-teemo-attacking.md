### Leetcode 495 (Easy): Teemo Attacking [Practice](https://leetcode.com/problems/teemo-attacking)

### Description  
Given an integer array **timeSeries** (sorted in non-decreasing order), where timeSeries[i] is the second Teemo attacks Ashe, and an integer **duration** representing how long poison lasts after each attack, compute the total time Ashe is poisoned.  
If a new attack comes in before the previous poison expires, the poison effect is reset (not stacked). You must not count overlapping poison time twice, only the unique poisoned time.

### Examples  

**Example 1:**  
Input: `timeSeries = [1, 4], duration = 2`  
Output: `4`  
*Explanation: First attack at 1: poisoned from 1 to 2. Second attack at 4: poisoned from 4 to 5. No overlap. Total = 2 + 2 = 4 seconds.*

**Example 2:**  
Input: `timeSeries = [1, 2], duration = 2`  
Output: `3`  
*Explanation: First attack at 1: poisoned from 1 to 2. Second attack at 2: previous poison lasts up to 2, so overlapping second gets only 1 extra second. Poison intervals: 1-2 and 2-3 (since duration is 2). Total = 2 (first) + 1 (overlap) = 3 seconds.*

**Example 3:**  
Input: `timeSeries = [1, 3, 7, 9], duration = 2`  
Output: `6`  
*Explanation:  
- 1st attack: 1-2 (2s)  
- 2nd attack: 3-4 (no overlap; +2s)  
- 3rd attack: 7-8 (+2s)  
- 4th attack: 9-10 (+2s)  
Total = 2 + 2 + 2 + 2 = 8*  

*(But this does not account for the duration between attacks; between 3 and 7 is more than duration, so no overlaps. Actually, total = 2 + 2 + 2 + 2 = 8.)*


### Thought Process (as if you’re the interviewee)  
- Initial brute-force idea: For each attack, mark every poisoned second in a set. At the end, return set's size. This is correct but space inefficient for large intervals.
- More optimized: Notice we're really just summing unique intervals. For each attack (except the last), you can add either the full duration if no overlap, or only the difference to next attack, whichever is smaller.
- Specifically, for attack i: Add min(duration, timeSeries[i+1] - timeSeries[i]). The last attack always gets the full duration, as there’s no next attack to overlap.
- This avoids double-counting and is O(n) with O(1) space.

### Corner cases to consider  
- Empty timeSeries (not possible per constraints, but good to note)
- duration = 0 (would result in 0 poison time)
- duration > time between attacks (causes overlap)
- Single attack in the array (should get full duration)
- All attacks are at the same time (multiple attacks at same second)

### Solution

```python
def findPoisonedDuration(timeSeries, duration):
    if not timeSeries or duration == 0:
        return 0

    total_poison = 0
    for i in range(len(timeSeries) - 1):
        # Time till next attack or poison duration, whichever is smaller
        interval = timeSeries[i+1] - timeSeries[i]
        total_poison += min(duration, interval)
    # Add last attack's full duration
    total_poison += duration
    return total_poison
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass through timeSeries to compare timestamps.
- **Space Complexity:** O(1) — Only a few variables for counters; no extra data structures proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had overlapping ranges not sorted?  
  *Hint: How do you merge intervals if input isn't sorted?*

- Could you extend this to allow different durations for each attack?  
  *Hint: Do you need to adjust the interval calculation?*

- If the timeSeries can be huge and memory is limited, how would you handle it?  
  *Hint: Can the logic be done in a streaming/online fashion?*

### Summary
This problem uses the **interval merging/overlapping** technique—a common approach for combining timelines or ranges. It's often seen in "merge intervals," calendar meeting, and streaming window problems. A simple O(n) scan suffices because intervals are sorted and can only overlap with their direct successor. The problem strengthens understanding of overlap handling and efficient scanning patterns.


### Flashcard
For each attack, add min(duration, timeSeries[i+1] − timeSeries[i]); last attack always adds full duration.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Can Place Flowers(can-place-flowers) (Easy)
- Dota2 Senate(dota2-senate) (Medium)