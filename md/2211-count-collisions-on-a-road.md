### Leetcode 2211 (Medium): Count Collisions on a Road [Practice](https://leetcode.com/problems/count-collisions-on-a-road)

### Description  
Given a string where each character represents a car’s direction on an infinitely long road (`'L'` for left, `'R'` for right, `'S'` for stationary), count how many collisions occur until all cars are stationary:
- If two moving cars collide (one left, one right), +2 collisions and both stop.
- If a moving car hits a stationary car (either from left or right), +1 collision and both stop.
Once a car has stopped, it never moves again.  
Return the **total number of collisions** given an initial arrangement.

### Examples  

**Example 1:**  
Input: `directions = "RLRSLL"`  
Output: `5`  
*Explanation:  
Step by step:  
- The first `R` crashes into the `L` (index 1), both stop (`+2` collisions).  
- The next `R` moves, hits stationary cars/S's/l's (`+1` collision per hit).  
- Total: 5 collisions.*

**Example 2:**  
Input: `directions = "LLRR"`  
Output: `0`  
*Explanation:  
- Leftmost L's exit left; rightmost R's exit right. No overlaps, so 0 collisions.*

**Example 3:**  
Input: `directions = "SSRSSRLLRSLLRSRSSRLR"`  
Output: `20`  
*Explanation:  
- Any R’s to the left of the first S and L’s to the right of the last S do not cause collisions.  
- All others eventually collide, totaling 20 collisions.*

### Thought Process (as if you’re the interviewee)  
My first instinct is to simulate the car movements step by step and count all collisions (brute-force). However, that’s inefficient.

Looking closer:
- Any `'L'` at the far left and `'R'` at the far right *never* cause collisions since those cars just leave the road.
- Only the **middle section** matters: between the first non-L from left and the last non-R from right.
- For this central region, every `'L'` or `'R'` will ultimately become stationary through collisions. We just need to count the number of moving cars (`'L'` or `'R'`) in this interval.

Thus, an optimal solution is:
- Ignore leading `'L'`s and trailing `'R'`s.
- For the remaining substring, count all `'L'` and `'R'` (each such car triggers a collision).

- **Why is this valid?**  
  Each such car will have to either bump into a stationary car or an opposite-moving car.

Trade-offs:
- No simulation required, only O(n) string processing.
- Easy to justify correctness via "inevitable collision" logic.

### Corner cases to consider  
- Empty input (should return 0).
- All left-moving cars e.g. `"LLL"` (should return 0, as all leave left).
- All right-moving cars e.g. `"RRRR"` (should return 0, as all leave right).
- All stationary e.g. `"SSS"` (should return 0).
- Only non-leading/trailing L/R (should count each).
- Mix of all three, with L’s at left and R’s at right.

### Solution

```python
def countCollisions(directions: str) -> int:
    # Skip all initial L's (they leave the road)
    left = 0
    n = len(directions)
    while left < n and directions[left] == 'L':
        left += 1

    # Skip all trailing R's (they leave the road)
    right = n - 1
    while right >= 0 and directions[right] == 'R':
        right -= 1

    # Count collisions: in the central region, any 'L' or 'R' will collide
    collisions = 0
    for i in range(left, right + 1):
        if directions[i] in ('L', 'R'):
            collisions += 1
    return collisions
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the directions string. We make at most 3 full traversals (left trim, right trim, count collisions).
- **Space Complexity:** O(1). No extra space used beyond a few counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to know **which positions** each collision occurs at?  
  *Hint: Can you simulate with a stack or pointers to track actual interactions?*

- How would this change if cars could have **different speeds**?  
  *Hint: Would need to model times explicitly for crashes.*

- Could you handle a version where cars **restart after a collision**?  
  *Hint: You’d likely need a dynamic simulation, not a one-pass solution.*

### Summary
This problem is a string traversal leveraging the observation that only the "middle" cars (not those exiting freely) can ever collide. The pattern—trimming irrelevant prefix/suffix and linear pass—appears in similar simulation or sweep-line problems. The solution avoids actual simulation by transforming the problem into a simple count, which is common in optimal interview solutions.

### Tags
String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
- Asteroid Collision(asteroid-collision) (Medium)
- Car Fleet(car-fleet) (Medium)
- Last Moment Before All Ants Fall Out of a Plank(last-moment-before-all-ants-fall-out-of-a-plank) (Medium)
- Car Fleet II(car-fleet-ii) (Hard)