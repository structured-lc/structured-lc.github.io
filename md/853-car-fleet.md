### Leetcode 853 (Medium): Car Fleet [Practice](https://leetcode.com/problems/car-fleet)

### Description  
Given **n** cars driving towards a destination at position `target`, each car has its own starting position and speed. If a faster car catches a slower car before the destination, it cannot pass; instead, it forms a "car fleet" and moves at the slower car's speed.  
Multiple cars can merge into a fleet en route or exactly at the destination, and a single car can be a fleet as well.  
Your task is to find **how many car fleets** reach the destination.

### Examples  

**Example 1:**  
Input: `target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]`  
Output: `3`  
*Explanation:  
- Cars at 10(s=2) and 8(s=4) meet exactly at 12 and form 1 fleet at the target.  
- Cars at 5(s=1) and 3(s=3) meet at position 6 and form a fleet (move at speed 1), arriving together as 1 fleet.  
- Car at 0(s=1) never catches up to anyone before the target, so it is its own fleet.  
Total fleets: 3.*

**Example 2:**  
Input: `target = 10, position = [3], speed = [3]`  
Output: `1`  
*Explanation:  
Only one car, so it forms a single fleet.*

**Example 3:**  
Input: `target = 100, position = [0,2,4], speed = [4,2,1]`  
Output: `1`  
*Explanation:  
- Car at position 0 (speed 4) catches up to 2 (speed 2) before the target, then both catch up to the one at 4 (speed 1) before 100.  
- They all form a single fleet and arrive together.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  At first, you might think to simulate car movement second by second, seeing when cars would collide. But this is slow, especially given the constraints.

- **Optimize:**  
  Instead, let's compute when (if ever) one car "catches up" to the car ahead of it.  
  If we **sort cars by position descending (from closest to furthest from the target)**, we can process them in the order they'll potentially collide.

  - For each car, calculate its "arrival time" at the target:  
    ArrivalTime = (target - position) / speed  
  - Walk through the sorted cars (from closest to the finish), tracking the "latest" fleet time.  
  - If the current car's time is greater than the fleet ahead, it's a new fleet; otherwise, it joins the fleet in front.
  
- This approach works because a car can only ever join the fleet in front of it; it cannot "skip" or overtake any car.

- **Trade-offs:**  
  - Time optimal (\( O(n \log n) \) due to sorting).
  - Uses extra space for pairs (position, time), but no simulation.

### Corner cases to consider  
- No cars (position is empty) → Output: 0
- Only one car → Output: 1
- Multiple cars with same speed and same position
- Car(s) starting at the target position (they are already there)
- Some cars never catch up to anyone
- Different cars with the same arrival time (merge at the target)

### Solution

```python
def carFleet(target, position, speed):
    # Step 1: Pair up position and speed, and sort by position descending
    cars = sorted(zip(position, speed), reverse=True)
    # Step 2: Calculate time to reach target for each car
    times = []
    for p, s in cars:
        time = (target - p) / s
        times.append(time)
    # Step 3: Traverse times to count fleets
    fleets = 0
    prev_time = 0
    for t in times:
        # If this car arrives later, it forms a new fleet
        if t > prev_time:
            fleets += 1
            prev_time = t
        # else: it merges with the fleet ahead (do nothing)
    return fleets
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) — for sorting the cars by position; rest of the work is linear.

- **Space Complexity:**  
  O(n) — for storing the time-to-target for each car; input arrays are not modified.

### Potential follow-up questions (as if you’re the interviewer)  

- If car speeds can change over time, how would your solution adapt?  
  *Hint: Simulating time or using event-based modeling may be required.*

- How would you find and return the size of each fleet (i.e., number of cars in each fleet)?  
  *Hint: Track fleet boundaries and count merges as you process times.*

- How would you modify the solution to handle cars starting *at* the target or a scenario where cars can overtake?  
  *Hint: Consider rules-breaking edge cases, change in data structure, or remove merge logic.*

### Summary
This problem uses a **greedy approach plus sorting**, a common coding pattern for "merging intervals" or "processing tasks/events by deadlines/priority."  
It's widely applicable to problems involving physical simulation, collision, or absorption events where entities cannot "jump ahead" — e.g., asteroid collision, queue grouping, or task scheduling by deadlines.