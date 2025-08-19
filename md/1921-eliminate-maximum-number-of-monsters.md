### Leetcode 1921 (Medium): Eliminate Maximum Number of Monsters [Practice](https://leetcode.com/problems/eliminate-maximum-number-of-monsters)

### Description  
You are defending a city from a horde of monsters. Each monster starts at a certain distance from the city and approaches at a given speed. Every minute, you can eliminate at most one monster using a weapon that needs a minute to recharge. If a monster reaches the city (distance ≤ 0) at the start of any minute (including right after elimination), you lose. Your goal is to compute the maximum number of monsters you can eliminate before any reach the city.

### Examples  

**Example 1:**  
Input: `dist = [1,3,4], speed = [1,1,1]`  
Output: `3`  
*Explanation:  
- Minute 0: eliminate a monster (dist=[X,3,4])
- Minute 1: eliminate another (dist=[X,X,3])
- Minute 2: eliminate the last (dist=[X,X,X])
You can eliminate all 3 monsters before any reaches the city.*

**Example 2:**  
Input: `dist = [1,1,2,3], speed = [1,1,1,1]`  
Output: `1`  
*Explanation:  
- Minute 0: eliminate one (dist=[X,1,2,3])
- Minute 1: monsters move (dist=[X,0,1,2]), so a monster reaches the city.
You can only eliminate 1 monster before losing.*

**Example 3:**  
Input: `dist = [3,2,4], speed = [5,3,2]`  
Output: `1`  
*Explanation:  
- Minute 0: eliminate one (dist=[X,2,4])
- Minute 1: monsters move (dist=[X,0,2]); a monster reaches the city.
You can only eliminate 1 monster before you lose.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all permutations of monster elimination orders and simulate, but this is infeasible for large n due to factorial growth.
- **Observation:**  
  The crucial factor is when each monster reaches the city: time = ⌊dist[i]/speed[i]⌋.  
  You want to eliminate monsters that reach the city *sooner* first.
- **Greedy approach:**  
  - Calculate for each monster its "arrival minute" at the city.
  - Sort monsters by arrival minute.
  - For each minute, eliminate the monster that would arrive next.
  - If, at any minute, the iᵗʰ monster would arrive before or at minute i, you lose.
- **Justification:**  
  Since you can shoot only 1 per minute, always shoot the monster that has the least time remaining; otherwise, that monster is guaranteed to reach first.
- **Trade-offs:**  
  Time complexity: O(n log n) for sort, plus O(n) loop. Space: O(n) for storage.

### Corner cases to consider  
- Empty arrays (n=0)  
- Only one monster  
- Multiple monsters reaching at the exact same time  
- Very fast monster (speed much greater than all others)  
- Monsters that never reach the city within a reasonable time (but n is constrained small)  
- All monsters arrive after n minutes  

### Solution

```python
def eliminateMaximum(dist, speed):
    # Calculate arrival time for each monster (minute they reach the city)
    n = len(dist)
    arrival = []
    for i in range(n):
        # The earliest minute the monster reaches or crosses 0
        # If dist=6, speed=2: arrival=3 (as it reaches at start of 3rd minute)
        # Use integer division, but need to round up: (dist + speed - 1) // speed
        time = (dist[i] + speed[i] - 1) // speed[i]
        arrival.append(time)
    
    # Sort arrival times so we target fastest monsters first
    arrival.sort()
    
    for minute in range(n):
        # If any monster arrives by this minute, game over
        if arrival[minute] <= minute:
            return minute
    return n
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the arrival times; the rest is O(n).
- **Space Complexity:** O(n) for the arrival list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could eliminate k monsters per minute?  
  *Hint: How would this change the way you process the arrival times per minute?*

- What if monsters have different "elimination costs" or require different "reload times"?  
  *Hint: Can you extend the greedy method or do you need a more complex simulation or scheduling algorithm?*

- Suppose elimination is allowed while monsters are at the city in the same minute, do your rules change?  
  *Hint: Is "≤ minute" the right comparison or should it be "< minute"?*

### Summary
We use a **greedy scheduling pattern**: sort monsters by time to arrival, then eliminate those closest to the city first, stopping at the first conflict. This approach is common in conflict-minimizing problems, such as job scheduling, minimum meeting rooms, and greedy resource assignment. The pattern is applicable whenever you must process tasks under a constraint (here: one per minute) and want to defer "the furthest" as far as possible.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Minimum Health to Beat Game(minimum-health-to-beat-game) (Medium)
- Minimum Time to Kill All Monsters(minimum-time-to-kill-all-monsters) (Hard)