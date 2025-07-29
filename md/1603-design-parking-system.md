### Leetcode 1603 (Easy): Design Parking System [Practice](https://leetcode.com/problems/design-parking-system)

### Description  
Build a class ParkingSystem that assigns car slots for cars of sizes big, medium, and small. At initialization, you are given the total number of slots for each size. Implement:
- ParkingSystem(big, medium, small): initializes the system.
- addCar(carType): tries to park a car of given size (1=big, 2=medium, 3=small). Returns True if parking is successful, else False.

### Examples  

**Example 1:**  
Input: `system = ParkingSystem(1,1,0)` 
`system.addCar(1)`  
Output: `True`
*Explanation: One big slot available, so parks successfully.*

`system.addCar(2)`  
Output: `True`
*Explanation: One medium slot available, parks successfully.*

`system.addCar(3)`  
Output: `False`
*Explanation: No small slots; cannot park.*

`system.addCar(1)`  
Output: `False`
*Explanation: Big slot already occupied.*

### Thought Process (as if you’re the interviewee)  
- We just need a simple counter for each type of car slot.
- On construction, record the count of each slot size.
- For each addCar call, check if a slot is available. If so, reduce count and return True, else False.
- Straightforward class with three counters.

### Corner cases to consider  
- All slots are zero at start
- Sequence of adds fills up all slots
- Multiple car sizes requested beyond available slots

### Solution

```python
class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        # slot indices: 0=big, 1=medium, 2=small
        self.slots = [big, medium, small]

    def addCar(self, carType: int) -> bool:
        idx = carType - 1
        if self.slots[idx] > 0:
            self.slots[idx] -= 1
            return True
        return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for each operation
- **Space Complexity:** O(1), just three integers stored

### Potential follow-up questions (as if you’re the interviewer)  

- What if each car gets a ticket and can come back to reclaim its slot?  
  *Hint: Store active tickets or car ids.*

- What if cars can move between slots if their own type is full?  
  *Hint: Allow upgrades/downgrades and extra logic per addCar.*

- Is it thread-safe for parallel access?  
  *Hint: May need locks or atomic operations for counters.*

### Summary
The solution uses simple state tracking with counters. The same pattern works for inventory counters or basic resource allocation.