### Leetcode 1344 (Medium): Angle Between Hands of a Clock [Practice](https://leetcode.com/problems/angle-between-hands-of-a-clock)

### Description  
Given two integers, **hour** and **minutes**, calculate and return the *smaller angle in degrees* between the hour and minute hands on an analog clock. Both hands move smoothly (the hour hand moves as minutes progress). Assume input is on a 12-hour clock (so `hour` can be 12, not 0).

### Examples  

**Example 1:**  
Input: `hour = 12, minutes = 30`  
Output: `165`  
*Explanation: The hour hand is at 12 + (30/60) = halfway to 1, so: 12 × 30° + 30 × 0.5° = 0 + 15 = 15°. The minute hand is at 30 × 6° = 180°. |180 - 15| = 165°. The smaller angle is 165°.*

**Example 2:**  
Input: `hour = 3, minutes = 30`  
Output: `75`  
*Explanation: Hour hand: 3 × 30 + 30 × 0.5 = 90 + 15 = 105°. Minute hand: 30 × 6 = 180°. |180 - 105| = 75°. The smaller angle is 75°.*

**Example 3:**  
Input: `hour = 3, minutes = 15`  
Output: `7.5`  
*Explanation: Hour hand: 3 × 30 + 15 × 0.5 = 90 + 7.5 = 97.5°. Minute hand: 15 × 6 = 90°. |97.5 - 90| = 7.5°. Smaller angle: 7.5°.*

### Thought Process (as if you’re the interviewee)  
I’ll first recall the movement of each clock hand:
- **Minute hand:** moves full 360° in 60 minutes, so 6° per minute.
- **Hour hand:** moves 360° in 12 hours, so 30° per hour. But it also moves as the minutes pass, so for each minute it progresses 0.5° (30°/60).

**Brute-force** would be simulating the placement of each hand, but that’s unnecessary.  
A direct **mathematical formula** is more optimal:
- Hour angle = (hour % 12) × 30 + (minutes × 0.5)
- Minute angle = minutes × 6
- Find the absolute difference.
- Return the smaller value of (diff, 360 - diff) in case the hands are separated by >180°.

This method is constant time and clear—no need for loops or simulating each hand’s progression minute-by-minute.

### Corner cases to consider  
- `hour = 12` (should be treated as 0 in calculation)
- `minutes = 0` (hands on the hour)
- Hands overlapping (`hour = 12, minutes = 0` or `hour = 6, minutes = 0`)
- `hour = 11, minutes = 59` (almost on top of each other but not quite)
- When difference in angles is close to 360, should return the smaller angle.
- Inputs at boundary (e.g. `hour = 1, minutes = 59`)

### Solution

```python
def angleClock(hour: int, minutes: int) -> float:
    # Convert hour to 0 if it's 12
    h = hour % 12
    # Calculate the position of the hour hand in degrees
    hour_angle = h * 30 + minutes * 0.5
    # Calculate the position of the minute hand in degrees
    minute_angle = minutes * 6
    # Find the difference between the two angles
    diff = abs(hour_angle - minute_angle)
    # Return the smaller angle (could be on either side of the clock)
    return min(diff, 360 - diff)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), as all operations are simple arithmetic and no iteration depends on input size.
- **Space Complexity:** O(1), since no extra data structures are used; only a fixed number of variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a 24-hour clock?
  *Hint: Think how many degrees per hour in a 24-hour system, and how you’d adapt the formula.*

- What if the input could be floating point (e.g., minutes = 15.5)?
  *Hint: Does your formula naturally handle decimal minutes/fractions?*

- Can you handle the output to a higher degree of precision (e.g., 10⁻⁹)?
  *Hint: Consider floating point comparison and any language-specific precision pitfalls.*

### Summary
This problem uses the **math/geometry pattern**, reducing a real-world system to precise arithmetic formulas. Recognizing the mapping from time to angle is key, and this approach often appears in other clock, cycle, or rotation-based problems. The solution is a pure function: no state, just input ⇒ output, which makes it both efficient and robust.

### Tags
Math(#math)

### Similar Problems
