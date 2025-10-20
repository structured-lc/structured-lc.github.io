### Leetcode 1279 (Easy): Traffic Light Controlled Intersection [Practice](https://leetcode.com/problems/traffic-light-controlled-intersection)

### Description  
You are given a simulation problem for an intersection with two roads (Road A: north-south, Road B: east-west). Each road supports cars traveling in two directions (1: north→south, 2: south→north, 3: west→east, 4: east→west). There is a traffic light for each road, but **only one road can have a green light at any time**.  
- When a road's light is green, any car on that road (in either direction) may cross; when red, all cars must stop.
- **Initially**, Road A's light is green and Road B's is red.
- You are given three functions for each car:  
  - **carId**: unique to the car  
  - **roadId**: which road the car wants to use (1/2: Road A, 3/4: Road B)  
  - **turnGreen()**: function to switch green light to the car’s road  
  - **crossCar()**: function to let the car cross  
Design a **thread-safe system** to let all cars cross safely, ensuring:  
- No two cars on different roads cross at the same time.  
- No deadlock (all cars eventually can cross).  

### Examples  

**Example 1:**  
Input: Car 1 arrives on road 1 (Road A), Car 2 arrives on road 3 (Road B), Car 3 arrives on road 1 (Road A)  
Output: Each car crosses safely, but Car 2 only starts after light switches to Road B  
*Explanation: Car 1 crosses (A green). Car 2 waits, since B is red. After cars on A are done, light turns to B, Car 2 crosses. Car 3 (if still waiting) will wait on A until the light toggles again.*

**Example 2:**  
Input: All cars arrive on same road (e.g., [road1, road1, road2])  
Output: All cars cross as scheduled; light only switches when cars arrive for the other road  
*Explanation: No light change unless both roads have cars; all cars on same road cross without waiting.*

**Example 3:**  
Input: Car arrives on road B when A is green, then another on A  
Output: Car on B waits, A crosses, then light switches and B can go  
*Explanation: System maintains only one road with green at a time and changes green only when another road needs to cross.*

### Thought Process (as if you’re the interviewee)  
- Each car is a separate thread or function call, so the core problem is **synchronizing access**: only cars from one road may cross at a time.
- Use a **lock** to ensure mutual exclusion.
- Track the **current green road** with a variable: 1 (Road A) or 2 (Road B).
- When a car arrives:
  - If its road is green, it can cross immediately.
  - If its road is red, it must “wait” until the light turns green for its road. The light is flipped using `turnGreen`, which must only be called if the current green road is not the arriving car's road.
- **Optimization** over brute-force: Minimize unnecessary light switches. Only switch if a car from the other road arrives.
- Ensuring “no deadlock” means always releasing the lock and not blocking in a way that prevents future cars from switching the light.

### Corner cases to consider  
- Multiple cars from one road arrive while light is green (should all pass without delay).
- Simultaneous arrival: cars from both roads arrive at the same time (only one road's cars can cross at a time).
- Cars arrive for road B before first light switch (must wait).
- No cars for a long period: system must remain responsive for next arrival.
- Only one car per road.

### Solution

```python
import threading

class TrafficLight:
    def __init__(self):
        # 1 for Road A, 2 for Road B
        self.green_road = 1
        self.lock = threading.Lock()

    def carArrived(self, 
                   carId: int,           # unique id of car
                   roadId: int,          # 1,2: Road A; 3,4: Road B
                   direction: int,       # direction (not needed in control logic)
                   turnGreen: 'Callable[[], None]',
                   crossCar: 'Callable[[], None]') -> None:
        with self.lock:
            # Determine the road group: 1 for Road A, 2 for Road B
            group = 1 if roadId in (1, 2) else 2

            # If the current road is not green, switch lights
            if self.green_road != group:
                turnGreen()
                self.green_road = group

            crossCar()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per car arrival, since each car only checks light status and switches if needed.
- **Space Complexity:** O(1), using only fixed variables for the green road and the lock.

### Potential follow-up questions (as if you’re the interviewer)  

- What would happen if cars can arrive at exactly the same time from both roads?  
  *Hint: How does locking handle simultaneous access, and does order of crossing matter for safety?*

- How would you extend this to more than two intersecting roads?  
  *Hint: Generalize the state-tracking mechanism and handle green-light cycling.*

- Suppose cars have priority or pre-emption rules (e.g., an emergency on one road). How would you adapt your solution?  
  *Hint: Could use priority queues or flags along with mutual exclusion.*

### Summary
This problem is a classic **synchronization and mutual exclusion pattern** in multi-threaded design, commonly solved with locks and state variables. It's a simulation of resource arbitration—ensuring only one party can use a resource (the intersection) at a time. The technique is widely applicable in threading, system design (like elevators, printers), and anywhere race conditions may arise.


### Flashcard
Synchronize cars using a lock and track current green road; cars wait if their road is red, and only one road is green at a time.

### Tags
Concurrency(#concurrency)

### Similar Problems
